/**
 *
 * @author 
 *
 */
class CConfirmPanelEvent extends egret.Event {
    public constructor(type: string,bulle: boolean = false,cancel: boolean = false) {
        super(type,bulle,cancel);
    }
    public static EVT_CLOSE: string = "EVT_CLOSE";
}
