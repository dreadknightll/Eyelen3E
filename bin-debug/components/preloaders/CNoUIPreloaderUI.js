var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CNoUIPreloaderUI = (function () {
    function CNoUIPreloaderUI() {
        this.m_noTaskLeft = false; // 是否所有任务均已添加。影响完成事件的触发等。
        this.m_curTaskTag = 0;
        this.m_proporFinished = 0; // Set it to public in order to perform as base class!
        this.m_taskList = new Array();
        this.m_preloader = new CPreloader();
    }
    CNoUIPreloaderUI.prototype.setPreloader = function (preloader) {
        // Preloader 一次只处理一个 task。总进度在本类确定。
        this.m_preloader = preloader;
    };
    CNoUIPreloaderUI.prototype.setCompleteListener = function (listener, thisObj) {
        this.m_cmplListener = listener;
        this.m_cmplThisObj = thisObj;
    };
    CNoUIPreloaderUI.prototype.setNextActListener = function (listiner, thisObj) {
    };
    CNoUIPreloaderUI.prototype.addTask = function (task) {
        this.m_taskList.push(task);
    };
    CNoUIPreloaderUI.prototype.setNoTaskLeft = function (ntl) {
        this.m_noTaskLeft = ntl;
    };
    CNoUIPreloaderUI.prototype._setParentContainer = function (c) {
        this.m_parentContainer = c;
    };
    CNoUIPreloaderUI.prototype._getParentContainer = function () {
        return this.m_parentContainer;
    };
    CNoUIPreloaderUI.prototype.showUI = function () {
    };
    CNoUIPreloaderUI.prototype.hideUI = function () {
    };
    CNoUIPreloaderUI.prototype.setSceneRect = function (x, y, width, height) {
    };
    CNoUIPreloaderUI.prototype.startPreload = function () {
        this.preloadCurTask();
    };
    CNoUIPreloaderUI.prototype.preloadCurTask = function () {
        var curTask;
        curTask = this.m_taskList[this.m_curTaskTag];
        if (!curTask) {
            return;
        }
        var resNameList = new Array();
        var i;
        for (i = 0; i < curTask.m_resList.length; ++i) {
            resNameList[i] = curTask.m_resList[i].m_resName;
        }
        this.m_preloader.setResList(resNameList);
        this.m_preloader.setCompleteListener(this.onOneTaskComplete, this);
        this.m_preloader.preload();
    };
    CNoUIPreloaderUI.prototype.setProgressListener = function (progressListener, thisObj) {
        this.m_upperProgressListener = progressListener;
        this.m_upperProgressThisObj = thisObj;
        if (!this.m_upperProgressListener) {
            window.alert("Null!!");
        }
        this.m_preloader.setProgressListener(this.onProgressListener, this);
    };
    CNoUIPreloaderUI.prototype.onProgressListener = function (cur, tot) {
        // cur:当前task完成进度。tot：当前task总长。
        // 显示的结果：所有task完成的总百分比。
        var curTask = this.m_taskList[this.m_curTaskTag];
        var oldTaskProportions = 0;
        var i;
        for (i = 0; i <= this.m_curTaskTag - 1; ++i) {
            oldTaskProportions += this.m_taskList[i].m_proportion;
        }
        this.m_proporFinished = oldTaskProportions + curTask.m_proportion * cur / tot;
        if (this.m_proporFinished > 100) {
            this.m_proporFinished = 100;
        }
        var argArr = new Array();
        argArr[0] = this.m_proporFinished;
        argArr[1] = 100;
        this.m_upperProgressListener.apply(this.m_upperProgressThisObj, argArr);
    };
    CNoUIPreloaderUI.prototype.onOneTaskComplete = function () {
        ++this.m_curTaskTag;
        if (this.m_curTaskTag <= this.m_taskList.length - 1) {
            this.preloadCurTask();
        }
        else {
            if (this.m_proporFinished >= 100 || this.m_noTaskLeft) {
                //Don't clear progress here. Additial tasks may be added and go on.
                //如果预加载任务列表已全部完成但不满足以上两个条件，也不作为加载任务完成，而是等待继续添加新任务。
                this.m_cmplListener.apply(this.m_cmplThisObj);
            }
        }
    };
    CNoUIPreloaderUI.prototype.clearProgress = function () {
        this.m_taskList = [];
        this.m_proporFinished = 0;
        this.m_curTaskTag = 0;
    };
    CNoUIPreloaderUI.prototype.show = function () {
        this.showUI();
    };
    CNoUIPreloaderUI.prototype.hide = function () {
        this.hideUI();
    };
    CNoUIPreloaderUI.prototype.isVisible = function () {
        return false;
    };
    return CNoUIPreloaderUI;
}());
__reflect(CNoUIPreloaderUI.prototype, "CNoUIPreloaderUI", ["IPreloaderUI", "IContainerPlugin", "gdeint.IHidable"]);
