var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*********************************************************************
 * /src/components/calibrate/CCaliPresenterAdapter.ts
 * 横竖校准对话框对应的 presenter 。用于处理横竖校准对话框的工作逻辑。
 *
 *********************************************************************/
var CCaliPresenterAdapter = (function () {
    function CCaliPresenterAdapter() {
        this.m_icp = new Basic_CaliPresenter();
    }
    /*
     * 设置初始校准系数。若对话框取消保存并退出，则下次打开时系数仍为该初始值。
     */
    CCaliPresenterAdapter.prototype.setInitA1 = function (ia1) {
        this.m_icp.setInitA1(ia1);
    };
    /*
     * 锁定输入。
     */
    CCaliPresenterAdapter.prototype.lock = function () {
        this.m_icp.lock();
    };
    CCaliPresenterAdapter.prototype.unlock = function () {
        this.m_icp.unlock();
    };
    /*
     * 获取当前校准系数。
     */
    CCaliPresenterAdapter.prototype.getA1 = function () {
        return this.m_icp.getA1();
    };
    /*
     * 输入新的校准系数。
     */
    CCaliPresenterAdapter.prototype.inputA1 = function (a1) {
        this.m_icp.inputA1(a1);
    };
    /*
     * 撤销一步操作。
     */
    CCaliPresenterAdapter.prototype.undoA1 = function () {
        this.m_icp.undoA1();
    };
    /*
     * 重做一步操作。
     */
    CCaliPresenterAdapter.prototype.redoA1 = function () {
        this.m_icp.redoA1();
    };
    /*
     * 当前系数入栈。撤销操作只能回滚到已入栈的系数值。
     */
    CCaliPresenterAdapter.prototype.recA1 = function () {
        this.m_icp.recA1();
    };
    return CCaliPresenterAdapter;
}());
__reflect(CCaliPresenterAdapter.prototype, "CCaliPresenterAdapter", ["ICaliPresenter"]);
//# sourceMappingURL=CCaliPresenterAdapter.js.map