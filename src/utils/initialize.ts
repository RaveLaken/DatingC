import {
    setSwitch,
    setBackup,
    setLog,
    setDescription,
    setShop,
    setLottery,
    setSurvey,
    setKinship,
    setSMS,
    setGift,
    setLetter,
    setBoard,
    setSong,
    setGroupStat
} from "./storage";
import { BotDeployment } from "../constants/configs";

// 开关初始化
export function newSwitch(sign: string, setTime: string) {
    setSwitch(sign, "_", {});
    setSwitch(sign, "Kinship", true); 
    setSwitch(sign, "Letter", setTime? true: false); 
    setSwitch(sign, "Board", true);
    setSwitch(sign, "Song", true); 
    setSwitch(sign, "SMS", true); 
    setSwitch(sign, "Gift", true);
    setSwitch(sign, "Figure", true); 
    setSwitch(sign, "Item", true); 
    setSwitch(sign, "Equip", false);
    setSwitch(sign, "Shop", true); 
    setSwitch(sign, "Lottery", true); 
    setSwitch(sign, "Survey", true);
    setSwitch(sign, "Group", true); 
    setSwitch(sign, "Meet", true); 
    setSwitch(sign, "Phone", true);
    setSwitch(sign, "Chat", true); 
    setSwitch(sign, "Hope", true); 
    setSwitch(sign, "Info", true);
    setSwitch(sign, "Replay", BotDeployment == "内置客户端"? false: true); 
    setSwitch(sign, "Refuse", true); 
    setSwitch(sign, "Defeat", false);
};

// 备用群初始化
export function newBackup(sign: string, backupMode: string) {
    setBackup(sign, "_", {});
    setBackup(sign, "mode", backupMode);
    setBackup(sign, "array", new Array);
    setBackup(sign, "used", new Object);
    setBackup(sign, "amount", 0);
    setBackup(sign, "left", 0);
    setBackup(sign, "swi", true);
};

// 日志初始化
export function newLog(sign: string) {
    setLog(sign, "_", {});
    setLog(sign, "private", new Object);
    setLog(sign, "public", new Array);
}

// 物品说明初始化
export function newDescription(sign: string) {
    setDescription(sign, "_", {});
    setDescription(sign, "item", new Array);
    setDescription(sign, "form", new Array);
    setDescription(sign, "part", new Array);
    setDescription(sign, "effect", new Array);
    setDescription(sign, "desc", new Array);
}

// 商店初始化
export function newShop(sign: string) {
    setShop(sign, "_", {});
    setShop(sign, "item", new Array);
    setShop(sign, "amount", new Array);
    setShop(sign, "currency", new Array);
    setShop(sign, "price", new Array);
    setShop(sign, "start", "");
    setShop(sign, "end", "");
}

// 抽卡初始化
export function newLottery(sign: string) {
    setLottery(sign, "_", {});
    setLottery(sign, "limited", 5);
    setLottery(sign, "putback", false);
    setLottery(sign, "gachaName", new Array);
    setLottery(sign, "gachaPool", new Array);
    setLottery(sign, "record", {});
}

// 踩点初始化
export function newSurvey(sign: string) {
    setSurvey(sign, "_", {});
    setSurvey(sign, "limited", 5);
    setSurvey(sign, "putback", false);
    setSurvey(sign, "placeName", new Array);
    setSurvey(sign, "placePool", new Array);
    setSurvey(sign, "record", {});
}

// 关系线初始化
export function newKinship(sign: string, start: string) {
    setKinship(sign, "_", {});
    setKinship(sign, "deadline", start.slice(4,6) + "/" + start.slice(6,8) +" 00:00");
    setKinship(sign, "limited", 100);
    setKinship(sign, "storage", {});
    setKinship(sign, "msglist", {});
}

// 短信初始化
export function newSMS(sign: string) {
    setSMS(sign, "_", {});
    setSMS(sign, "notice", 5);
    setSMS(sign, "limited", 100);
    setSMS(sign, "storage", {});
}

// 礼物初始化
export function newGift(sign: string) {
    setGift(sign, "_", {});
    setGift(sign, "notice", 1);
    setGift(sign, "limited", 100);
    setGift(sign, "storage", {});
}

// 心动信初始化
export function newLetter(sign: string, setTime: string, limited: number) {
    setLetter(sign, "_", {});
    setLetter(sign, "from", {});
    setLetter(sign, "to", {});
    setLetter(sign, "count", {});
    setLetter(sign, "limited", limited); 
    setLetter(sign, "send", setTime);
}

// 留言板初始化
export function newBoard(sign: string) {
    setBoard(sign, "_", {});
    setBoard(sign, "limited", 100);
    setBoard(sign, "count", {});
}

// 点歌台初始化
export function newSong(sign: string) {
    setSong(sign, "_", {});
    setSong(sign, "frequency", 300);
    setSong(sign, "memory", {});
}

// 群统计初始化
export function newGroupStat(sign: string) {
    setGroupStat(sign, "_", {});
    setGroupStat(sign, "meet", {});
    setGroupStat(sign, "phone", {});
    setGroupStat(sign, "chat", {});
    setGroupStat(sign, "hope", {});
}