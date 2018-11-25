/**************************************************
 * components/UIComponents/common/CCopyrightPanel.ts
 * 
 * 版权声明显示框。显示白鹭引擎的版权声明。
 *
**************************************************/

namespace eyelen3E {
	export class CCopyrightPanel extends eui.Component {
		public constructor() {
			super();
			this.m_content = new egret.TextField();
			this.m_content.x = 42;
			this.m_content.y = 141;
			this.m_content.width = 315;
			this.m_content.height = 1500;
			this.m_content.textColor = 0x000000;
			this.m_content.size= 18;

			this.m_contentMask = new egret.Rectangle();
			this.m_contentMask.x = 0;
			this.m_contentMask.y = 0;
			this.m_contentMask.width = 320;
			this.m_contentMask.height = 420;

			this.m_content.mask = this.m_contentMask;
		}

		public childrenCreated():void {
			this.m_content.text = this.s_cpText;
			this.addChild(this.m_content);

			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onCloseBtnTap , this);

			this.arrowUp.touchEnabled = true;
			this.arrowDown.touchEnabled = true;
			this.arrowUp.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onUpArrowTap , this);
			this.arrowDown.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onDownArrowTap , this);
		}

		private onUpArrowTap(e:egret.TouchEvent):void {

			if(this.m_contentMask.y - 100 < 0) {
				return;
			}

			this.m_content.y += 100;
			this.m_contentMask.y -= 100;
			this.m_content.mask = this.m_contentMask;
		}

		private onDownArrowTap(e:egret.TouchEvent):void {

			if(this.m_contentMask.y + 100 > 900) {
				return;
			}

			this.m_content.y -= 100;
			this.m_contentMask.y += 100;
			this.m_content.mask = this.m_contentMask;
		}

		private onCloseBtnTap(e:egret.TouchEvent):void {

			this.visible = false;

			this.m_content.y = 141;
			this.m_contentMask.y = 0;

			this.m_content.mask = this.m_contentMask;

		}

	//	public content:eui.EditableText;
		public m_content:egret.TextField;
		public m_contentMask:egret.Rectangle;
		public title:eui.Label;
		public closeBtn:eui.Button;
		public arrowUp:eui.Image;
		public arrowDown:eui.Image;
		public s_cpText:string = "//////////////////////////////////////////////////////////////////////////////////////\n\
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
	}
}