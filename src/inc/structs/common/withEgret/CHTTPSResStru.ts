class CHTTPSResStru {
// 一个对象对应一个文件。
	private m_url:string;
	private m_resType:string; //Eg.RES.ResourceItem.TYPE_JSON
	public m_resCache:any;
	public m_isInCache:boolean = true;

	private m_onPreloadCmplFunc = null;
	private m_onPreloadCmplThisObj = null;

	public constructor() {

	}

	public setUrl(url:string): void {
		this.m_url = url;
	}

	public getUrl():string {
		return this.m_url;
	}

	public setResType(t:string): void {
		this.m_resType = t;
	}

	public getResType():string {
		return this.m_resType;
	}

	public setOnPreloadCmpl(opc:Function , thisObj:any) {
		// function opc(obj:CHTTPSResStru):void
		this.m_onPreloadCmplFunc = opc;
		this.m_onPreloadCmplThisObj = thisObj;
	}

	public preload():void {
		this.m_isInCache = false;
		RES.getResByUrl(this.m_url , this.onResDownloaded , this , this.m_resType);
	}

	private onResDownloaded(event:any):void {
		this.m_resCache = event;
		if(RES.ResourceItem.TYPE_JSON == this.m_resType)
		{
			console.log(event);
		}
		this.m_isInCache = true; //设置标志表明已经加载完成。
		this.m_onPreloadCmplFunc.apply(this.m_onPreloadCmplThisObj,[this]);
	}

}