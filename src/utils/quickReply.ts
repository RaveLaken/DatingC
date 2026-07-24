export function DatingUnset(ctx, msg) { seal.replyToSender(ctx, msg, `当前恋综未登记，请联系管理。`); };
export function SwitchOff(ctx, msg) { seal.replyToSender(ctx, msg, `当前恋综未开启本功能，请联系管理。`); };
export function SelfGroupUnset(ctx, msg) { seal.replyToSender(ctx, msg, `【个人群登记】恋综名称丨嘉宾名称`); };
export function SignDeficiency(ctx, msg) { seal.replyToSender(ctx, msg, `本群没有绑定恋综信息，请确认是否需要进行个人群登记或备用群绑定操作。\n【个人群登记】恋综名称丨嘉宾名称\n`); };
export function WarningMsg(ctx, msg) { seal.replyToSender(ctx, msg, `没有操作权限，个人或群组权限不足。`); };