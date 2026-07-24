import { datingSolve } from "./commands/dating";
import { nonEssential, tokenText, configText } from "./contants/config";

function main() {

    // 恋综扩展注册
    let dating = seal.ext.find('恋综测试版');
    if ( !dating ) {
        dating = seal.ext.new('恋综测试版', '繁星碑刻', '3.0.0');
        seal.ext.register(dating);
    }

    // 配置项注册
    // seal.ext.registerOptionConfig(dating, "DEBUG", "OFF", ["OFF", "ON"]);
    seal.ext.registerStringConfig(dating, "骰主QQ号", nonEssential);
    seal.ext.registerStringConfig(dating, "控制后台", nonEssential);
    seal.ext.registerOptionConfig(dating, "部署方式", "分离部署/LLonebot", ["分离部署/LLonebot", "分离部署/Lagrange", "分离部署/NapcatQQ", "内置客户端"]);
    seal.ext.registerIntConfig(dating, "HTTP端口", "3000");
    seal.ext.registerStringConfig(dating, "HTTP Token", tokenText);
    seal.ext.registerStringConfig(dating, "机器人自称", "机器人");
    seal.ext.registerStringConfig(dating, "恋综插件配置说明", configText)

    // 恋综登记指令
    const cmdDating = seal.ext.newCmdItemInfo();
    cmdDating.name = "恋综";
    cmdDating.disabledInPrivate = true;
    cmdDating.allowDelegate = true;
    cmdDating.solve(ctx, msg, cmdArgs) => {
        return datingSolve(ctx, msg, cmdArgs);
    };

    dating.cmdMap['恋综'] = cmdDating;
    dating.cmdMap['测试'] = cmdDating;

}

main();
