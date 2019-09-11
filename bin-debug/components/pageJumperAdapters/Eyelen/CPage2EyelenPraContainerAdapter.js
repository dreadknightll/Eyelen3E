/*
    1.Set m_adaptee.
    2.m_adaptee children created.
    3.firstShow.
    4.showPage/hidePage.
*/
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
var CPage2EyelenPraContainerAdapter = (function (_super) {
    __extends(CPage2EyelenPraContainerAdapter, _super);
    function CPage2EyelenPraContainerAdapter() {
        return _super.call(this) || this;
    }
    CPage2EyelenPraContainerAdapter.prototype.show = function () {
        _super.prototype.show.call(this);
        this.m_adaptee.show();
    };
    CPage2EyelenPraContainerAdapter.prototype.hide = function () {
        _super.prototype.hide.call(this);
        this.m_adaptee.hide();
    };
    return CPage2EyelenPraContainerAdapter;
}(gdeint.CPage));
__reflect(CPage2EyelenPraContainerAdapter.prototype, "CPage2EyelenPraContainerAdapter");
;
//# sourceMappingURL=CPage2EyelenPraContainerAdapter.js.map