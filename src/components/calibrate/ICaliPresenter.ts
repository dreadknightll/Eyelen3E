/**
 *  /src/components/ICaliPresenter.ts
 *  横竖校准对话框的 presenter。
 */
interface ICaliPresenter {
    setInitA1(ia1:any);
	lock():void;
    unlock():void;
	getA1(): number;
	inputA1(a1: number): void;
	undoA1(): void;
	redoA1(): void;
    recA1(): void;
}
