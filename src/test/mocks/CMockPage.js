var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CMockPage = (function (_super) {
    __extends(CMockPage, _super);
    function CMockPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CMockPage.prototype.show = function () {
        this.m_visible = true;
    };
    CMockPage.prototype.hide = function () {
        this.m_visible = false;
    };
    CMockPage.prototype.isVisible = function () {
        return this.m_visible;
    };
    return CMockPage;
}(gdeint.CPage));
//# sourceMappingURL=CMockPage.js.map