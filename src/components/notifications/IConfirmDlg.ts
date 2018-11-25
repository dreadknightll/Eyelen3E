/**
 *
 * @author 
 *
 */
interface IConfirmDlg extends INotification {
    setCloseListener(func:Function);
    _setContent(content:string);
    showDlg():void;
    getResult(): boolean;

    setSceneRect(x:number , y:number , wid:number , hei:number); //设置父场景大小和坐标偏移量，以便确定确认框的显示位置。
}
