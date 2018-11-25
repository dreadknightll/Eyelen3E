/**
 *
 * @author 
 *
 */
interface IPraPresenter extends IBindableWithPM {
//    rePra(): void; // Clear progress and score, keep angles.
//    clearPra():void; // Clear angles,progress and score. 

    fillScore(s:number): void; // Let PM to calculate and fill in via this func.
    getScore(): number; // Get the score value shown on the screen.

    fillProgress(p:number): void;
    getProgress(): number; // Get the progress value shown on the screen.

    setWinWidth(ww: number): void;
    setWinHeight(wh: number): void;
}
