/*
	本组件只提供元素。大小和位置操作由外部程序负责。
*/
namespace eyelen3E {
	export class CThumbUI extends eui.Component {
		private thumb:eui.Group;
		private imgThumb:eui.Image;
		private randomGraphThumbGrp:eui.Group;
		private m_NoImgMode:boolean = false;
		private m_randomGraphShape:CRandomGraph;
		private thumbSel:eui.Image;

		public midLayerGrp:eui.Group;
		public thumbQuestioner:eui.Label;

		private thumbCover:eui.Rect;

		private m_thumbTapEvt:CThumbUIEvent;

		private m2_cc:boolean;

		public constructor() {
			super();
			this.m_thumbTapEvt = new CThumbUIEvent(CThumbUIEvent.EVT_THUMB_TAP);
			this.m_randomGraphShape = new CRandomGraph();
			this.m_randomGraphShape.width = 150;
			this.m_randomGraphShape.height = 120;
			this.m_randomGraphShape.visible = false;
		}

		public childrenCreated(): void {
			this.randomGraphThumbGrp.addChild(this.m_randomGraphShape);
			console.log("Thumb size on cc:"+this.m_randomGraphShape.width+","+this.m_randomGraphShape.height);
			this.thumbCover.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onThumbTap , this)
			this.m2_cc = true;
			if(this.m_NoImgMode) {
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

		public setThumbWidth(w:number) {
			this.imgThumb.width = w;
			this.m_randomGraphShape.resize(w , this.m_randomGraphShape.height);
			this.thumbSel.width = w;
			this.thumbCover.width = w;
		}

		public getThumbWidth():number {
			var ret;
			if(this.m_NoImgMode) {
				ret = this.m_randomGraphShape.width;
			}
			else {
				ret = this.imgThumb.width;
			}
			return ret;
		}

		public setThumbHeight(h:number) {
			console.log("Setting thumbHeight to:"+h);
			this.imgThumb.height = h;
			this.m_randomGraphShape.resize(this.m_randomGraphShape.width,h);
			this.thumbSel.height = h;
			this.thumbCover.height = h;
		}

		public getThumbHeight():number {
			var ret:number;
			if(this.m_NoImgMode) {
				ret = this.m_randomGraphShape.height;
			}
			else {
				ret = this.imgThumb.height;
			}

			return ret;
		}

		public setNoImgMode(nim:boolean) {
			this.m_NoImgMode = nim;
			if(this.m2_cc) {
				if(nim) {
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
		}

		public setImgSrc(s:string) {
			console.log("Setting img src!");
			this.setNoImgMode(false);
			this.imgThumb.source = s;
		}

		public setShape(shp:CRandomGraph) {
			console.log("Setting shape!");
			this.setNoImgMode(true);
			this.m_randomGraphShape.copyFrom(shp , false);
/*			this.m_randomGraphShape.scaleX = this.getThumbWidth() / 1024;
			this.m_randomGraphShape.scaleY = this.getThumbHeight() / 720;*/

			this.m_randomGraphShape.visible = true;
		}

		public setSelRect(r:gdeint.CRect) {
			this.thumbSel.x = r.m_left;
			this.thumbSel.y = r.m_top;
			this.thumbSel.width = r.m_width;
			this.thumbSel.height = r.m_height;
		}

		private onThumbTap(evt:egret.TouchEvent) {
			this.thumbSel.x = evt.localX - this.thumbSel.width / 2;
			this.thumbSel.y = evt.localY - this.thumbSel.height / 2;

			this.m_thumbTapEvt.m_tchX = evt.localX;
			this.m_thumbTapEvt.m_tchY = evt.localY;
		
			this.dispatchEvent(this.m_thumbTapEvt);
		}
	}
}