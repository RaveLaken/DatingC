import { dating } from "../storage/dataManager";
import { BotDeployment } from "../constants/config";

// 数据写入

// **Bot数据绑定
export function setBot(sign: string, key: string) {
    let s = JSON.parse(dating.storageGet("Bot") || "{}");
    if ( !s[key] ) {
        s[key] = [sign];
    }
    if ( !s[key].includes(sign) ) {
        s[key].push(sign);
    }
    return dating.storageSet("Bot", JSON.stringify(s));
};

// **恋综数据绑定
export function setSign(sign: string, key: string) { 
    let s = JSON.parse(dating.storageGet("Sign") ||  "{}" );
    s[key] = sign;
    return dating.storageSet("Sign", JSON.stringify(s)); 
};

// **恋综数据解绑
export function delSign(key: string) { 
    let s = JSON.parse(dating.storageGet("Sign") ||  "{}" );
    delete s[key];
    return dating.storageSet("Sign", JSON.stringify(s)); 
};

// **恋综写入
export function setDating(sign, key: string, val) { 
    let s = JSON.parse(dating.storageGet("Dating") ||  "{}" );
    s[sign][key] = val;
    return dating.storageSet("Dating", JSON.stringify(s)); 
};

// **开关写入
export function setSwitch(sign: string, key: string, swi: boolean) { 
    let s = JSON.parse(dating.storageGet("Switch") ||  "{}" );
    s[sign][key] = swi;
    return dating.storageSet("Switch", JSON.stringify(s)); 
};

// **备用群写入
export function setBackup(sign: string, key: string, val) { 
    let s = JSON.parse(dating.storageGet("Backup") ||  "{}" );
    s[sign][key] = val;
    return dating.storageSet("Backup", JSON.stringify(s)); 
};

// **复盘群写入
export function setReplay(sign: string, key: string, val) {
    let s = JSON.parse(dating.storageGet("Replay") || "{}");
    s[sign][key] = val;
    return dating.storageSet("Replay", JSON.stringify(s));
}

// **日志写入
export function setLog(sign: string, key: string, val) {
    let s = JSON.parse(dating.storageGet("Log") || "{}");
    s[sign][key] = val;
    return dating.storageSet("Log", JSON.stringify(s));
}

// **个人群写入
export function setSelfGroup(sign: string, key: string, val) {
    let s = JSON.parse(dating.storageGet("SelfGroup") || "{}");
    s[sign][key] = val;
    return dating.storageSet("SelfGroup", JSON.stringify(s));
}

// **名称写入
export function setName(sign: string, key: string, val) {
    let s = JSON.parse(dating.storageGet("Name") || "{}");
    s[sign][key] = val;
    return dating.storageSet("Name", JSON.stringify(s));
}

// **日程写入
export function setSchedule(sign: string, key: string, val) {
    let s = JSON.parse(dating.storageGet("Schedule") || "{}");
    s[sign][key] = val;
    return dating.storageSet("Schedule", JSON.stringify(s));
}

// **信息写入
export function setInfo(sign: string, key: string, val) {
    let s = JSON.parse(dating.storageGet("Info") || "{}");
    s[sign][key] = val;
    return dating.storageSet("Info", JSON.stringify(s));
}

// **心愿写入
export function setHope(sign: string, key: string, val) {
    let s = JSON.parse(dating.storageGet("Hope") || "{}");
    s[sign][key] = val;
    return dating.storageSet("Hope", JSON.stringify(s));
}

// **数据写入
export function setData(sign: string, key: string, val) {
    let s = JSON.parse(dating.storageGet("Data") || "{}");
    s[sign][key] = val;
    return dating.storageSet("Data", JSON.stringify(s));
}

// **物品写入
export function setItem(sign: string, key: string, val) {
    let s = JSON.parse(dating.storageGet("Item") || "{}");
    s[sign][key] = val;
    return dating.storageSet("Item", JSON.stringify(s));
}

// **装备写入
export function setEquip(sign: string, key: string, val) {
    let s = JSON.parse(dating.storageGet("Equip") || "{}");
    s[sign][key] = val;
    return dating.storageSet("Equip", JSON.stringify(s));
}

// **物品说明写入
export function setDescription(sign: string, key: string, val) {
    let s = JSON.parse(dating.storageGet("Description") || "{}");
    s[sign][key] = val;
    return dating.storageSet("Description", JSON.stringify(s));
}

// **上传列表写入
export function setList(sign: string, key: string, val) {
    let s = JSON.parse(dating.storageGet("List") || "{}");
    s[sign][key] = val;
    return dating.storageSet("List", JSON.stringify(s));
}

// **商店写入
export function setShop(sign: string, key: string, val) {
    let s = JSON.parse(dating.storageGet("Shop") || "{}");
    s[sign][key] = val;
    return dating.storageSet("Shop", JSON.stringify(s));
}

// **抽卡写入
export function setLottery(sign: string, key: string, val) {
    let s = JSON.parse(dating.storageGet("Lottery") || "{}");
    s[sign][key] = val;
    return dating.storageSet("Lottery", JSON.stringify(s));
}

// **踩点写入
export function setSurvey(sign: string, key: string, val) {
    let s = JSON.parse(dating.storageGet("Survey") || "{}");
    s[sign][key] = val;
    return dating.storageSet("Survey", JSON.stringify(s));
}

// **规则写入
export function setRule(sign: string, key: string, val) {
    let s = JSON.parse(dating.storageGet("Rule") || "{}");
    s[sign][key] = val;
    return dating.storageSet("Rule", JSON.stringify(s));
}

// **关系线写入
export function setKinship(sign: string, key: string, val) {
    let s = JSON.parse(dating.storageGet("Kinship") || "{}");
    s[sign][key] = val;
    return dating.storageSet("Kinship", JSON.stringify(s));
}

// **短信写入
export function setSMS(sign: string, key: string, val) {
    let s = JSON.parse(dating.storageGet("SMS") || "{}");
    s[sign][key] = val;
    return dating.storageSet("SMS", JSON.stringify(s));
}

// **礼物写入
export function setGift(sign: string, key: string, val) {
    let s = JSON.parse(dating.storageGet("Gift") || "{}");
    s[sign][key] = val;
    return dating.storageSet("Gift", JSON.stringify(s));
}

// **心动信写入
export function setLetter(sign: string, key: string, val) {
    let s = JSON.parse(dating.storageGet("Letter") || "{}");
    s[sign][key] = val;
    return dating.storageSet("Letter", JSON.stringify(s));
}

// **留言板写入
export function setBoard(sign: string, key: string, val) {
    let s = JSON.parse(dating.storageGet("Board") || "{}");
    s[sign][key] = val;
    return dating.storageSet("Board", JSON.stringify(s));
}

// **点歌台写入
export function setSong(sign: string, key: string, val) {
    let s = JSON.parse(dating.storageGet("Song") || "{}");
    s[sign][key] = val;
    return dating.storageSet("Song", JSON.stringify(s));
}

// **清空数据
export function removeSign(sign) {
    const keys = [
        "Dating", "Switch", "Backup",
        "Replay", "Log", "SelfGroup", "Name", "Schedule",
        "Info", "Hope", "Data", "Item", "Equip",
        "Description", "List", "Shop", "Lottery", "Survey",
        "Rule", "Kinship", "SMS", "Gift", "Letter",
        "Board", "Song"
    ];
    for (const key of keys) {
        let s = JSON.parse(dating.storageGet(key) || "{}");
        delete s[sign];
        dating.storageSet(key, JSON.stringify(s));
    }
    let Bot = Bot();
    Bot[ctx.endPoint.userId] = Bot[ctx.endPoint.userId].filter( x => x != sign );
    dating.storageSet("Bot", JSON.stringify(Bot));
    return;
}

// 数据读取
export function Testmode() { return JSON.parse(dating.storageGet("Testmode") ||  "false" ); };

export function Dating(sign) { 
    let g = JSON.parse(dating.storageGet("Bot") ||  "{}" );
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};

export function Bot(val) { 
    let g = JSON.parse(dating.storageGet("Bot") || "{}");
    if (!val) return g;
    else {
        if (!g[val]) return false;
        else return g[val];
    }
};

export function Sign(val) { 
    let g = JSON.parse(dating.storageGet("Sign") ||  "{}" );
    if (!val) return g;
    else {
        if (!g[val]) return false;
        else return g[val];
    }
};

export function Rule(sign) { 
    let g = JSON.parse(dating.storageGet("Rule") ||  "{}" );
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};
export function Switch(sign) { 
    let g = JSON.parse(dating.storageGet("Switch") || "{}");
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};

export function SelfGroup(sign) { 
    let g = JSON.parse(dating.storageGet("SelfGroup") || "{}");
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};

export function Name(sign) { 
    let g = JSON.parse(dating.storageGet("Name") || "{}");
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};

export function Description(sign) { 
    let g = JSON.parse(dating.storageGet("Description") || "{}");
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};

export function Data(sign) { 
    let g = JSON.parse(dating.storageGet("Data") || "{}");
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};

export function Item(sign) { 
    let g = JSON.parse(dating.storageGet("Item") || "{}");
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};

export function Equip(sign) { 
    let g = JSON.parse(dating.storageGet("Equip") || "{}");
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};

export function Shop(sign) { 
    let g = JSON.parse(dating.storageGet("Shop") || "{}");
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};

export function Lottery(sign) { 
    let g = JSON.parse(dating.storageGet("Lottery") || "{}");
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};

export function Survey(sign) { 
    let g = JSON.parse(dating.storageGet("Survey") || "{}");
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};

export function Kinship(sign) { 
    let g = JSON.parse(dating.storageGet("Kinship") || "{}");
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};

export function SMS(sign) { 
    let g = JSON.parse(dating.storageGet("SMS") || "{}");
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};

export function Gift(sign) { 
    let g = JSON.parse(dating.storageGet("Gift") || "{}");
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};

export function Letter(sign) { 
    let g = JSON.parse(dating.storageGet("Letter") || "{}");
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};

export function sendTime(sign) { 
    let g = JSON.parse(dating.storageGet("Letter") || "{}");
    if (!sign) throw new Error(`Invalid parameter`); return;
    else {
        if (!g[sign]) throw new Error(`can not find dating data for ${sign}`); return;
        else return g[sign].send;
    }
};

export function Board(sign) { 
    let g = JSON.parse(dating.storageGet("Board") || "{}");
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};

export function Song(sign) { 
    let g = JSON.parse(dating.storageGet("Song") || "{}");
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};

export function GroupStat(sign) { 
    let g = JSON.parse(dating.storageGet("GroupStat") || "{}");
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};

export function Schedule(sign) { 
    let g = JSON.parse(dating.storageGet("Schedule") || "{}");
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};

export function Info(sign) { 
    let g = JSON.parse(dating.storageGet("Info") || "{}");
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};

export function Hope(sign) { 
    let g = JSON.parse(dating.storageGet("Hope") || "{}");
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};

export function Backup(sign) { 
    let g = JSON.parse(dating.storageGet("Backup") || "{}");
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};

export function Replay(sign) { 
    let g = JSON.parse(dating.storageGet("Replay") || "{}");
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};

export function Log(sign) { 
    let g = JSON.parse(dating.storageGet("Log") || "{}");
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};

export function List(sign) { 
    let g = JSON.parse(dating.storageGet("List") || "{}");
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};

export function Auction(sign) { 
    let g = JSON.parse(dating.storageGet("Auction") || "{}");
    if (!sign) return g;
    else {
        if (!g[sign]) return false;
        else return g[sign];
    }
};