// src/components/winModels/Eyelen/CEyelen3EWinModelV2.ts
/**
 * 
 * 画面布局模型。用来确定画面上各大部分的位置和大小。
 * 
 */

class CEyelen3EWinModelV2 implements IEyelen3EWinModelV2 {
	public constructor() {

	}

	private m_topSpaceHeight:number = 50; // 顶端空白高度。
	private m_topHeight1:number = 55; //顶部区域收起时的顶部高度（不含顶端空白）。
	private m_topHeight2:number = 255; //顶区打开时的顶部高度（不含顶端空白）。
	private m_showTop:boolean = true; //顶区是否处于打开状态。

	private m_bottomHeight:number = 250; //底部区域的高度。
	private m_winWidth:number = 0; //场景宽度。
	private m_winHeight:number = 0; //场景高度。

	public setTopSpaceHeight(h:number) {
		this.m_topSpaceHeight = h;
	}

	public getTopSpaceHeight():number {
		return this.m_topSpaceHeight;
	}
	public getTopY():number {
		return this.getTopSpaceHeight();
	}

	public setTopHeight1(h:number):void {
		this.m_topHeight1 = h;
	}

	public getTopHeight1():number {
		return this.m_topHeight1;
	}

	public setTopHeight2(h:number):void {
		this.m_topHeight2 = h;
	}

	public getTopHeight2():number {
		return this.m_topHeight2;
	}

	public showTop():void {
		this.m_showTop = true;
	}

	public hideTop():void {
		this.m_showTop = false;
	}

	public getTopHeight():number {
		if(this.m_showTop) {
			return this.m_topHeight2;
		}
		else {
			return this.m_topHeight1;
		}
	}

	public getMidY():number {
		return this.getTopY()+this.m_topHeight1;
	}

	/*
		获取中部区域的高度。需要通过计算。部分被顶区遮挡的区域也属于中区范围。
	*/
	public getMidHeight():number {
		return this.getWinHeight()-this.getTopSpaceHeight()-this.getTopHeight1()-this.getBottomHeight();
	}

	/*
		获取中部可见区域的纵坐标。需要通过计算。
	*/
	public getMidVisibleY():number {
		return this.getTopY()+this.getTopHeight();
	}

	public getMidVisibleHeight():number {
		return this.getWinHeight()-this.getTopSpaceHeight()-this.getTopHeight()-this.getBottomHeight();
	}

	public getBottomY():number {
		return this.m_winHeight - this.getBottomHeight();
	}

	public setBottomHeight(h:number):void {
		this.m_bottomHeight = h;
	}

	public getBottomHeight():number {
		return this.m_bottomHeight;
	}

	public setWinWidth(w:number):void {
		this.m_winWidth = w;
	}

	public getWinWidth():number {
		return this.m_winWidth;
	}

	public setWinHeight(h:number) {
		this.m_winHeight = h;
	}

	public getWinHeight():number {
		return this.m_winHeight;
	}

	public rearrange():void {

	}
}
