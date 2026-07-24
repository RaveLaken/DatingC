export const dating = seal.ext.find('恋综');

export const tokenText = "非必须，协议端未配置http服务的token可以维持初始值或者清空设置，配置项修改后需要重载JS。";
export const nonEssential = "非必须，配置项修改后需要重载JS。";
export const configText = `\
【【【拖动右下角可以调整显示的文本框大小】】】
【【【拖动右下角可以调整显示的文本框大小】】】
本说明仅用于WebUI内方便查看配置项详细说明，修改本配置项没有任何实际意义，也不会影响运行。
修改配置项请直接覆盖原有说明文本，配置项修改后需要保存并重载JS，否则不会生效。
如果插件更新后发现本说明左下角显示可重置为初始值，即配置说明存在更新，请点击确认重置。

骰主QQ号：部分功能报错时会向骰主QQ发送提醒信息，非必须。
部署方式：各协议端api请求体结构不一致，未完全适配，有问题找牛角包报bug。
HTTP端口：对内置客户端无意义，分离部署必须输入。
控制后台：非必须，一个便于测试而留下的接口。
控制后台绑定任意恋综数据时，可以视作对应的恋综后台使用所有后台功能；删除控制后台登记的个人群数据时会强行将相关的短信、礼物、心动信数据删除。
不建议将控制后台直接用作恋综内的任何群。

以下内容在恋综登记后自动注册为<【恋综名称】配置项名称>的形式，可以对每个恋综进行独立配置。
进行恋综登记之前不会出现，登记后请刷新页面。
<【恋综】结束>指令使用后，该恋综的这部分配置项将会废弃，你可以直接清除它们。

每日结算
在设置的时间自动发送每日结算公告，如果开启了复盘功能，会将前一天的短信礼物复盘数据发送到复盘群。
逻辑上没有修改的必要。

【心动信相关】
恋综登记表格提供了发信时间的初始值录入，修改时需要在WebUI同时修改这两个配置。
文本设置与cron设置存在时间差异时，机器人会在文本设置的时间停止收信，并在cron设置的时间进行信件发送。
心动信发信时间文本 输入格式：hh:mm
心动信发信时间 输入格式：分 时 * * *

【备用群相关】
恋综登记时，备用群分配方式选择<二维码>对应<备用群数量>，<群号>对应<备用群号>。

二维码：备用群数量
在[海豹目录/data/images/]新建文件夹，以恋综名称命名；将二维码图片命名为[1.jpg]~[备用群数量.jpg]，放入该文件夹。
正确地放入之后可以在[海豹WebUI-辅助工具-资源管理]当中看到图片路径显示为[data/images/恋综名称/x.jpg]，看不到图或是路径不正确都会有问题。
需要校对实际图片数量与填入的备用群数量是否一致，建议严格校对二维码图片是否存在重复。

群号：备用群号
将全部备用的群搜索方式设置为：通过群号搜索，统计所有备用群群号之后以每行仅有一个群号的格式输入。\
`

export const Master = seal.ext.getStringConfig(dating, "骰主QQ号") == nonEssential? "": "QQ:" + seal.ext.getStringConfig(dating, "骰主QQ号");
export const ControlBackstage = "QQ-Group:" + seal.ext.getStringConfig(dating, "控制后台");
export const BotDeployment = seal.ext.getOptionConfig(dating, "部署方式");
export const port = seal.ext.getIntConfig(dating, "HTTP端口") || 0;
export const token = seal.ext.getStringConfig(dating, "HTTP Token") == tokenText? "": seal.ext.getStringConfig(dating, "HTTP Token");
export const debug = false;
export const TimeToSend = new Object;
export const BotName = seal.ext.getStringConfig(dating, "机器人自称");
export const MasterName = "骰主";