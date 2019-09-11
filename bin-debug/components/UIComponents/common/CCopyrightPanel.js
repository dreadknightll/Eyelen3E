/**************************************************
 * components/UIComponents/common/CCopyrightPanel.ts
 *
 * 版权声明显示框。显示白鹭引擎的版权声明。
 *
**************************************************/
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
    var CCopyrightPanel = (function (_super) {
        __extends(CCopyrightPanel, _super);
        function CCopyrightPanel() {
            var _this = _super.call(this) || this;
            _this.s_cpText = "//////////////////////////////////////////////////////////////////////////////////////\n\
	//\n\
	//  Copyright (c) 2014-present, Egret Technology.\n\
	//  All rights reserved.\n\
	//  Redistribution and use in source and binary forms, with or without\n\
	//  modification, are permitted provided that the following conditions are met:\n\
	//\n\
	//     * Redistributions of source code must retain the above copyright\n\
	//       notice, this list of conditions and the following disclaimer.\n\
	//     * Redistributions in binary form must reproduce the above copyright\n\
	//       notice, this list of conditions and the following disclaimer in the\n\
	//       documentation and/or other materials provided with the distribution.\n\
	//     * Neither the name of the Egret nor the\n\
	//       names of its contributors may be used to endorse or promote products\n\
	//       derived from this software without specific prior written permission.\n\
	//\n\
	//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS \"AS IS\" AND ANY EXPRESS\n\
	//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES\n\
	//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.\n\
	//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,\n\
	//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\n\
	//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,\n\
	//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF\n\
	//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING\n\
	//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,\n\
	//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n\
	//\n\
	//////////////////////////////////////////////////////////////////////////////////////";
            _this.m_content = new egret.TextField();
            _this.m_content.x = 42;
            _this.m_content.y = 141;
            _this.m_content.width = 315;
            _this.m_content.height = 1500;
            _this.m_content.textColor = 0x000000;
            _this.m_content.size = 18;
            _this.m_contentMask = new egret.Rectangle();
            _this.m_contentMask.x = 0;
            _this.m_contentMask.y = 0;
            _this.m_contentMask.width = 320;
            _this.m_contentMask.height = 420;
            _this.m_content.mask = _this.m_contentMask;
            return _this;
        }
        CCopyrightPanel.prototype.childrenCreated = function () {
            this.m_content.text = this.s_cpText;
            this.addChild(this.m_content);
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnTap, this);
            this.arrowUp.touchEnabled = true;
            this.arrowDown.touchEnabled = true;
            this.arrowUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpArrowTap, this);
            this.arrowDown.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDownArrowTap, this);
        };
        CCopyrightPanel.prototype.onUpArrowTap = function (e) {
            if (this.m_contentMask.y - 100 < 0) {
                return;
            }
            this.m_content.y += 100;
            this.m_contentMask.y -= 100;
            this.m_content.mask = this.m_contentMask;
        };
        CCopyrightPanel.prototype.onDownArrowTap = function (e) {
            if (this.m_contentMask.y + 100 > 900) {
                return;
            }
            this.m_content.y -= 100;
            this.m_contentMask.y += 100;
            this.m_content.mask = this.m_contentMask;
        };
        CCopyrightPanel.prototype.onCloseBtnTap = function (e) {
            this.visible = false;
            this.m_content.y = 141;
            this.m_contentMask.y = 0;
            this.m_content.mask = this.m_contentMask;
        };
        return CCopyrightPanel;
    }(eui.Component));
    eyelen3E.CCopyrightPanel = CCopyrightPanel;
    __reflect(CCopyrightPanel.prototype, "eyelen3E.CCopyrightPanel");
})(eyelen3E || (eyelen3E = {}));
//# sourceMappingURL=CCopyrightPanel.js.map