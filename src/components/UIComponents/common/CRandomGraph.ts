
namespace eyelen3E {
    export class CRandomGraph extends eui.Component {

		public constructor() {
			super();
			this.width = 1024;
			this.height = 720;

// 尽可能用一个shape完成。
			this.m_shapes = new Array<egret.Shape>();
			var i;
			for(i=0;i<3;++i) {
				this.m_shapes.push(new egret.Shape());
				this.addChild(this.m_shapes[i]);
			}

		}

		public m_shapes:Array<egret.Shape>;
		public m_seed:number = 0;

		private genFromSeed(seed:number) {
			this.m_seed = seed;
			var i;
			for(i=0;i<this.m_shapes.length;++i) {
				this.m_shapes[i].graphics.clear();
			}
			switch(seed) {
				case 1:
					var x1:number,x2:number,x3:number;
					x1 = 0;
					x2 = this.width/3;
					x3 = this.width/3*2;
					this.m_shapes[0].graphics.beginFill(0xAA0088);
    				this.m_shapes[0].graphics.drawRect(x1,0,this.width/3,this.height);
	    			this.m_shapes[0].graphics.endFill();
				    this.m_shapes[1].graphics.beginFill(0x339900);
    				this.m_shapes[1].graphics.drawRect(x2,0,this.width/3,this.height);
	    			this.m_shapes[1].graphics.endFill();
				    this.m_shapes[2].graphics.beginFill(0x0000FF);
    				this.m_shapes[2].graphics.drawRect(x3,0,this.width/3,this.height);
	    			this.m_shapes[2].graphics.endFill();
					break;

				case 2:
					var y1:number,y2:number,y3:number;
					y1 = 0;
					y2 = this.height/3;
					y3 = this.height/3*2;
					this.m_shapes[0].graphics.beginFill(0x0000FF);
					this.m_shapes[0].graphics.drawRect(0,y1,this.width,this.height/3);
					this.m_shapes[0].graphics.endFill();
					this.m_shapes[1].graphics.beginFill(0x339900);
					this.m_shapes[1].graphics.drawRect(0,y2,this.width,this.height/3);
					this.m_shapes[1].graphics.endFill();
					this.m_shapes[2].graphics.beginFill(0xAA0088);
					this.m_shapes[2].graphics.drawRect(0,y3,this.width,this.height/3);
					this.m_shapes[2].graphics.endFill();
					break;

				case 3:
					this.m_shapes[0].graphics.beginFill(0x339900);
					this.m_shapes[0].graphics.drawRect(0,0,this.width,this.height);
					this.m_shapes[0].graphics.endFill();
					this.m_shapes[0].graphics.beginFill(0x0000FF);
					this.m_shapes[0].graphics.drawEllipse(0,0,this.width/2,this.height);
					this.m_shapes[0].graphics.endFill();
					this.m_shapes[0].graphics.beginFill(0xAA0088);
					this.m_shapes[0].graphics.drawEllipse(this.width/2,0,this.width/2,this.height);
					this.m_shapes[0].graphics.endFill();

			}
		}

		public genGraph(wid:number , hei:number) {
			this.width = wid;
			this.height = hei;

			var seed:number;
			seed = Math.floor(Math.random()*3)+1; //种子取值范围：[1,3]

			this.genFromSeed(seed);

		}

		public resize(wid:number,hei:number) {
			this.width = wid;
			this.height = hei;
			this.genFromSeed(this.m_seed);
		}

		/*
			a、只复制图的内容。
			b、连同尺寸。
		*/
		public copyFrom(src:CRandomGraph , copySize:boolean = true) {
			if(copySize) {
				this.resize(src.width , src.height);
			}

			this.genFromSeed(src.m_seed);
		}
	}
}
