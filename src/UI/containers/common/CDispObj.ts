class CDispObj implements IDispObj {
	public constructor() {
	}

	private m_visible:boolean = true;

	public show():void {
		this.m_visible = true;
	}

	public hide():void {
		this.m_visible = false;
	}

	public visible():boolean {
		return this.m_visible;
	}
};
