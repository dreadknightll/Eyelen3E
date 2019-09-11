module eyelen3E {
	export class CPrivacyPanel extends eui.Component {
		public constructor() {
			super();
		}

		private contentLabel:eui.Label;
		public closeBtn:eui.Button;
//		m_content:Label;

		public childrenCreated() {
			this.contentLabel.text = this.s_PriText;
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onCloseBtnTap , this);

		}

		private s_PriText = "\n\
			    只需要使用修改当前设置权限让内容正确显示（修改分辨率、语言、字体等）。\n\
			    不需要其它权限，如：完全的互联网访问、存储、读取本机识别码、通讯录访问、读取位置信息等。如有申请，禁止即可。\n\
			    建议在权限管理中禁用除修改当前设置外的所有权限。\n\
			    本app不会向用户索取私人信息。";

		private onCloseBtnTap(e:egret.TouchEvent):void {
			this.visible = false;
		}
	}
}