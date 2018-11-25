/**
 *
 * @author 
 *
 */
interface IPraMachine {
    startPra():void;
    rePra():void;
    clearPra(): void;

    getCurScore(): number;
    getCurElemTag(): number; // 当前元素的下标。调用next后增加。
    getCmplProgress(): number; // 当前练习完成进度。inp后增加，不受next影响。注意与上一方法的区别。
}
