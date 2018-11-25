/**
 *
 * @author
 *
 */
var CPreloader = (function () {
    function CPreloader() {
    }
    CPreloader.prototype.setResList = function (l) {
        this.m_resList = l;
    };
    CPreloader.prototype.setCompleteListener = function (lsner, thisObj) {
        this.m_completeListener = lsner;
        this.m_completeThisObj = thisObj;
    };
    CPreloader.prototype.genGroupName = function () {
        var ret = "RandomGroup";
        return ret;
    };
    CPreloader.prototype.preload = function () {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        var tmpGroup = this.m_resList;
        var groupName = this.genGroupName();
        RES.createGroup(groupName, tmpGroup);
        RES.loadGroup(groupName);
    };
    CPreloader.prototype.onResourceLoadComplete = function (evt) {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        this.m_completeListener.apply(this.m_completeThisObj);
    };
    CPreloader.prototype.onResourceLoadError = function (evt) {
        //TODO
        console.warn("Group:" + evt.groupName + " has failed to load");
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
    };
    return CPreloader;
}());
