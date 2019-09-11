/**********************************************************
 * /src/components/pageJumperAdapters/common/CPage2EuiAdapter.ts
 * eui界面转CPage的adapter。
 * 使用方法：把要转的eui界面设置到m_adaptee。
 *
 **********************************************************/
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
var CPage2EuiAdapter = (function (_super) {
    __extends(CPage2EuiAdapter, _super);
    function CPage2EuiAdapter() {
        return _super.call(this) || this;
    }
    CPage2EuiAdapter.prototype.show = function () {
        _super.prototype.show.call(this);
        this.m_adaptee.visible = true;
    };
    CPage2EuiAdapter.prototype.hide = function () {
        _super.prototype.hide.call(this);
        this.m_adaptee.visible = false;
    };
    return CPage2EuiAdapter;
}(gdeint.CPage));
__reflect(CPage2EuiAdapter.prototype, "CPage2EuiAdapter");
;
//# sourceMappingURL=CPage2EuiAdapter.js.map