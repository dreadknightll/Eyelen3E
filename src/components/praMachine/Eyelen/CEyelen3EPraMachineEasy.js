var CEyelen3EPraMachineEasy = (function () {
    function CEyelen3EPraMachineEasy() {
        this.m2_lastLenScore = 0;
        this.m_lenArr = [];
        this.m_lenChecker = new CLenCheckerEasy();
        this.m_lenChecker.setGridDispWidth(30);
        this.m_imgPathList = [];
        this.m_curLenTag = 0;
        this.m_curScore = 0;
        this.m_lenInputted = false;
        this.m_finished = false;
    }
    CEyelen3EPraMachineEasy.prototype.clearPra = function () {
        this.m_lenArr = [];
        this.m_imgPathList = [];
        this.rePra();
    };
    CEyelen3EPraMachineEasy.prototype.setLenArr = function (lenArr) {
        this.m_lenArr = lenArr;
        this.m_curLenTag = 0;
    };
    CEyelen3EPraMachineEasy.prototype.setGridDispWidth = function (w) {
        this.m_lenChecker.setGridDispWidth(w);
    };
    CEyelen3EPraMachineEasy.prototype.getLenChecker = function () {
        return this.m_lenChecker;
    };
    CEyelen3EPraMachineEasy.prototype.refreshImgPathList = function () {
        var i, j;
        for (i = 0; i < this.m_lenArr.length; ++i) {
            var newPath = this.m_lenArr[i].m_imgPath;
            for (j = 0; j < this.m_imgPathList.length; ++j) {
                if (this.m_imgPathList[j] == newPath) {
                    break;
                }
            }
            if (this.m_imgPathList.length == j) {
                this.m_imgPathList.push(this.m_lenArr[i].m_imgPath);
            }
        }
    };
    CEyelen3EPraMachineEasy.prototype.inpGridCnt = function (gcnt) {
        if (this.m_curLenTag >= this.m_lenArr.length) {
            return;
        }
        this.m_lenInputted = true;
        var expLen = this.m_lenArr[this.m_curLenTag].m_length;
        var rank;
        this.m_lenChecker.setInputGridCnt(gcnt);
        this.m_lenChecker.setCorreOriLen(expLen);
        rank = this.m_lenChecker.checkLen();
        switch (rank) {
            case 0:
                break;
            case 1:
                this.m_curScore += 10;
                break;
            case 2:
                this.m_curScore += 20;
                break;
            case 3:
                this.m_curScore += 30;
                break;
        }
        this.m2_lastLenRank = (this.getCurScore() - this.m2_lastLenScore) / 10;
        this.m2_lastLenScore = this.getCurScore();
    };
    CEyelen3EPraMachineEasy.prototype.nextLen = function () {
        this.m_lenInputted = false;
        if (this.m_curLenTag < this.m_lenArr.length) {
            ++this.m_curLenTag;
            if (this.m_curLenTag >= this.m_lenArr.length) {
                this.m_finished = true;
            }
        }
    };
    CEyelen3EPraMachineEasy.prototype.startPra = function () {
        this.rePra();
    };
    CEyelen3EPraMachineEasy.prototype.rePra = function () {
        this.m_curLenTag = 0;
        this.m_curScore = 0;
        this.m_lenInputted = false;
        this.m_finished = false;
        this.m2_lastLenScore = 0;
    };
    CEyelen3EPraMachineEasy.prototype.getCurElemTag = function () {
        return this.m_curLenTag;
    };
    CEyelen3EPraMachineEasy.prototype.getCmplProgress = function () {
        if (this.m_lenInputted) {
            return this.m_curLenTag + 1;
        }
        else {
            return this.m_curLenTag;
        }
    };
    CEyelen3EPraMachineEasy.prototype.getCurLen = function () {
        return this.m_lenArr[this.m_curLenTag];
    };
    CEyelen3EPraMachineEasy.prototype.getCurScore = function () {
        return this.m_curScore;
    };
    CEyelen3EPraMachineEasy.prototype.getCurImgTag = function () {
        var i;
        if (this.m_finished) {
            return -1;
        }
        if (this.m_curLenTag < 0) {
            return -1;
        }
        for (i = 0; i < this.m_imgPathList.length; ++i) {
            if (gdeint.tailContain(this.m_imgPathList[i], this.m_lenArr[this.m_curLenTag].m_imgPath)) {
                return i;
            }
        }
        return -1;
    };
    CEyelen3EPraMachineEasy.prototype.getLastLenRank = function () {
        return this.m2_lastLenRank;
    };
    return CEyelen3EPraMachineEasy;
}());
//# sourceMappingURL=CEyelen3EPraMachineEasy.js.map