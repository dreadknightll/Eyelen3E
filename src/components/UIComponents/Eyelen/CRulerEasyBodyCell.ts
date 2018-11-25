/**
 *
 * 简单难度尺带的格子。
 *
 */
class CRulerEasyBodyCell extends egret.Bitmap {
    public m_tag:number;
    private m_checked:boolean;
    public constructor() {
        super();
        this.m_tag = -1;
        this.m_checked = false;
	}

	/*
	 * 选中。
	 */ 
	public check():void {
        this.m_checked = true;
	}

	/*
	 * 取消选中。
	 */ 
	public uncheck():void {
	    this.m_checked = false;
	}

	/*
	 * 判断是否选中。
	 */ 
	public checked():boolean {
        return this.m_checked;
	}
}
