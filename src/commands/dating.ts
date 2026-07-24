import { setBot, setSign, setDating, setSwitch, delSwitch, setBackup, setReplay, setLog, setSelfGroup, setName, setSchedule, setInfo, setHope, setData, setItem, setEquip, setDescription, setList, setShop, setLottery, setSurvey, setRule, setKinship, setSMS, setGift, setLetter, setBoard, setSong } from "../utils/Storage";
import { newSwitch, newBackup, newLog, newDescription, newShop, newLottery, newSurvey, newKinship, newSMS, newGift, newLetter, newBoard, newSong, newGroupStat } from "../utils/initialize";

import { datingHelp } from "../constants/helpText";
import { dating, port, token, BotDeployment, ControlBackstage, MasterName } from "../constants/config";
import { sendMsg } from "../utils/common";


export function datingSolve(ctx: Object, msg: Object, cmdArgs: Object) {
    ctx.delegateText = "";
    let reply = "";
    if ( JSON.stringify(Dating()) == "{}" || Testmode() )
        reply = `当前恋综档期：暂无\n`;
    else {
        reply = `当前恋综档期：\n`
        for ( const sign in Dating() ) {
            reply += `${Dating(sign).start}-${Dating(sign).end}\n`;
        }
    }

    const gid = msg.groupId;
    const rawText = cmdArgs.eatPrefixWith("】");
    const sign = Sign(gid) || rawText[0].match(/\S+?(?=\s*【开始】)/)?.[0];

    if ( rawText[0] == "帮助" || rawText[0] == "后台" ) return seal.replyToSender(ctx, msg, 恋综帮助);
    if ( ctx.privilegeLevel < 60 ) return seal.replyToSender(ctx, msg, reply);

    // 获取恋综进程
    const getDating = (sign) => {
        let DatingText = "";
        let day = getDay(sign, 1);
        let dayStr = "D" + day;
        if ( nowTS < parseInt(Dating(sign).startTS) ) dayStr = "未开始";
        if ( nowTS > parseInt(Dating(sign).endTS) + 86400 ) dayStr = "已结束";
        DatingText =
        `【恋综信息】\n`+
        `主题：${sign}\n`+
        `日程：${Dating(sign).start}-${Dating(sign).end}\n`+
        `今日：${dayStr}，日程共${Dating(sign).day+1}日`;
        if ( Dating(sign).delay > 0 ) DatingText += `，补戏${Dating(sign).delay}日`
        DatingText += `\n`+
        `后台：${Dating(sign).backend.replace("QQ-Group:", "")}\n`+
        `公告：${Dating(sign).notice.replace("QQ-Group:", "")}\n`+
        `戏群：${Dating(sign).act.replace("QQ-Group:", "")}`;
        return DatingText;
    }

    // 部署方式检查
    async function checkDeployment(ctx, msg) {
        let rawGroupId = parseInt(msg.groupId.replace("QQ-Group:", ""));
        let body = JSON.stringify({
            "group_id": rawGroupId,
        })

        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: body,
            redirect: 'follow'
        };

        try {
            const response = await fetch("http://127.0.0.1:"+port+"/get_group_info", requestOptions)
            if ( !response.ok ) {
                throw new Error("http端口配置有误，请检查你的协议端配置与WebUI插件配置。");
            }
            let result = await response.json();
            if ( result.retcode != 0 || result.status != "ok" ) {
                throw new Error("HTTP Token配置有误，请检查你的协议端配置与WebUI插件配置。");
            }
            return;
        } catch(error) {
            error = error.toString().replace("Error: ", "")
            console.error('get_group_info Error:' + error );
            seal.replyToSender(ctx, msg, error);
            return;
        }
    }

    // 恋综进程查询
    if ( rawText[0] == "" ) {
        if ( !sign ) return seal.replyToSender(ctx, msg, 恋综帮助);
        if ( gid != Dating(sign).backend && gid != ControlBackstage ) return seal.replyToSender(ctx, msg, reply);
        else return seal.replyToSender(ctx, msg, getDating(sign));
    }
/*
    // 修改测试模式
    if ( cmdArgs.command == "测试" ) {
        if ( ctx.privilegeLevel != 100 || gid != ControlBackstage ) return WarningMsg(ctx, msg);
        let swi = rawText[0].match(/开启|关闭/)?.[0];
        if ( swi == undefined ) return seal.replyToSender(ctx, msg, `【测试】开启/关闭\n当前：`+(Testmode? "开启": "关闭"));
        if ( swi == "开启" ) Testmode = true;
        if ( swi == "关闭" ) Testmode = false;
        dating.storageSet("Testmode", JSON.stringify(Testmode));
        seal.replyToSender(ctx, msg, `已${swi}测试模式。`);
        return;
    }

    // 查询恋综列表
    if ( rawText[0] == "列表" ) {
        if ( ctx.privilegeLevel != 100 || gid != ControlBackstage ) return WarningMsg(ctx, msg);
        let list = new Array;
        for ( const sign in Dating ) {
            list.push(`\n${Dating[sign].start}-${Dating[sign].end}：${sign}`);
        }
        list.sort();
        reply = `当前恋综列表：`;
        reply += list.join("");
        if ( reply == `当前恋综列表：` ) reply += "无"
        seal.replyToSender(ctx, msg, reply);
        return;
    }

    // 查询登记状态
    if ( rawText[0] == "登记" ) {
        if ( !Dating[sign] ) {
            reply =
                `【恋综】\n`+
                `【开始】\n`+
                `【结束】\n`+
                `【公告】\n`+
                `【戏群】\n`+
                `【发信】hh:mm/不使用\n`+
                `【备用】群号/二维码/不使用`;
            seal.replyToSender(ctx, msg, reply);
        } else {
            if ( gid != Dating[sign].backend && gid != ControlBackstage ) return seal.replyToSender(ctx, msg, reply);
            reply =
                `【恋综】${sign}\n`+
                `【开始】${Dating[sign].start}\n`+
                `【结束】${Dating[sign].end}\n`+
                `【公告】${Dating[sign].notice.replace("QQ-Group:", "")}\n`+
                `【戏群】${Dating[sign].act.replace("QQ-Group:", "")}\n`+
                `【发信】${TimeToSend[sign]? TimeToSend[sign]: "不使用"}\n`+
                `【备用】${!Backup[sign].mode? "不使用": Backup[sign].mode}`;
            seal.replyToSender(ctx, msg, reply);
        };
        return;
    }

    // 查询补戏日
    if ( rawText[0] == "补戏" ) {
        if ( !sign ) return SignDeficiency(ctx, msg);
        if ( gid != Dating[sign].backend && gid != ControlBackstage ) return seal.replyToSender(ctx, msg, reply);
        let setDelayDay = rawText[0].match(/(?<=补戏：D)\d{1,2}/i);
        let delayDayStr = "：D" + Dating[sign].delayDay.join("、")
        if ( delayDayStr == "：D" ) delayDayStr = ""
        if ( !setDelayDay )
            return seal.replyToSender(ctx, msg,
                `【恋综】补戏：D几\n`+
                `当前已设置${Dating[sign].delay}天补戏日` + delayDayStr );
    }

    // 设置补戏日
    if ( rawText[0].indexOf("补戏：") == 0 ) {
        if ( !sign ) return SignDeficiency(ctx, msg);
        if ( gid != Dating[sign].backend && gid != ControlBackstage ) return seal.replyToSender(ctx, msg, reply);
        let setDelayDay = rawText[0].match(/(?<=补戏：D)\d{1,2}/i);
        let delayDayStr = "：D" + Dating[sign].delayDay.join("、")
        if ( delayDayStr == "：D" ) delayDayStr = ""
        if ( !setDelayDay )
            return seal.replyToSender(ctx, msg,
                `【恋综】补戏：D几\n`+
                `当前已设置${Dating[sign].delay}天补戏日` + delayDayStr );

        setDelayDay = parseInt(setDelayDay[0]);

        // 补戏日数据调整
        Dating[sign].delayDay.push(setDelayDay);
        Dating[sign].delay += 1;
        Dating[sign].delayArr[setDelayDay] = 1;

        // 恋综结束日期调整
        let startTS = parseInt(Dating[sign].startTS)
        let endTS = startTS + 86400 * (Dating[sign].day + Dating[sign].delay);
        let endDate = new Date( parseInt( endTS.toString()+"000" ) );
        let end =
            endDate.getFullYear() +
            ( endDate.getMonth()+1 ).toString().padStart(2, '0') +
            endDate.getDate().toString().padStart(2, '0');
        Dating[sign].end = end;
        Dating[sign].endTS = endTS;

        dating.storageSet("Dating", JSON.stringify(Dating));
        reply = `已设置补戏日D${setDelayDay}。\n\n` + getDating(sign)
        seal.replyToSender(ctx, msg, reply)
        return;
    }

    // 取消补戏日
    if ( rawText[0].indexOf("取消：") == 0 ) {
        if ( !sign ) return SignDeficiency(ctx, msg);
        if ( gid != Dating[sign].backend && gid != ControlBackstage ) return WarningMsg(ctx, msg);
        let delDelayDay = rawText[0].match(/(?<=取消：D)\d{1,2}/i);
        let delayDayStr = "：D" + Dating[sign].delayDay.join("、")
        if ( delayDayStr == "：D" )
            return seal.replyToSender(ctx, msg, `当前恋综暂未设置补戏日，无法取消。`);

        if ( !delDelayDay )
            return seal.replyToSender(ctx, msg,
                `【恋综】取消：D几\n `+
                `当前已设置${Dating[sign].delay}天补戏日` + delayDayStr );

        delDelayDay = parseInt(delDelayDay[0]);

        let x = Dating[sign].delayDay.indexOf(delDelayDay);
        if ( x == -1 )
            return seal.replyToSender(ctx, msg, `D${delDelayDay}未设置为补戏日。`);

        // 补戏日数据调整
        Dating[sign].delayDay.splice(x, 1);
        Dating[sign].delay -= 1;
        Dating[sign].delayArr[delDelayDay] = 0;

        // 恋综结束日期调整
        let startTS = parseInt(Dating[sign].startTS)
        let endTS = startTS + 86400 * (Dating[sign].day + Dating[sign].delay);
        let endDate = new Date( parseInt( endTS.toString()+"000" ) );
        let end = endDate.getFullYear() + ( endDate.getMonth()+1 ).toString().padStart(2, '0') + endDate.getDate().toString().padStart(2, '0')
        Dating[sign].end = end;
        Dating[sign].endTS = endTS;

        dating.storageSet("Dating", JSON.stringify(Dating));
        reply = `已取消补戏日D${delDelayDay}。\n\n` + getDating(sign)
        seal.replyToSender(ctx, msg, reply)
        return;
    }

    // 修改名片
    if ( rawText[0] == "名片" ) {
        if ( !sign ) return SignDeficiency(ctx, msg);
        if ( gid != Dating[sign].backend && gid != ControlBackstage ) return WarningMsg(ctx, msg, "请在后台进行操作。");
        if ( !Dating[sign].act ) return seal.replyToSender(ctx, msg, `未录入戏群，无法批量修改群名片。`);
        let gids = new Array; let uids = new Array; let cards = new Array;
        for ( const name in SelfGroup[sign] ) {
            gids.push(Dating[sign].act);
            uids.push(SelfGroup[sign][name].userId);
            cards.push(name);
        }
        seal.replyToSender(ctx, msg, `正在将戏群${Dating[sign].notice=="QQ-Group:"? "": "与公告群"}的群名片批量修改为登记名称。\n每个名片修改的请求发出间隔为2s，全部完成后将出现公开回执，控制台可以查看所有的请求发送情况。如果出现请求正常发送而群名片未修改的情况，属于腾讯常规发癫范畴，与代码无关，请手动处理。`);
        for ( const name in SelfGroup[sign] ) {
            if ( Dating[sign].notice == "QQ-Group:" ) break;
            gids.push(Dating[sign].notice);
            uids.push(SelfGroup[sign][name].userId);
            cards.push(name);
        }

        let i = 0;
        const intervalId = setInterval(() => {
            let gid = gids[i];
            let uid = uids[i];
            let card = cards[i];
            setGroupCard(gid, uid, card);
            i++;
            if ( i >= cards.length ) {
                reply = `本群群名片已批量修改为登记名称。`;
                let eps = getEps(sign);
                let amsg = newMsg(Dating[sign].act);
                let actx = seal.createTempCtx(eps, amsg);
                let nmsg = newMsg(Dating[sign].notice);
                let nctx = seal.createTempCtx(eps, nmsg);
                seal.replyToSender(actx, amsg, reply);
                seal.replyToSender(nctx, nmsg, reply);
                clearInterval(intervalId);
            }
        }, 2000);

        return;
    }

    // 修改头衔
    if ( rawText[0] == "头衔" ) {
        if ( !sign ) return SignDeficiency(ctx, msg);
        if ( gid != Dating[sign].backend && gid != ControlBackstage ) return WarningMsg(ctx, msg, "请在后台进行操作。");
        if ( !Dating[sign].act ) return seal.replyToSender(ctx, msg, `未录入戏群，无法批量修改群头衔。`);
        let gids = new Array; let uids = new Array; let titles = new Array;
        for ( const name in SelfGroup[sign] ) {
            if ( !SelfGroup[sign][name].face ) continue;
            gids.push(Dating[sign].act);
            uids.push(SelfGroup[sign][name].userId);
            titles.push(SelfGroup[sign][name].face);
        }
        seal.replyToSender(ctx, msg, `正在将戏群${Dating[sign].notice=="QQ-Group:"? "": "与公告群"}的群头衔批量修改为登记皮相，如头衔未正常显示，可能是因为群头衔展示未开启，需要在手机QQ上手动开启。`);
        for ( const name in SelfGroup[sign] ) {
            if ( Dating[sign].notice == "QQ-Group:" ) break;
            gids.push(Dating[sign].notice);
            uids.push(SelfGroup[sign][name].userId);
            titles.push(SelfGroup[sign][name].face);
        }

        let i = 0;
        const intervalId = setInterval(() => {
            let gid = gids[i];
            let uid = uids[i];
            let title = titles[i];
            setGroupTitle(gid, uid, title);
            i++;
            if ( i >= titles.length ) {
                reply = `本群群头衔已批量修改为登记皮相。`;
                let eps = getEps(sign);
                let amsg = newMsg(Dating[sign].act);
                let actx = seal.createTempCtx(eps, amsg);
                let nmsg = newMsg(Dating[sign].notice);
                let nctx = seal.createTempCtx(eps, nmsg);
                seal.replyToSender(actx, amsg, reply);
                seal.replyToSender(nctx, nmsg, reply);
                clearInterval(intervalId);
            }
        }, 2000);

        return;
    }

    // 结束恋综
    if ( rawText[0] == "结束" ) {
        if ( !sign ) return SignDeficiency(ctx, msg);
        if ( ctx.privilegeLevel != 100 ) return WarningMsg(ctx, msg);
        if ( gid != Dating[sign].backend && gid != ControlBackstage ) return WarningMsg(ctx, msg, "请在后台进行操作。如果恋综后台被解散了请在WebUI录入控制后台，然后在控制后台绑定对应恋综数据。");
        for ( const id in Sign ) {
            while ( Sign[id] == sign ) { delete Sign[id]; }
        };
        delete Dating[sign]; delete Switch[sign]; delete Backup[sign]; delete Replay[sign]; delete Log[sign];
        delete SelfGroup[sign]; delete Name[sign]; delete Schedule[sign]; delete Info[sign]; delete Hope[sign];
        delete Data[sign]; delete Item[sign]; delete Equip[sign]; delete Description[sign]; delete List[sign]
        delete Shop[sign]; delete Lottery[sign]; delete Survey[sign]; delete Rule[sign]; delete Kinship[sign];
        delete SMS[sign]; delete Gift[sign]; delete Letter[sign]; delete Board[sign]; delete Song[sign];
        Bot[ctx.endPoint.userId] = Bot[ctx.endPoint.userId].filter( x => x != sign );
        setBot(Bot);
        setSign(Sign);
        setDating(Dating);
        setSwitch(Switch);
        setBackup(Backup);
        setReplay(Replay);
        setLog(Log);
        setSelfGroup(SelfGroup);
        setName(Name);
        setSchedule(Schedule);
        setInfo(Info);
        setHope(Hope);
        setData(Data);
        setItem(Item);
        setEquip(Equip);
        setDescription(Description);
        setList(List);
        setShop(Shop);
        setLottery(Lottery);
        setSurvey(Survey);
        setRule(Rule);
        setKinship(Kinship);
        setSMS(SMS);
        setGift(Gift);
        setLetter(Letter);
        setBoard(Board);
        setSong(Song);
        seal.replyToSender(ctx, msg, `已清空恋综【${sign}】所有数据。`);
        return;
    }

    // 设置管理
    if ( rawText[0].indexOf("加管") == 0 ) {
        if ( !sign ) return SignDeficiency(ctx, msg);
        if ( gid != Dating[sign].backend && gid != ControlBackstage ) return WarningMsg(ctx, msg, "请在后台进行操作。");
        if ( !Dating[sign].admin ) Dating[sign].admin = new Array(2);
        let vctx = seal.getCtxProxyFirst(ctx, cmdArgs);
        let uids = new Array;
        if ( vctx.player.userId != ctx.player.userId ) {
            let i = 0;
            while ( vctx.player.userId != ctx.player.userId ) {
                uids[i] = vctx.player.userId.replace("QQ:", "");
                i++;
                vctx = seal.getCtxProxyAtPos(ctx, cmdArgs, i);
                if ( i >= 10 ) break;
            }
        } else {
            uids = cmdArgs.rawArgs.match(/\d+/g);
        }
        addDatingAdmin(ctx, sign, uids);
        return;
    }

    // 取消管理
    if ( rawText[0].indexOf("撤管") == 0 ) {
        if ( !sign ) return SignDeficiency(ctx, msg);
        if ( gid != Dating[sign].backend && gid != ControlBackstage ) return WarningMsg(ctx, msg, "请在后台进行操作。");
        if ( !Dating[sign].admin? true: Dating[sign].admin[0].length == 0 ) return seal.replyToSender(ctx, msg, `恋综【${sign}】的管理列表为空。`);
        delDatingAdmin(ctx, sign, msg.rawId);
        return;
    }

    // 管理列表
    if ( rawText[0].indexOf("管理") == 0 ) {
        if ( !sign ) return SignDeficiency(ctx, msg);
        if ( gid != Dating[sign].backend && gid != ControlBackstage ) return WarningMsg(ctx, msg, "请在后台进行操作。");
        if ( !Dating[sign].admin? true: Dating[sign].admin[0].length == 0 ) return seal.replyToSender(ctx, msg, `恋综【${sign}】的管理列表为空。`);
        reply = `【${sign}丨管理】`
        for ( let i = 0; i < Dating[sign].admin[0].length; i++ ) {
            const id = Dating[sign].admin[0][i];
            const nick = Dating[sign].admin[1][i];
            reply += "\n" + nick + "(" + id + ")";
        }
        seal.replyToSender(ctx, msg, reply);
        return;
    }
*/
    // 登记恋综
    let match = rawText[0].match(/(\S+?)\s*【开始】(\d{8})\s*【结束】(\d{8})\s*【公告】(\d*)\s*【戏群】(\d*)\s*【发信】(?:(\d{1,2})(?:：|:)(\d{1,2})|(不使用))\s*【备用】(群号|二维码|不使用)/);
    if ( !match ) return seal.replyToSender(ctx, msg, "格式验证失败，请检查输入格式。\n"+
        `【恋综】\n`+
        `【开始】\n`+
        `【结束】\n`+
        `【公告】\n`+
        `【戏群】\n`+
        `【发信】hh:mm/不使用\n`+
        `【备用】群号/二维码/不使用`);
    if ( match[6] > 23 || match[7] > 59 ) return seal.replyToSender(ctx, msg, "发信时间录入有误。");
    if ( sign != match[1] ) return seal.replyToSender(ctx, msg, `本群已绑定恋综【${sign}】的数据，请勿用于其他恋综。`);

    let start = match[2];
    let end = match[3];
    let notice = 'QQ-Group:' + match[4];
    let act = 'QQ-Group:' + match[5];
    let startDate = start.slice(0, 4)+'-'+start.slice(4, 6)+'-'+start.slice(6, 8)+' 00:00:00';
    let endDate = end.slice(0, 4)+'-'+end.slice(4, 6)+'-'+end.slice(6, 8)+' 00:00:00';
    let startTS = Date.parse(startDate).toString().slice(0, 10);
    let endTS = Date.parse(endDate).toString().slice(0, 10);
    if ( startTS > endTS ) return seal.replyToSender(ctx, msg, `检查日期。`);
    let day = ( endTS - startTS ) / 86400;
    let delayArr = new Array(day+1);
    delayArr.fill(0);
    let limited = new Array(day+1);
    limited.fill(100);
    let setTime = match[8]? "": match[6]+":"+match[7];
    let backupMode = match[9]=="不使用"? "": match[9];
    let table = Dating(sign)? Dating(sign).table: new Array;

    if ( BotDeployment == "内置客户端" ) seal.replyToSender(ctx, msg, "检测到部署方式为【内置客户端】，复盘功能无法使用，其他功能遗留的未适配问题请报BUG，依然建议有条件尽早进行分离部署。由于内置客户端无法合并转发，不支持直接查询内置帮助文档，请配合插件说明文档食用。\n"+
        "https://gcnjvcr0wzab.feishu.cn/wiki/KZwPwh7ZZiGbvNk7UEYc5lw8nAd");
    else checkDeployment(ctx, msg);

    if ( !Dating(sign) ) {
        reply = `已登记恋综信息。\n\n`;
        setSign(sign, gid); setSign(sign, notice); setSign(sign, act); 

        newSwitch(sign);
        newBackup(sign);
        newLog(sign);
        newDescription(sign);
        newShop(sign);
        newLottery(sign);
        newSurvey(sign);
        newKinship(sign);
        newSMS(sign);
        newGift(sign);
        newLetter(sign, setTime, limited);
        newBoard(sign);
        newSong(sign);
        newGroupStat(sign);

        setRule(sign, "_", {});
        setSelfGroup(sign, "_", {});
        setName(sign, "_", {});
        setSchedule(sign, "_", {});
        setInfo(sign, "_", {});
        setHope(sign, "_", {});
        setData(sign, "_", {});
        setItem(sign, "_", {});
        setEquip(sign, "_", {});
        setList(sign, "_", [ [false, ], [], [] ]);
        setBot(sign, ctx.endPoint.userId);

        seal.ext.registerTask(dating, "cron", `0 0 * * *`, () => createSettleTask(sign), `【${sign}】每日结算`);
        if ( setTime ) {
            seal.ext.registerTask(dating, "cron", `${match[7]} ${match[6]} * * *`, () => createSendTask(sign), `【${sign}】心动信发信时间`);
            seal.ext.registerStringConfig(dating, `【${sign}】心动信发信时间文本`, setTime);
        }
        if ( Backup(sign).mode == "群号" )
            seal.ext.registerStringConfig(dating, `【${sign}】备用群号`, "");
        if ( Backup(sign).mode == "二维码" )
            seal.ext.registerIntConfig(dating, `【${sign}】备用群数量`, 0);

        sendMsg(sign, notice, `本群已登记为【${sign}】公告群。`);
        sendMsg(sign, act, `本群已登记为【${sign}】戏群。`);
    }
    else {
        if ( gid != Dating(sign).backend ) {
            if ( ctx.privilegeLevel != 100 ) return seal.replyToSender(ctx, msg, `修改后台群的操作需要由骰主进行。`);
            delSign(Dating(sign).backend);
        }
        Switch(sign).Letter = setTime? true: false;
        reply = `已更新恋综信息。\n`+
        `${Switch(sign).Letter?"心动信限额":""}`+`${Switch(sign).Letter && Switch(sign).Replay?"与":""}`+`${Switch(sign).Replay?"复盘群数据":""}`+`${Switch(sign).Letter || Switch(sign).Replay?"已重置，请重新录入。\n":""}`+
        `\n`;
        if ( Backup[sign].mode != backupMode ) {
            let used = Object.keys(Backup[sign].used);
            if ( Testmode || !Backup[sign].mode || ( !Backup[sign].array.length && !used.length ) ) {
                Backup[sign] = {
                    mode: backupMode,
                    array: new Array,
                    used: new Object,
                    amount: 0,
                    left: 0,
                    swi: true
                };
                dating.storageSet("Backup", JSON.stringify(Backup));
                if ( Backup[sign].mode == "群号" )
                    seal.ext.registerStringConfig(dating, `【${sign}】备用群号`, "");
                if ( Backup[sign].mode == "二维码" )
                    seal.ext.registerIntConfig(dating, `【${sign}】备用群数量`, 0);
            }
            else return seal.replyToSender(ctx, msg, `存在备用群数据，不支持修改备用群使用模式。`);
        }

        Replay[sign] = new Array(day+1);
        Replay[sign].fill("");

        Letter[sign].limited = new Array(day+1);
        Letter[sign].limited.fill(100);

        dating.storageSet("Letter", JSON.stringify(Letter));
        dating.storageSet("Replay", JSON.stringify(Replay));

        if ( TimeToSend[sign] && setTime ) seal.replyToSender(ctx, msg, `修改发信时间需要在WebUI进行，请联系${MasterName}。`);
        if ( TimeToSend[sign] && !setTime ) Switch[sign].letter = false;
        if ( !TimeToSend[sign] && setTime ) {
            Switch[sign].letter = true;
            TimeToSend[sign] = setTime;
            seal.ext.registerTask(dating, "cron", `${match[7]} ${match[6]} * * *`, () => createSendTask(sign), `【${sign}】心动信发信时间`);
            seal.ext.registerStringConfig(dating, `【${sign}】心动信发信时间文本`, setTime);
            dating.storageSet("TimeToSend", JSON.stringify(TimeToSend));
            dating.storageSet("Switch", JSON.stringify(Switch));
        }

        if ( notice != Dating(sign).notice ) {
            delete Sign[Dating(sign).notice];
            Sign[notice] = sign;
            sendMsg(sign, notice, `本群已登记为【${sign}】公告群。`);
            
        }
        if ( act != Dating(sign).act ) {
            delete Sign[Dating(sign).act];
            Sign[act] = sign;
            sendMsg(sign, act, `本群已登记为【${sign}】戏群。`);
        }
    };

    setDating(sign, "_", {});
    setDating(sign, "notice", notice);
    setDating(sign, "act", act);
    setDating(sign, "backend", msg.groupId);
    setDating(sign, "start", start);
    setDating(sign, "end", end);
    setDating(sign, "day", day);
    setDating(sign, "delay", 0);
    setDating(sign, "delayDay", new Array);
    setDating(sign, "delayArr", delayArr);
    setDating(sign, "startTS", startTS);
    setDating(sign, "endTS", endTS);
    setDating(sign, "admin", new Array(2));
    setDating(sign, "table", table);

    setSign(Sign);
    setDating(Dating);

    setDatingAdmin(sign, gid);

    reply += getDating(sign) +"\n";
    reply += `\n`+
        `${BotDeployment == "内置客户端"? "": "后台功能：后台@本账号\n"}`+
        `${BotDeployment == "内置客户端"? "": "帮助文档：帮助@本账号\n"}`+
        `格式一览：格式@本账号\n`+
        `${BotDeployment == "内置客户端"? "": "帮助文档与"}格式一览会在嘉宾登记个人群的回执中发送，请使用【功能】调整本次恋综开启的功能，对于关闭的功能，其帮助与格式不会出现在总览当中。\n`+
        `已将后台群所有成员登记为本场恋综管理。\n`
    if ( Backup[sign].mode != false ) reply += `\n本恋综已开启备用群功能，` + 备用后台.replace(/\n[\S\s]+/, "");
    seal.replyToSender(ctx, msg, reply);
    return;
}