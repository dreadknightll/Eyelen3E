var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 *
 * @author
 *
 */
var CMidAreaEvent_Eyelen = (function (_super) {
    __extends(CMidAreaEvent_Eyelen, _super);
    function CMidAreaEvent_Eyelen(type, bulle, cancel) {
        if (bulle === void 0) { bulle = false; }
        if (cancel === void 0) { cancel = false; }
        return _super.call(this, type, bulle, cancel) || this;
    }
    CMidAreaEvent_Eyelen.EVT_IMG_DRAGMOVE = "EVT_IMG_DRAGMOVE";
    CMidAreaEvent_Eyelen.EVT_IMG_DRAGEND = "EVT_IMG_DRAGEND";
    return CMidAreaEvent_Eyelen;
}(egret.Event));
__reflect(CMidAreaEvent_Eyelen.prototype, "CMidAreaEvent_Eyelen");
