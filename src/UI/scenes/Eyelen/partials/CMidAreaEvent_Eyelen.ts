/**
 *
 * @author 
 *
 */
class CMidAreaEvent_Eyelen extends egret.Event {
    public constructor(type: string,bulle: boolean = false,cancel: boolean = false) {
        super(type,bulle,cancel);
    }

    public static EVT_IMG_DRAGMOVE: string = "EVT_IMG_DRAGMOVE";
    public static EVT_IMG_DRAGEND: string = "EVT_IMG_DRAGEND";
}
