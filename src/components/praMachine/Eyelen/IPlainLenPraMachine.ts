/**
 *
 * @author 
 *
 */
interface IPlainLenPraMachine extends ILenPraMachine {
    getLenChecker():ILenChecker;
    inpLen(len:number); // 无需submit。
}
