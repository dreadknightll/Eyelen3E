class CMockAlertDlg implements IAlertDlg,IContainerPlugin
 {
	public constructor() {
	}

    private m_parent:INotiParent;
    private m_parentContainer:IUIContainer;
	public m_strOnShow:string;
	private m_visible:boolean = false;

    public setParent(p:INotiParent) {
        this.m_parent = p;
    }


    public _setParentContainer(pc:IUIContainer):void {
        this.m_parentContainer = pc;
    }

    public _getParentContainer(): IUIContainer {
        return this.m_parentContainer;
    }

    public getParent():INotiParent {
        return this.m_parent;
    }

    public setCloseListener(func:Function):void {
    }

    public setContent(con:string):void {
		this.m_strOnShow = con;
	}
    public showDlg():void {
//        this.getParent().getNotiLayer().addChild(CDispObj2EgretDOAdapter.from(this));
//        this.getParent().getNotiLayer().show();
        this.m_visible = true;
        this.getParent().disableForNoti();
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

	public setSceneRect(x:number , y:number , wid:number , hei:number):void 
    {
        //设置父场景大小和坐标偏移量，以便确定本框的显示位置。
//        this.x = x + (wid-300)/2;
//        this.y = y + (hei-300)/5*2;
    }


}