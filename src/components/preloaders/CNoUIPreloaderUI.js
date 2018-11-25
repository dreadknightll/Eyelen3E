var CNoUIPreloaderUI = (function () {
    function CNoUIPreloaderUI() {
        this.m_noTaskLeft = false;
        this.m_proporFinished = 0;
    }
    CNoUIPreloaderUI.prototype.setPreloader = function (preloader) {
        this.m_preloader = preloader;
    };
    CNoUIPreloaderUI.prototype.setCompleteListener = function (listener, thisObj) {
        this.m_cmplListener = listener;
        this.m_cmplThisObj = thisObj;
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
    CNoUIPreloaderUI.prototype.startPreload = function () {
        this.m_curTask = this.m_taskList.pop();
    };
    CNoUIPreloaderUI.prototype.preloadCurTask = function () {
        var resNameList = new Array();
        var i;
        for (i = 0; i < this.m_curTask.m_resList.length; ++i) {
            resNameList[i] = this.m_curTask.m_resList[i].m_resName;
        }
        this.m_preloader.setResList(resNameList);
        this.m_preloader.setCompleteListener(this.onOneTaskComplete, this);
        this.m_preloader.preload();
    };
    CNoUIPreloaderUI.prototype.onOneTaskComplete = function () {
        this.m_proporFinished += this.m_curTask.m_proportion;
        this.m_curTask = this.m_taskList.pop();
        if (this.m_curTask) {
            this.preloadCurTask();
        }
        else {
            if (this.m_proporFinished >= 100 || this.m_noTaskLeft) {
                this.m_cmplListener.apply(this.m_cmplThisObj);
            }
        }
    };
    return CNoUIPreloaderUI;
}());
