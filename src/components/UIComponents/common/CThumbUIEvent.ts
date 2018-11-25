class CThumbUIEvent extends egret.Event {
	public constructor(type: string,bulle: boolean = false,cancel: boolean = false) {
		super(type,bulle,cancel);
	}
	public static EVT_THUMB_TAP: string = "EVT_THUMB_TAP";
	public m_tchX:number = 0;
	public m_tchY:number = 0;
}