// UI/scenes/Eyelen/CCommonEyelenPraScene.ts
/**
 *
 * 通用练习场景。简单难度练习场景和困难难度练习场景都从本类派生。 
 *
 */
class CMockEyelenPraScene implements IEyelenPraScene {
	public constructor() {

	}

	public m_disabled:boolean = false;
	public m_visible:boolean = true;
	public m_lastFuncArgArr:Array<any>;

    public setLenArr(aa:Array<CLen>):void {

	}

    public startNewPra():void {

	}

	public disableScene():void {
		this.m_disabled = true;
	}

	public enableScene():void {
		this.m_disabled = false;
	}

    public getDlgLayer():IDiv {
		return null;
	}

	public show():void {
		this.m_visible = true;
	}

	public hide():void {
		this.m_visible = false;
	}

	public isVisible():boolean {
		return this.m_visible;
	}

	public disableForNoti():void {
		this.m_disabled = true;
	}

    resumeAfterNoti():void {
		this.m_disabled = false;
	}

	applyFunc(func:any , argArr:Array<any>):void {
		this.m_lastFuncArgArr = argArr;
	}

    getNotiLayer():IDiv {
		return null;
	}

	_setParentContainer(c:IUIContainer):void {
	}

    _getParentContainer(): IUIContainer {
		return null;
	}

}
