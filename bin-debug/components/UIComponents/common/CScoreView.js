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
/**
 *
 * /src/components/CScoreView.ts
 * 练习得分显示（含数字和图示）。
 *
 */
var eyelen3E;
(function (eyelen3E) {
    var CScoreView = (function (_super) {
        __extends(CScoreView, _super);
        function CScoreView() {
            var _this = _super.call(this) || this;
            _this.s_flagWidth = 13; //旗子宽度。
            _this.s_flagHeight = 22; //旗子高度。
            _this.m_score = 0; // 当前成绩。不填写则为0。
            _this.m_progress = 0; // 当前进度。不填写则为0。
            _this.m_created = false; // 界面子元素是否已创建完成。
            _this.m_scoreFlagsArr = new Array();
            _this.m_scoreFlagsContainer = new egret.DisplayObjectContainer();
            return _this;
        }
        CScoreView.prototype.childrenCreated = function () {
            this.m_created = true;
            this.m_scoreFlagsArr = new Array();
            this.m_scoreFlagsContainer = new egret.DisplayObjectContainer();
            var i, j;
            for (i = 0; i < 3; ++i) {
                this.m_scoreFlagsArr[i] = new Array();
                for (j = 0; j < 10; ++j) {
                    this.m_scoreFlagsArr[i][j] = new egret.Bitmap();
                    this.m_scoreFlagsArr[i][j].x = (this.s_flagWidth + 3) * j + 5;
                    this.m_scoreFlagsArr[i][j].y = (this.s_flagHeight + 2) * i;
                    this.m_scoreFlagsArr[i][j].width = this.s_flagWidth;
                    this.m_scoreFlagsArr[i][j].height = this.s_flagHeight;
                    this.m_scoreFlagsArr[i][j].texture = RES.getRes("score_dot_png");
                    this.m_scoreFlagsContainer.addChild(this.m_scoreFlagsArr[i][j]);
                }
            }
            this.scoreFlags.addChild(this.m_scoreFlagsContainer);
            this.updateScoreFlags();
        };
        /*
        * 根据 m_score 刷新旗子矩阵。
        */
        CScoreView.prototype.updateScoreFlags = function () {
            if (!this.m_created) {
                return;
            }
            this.scoreTxt.text = this.m_score.toString();
            var fra = new CScoreFlagRect();
            var flagCnt = this.m_score / 10;
            var dotCnt = 30 - (this.m_progress) * 3;
            var crossCnt = 30 - flagCnt - dotCnt;
            fra.setCnts(flagCnt, crossCnt);
            var flagArrInt = fra.getFlagArr();
            var i, j;
            for (i = 0; i < 3; ++i) {
                for (j = 0; j < 10; ++j) {
                    switch (flagArrInt[i][j]) {
                        case 0:
                            this.m_scoreFlagsArr[i][j].texture = RES.getRes("score_dot_png");
                            break;
                        case 1:
                            this.m_scoreFlagsArr[i][j].texture = RES.getRes("score_flag_png");
                            break;
                        case 2:
                            this.m_scoreFlagsArr[i][j].texture = RES.getRes("score_cross_png");
                            break;
                    }
                }
            }
        };
        /*
        * 设置成绩（连同进度）。
        */
        CScoreView.prototype.setScoreWithPro = function (score, progress) {
            //progress:0-10
            this.m_score = score;
            this.m_progress = progress;
            this.updateScoreFlags();
        };
        /*
        * 清空数据。
        */
        CScoreView.prototype.clearScore = function () {
            this.setScoreWithPro(0, -1);
        };
        return CScoreView;
    }(eui.Component));
    eyelen3E.CScoreView = CScoreView;
    __reflect(CScoreView.prototype, "eyelen3E.CScoreView");
})(eyelen3E || (eyelen3E = {}));
//# sourceMappingURL=CScoreView.js.map