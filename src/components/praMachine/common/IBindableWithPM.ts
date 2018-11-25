/**
 *
 * @author 
 *
 */
interface IBindableWithPM {
//    syncWithPM(): void; futiled!
    bindPM(pm:IPraMachine):void;
    unbindPM():void;
    updateFromPM():void;
    clearTempData():void // Clear the data that stored temply but not submitted to the PM.
    submitToPM(): void;
}
