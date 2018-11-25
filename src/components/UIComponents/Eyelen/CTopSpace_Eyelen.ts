/**
 *
 * 顶部空白条。当系统为iOS时可用来让当前时间和电池信息等得以显示。 
 *
 * 使用方法：设置width —> 设置height —> setColor() —> draw() 。
 * 
 */
class CTopSpace_Eyelen extends egret.DisplayObjectContainer{
	public constructor() {
    	super();
    	this.m_space = new egret.Shape();
    	this.m_space.x = 0;
    	this.m_space.y = 0;
    	this.addChild(this.m_space);
	}
	private m_space:egret.Shape;
	private m_color:number;

	public setColor(clr:number):void
	{
    	this.m_color = clr;
	}

	public draw():void
	{
      this.m_space.graphics.clear();
    	this.m_space.graphics.beginFill(this.m_color);
    	this.m_space.graphics.drawRect(0,0,this.width,this.height);
    	this.m_space.graphics.endFill();
	}

	public redraw():void
	{
	    this.draw();
	}
}
