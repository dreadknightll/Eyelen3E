/**
 *
 * @author 
 *
 */
interface IUIContainer extends INotiParent,gdeint.IHidable {
    //未指定UI的数据类型，未定义横竖校准框。

    setResLoader(r:IResFetcher):any;
    setAlertDlg(ad:IAlertDlgPlugin):void;
    setConfirmDlg(cd:IConfirmDlgPlugin):void;
    setPreloaderUI(pUI:IPreloaderUI):void;

//    getDlgLayer():egret.DisplayObjectContainer;
    getDlgLayer():IDiv;

    _getResLoader():IResFetcher;
    _getConfirmDlg():IConfirmDlgPlugin;
    _getAlertDlg():IAlertDlgPlugin;
    _getPreloaderUI():IPreloaderUI;

    saveVisibleStates():void;
    getVisibleStates():Array<boolean>;

    showAlert(content: string , listener: Function):void;
    showConfirm(content:string , listener:Function):void;

    setCaRat(cr:number):void;
    getCaRat():number;
}
