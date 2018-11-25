/**
 *  /src/components/EintValidators.ts
 * 聚集了自己写的检验器。例如：检验用户输入的文本是否符合要求。 
 */
module EintValidators {

    export class CaRatValidator {
        static validate(str:string) :boolean {
            var ret:boolean;
            ret = true;
            var tmp:number = parseFloat(str);
            if(isNaN(tmp) || tmp < 0.00001) {
                ret = false;
            }
            return ret;
        }
    }

}
