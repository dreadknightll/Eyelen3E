/**
 *
 * 最终得分显示对话框事件。 
 *
 */
class CFinalScoreDlgEvent extends egret.Event {
    public constructor(type: string,bulle: boolean = false,cancel: boolean = false) {
        super(type,bulle,cancel);
    }
    public static EVT_REPLAY_BTN_TAP: string = "EVT_REPLAY_BTN_TAP";

}
