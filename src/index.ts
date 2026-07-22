import { varietySolve } from "./commands/variety";

function main() {

    // 恋综扩展
    let variety = seal.ext.find('恋综');
    if ( !variety ) {
        variety = seal.ext.new('恋综', '繁星碑刻', '2.3.0');
        seal.ext.register(variety);
    }

    // 恋综登记指令
    const cmdVariety = seal.ext.newCmdItemInfo();
    cmdVariety.name = "恋综";
    cmdVariety.disabledInPrivate = true;
    cmdVariety.allowDelegate = true;
    cmdVariety.solve = (ctx, msg, cmdArgs) => {
        return varietySolve(ctx, msg, cmdArgs);
    };

    variety.cmdMap['恋综'] = cmdVariety;
    variety.cmdMap['测试'] = cmdVariety;

}

main();
