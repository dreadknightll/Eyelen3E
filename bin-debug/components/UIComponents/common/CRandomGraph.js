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
var eyelen3E;
(function (eyelen3E) {
    var CRandomGraph = (function (_super) {
        __extends(CRandomGraph, _super);
        function CRandomGraph() {
            var _this = _super.call(this) || this;
            _this.m_seed = 0;
            _this.width = 1024;
            _this.height = 720;
            // 尽可能用一个shape完成。
            _this.m_shapes = new Array();
            var i;
            for (i = 0; i < 3; ++i) {
                _this.m_shapes.push(new egret.Shape());
                _this.addChild(_this.m_shapes[i]);
            }
            return _this;
        }
        CRandomGraph.prototype.genFromSeed = function (seed) {
            this.m_seed = seed;
            var i;
            for (i = 0; i < this.m_shapes.length; ++i) {
                this.m_shapes[i].graphics.clear();
            }
            switch (seed) {
                case 1:
                    var x1, x2, x3;
                    x1 = 0;
                    x2 = this.width / 3;
                    x3 = this.width / 3 * 2;
                    this.m_shapes[0].graphics.beginFill(0xAA0088);
                    this.m_shapes[0].graphics.drawRect(x1, 0, this.width / 3, this.height);
                    this.m_shapes[0].graphics.endFill();
                    this.m_shapes[1].graphics.beginFill(0x339900);
                    this.m_shapes[1].graphics.drawRect(x2, 0, this.width / 3, this.height);
                    this.m_shapes[1].graphics.endFill();
                    this.m_shapes[2].graphics.beginFill(0x0000FF);
                    this.m_shapes[2].graphics.drawRect(x3, 0, this.width / 3, this.height);
                    this.m_shapes[2].graphics.endFill();
                    break;
                case 2:
                    var y1, y2, y3;
                    y1 = 0;
                    y2 = this.height / 3;
                    y3 = this.height / 3 * 2;
                    this.m_shapes[0].graphics.beginFill(0x0000FF);
                    this.m_shapes[0].graphics.drawRect(0, y1, this.width, this.height / 3);
                    this.m_shapes[0].graphics.endFill();
                    this.m_shapes[1].graphics.beginFill(0x339900);
                    this.m_shapes[1].graphics.drawRect(0, y2, this.width, this.height / 3);
                    this.m_shapes[1].graphics.endFill();
                    this.m_shapes[2].graphics.beginFill(0xAA0088);
                    this.m_shapes[2].graphics.drawRect(0, y3, this.width, this.height / 3);
                    this.m_shapes[2].graphics.endFill();
                    break;
                case 3:
                    this.m_shapes[0].graphics.beginFill(0x339900);
                    this.m_shapes[0].graphics.drawRect(0, 0, this.width, this.height);
                    this.m_shapes[0].graphics.endFill();
                    this.m_shapes[0].graphics.beginFill(0x0000FF);
                    this.m_shapes[0].graphics.drawEllipse(0, 0, this.width / 2, this.height);
                    this.m_shapes[0].graphics.endFill();
                    this.m_shapes[0].graphics.beginFill(0xAA0088);
                    this.m_shapes[0].graphics.drawEllipse(this.width / 2, 0, this.width / 2, this.height);
                    this.m_shapes[0].graphics.endFill();
            }
        };
        CRandomGraph.prototype.genGraph = function (wid, hei) {
            this.width = wid;
            this.height = hei;
            var seed;
            seed = Math.floor(Math.random() * 3) + 1; //种子取值范围：[1,3]
            this.genFromSeed(seed);
        };
        CRandomGraph.prototype.resize = function (wid, hei) {
            this.width = wid;
            this.height = hei;
            this.genFromSeed(this.m_seed);
        };
        /*
            a、只复制图的内容。
            b、连同尺寸。
        */
        CRandomGraph.prototype.copyFrom = function (src, copySize) {
            if (copySize === void 0) { copySize = true; }
            if (copySize) {
                this.resize(src.width, src.height);
            }
            this.genFromSeed(src.m_seed);
        };
        return CRandomGraph;
    }(eui.Component));
    eyelen3E.CRandomGraph = CRandomGraph;
    __reflect(CRandomGraph.prototype, "eyelen3E.CRandomGraph");
})(eyelen3E || (eyelen3E = {}));
//# sourceMappingURL=CRandomGraph.js.map