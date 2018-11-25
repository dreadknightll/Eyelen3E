var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var CPreloaderUI = (function (_super) {
    __extends(CPreloaderUI, _super);
    function CPreloaderUI() {
        _super.call(this);
        this.m_noUIPreloaderUI = new CNoUIPreloaderUI();
    }
    CPreloaderUI.prototype.setPreloader = function (preloader) {
        this.m_noUIPreloaderUI.setPreloader(preloader);
    };
    CPreloaderUI.prototype.setCompleteListener = function (listener, thisObj) {
        this.m_noUIPreloaderUI.setCompleteListener(listener, thisObj);
    };
    CPreloaderUI.prototype._setParentContainer = function (c) {
        this.m_noUIPreloaderUI._setParentContainer(c);
    };
    CPreloaderUI.prototype._getParentContainer = function () {
        return this.m_noUIPreloaderUI._getParentContainer();
    };
    CPreloaderUI.prototype.addTask = function (task) {
        this.m_noUIPreloaderUI.addTask(task);
    };
    CPreloaderUI.prototype.setNoTaskLeft = function (ntl) {
        this.m_noUIPreloaderUI.setNoTaskLeft(ntl);
    };
    CPreloaderUI.prototype.startPreload = function () {
        this.m_noUIPreloaderUI.startPreload();
    };
    return CPreloaderUI;
}(eui.Component));
