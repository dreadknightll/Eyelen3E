/***********************************************************
* /src/UI/containers/common/CUIContainer.ts
* 本类实现了显示容器。用于管理练习场景以及提示框、功能对话框等插件的显示。
* 使用容器显示比起不使用能让测试更充分，代码重用更方便。
* 不转移到 libGdeint。因为本类要编写派生类才适合使用。
*
************************************************************/

class CUIContainer implements IUIContainer {
	public constructor() {
	}

    protected m_preloaderUI: IPreloaderUI; // 容器关联的资源预加载器（含界面）。场景资源要先预加载才能用读取器读取。
    protected m_resLoader:IResFetcher; // 容器关联的资源读取器。只能读取预加载成功的资源。
    private m_alertDlg:IAlertDlgPlugin;
    private m_confirmDlg: IConfirmDlgPlugin;
    private m_visibilityTempArr:Array<boolean>;

    public setResLoader(r:IResFetcher): void {
        this.m_resLoader = r;
    }
    
    public setAlertDlg(ad:IAlertDlgPlugin): void {
        this.m_alertDlg = ad;
        this.m_alertDlg._setParentContainer(this);
        this.m_alertDlg.setParent(this);
    }

    public setConfirmDlg(d:IConfirmDlgPlugin): void {
        this.m_confirmDlg = d;
        this.m_confirmDlg._setParentContainer(this);
        this.m_confirmDlg.setParent(this);
    }

	public setPreloaderUI(pui:IPreloaderUI) {
        this.m_preloaderUI = pui;
        this.m_preloaderUI._setParentContainer(this);
    }

    public _getResLoader():IResFetcher {
        return this.m_resLoader;
    }

    public _getAlertDlg():IAlertDlgPlugin {
        return this.m_alertDlg;
    }

    public _getConfirmDlg(): IConfirmDlgPlugin {
        return this.m_confirmDlg;
    }

    public _getPreloaderUI(): IPreloaderUI {
        return this.m_preloaderUI;
    }

    /*
        以数组形式返回已注入容器的插件（不包括练习场景）。
    */
    private getAllPlugins():Array<IContainerPlugin> {
        var ret:Array<IContainerPlugin> = new Array<IContainerPlugin>();
        ret[0] = this.m_alertDlg;
        ret[1] = this.m_confirmDlg;
        ret[2] = this.m_preloaderUI;
        return ret;
    }

    /*
        把容器元素visible状态入栈以便还原。
    */
    public saveVisibleStates():void {
        this.m_visibilityTempArr = new Array<boolean>();
        var plugins:Array<IContainerPlugin> = this.getAllPlugins();
        var i:number;
        for(i=0;i<plugins.length;++i) {
            this.m_visibilityTempArr[i] = plugins[i].isVisible();
        }
    }

    /*
        获取保存在栈顶的visible状态。
    */
    public getVisibleStates():Array<boolean> {
        return this.m_visibilityTempArr;
    }

    /*
        获取功能对话框显示层。本类此方法返回null，功能实现在子类进行。
    */
    public getDlgLayer():IDiv {
        return null;
    }

    public getNotiLayer():IDiv {
        return null;
    }

    /*
        显示各种提示框时需要调用以下方法把其它元素锁定和变暗。
        功能实现在子类进行。
    */
    public disableForNoti():void {
    }

    /*
        提示框关闭后需要调用以下方法恢复其它元素的状态。
    */
    public resumeAfterNoti():void {
    }

    public showAlert(content: string , listener: Function): void {
        var visibleStates = this.getVisibleStates();
        var alertDlg = this._getAlertDlg();

        if(null != listener) {
            alertDlg.setCloseListener(listener);
        }

        alertDlg.setContent(content);
        alertDlg.showDlg();
    }

    public showConfirm(content: string , listener: Function): void {

        var pc:IConfirmDlg = this._getConfirmDlg();
        pc.setCloseListener(listener);
        pc._setContent(content);
        this._getConfirmDlg().showDlg();

    }

    /*
        设置容器的横竖校准系数。横竖校准后把系数填入容器即可，无需在场景和提示框等多处重复填入。
    */
    public setCaRat(cr: number): void {
    }

    public getCaRat(): number {
        return 1;
    }

    public isVisible():boolean {
        return true;
    }

    /*
        显示容器。
    */
    public show():void {
        var parr:Array<IContainerPlugin> = this.getAllPlugins();
        var i;
        for(i=0;i<parr.length;++i) {
            if(this.m_visibilityTempArr && this.m_visibilityTempArr[i]) {
                parr[i].show();
            }
            else {
                parr[i].hide();
            }

        }
    }
    
    /*
        隐藏容器。
    */
    public hide():void {
        this.saveVisibleStates();

        var parr:Array<IContainerPlugin> = this.getAllPlugins();
        var i;
        for(i=0;i<parr.length;++i) {
            parr[i].hide();
        }
    }

    /*
        让容器执行命令。
    */
    public applyFunc(func:any , argArr:Array<any>):void {
    }
}

