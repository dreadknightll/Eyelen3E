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
var CDispObj2EgretDOAdapter = (function (_super) {
    __extends(CDispObj2EgretDOAdapter, _super);
    function CDispObj2EgretDOAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CDispObj2EgretDOAdapter.from = function (o) {
        var ret = new CDispObj2EgretDOAdapter();
        ret.m_adaptee = o;
        return ret;
    };
    return CDispObj2EgretDOAdapter;
}(CDispObj));
__reflect(CDispObj2EgretDOAdapter.prototype, "CDispObj2EgretDOAdapter");
;
//# sourceMappingURL=CDispObj2EgretDOAdapter.js.map