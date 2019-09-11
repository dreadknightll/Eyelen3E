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
 * 最终得分显示对话框。
 *
 */
var eyelen3E;
(function (eyelen3E) {
    var CFinalScoreDlg = (function (_super) {
        __extends(CFinalScoreDlg, _super);
        function CFinalScoreDlg() {
            var _this = _super.call(this) || this;
            _this.m_bg = new egret.Shape();
            _this.m_starsArr = new Array();
            _this.m_starsContainer = new egret.DisplayObjectContainer();
            var i;
            for (i = 0; i < 3; ++i) {
                _this.m_starsArr[i] = new egret.Bitmap();
                _this.m_starsArr[i].texture = RES.getRes("star_empty_png");
                _this.m_starsArr[i].width = 60;
                _this.m_starsArr[i].height = 60;
                _this.m_starsArr[i].x = 64 * i;
                _this.m_starsContainer.addChild(_this.m_starsArr[i]);
            }
            _this.m_replayEvt = new CFinalScoreDlgEvent(CFinalScoreDlgEvent.EVT_REPLAY_BTN_TAP);
            return _this;
        }
        CFinalScoreDlg.prototype.childrenCreated = function () {
            this.m_bg.graphics.beginFill(0x00FF00);
            this.m_bg.graphics.drawRect(0, 0, this.width, this.height);
            this.m_bg.graphics.endFill();
            this.bgGrp.addChild(this.m_bg);
            this.stars.addChild(this.m_starsContainer);
            this.replayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReplay, this);
        };
        CFinalScoreDlg.prototype.setScore = function (s) {
            this.score.text = s.toString();
        };
        CFinalScoreDlg.prototype.setStars = function (scnt) {
            var i;
            for (i = 0; i < scnt; ++i) {
                this.m_starsArr[i].texture = RES.getRes("star_full_png");
            }
            for (; i < 3; ++i) {
                this.m_starsArr[i].texture = RES.getRes("star_empty_png");
            }
        };
        CFinalScoreDlg.prototype.onReplay = function (evt) {
            this.dispatchEvent(this.m_replayEvt);
        };
        return CFinalScoreDlg;
    }(eui.Component));
    eyelen3E.CFinalScoreDlg = CFinalScoreDlg;
    __reflect(CFinalScoreDlg.prototype, "eyelen3E.CFinalScoreDlg");
})(eyelen3E || (eyelen3E = {}));
//# sourceMappingURL=CFinalScoreDlg.js.map