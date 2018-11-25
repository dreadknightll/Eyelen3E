/**
 *
 * @author 
 *
 */
interface IGridLenPraMachine extends ILenPraMachine {
    setGridDispWidth(gWidth:number):void;
    getLenChecker():IGridLenChecker;
    inpGridCnt(gc:number); // 无需submit。
}
