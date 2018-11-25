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
var CTopAreaEvent_Eyelen = (function (_super) {
    __extends(CTopAreaEvent_Eyelen, _super);
    function CTopAreaEvent_Eyelen(type, bulle, cancel) {
        if (bulle === void 0) { bulle = false; }
        if (cancel === void 0) { cancel = false; }
        return _super.call(this, type, bulle, cancel) || this;
    }
    CTopAreaEvent_Eyelen.EVT_SWITCHBTN_TAP = "EVT_SWITCHBTN_TAP";
    return CTopAreaEvent_Eyelen;
}(egret.Event));
__reflect(CTopAreaEvent_Eyelen.prototype, "CTopAreaEvent_Eyelen");
