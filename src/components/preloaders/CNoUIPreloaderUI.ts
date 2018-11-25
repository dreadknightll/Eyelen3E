class CNoUIPreloaderUI implements IPreloaderUI // Also act as the parent class of other preloaderUIs.
{
	public constructor() {
        this.m_taskList = new Array<gdeint.CPreloadTask>();
        this.m_preloader = new CPreloader();
	}

    public setPreloader(preloader:IPreloader):void {
        // Preloader 一次只处理一个 task。总进度在本类确定。
	     this.m_preloader = preloader;

	}

    public setCompleteListener(listener:(taskName:string)=>void,thisObj:any):void // Called when total proportion reaches 100 or all tasks are added and completed.
	{
        this.m_cmplListener = listener;
        this.m_cmplThisObj = thisObj;

	}

    public setNextActListener(listiner:Function , thisObj:any) {
    }

    public addTask(task: gdeint.CPreloadTask):void {
        this.m_taskList.push(task);
	}

    public setNoTaskLeft(ntl:boolean) // Set whether all tasks are added.
	{
        this.m_noTaskLeft = ntl;
	}

    public _setParentContainer(c:IUIContainer) {
        this.m_parentContainer = c;
	}

    public _getParentContainer():IUIContainer {
		return this.m_parentContainer;
	}

    public showUI():void {
    }

    public hideUI():void {
    }

    public setSceneRect(x:number , y:number , width:number , height:number):void {        
    }

    public startPreload():void {
        this.preloadCurTask();
	}

    private preloadCurTask(): void {
        var curTask:gdeint.CPreloadTask;
        curTask = this.m_taskList[this.m_curTaskTag];
        if(!curTask) {
            return;
        }

        var resNameList:Array<string> = new Array<string>();
        var i;
        for(i = 0;i < curTask.m_resList.length;++i) {
            resNameList[i] = curTask.m_resList[i].m_resName;
        }

        this.m_preloader.setResList(resNameList);
        this.m_preloader.setCompleteListener(this.onOneTaskComplete , this);
        this.m_preloader.preload();
    }

    public setProgressListener(progressListener:Function,thisObj:any):void {
        this.m_upperProgressListener = progressListener;
        this.m_upperProgressThisObj = thisObj;

        if(!this.m_upperProgressListener) {
            window.alert("Null!!");
        }

        this.m_preloader.setProgressListener(this.onProgressListener,this);
    }

    private onProgressListener(cur:number , tot:number) {
        // cur:当前task完成进度。tot：当前task总长。
        // 显示的结果：所有task完成的总百分比。
        var curTask:gdeint.CPreloadTask = this.m_taskList[this.m_curTaskTag];
        var oldTaskProportions:number = 0;
        var i:number;
        for(i=0;i<=this.m_curTaskTag-1;++i) {
            oldTaskProportions += this.m_taskList[i].m_proportion;
        }

        this.m_proporFinished = oldTaskProportions + curTask.m_proportion * cur / tot;
        if(this.m_proporFinished>100)
        {
            this.m_proporFinished = 100;
        }

        var argArr:Array<number> = new Array<number>();
        argArr[0] = this.m_proporFinished;
        argArr[1] = 100;

        this.m_upperProgressListener.apply(this.m_upperProgressThisObj , argArr);

    }

    private onOneTaskComplete():void {
        ++this.m_curTaskTag;
        if(this.m_curTaskTag <= this.m_taskList.length-1) {
            this.preloadCurTask();
        }
        else {
            if(this.m_proporFinished >= 100 || this.m_noTaskLeft) {
                //Don't clear progress here. Additial tasks may be added and go on.
                //如果预加载任务列表已全部完成但不满足以上两个条件，也不作为加载任务完成，而是等待继续添加新任务。
                this.m_cmplListener.apply(this.m_cmplThisObj);
            }
        }
    }

    public clearProgress(): void {
        this.m_taskList = [];
        this.m_proporFinished = 0;
        this.m_curTaskTag = 0;
    }

    private m_preloader:IPreloader;
    private m_cmplListener:(string)=>void;
    private m_cmplThisObj:any;
    private m_upperProgressListener:Function;
    private m_upperProgressThisObj;
    private m_parentContainer:IUIContainer;
    private m_taskList:Array<gdeint.CPreloadTask>;
    private m_noTaskLeft:boolean = false; // 是否所有任务均已添加。影响完成事件的触发等。
    private m_curTaskTag:number = 0;
    public m_proporFinished:number = 0; // Set it to public in order to perform as base class!

    public show():void {
        this.showUI();
    }

    public hide():void {
        this.hideUI();
    }

    public isVisible():boolean {
        return false;
    }
}