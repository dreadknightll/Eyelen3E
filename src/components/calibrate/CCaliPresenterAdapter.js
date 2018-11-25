var CCaliPresenterAdapter = (function () {
    function CCaliPresenterAdapter() {
        this.m_icp = new Basic_CaliPresenter();
    }
    CCaliPresenterAdapter.prototype.setInitA1 = function (ia1) {
        this.m_icp.setInitA1(ia1);
    };
    CCaliPresenterAdapter.prototype.lock = function () {
        this.m_icp.lock();
    };
    CCaliPresenterAdapter.prototype.unlock = function () {
        this.m_icp.unlock();
    };
    CCaliPresenterAdapter.prototype.getA1 = function () {
        return this.m_icp.getA1();
    };
    CCaliPresenterAdapter.prototype.inputA1 = function (a1) {
        this.m_icp.inputA1(a1);
    };
    CCaliPresenterAdapter.prototype.undoA1 = function () {
        this.m_icp.undoA1();
    };
    CCaliPresenterAdapter.prototype.redoA1 = function () {
        this.m_icp.redoA1();
    };
    CCaliPresenterAdapter.prototype.recA1 = function () {
        this.m_icp.recA1();
    };
    return CCaliPresenterAdapter;
}());
//# sourceMappingURL=CCaliPresenterAdapter.js.map