/**
 *
 * @author 
 *
 */
interface IAlertDlg extends INotification {
    setCloseListener(func:Function);
    setContent(content:string);
    showDlg():void;

    setSceneRect(x:number , y:number , wid:number , hei:number); //设置父场景大小和坐标偏移量，以便确定本框的显示位置。
}
