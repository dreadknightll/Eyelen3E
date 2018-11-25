class CDiv2EgretDispOCAdapter implements IDivWithEgret {
	public m_adaptee:egret.DisplayObjectContainer;
	public constructor() {
	}
	public static from(edoc:egret.DisplayObjectContainer):CDiv2EgretDispOCAdapter {
		var ret:CDiv2EgretDispOCAdapter = new CDiv2EgretDispOCAdapter();
		ret.m_adaptee = edoc;
		return ret;
	}
	public addChild(c:CDispObj2EgretDOAdapter):void {
		this.m_adaptee.addChild(c.m_adaptee);
	}

	public show():void {
		this.m_adaptee.visible = true;
	}

	public hide():void {
		this.m_adaptee.visible = false;
	}

	public toEgretDispObjContainer():egret.DisplayObjectContainer {
		return this.m_adaptee;
	}
}
