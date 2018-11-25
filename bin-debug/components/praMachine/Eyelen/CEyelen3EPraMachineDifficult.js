var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * /src/myts/CPraMachine2.ts
 * 练习机器模型。是整个程序的中心。用来处理练习相关的数据和逻辑。计分、进入下一长度、练习结束判断等的内部数据处理都在这里进行。
 * setLenArr -> startPra -> ......
 *
 */
var CEyelen3EPraMachineDifficult = (function () {
    function CEyelen3EPraMachineDifficult() {
        this.m2_lastLenScore = 0;
        this.m_lenArr = [];
        this.m_lenChecker = new CLenCheckerDifficult();
        this.m_imgPathList = [];
        this.m_curLenTag = 0;
        this.m_curScore = 0;
        this.m_lenInputted = false;
        this.m_finished = false;
    }
    /*
     * 清空数据。重新开始练习等情况下调用。
     */
    CEyelen3EPraMachineDifficult.prototype.clearPra = function () {
        this.m_lenArr = [];
        this.m_imgPathList = [];
        this.rePra();
    };
    /*
     * 设置练习所使用的长度列表。
     */
    CEyelen3EPraMachineDifficult.prototype.setLenArr = function (lenArr) {
        this.m_lenArr = lenArr;
        this.m_curLenTag = 0; //Reset it because the whole len array has been changed.
    };
    CEyelen3EPraMachineDifficult.prototype.getLenChecker = function () {
        return this.m_lenChecker;
    };
    /*
     * 根据练习所使用的长度列表刷新所需图片路径列表。
     */
    CEyelen3EPraMachineDifficult.prototype.refreshImgPathList = function () {
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
    /*
     * 输入长度并处理。（DispLen）
     */
    CEyelen3EPraMachineDifficult.prototype.inpLen = function (len) {
        if (this.m_curLenTag >= this.m_lenArr.length) {
            return;
        }
        this.m_lenInputted = true;
        var expLen = this.m_lenArr[this.m_curLenTag].m_length;
        //        var expIsHor:boolean = this.m_lenArr[this.m_curLenTag].m_isHor;
        var rank;
        this.m_lenChecker.setInputDispLen(len);
        this.m_lenChecker.setCorreOriLen(expLen);
        //        this.m_lenChecker.setCorreHor(expIsHor);
        rank = this.m_lenChecker.checkLen();
        switch (rank) {
            case 0:// 评定为 0旗子，不加分。
                break;
            case 1:
                this.m_curScore += 10; // 评定为 1旗子，加10分。
                break;
            case 2:
                this.m_curScore += 20; // 评定为 2旗子，加20分。
                break;
            case 3:
                this.m_curScore += 30; // 评定为 3旗子，加30分。
                break;
        }
        this.m2_lastLenRank = (this.getCurScore() - this.m2_lastLenScore) / 10;
        this.m2_lastLenScore = this.getCurScore();
    };
    /*
     * 进入下一长度。
     */
    CEyelen3EPraMachineDifficult.prototype.nextLen = function () {
        this.m_lenInputted = false;
        if (this.m_curLenTag < this.m_lenArr.length) {
            ++this.m_curLenTag;
            if (this.m_curLenTag >= this.m_lenArr.length) {
                this.m_finished = true;
            }
        }
    };
    CEyelen3EPraMachineDifficult.prototype.startPra = function () {
        this.rePra();
    };
    /*
     * 重新开始练习。
     */
    CEyelen3EPraMachineDifficult.prototype.rePra = function () {
        this.m_curLenTag = 0;
        this.m_curScore = 0;
        this.m_lenInputted = false;
        this.m_finished = false;
        this.m2_lastLenScore = 0;
    };
    /*
     * 获取当前长度下标。
     */
    CEyelen3EPraMachineDifficult.prototype.getCurElemTag = function () {
        return this.m_curLenTag;
    };
    CEyelen3EPraMachineDifficult.prototype.getCmplProgress = function () {
        if (this.m_lenInputted) {
            return this.m_curLenTag + 1;
        }
        else {
            return this.m_curLenTag;
        }
    };
    /*
     * 获取当前长度。
     */
    CEyelen3EPraMachineDifficult.prototype.getCurLen = function () {
        return this.m_lenArr[this.m_curLenTag];
    };
    /*
     * 获取当前得分。
     */
    CEyelen3EPraMachineDifficult.prototype.getCurScore = function () {
        return this.m_curScore;
    };
    /*
     * 获取当前图片下标。
     */
    CEyelen3EPraMachineDifficult.prototype.getCurImgTag = function () {
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
    /*
     * 获取最近一次输入的评定。
     */
    CEyelen3EPraMachineDifficult.prototype.getLastLenRank = function () {
        return this.m2_lastLenRank;
    };
    return CEyelen3EPraMachineDifficult;
}());
__reflect(CEyelen3EPraMachineDifficult.prototype, "CEyelen3EPraMachineDifficult", ["IPlainLenPraMachine", "ILenPraMachine", "IPraMachine"]);
