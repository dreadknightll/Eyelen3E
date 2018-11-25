var CScoreFlagRect = (function () {
    function CScoreFlagRect() {
        this.m_value1 = 0;
        this.m_value2 = 0;
    }
    CScoreFlagRect.prototype.setCnts = function (v1, v2) {
        this.m_value1 = Math.floor(v1);
        this.m_value2 = Math.floor(v2);
    };
    CScoreFlagRect.prototype.getFlagArr = function () {
        var ret = new Array();
        var i, j;
        for (i = 0; i < 3; ++i) {
            ret[i] = new Array();
            for (j = 0; j < 10; ++j) {
                ret[i][j] = 0;
            }
        }
        if (this.m_value1 < 0 || this.m_value2 < 0) {
            return ret;
        }
        if (this.m_value1 + this.m_value2 > 30) {
            return ret;
        }
        var startVal = 0;
        var endVal = this.m_value1 - 1;
        if (endVal >= startVal) {
            if (Math.floor(startVal / 10) == Math.floor(endVal / 10)) {
                for (j = startVal; j <= endVal; ++j) {
                    ret[Math.floor(startVal / 10)][j % 10] = 1;
                }
            }
            else {
                for (j = startVal % 10; j < 10; ++j) {
                    ret[Math.floor(startVal / 10)][j % 10] = 1;
                }
                for (i = Math.floor(startVal / 10) + 1; i < Math.floor(endVal / 10); ++i) {
                    for (j = 0; j < 10; ++j) {
                        ret[i][j] = 1;
                    }
                }
                for (j = 0; j <= Math.floor(endVal % 10); ++j) {
                    ret[Math.floor(endVal / 10)][j] = 1;
                }
            }
        }
        startVal = this.m_value1;
        endVal = 29 - this.m_value2;
        if (endVal >= startVal) {
            if (Math.floor(startVal / 10) == Math.floor(endVal / 10)) {
                for (j = startVal; j <= endVal; ++j) {
                    ret[Math.floor(startVal / 10)][j % 10] = 0;
                }
            }
            else {
                for (j = startVal % 10; j < 10; ++j) {
                    ret[Math.floor(startVal / 10)][j % 10] = 0;
                }
                for (i = Math.floor(startVal / 10) + 1; i < Math.floor(endVal / 10); ++i) {
                    for (j = 0; j < 10; ++j) {
                        ret[i][j] = 0;
                    }
                }
                for (j = 0; j <= Math.floor(endVal % 10); ++j) {
                    ret[Math.floor(endVal / 10)][j] = 0;
                }
            }
        }
        startVal = 30 - this.m_value2;
        endVal = 29;
        if (endVal >= startVal) {
            if (Math.floor(startVal / 10) == Math.floor(endVal / 10)) {
                for (j = startVal; j <= endVal; ++j) {
                    ret[Math.floor(startVal / 10)][j % 10] = 2;
                }
            }
            else {
                for (j = startVal % 10; j < 10; ++j) {
                    ret[Math.floor(startVal / 10)][j % 10] = 2;
                }
                for (i = Math.floor(startVal / 10) + 1; i < Math.floor(endVal / 10); ++i) {
                    for (j = 0; j < 10; ++j) {
                        ret[i][j] = 2;
                    }
                }
                for (j = 0; j <= Math.floor(endVal % 10); ++j) {
                    ret[Math.floor(endVal / 10)][j] = 2;
                }
            }
        }
        return ret;
    };
    return CScoreFlagRect;
}());
//# sourceMappingURL=CScoreFlagRect.js.map