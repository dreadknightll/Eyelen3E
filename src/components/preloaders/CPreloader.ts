/**
 *
 * @author 
 *
 */
class CPreloader implements IPreloader{
	public constructor() {
	}

	private m_resList:Array<string>;
    private m2_localResList:Array<string>;
    private m2_httpsResList:Array<string>; // 需要public因为要被timer访问。
    private m2_httpsResLeftCnt:number; // 需要public因为要被timer访问。
    private m2_localResLoadComplete:boolean = true;
    private m2_httpsResLoadComplete:boolean = true;

	private m_completeListener:Function;
    private m_completeThisObj:any;
    private m_progressListener:(cur:number,total:number)=>void;
    private m_progressThisObj:any;
    public setResList(l: Array<string>): void {
        
        // 把列表里的资源分类为本地资源和外部资源：
        this.m2_httpsResList = [];
        this.m2_localResList = [];
        var l2:Array<string> = new Array<string>();

        var i:number;
        for(i=0;i<l.length;++i) {
            if("" != l[i]) {
                // 去掉空白资源。
                if(l[i].indexOf("https") >= 0) {
                    this.m2_httpsResList.push(l[i]);
                }
                else {
                    this.m2_localResList.push(l[i]);
                }
                l2.push(l[i]);
            }
            else {
            }
        }

        this.m2_httpsResLeftCnt = this.m2_httpsResList.length;
        this.m_resList = l2;
    }

    public setCompleteListener(lsner: Function , thisObj:any): void {
        this.m_completeListener = lsner;
        this.m_completeThisObj = thisObj;
    }

    public setProgressListener(lsner: (cur:number,tot:number)=>void , thisObj:any): void {
        this.m_progressListener = lsner;
        this.m_progressThisObj = thisObj;
    }

    private genGroupName():string {
        var ret:string;

        var tmpTag:number = Math.round(1 + ((9999 - 1) * Math.random()));
        var tagStr = "";
        if(tmpTag<10)
        {
            tagStr = "000"+tmpTag;
        }
        else if(tmpTag < 100) {
            tagStr = "00" + tmpTag;
        }
        else if(tmpTag < 1000) {
            tagStr = "0" + tmpTag;
        }
        else {
            tagStr = "" + tmpTag;
        }

        ret = "RandomGroup" + (<any>(new Date())).Format("yyyyMMddhhmmss") + tagStr;
        return ret;
    }

    private m2_HTTPSStartPreloadTag:number = -1; //需要public因为要被timer访问。
    private f2_loadHTTPSRes():void {

        var tag;
        tag = this.m2_HTTPSStartPreloadTag;

        if(tag < 0 || tag > this.m2_httpsResList.length-1) {
            console.log("Err");
        }
        else {
            ++this.m2_HTTPSStartPreloadTag;

            var url:string = this.m2_httpsResList[tag];

            g_resCache[url] = new CHTTPSResStru();

            g_resCache[url].setUrl(url);

            if(url.indexOf("img") > 0 || url.indexOf("getImgCrossDomain.php") > 0) {
                g_resCache[url].setResType(RES.ResourceItem.TYPE_IMAGE);
            }
            else if(url.indexOf("pic") > 0 || url.indexOf("getPicCrossDomain.php") > 0) {
                g_resCache[url].setResType(RES.ResourceItem.TYPE_JSON);
            }

            g_resCache[url].setOnPreloadCmpl(this.onHttpsResLoadComplete , this);
            g_resCache[url].preload();

        }
    }

    public preload():void {
        // 加载本地资源

        if(this.m2_localResList.length <=0 && this.m2_httpsResList.length <= 0) {
            //资源列表为空，无需加载。
            this.m_completeListener.apply(this.m_completeThisObj);
        }

        if(this.m2_localResList.length > 0) {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceLoadProgress,this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);

            this.m2_localResLoadComplete = false;
            var tmpGroup:string[] = this.m2_localResList;
            var groupName: string = this.genGroupName();

            RES.createGroup(groupName,tmpGroup);
            RES.loadGroup(groupName);
        }
        else {
            this.m2_localResLoadComplete = true;
        }

        if(this.m2_httpsResList.length > 0) {

            this.m2_httpsResLoadComplete = false;

            this.m2_HTTPSStartPreloadTag = 0;
            var requestInterval = 500;//200; //每隔0.2秒请求一次。避免因请求过于频繁而被拦截。
            var timer = new egret.Timer(requestInterval , this.m2_httpsResList.length); 
            timer.addEventListener(egret.TimerEvent.TIMER,this.f2_loadHTTPSRes,this);
            timer.start();
        }
        else {
            this.m2_httpsResLoadComplete = true;
        }
    }

    private onResourceLoadProgress(event:RES.ResourceEvent):void {
        // 旧：仅本地资源组。新：本地资源组+https资源。

        var argArr:Array<number> = new Array<number>();
//        argArr[0] = event.itemsLoaded;
        argArr[0] = event.itemsLoaded * 2;
//        argArr[1] = event.itemsTotal;
        argArr[1] = this.m2_localResList.length*2 + this.m2_httpsResList.length*5;

        this.m_progressListener.apply(this.m_progressThisObj , argArr);
    }

    private onResourceLoadComplete(evt: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceLoadProgress,this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);


        this.m2_localResLoadComplete = true;

        if(this.m2_httpsResLoadComplete) {
            var totalResPoints:number;
            totalResPoints = this.m2_localResList.length*2 + this.m2_httpsResList.length*5;

            var argArr:Array<number> = new Array<number>();
            argArr[0] = 100;//totalResPoints;
            argArr[1] = 100;//totalResPoints;

            this.m_progressListener.apply(this.m_progressThisObj , argArr); // 将进度置为100%。
            this.m_completeListener.apply(this.m_completeThisObj);
        }

        this.m2_localResList = [];
    }

    private onHttpsResLoadComplete(obj:CHTTPSResStru): void //需要public因为要被timer访问。
    {
        // 1 res complete.

        --this.m2_httpsResLeftCnt;
        if( 0 >= this.m2_httpsResLeftCnt) {
            this.m2_httpsResLoadComplete = true;
            this.m2_HTTPSStartPreloadTag = -1;

            if(this.m2_localResLoadComplete) {
                var totalResPoints:number;
                totalResPoints = this.m2_localResList.length*2 + this.m2_httpsResList.length*5;

                var argArr:Array<number> = new Array<number>();
                argArr[0] = 100;//totalResPoints;
                argArr[1] = 100;//totalResPoints;

                this.m_progressListener.apply(this.m_progressThisObj , argArr); // 将进度置为100%。

                this.m2_httpsResList = []; //需要complete前清空。因为complete处理函数很可能需要设置本list。

                this.m_completeListener.apply(this.m_completeThisObj);
            }
            else {
                this.m2_httpsResList = [];
            }

        }
    }

    private onResourceLoadError(evt: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + evt.groupName + " has failed to load");
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceLoadProgress,this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
    }
}
