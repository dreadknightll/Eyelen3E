/**
 *
 * @author 
 *
 */
interface IEyelenPraContainer extends IUIContainer{
    setPraScene(ps:IEyelenPraScene):void;
    setCaliDlg(caliDlg:ICaliDlg):void;
    setRenderFilter(rf:IEyelen3ERenderFilter):void;

    setCaRat(cr:number):void;
    getCaRat():number;
    _getPraScene():IEyelenPraScene;
    _getCaliDlg():ICaliDlg;
    _getRenderFilter(): IEyelen3ERenderFilter;

    showCaliDlg(listener:(dlgResult:boolean)=>void):void;
    
    startNewPra():void;
    _quitPra():void;
    setQuitHandler(func:Function);
}
