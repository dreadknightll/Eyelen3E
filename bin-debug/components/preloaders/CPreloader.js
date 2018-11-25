var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var CPreloader = (function () {
    function CPreloader() {
        this.m2_localResLoadComplete = true;
        this.m2_httpsResLoadComplete = true;
        this.m2_HTTPSStartPreloadTag = -1; //需要public因为要被timer访问。
    }
    CPreloader.prototype.setResList = function (l) {
        // 把列表里的资源分类为本地资源和外部资源：
        this.m2_httpsResList = [];
        this.m2_localResList = [];
        var l2 = new Array();
        var i;
        for (i = 0; i < l.length; ++i) {
            if ("" != l[i]) {
                // 去掉空白资源。
                if (l[i].indexOf("https") >= 0) {
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
    };
    CPreloader.prototype.setCompleteListener = function (lsner, thisObj) {
        this.m_completeListener = lsner;
        this.m_completeThisObj = thisObj;
    };
    CPreloader.prototype.setProgressListener = function (lsner, thisObj) {
        this.m_progressListener = lsner;
        this.m_progressThisObj = thisObj;
    };
    CPreloader.prototype.genGroupName = function () {
        var ret;
        var tmpTag = Math.round(1 + ((9999 - 1) * Math.random()));
        var tagStr = "";
        if (tmpTag < 10) {
            tagStr = "000" + tmpTag;
        }
        else if (tmpTag < 100) {
            tagStr = "00" + tmpTag;
        }
        else if (tmpTag < 1000) {
            tagStr = "0" + tmpTag;
        }
        else {
            tagStr = "" + tmpTag;
        }
        ret = "RandomGroup" + (new Date()).Format("yyyyMMddhhmmss") + tagStr;
        return ret;
    };
    CPreloader.prototype.f2_loadHTTPSRes = function () {
        var tag;
        tag = this.m2_HTTPSStartPreloadTag;
        if (tag < 0 || tag > this.m2_httpsResList.length - 1) {
            console.log("Err");
        }
        else {
            ++this.m2_HTTPSStartPreloadTag;
            var url = this.m2_httpsResList[tag];
            g_resCache[url] = new CHTTPSResStru();
            g_resCache[url].setUrl(url);
            if (url.indexOf("img") > 0 || url.indexOf("getImgCrossDomain.php") > 0) {
                g_resCache[url].setResType(RES.ResourceItem.TYPE_IMAGE);
            }
            else if (url.indexOf("pic") > 0 || url.indexOf("getPicCrossDomain.php") > 0) {
                g_resCache[url].setResType(RES.ResourceItem.TYPE_JSON);
            }
            g_resCache[url].setOnPreloadCmpl(this.onHttpsResLoadComplete, this);
            g_resCache[url].preload();
        }
    };
    CPreloader.prototype.preload = function () {
        // 加载本地资源
        if (this.m2_localResList.length <= 0 && this.m2_httpsResList.length <= 0) {
            //资源列表为空，无需加载。
            this.m_completeListener.apply(this.m_completeThisObj);
        }
        if (this.m2_localResList.length > 0) {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceLoadProgress, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            this.m2_localResLoadComplete = false;
            var tmpGroup = this.m2_localResList;
            var groupName = this.genGroupName();
            RES.createGroup(groupName, tmpGroup);
            RES.loadGroup(groupName);
        }
        else {
            this.m2_localResLoadComplete = true;
        }
        if (this.m2_httpsResList.length > 0) {
            this.m2_httpsResLoadComplete = false;
            this.m2_HTTPSStartPreloadTag = 0;
            var requestInterval = 500; //200; //每隔0.2秒请求一次。避免因请求过于频繁而被拦截。
            var timer = new egret.Timer(requestInterval, this.m2_httpsResList.length);
            timer.addEventListener(egret.TimerEvent.TIMER, this.f2_loadHTTPSRes, this);
            timer.start();
        }
        else {
            this.m2_httpsResLoadComplete = true;
        }
    };
    CPreloader.prototype.onResourceLoadProgress = function (event) {
        // 旧：仅本地资源组。新：本地资源组+https资源。
        var argArr = new Array();
        //        argArr[0] = event.itemsLoaded;
        argArr[0] = event.itemsLoaded * 2;
        //        argArr[1] = event.itemsTotal;
        argArr[1] = this.m2_localResList.length * 2 + this.m2_httpsResList.length * 5;
        this.m_progressListener.apply(this.m_progressThisObj, argArr);
    };
    CPreloader.prototype.onResourceLoadComplete = function (evt) {
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceLoadProgress, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        this.m2_localResLoadComplete = true;
        if (this.m2_httpsResLoadComplete) {
            var totalResPoints;
            totalResPoints = this.m2_localResList.length * 2 + this.m2_httpsResList.length * 5;
            var argArr = new Array();
            argArr[0] = 100; //totalResPoints;
            argArr[1] = 100; //totalResPoints;
            this.m_progressListener.apply(this.m_progressThisObj, argArr); // 将进度置为100%。
            this.m_completeListener.apply(this.m_completeThisObj);
        }
        this.m2_localResList = [];
    };
    CPreloader.prototype.onHttpsResLoadComplete = function (obj) {
        // 1 res complete.
        --this.m2_httpsResLeftCnt;
        if (0 >= this.m2_httpsResLeftCnt) {
            this.m2_httpsResLoadComplete = true;
            this.m2_HTTPSStartPreloadTag = -1;
            if (this.m2_localResLoadComplete) {
                var totalResPoints;
                totalResPoints = this.m2_localResList.length * 2 + this.m2_httpsResList.length * 5;
                var argArr = new Array();
                argArr[0] = 100; //totalResPoints;
                argArr[1] = 100; //totalResPoints;
                this.m_progressListener.apply(this.m_progressThisObj, argArr); // 将进度置为100%。
                this.m2_httpsResList = []; //需要complete前清空。因为complete处理函数很可能需要设置本list。
                this.m_completeListener.apply(this.m_completeThisObj);
            }
            else {
                this.m2_httpsResList = [];
            }
        }
    };
    CPreloader.prototype.onResourceLoadError = function (evt) {
        //TODO
        console.warn("Group:" + evt.groupName + " has failed to load");
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceLoadProgress, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
    };
    return CPreloader;
}());
__reflect(CPreloader.prototype, "CPreloader", ["IPreloader"]);
