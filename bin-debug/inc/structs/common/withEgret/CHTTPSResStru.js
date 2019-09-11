var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CHTTPSResStru = (function () {
    function CHTTPSResStru() {
        this.m_isInCache = true;
        this.m_onPreloadCmplFunc = null;
        this.m_onPreloadCmplThisObj = null;
    }
    CHTTPSResStru.prototype.setUrl = function (url) {
        this.m_url = url;
    };
    CHTTPSResStru.prototype.getUrl = function () {
        return this.m_url;
    };
    CHTTPSResStru.prototype.setResType = function (t) {
        this.m_resType = t;
    };
    CHTTPSResStru.prototype.getResType = function () {
        return this.m_resType;
    };
    CHTTPSResStru.prototype.setOnPreloadCmpl = function (opc, thisObj) {
        // function opc(obj:CHTTPSResStru):void
        this.m_onPreloadCmplFunc = opc;
        this.m_onPreloadCmplThisObj = thisObj;
    };
    CHTTPSResStru.prototype.preload = function () {
        this.m_isInCache = false;
        RES.getResByUrl(this.m_url, this.onResDownloaded, this, this.m_resType);
    };
    CHTTPSResStru.prototype.onResDownloaded = function (event) {
        this.m_resCache = event;
        if (RES.ResourceItem.TYPE_JSON == this.m_resType) {
            console.log(event);
        }
        this.m_isInCache = true; //设置标志表明已经加载完成。
        this.m_onPreloadCmplFunc.apply(this.m_onPreloadCmplThisObj, [this]);
    };
    return CHTTPSResStru;
}());
__reflect(CHTTPSResStru.prototype, "CHTTPSResStru");
//# sourceMappingURL=CHTTPSResStru.js.map