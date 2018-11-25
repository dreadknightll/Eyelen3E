var CLenCheckerDifficult = (function () {
    function CLenCheckerDifficult() {
        this.m_renderFilter = new CEyelen3ERenderFilter();
    }
    CLenCheckerDifficult.prototype.setRenderFilter = function (rf) {
        this.m_renderFilter = rf;
    };
    CLenCheckerDifficult.prototype.setCorreOriLen = function (len) {
        this.m_correOriLen = len;
    };
    CLenCheckerDifficult.prototype.setInputDispLen = function (len) {
        this.m_inputDispLen = len;
    };
    CLenCheckerDifficult.prototype.checkLen = function () {
        var ret;
        ret = 0;
        var corre, inp, diff;
        corre = this.m_renderFilter.xOConv(this.m_correOriLen);
        inp = this.m_inputDispLen;
        diff = Math.abs(corre - inp);
        if (corre < 30) {
            if (diff < 2) {
                ret = 3;
            }
            else if (diff < 4) {
                ret = 2;
            }
            else if (diff < 8) {
                ret = 1;
            }
            else {
                ret = 0;
            }
        }
        else if (corre < 100) {
            if (diff < 5) {
                ret = 3;
            }
            else if (diff < 10) {
                ret = 2;
            }
            else if (diff < 18) {
                ret = 1;
            }
            else {
                ret = 0;
            }
        }
        else {
            if (diff < 8) {
                ret = 3;
            }
            else if (diff < 15) {
                ret = 2;
            }
            else if (diff < 25) {
                ret = 1;
            }
            else {
                ret = 0;
            }
        }
        return ret;
    };
    return CLenCheckerDifficult;
}());
//# sourceMappingURL=CLenCheckerDifficult.js.map