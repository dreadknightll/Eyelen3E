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
/*
    本组件只提供元素。大小和位置操作由外部程序负责。
*/
var eyelen3E;
(function (eyelen3E) {
    var CThumbUI = (function (_super) {
        __extends(CThumbUI, _super);
        function CThumbUI() {
            var _this = _super.call(this) || this;
            _this.m_NoImgMode = false;
            _this.m_thumbTapEvt = new CThumbUIEvent(CThumbUIEvent.EVT_THUMB_TAP);
            _this.m_randomGraphShape = new eyelen3E.CRandomGraph();
            _this.m_randomGraphShape.width = 150;
            _this.m_randomGraphShape.height = 120;
            _this.m_randomGraphShape.visible = false;
            return _this;
        }
        CThumbUI.prototype.childrenCreated = function () {
            this.randomGraphThumbGrp.addChild(this.m_randomGraphShape);
            console.log("Thumb size on cc:" + this.m_randomGraphShape.width + "," + this.m_randomGraphShape.height);
            this.thumbCover.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onThumbTap, this);
            this.m2_cc = true;
            if (this.m_NoImgMode) {
                this.imgThumb.visible = false;
                this.randomGraphThumbGrp.visible = true;
                this.m_randomGraphShape.visible = true;
            }
            else {
                this.imgThumb.visible = true;
                this.randomGraphThumbGrp.visible = false;
                this.m_randomGraphShape.visible = false;
            }
        };
        CThumbUI.prototype.setThumbWidth = function (w) {
            this.imgThumb.width = w;
            this.m_randomGraphShape.resize(w, this.m_randomGraphShape.height);
            this.thumbSel.width = w;
            this.thumbCover.width = w;
        };
        CThumbUI.prototype.getThumbWidth = function () {
            var ret;
            if (this.m_NoImgMode) {
                ret = this.m_randomGraphShape.width;
            }
            else {
                ret = this.imgThumb.width;
            }
            return ret;
        };
        CThumbUI.prototype.setThumbHeight = function (h) {
            console.log("Setting thumbHeight to:" + h);
            this.imgThumb.height = h;
            this.m_randomGraphShape.resize(this.m_randomGraphShape.width, h);
            this.thumbSel.height = h;
            this.thumbCover.height = h;
        };
        CThumbUI.prototype.getThumbHeight = function () {
            var ret;
            if (this.m_NoImgMode) {
                ret = this.m_randomGraphShape.height;
            }
            else {
                ret = this.imgThumb.height;
            }
            return ret;
        };
        CThumbUI.prototype.setNoImgMode = function (nim) {
            this.m_NoImgMode = nim;
            if (this.m2_cc) {
                if (nim) {
                    this.imgThumb.visible = false;
                    this.randomGraphThumbGrp.visible = true;
                    this.m_randomGraphShape.visible = true;
                }
                else {
                    this.imgThumb.visible = true;
                    this.randomGraphThumbGrp.visible = false;
                    this.m_randomGraphShape.visible = false;
                }
            }
        };
        CThumbUI.prototype.setImgSrc = function (s) {
            console.log("Setting img src!");
            this.setNoImgMode(false);
            this.imgThumb.source = s;
        };
        CThumbUI.prototype.setShape = function (shp) {
            console.log("Setting shape!");
            this.setNoImgMode(true);
            this.m_randomGraphShape.copyFrom(shp, false);
            /*			this.m_randomGraphShape.scaleX = this.getThumbWidth() / 1024;
                        this.m_randomGraphShape.scaleY = this.getThumbHeight() / 720;*/
            this.m_randomGraphShape.visible = true;
        };
        CThumbUI.prototype.setSelRect = function (r) {
            this.thumbSel.x = r.m_left;
            this.thumbSel.y = r.m_top;
            this.thumbSel.width = r.m_width;
            this.thumbSel.height = r.m_height;
        };
        CThumbUI.prototype.onThumbTap = function (evt) {
            this.thumbSel.x = evt.localX - this.thumbSel.width / 2;
            this.thumbSel.y = evt.localY - this.thumbSel.height / 2;
            this.m_thumbTapEvt.m_tchX = evt.localX;
            this.m_thumbTapEvt.m_tchY = evt.localY;
            this.dispatchEvent(this.m_thumbTapEvt);
        };
        return CThumbUI;
    }(eui.Component));
    eyelen3E.CThumbUI = CThumbUI;
    __reflect(CThumbUI.prototype, "eyelen3E.CThumbUI");
})(eyelen3E || (eyelen3E = {}));
//# sourceMappingURL=CThumbUI.js.map