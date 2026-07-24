import { Bot } from "./storage";

// 获取端点
export function getEps(sign: string) {
    let eps = seal.getEndPoints();
    for ( let i = 0; i < eps.length; i++ ) {
        if ( Bot(eps[i].userId) ) {
            if ( Bot(eps[i].userId).includes(sign) ) return eps[i];
        }
    }
}

// newMessage集成简化
export function newMsg(id: string) {
    let msg = seal.newMessage()
    let group = id.indexOf("QQ-Group:");
    let private = id.indexOf("QQ:");
    if ( group != -1 ) {
        msg.messageType = 'group';
        msg.groupId = id;
    }
    if ( private != -1 ) {
        msg.messageType = 'private';
        msg.sender.userId = id;
    }
    return msg;
}

// 发送消息
export function sendMsg(sign: string, id: string, msg: string) {
    let eps = getEps(sign);
    let msg = newMsg(id);
    let ctx = seal.createTempCtx(eps, msg);
    seal.replyToSender(ctx, msg, msg);
}