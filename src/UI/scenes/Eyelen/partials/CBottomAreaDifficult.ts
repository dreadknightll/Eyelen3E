namespace eyelen3E {
	export class CBottomAreaDifficult extends eui.Component {
		public constructor() {
			super();
		}

		public backBtn:eui.Button;
		public caliBtn:eui.Button;
		public menuGroup:eui.Group;
		public lenInputer:CLenInputerDifficult;

		private m2_cc:boolean = false;
		private m_trueWidth:number = 480;
		private m_trueHeight:number = 210;

		public childrenCreated() :void {
			this.m2_cc = true;
			this.rearrangeUI();
		}

		public setTrueWidth(tw:number):void {
			this.m_trueWidth = tw;
			if(this.width < this.m_trueWidth) {
				this.width = this.m_trueWidth;
			}
			if(this.m2_cc) {
				this.rearrangeUI();
			}
		}

		public setTrueHeight(th:number):void {
			this.m_trueHeight = th;
			if(this.height < this.m_trueHeight) {
				this.height = this.m_trueHeight;
			}
			if(this.m2_cc) {
				this.rearrangeUI();
			}
		}

		private rearrangeUI() {
			this.lenInputer.setWidth(this.m_trueWidth - this.lenInputer.x -10);
			this.lenInputer.scaleY = 1.2;

			this.menuGroup.y = this.m_trueHeight * 0.6;
	//		adjust the size of the buttons
			var scale:number;
			scale = 0.32 * this.m_trueHeight/this.backBtn.height;
	//		this.scaleX = scale;
			this.menuGroup.scaleY = scale;
			this.menuGroup.scaleX = scale;
		}
	}
}