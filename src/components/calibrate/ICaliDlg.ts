/**
 *
 * @author 
 *
 */
interface ICaliDlg extends gdeint.IHidable {
    _setCloseListener(closeListener:(boolean)=>void):void;
    _closeDlg():void;
    setSceneRect(x:number , y:number , wid:number , hei:number); //设置父场景大小和坐标偏移量，以便确定本框的显示位置。
}
