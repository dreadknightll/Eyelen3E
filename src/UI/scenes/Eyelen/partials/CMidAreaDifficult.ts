/**
 *
 * 练习场景中部区域。
 *
 */
namespace eyelen3E {
    export class CMidAreaDifficult extends eui.Component {
        public constructor() {
            super();
            this.m_bg = new egret.Shape();
            
            this.m2_imgTchStartPoint = new gdeint.CPoint();
            this.m2_imgStartPoint = new gdeint.CPoint();

            this.m_evtImgDragEnd = new CMidAreaEvent_Eyelen(CMidAreaEvent_Eyelen.EVT_IMG_DRAGEND);

            this.m_randomGraphShape = new CRandomGraph();
        }

        private midBgGrp:eui.Group;
        public midContentGroup:eui.Group;
        public imgGrp:eui.Group;
        public imgFromFile:eui.Image;
        public randomGraph:eui.Group;
        public m_randomGraphShape:CRandomGraph;
        public midCanvasGrp:eui.Group;

        public m_UIPresenter:CEyelen3EPraDifficultPresenter;

        private m_trueWidth: number = 0;
        private m_trueHeight:number = 0;
        private m_visibleStartY:number = 0;

        private m_bg: egret.Shape;
        private m_evtImgDragEnd: CMidAreaEvent_Eyelen;

        private m2_imgTchStartPoint:gdeint.CPoint;
        private m2_imgStartPoint:gdeint.CPoint;
        private m2_isImgMoving: boolean = false;

        private m2_cc:boolean = false;

        private s_horSpace: number = 80;
        private s_verSpace: number = 80;

        public childrenCreated():void {
    //        this.maxWidth = 480; Not work.
            this.randomGraph.addChild(this.m_randomGraphShape);
            var rect:egret.Rectangle = new egret.Rectangle();
            rect.x = 0;
            rect.y = 0;
            if(0 == this.m_trueWidth) {
                rect.width = 720;
            }
            else {
                rect.width = this.m_trueWidth;
            }
            rect.height = 3000;

            this.mask = rect;

            this.midBgGrp.addChild(this.m_bg);

/*            this.imgGrp.touchEnabled = true;
            this.imgGrp.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
            this.imgGrp.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this);
            this.imgGrp.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);*/
            if(S_BUILD_FOR == S_WECHAT && S_NO_IMG_MODE) {
                this.m_randomGraphShape.touchEnabled = true;
                this.m_randomGraphShape.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
                this.m_randomGraphShape.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this);
                this.m_randomGraphShape.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
            }
            else {
                this.imgFromFile.touchEnabled = true;
                this.imgFromFile.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
                this.imgFromFile.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this);
                this.imgFromFile.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
            }

            this.m2_cc = true;
        }

        private redrawBg():void {
            this.m_bg.width = this.getTrueWidth();
            this.m_bg.height = this.m_trueHeight;
            this.m_bg.graphics.clear();
            this.m_bg.graphics.beginFill(0x999999);
            this.m_bg.graphics.drawRect(0,0,this.m_bg.width,this.m_bg.height);
            this.m_bg.graphics.endFill();

            var rect:egret.Rectangle = new egret.Rectangle();

            rect.x = 0;
            rect.y = 0;
            if(0 == this.m_trueWidth) {
                rect.width = 720;
            }
            else {
                rect.width = this.m_trueWidth;
            }
            rect.height = 3000;

            this.mask = rect;

        }

        private touchBegin(evt:egret.TouchEvent):void {
            console.log("Tch begin difficult mid!");
            this.m2_imgTchStartPoint.m_x = evt.stageX;
            this.m2_imgTchStartPoint.m_y = evt.stageY;
            this.m2_imgStartPoint.m_x = this.midContentGroup.x;
            this.m2_imgStartPoint.m_y = this.midContentGroup.y;

            this.m2_isImgMoving = true;
        }

        private touchMove(evt:egret.TouchEvent):void {
            if(this.m2_isImgMoving) {
                if(evt.target == this.imgFromFile)
                {
                    var dx:number , dy:number , newX:number , newY:number;
                    dx = evt.stageX - this.m2_imgTchStartPoint.m_x;
                    dy = evt.stageY - this.m2_imgTchStartPoint.m_y;
                    newX = this.m2_imgStartPoint.m_x + dx;
                    newY = this.m2_imgStartPoint.m_y + dy;

                    if(newX > this.s_horSpace 
                        && newX+this.imgFromFile.width > this.getTrueWidth()+this.s_horSpace)
                    {
                        var gap1:number=0,gap2:number=0;
                        gap1 = newX - this.s_horSpace;
                        gap2 = newX+this.imgFromFile.width - (this.getTrueWidth()+this.s_horSpace);
                        if(gap1 > gap2) {
                            newX = -(this.imgFromFile.width - (this.getTrueWidth()+this.s_horSpace));
                        }
                        else {
                            newX = this.s_horSpace;
                        }
                    }

                    if(newX < -(this.imgFromFile.width + this.s_horSpace - this.getTrueWidth())
                        && newX < -this.s_horSpace)
                    {
                        var gap1:number=0,gap2:number=0;
                        gap1 = newX + this.imgFromFile.width + this.s_horSpace - this.getTrueWidth();
                        gap2 = newX + this.s_horSpace;
                        if(gap1<gap2) {
                            newX = -this.s_horSpace;
                        }
                        else {
                            newX = -(this.imgFromFile.width + this.s_horSpace - this.getTrueWidth());
                        }
                    }

                    if(newY > this.s_verSpace 
                        && newY+this.imgFromFile.height-this.getTrueHeight()>this.s_verSpace)
                    {
                        var gap1:number=0,gap2:number=0;
                        gap1 = newY - this.s_verSpace;
                        gap2 = newY+this.imgFromFile.height-this.getTrueHeight()-this.s_verSpace;
                        if(gap1>gap2) {
                            newY = -(this.imgFromFile.height-this.getTrueHeight()-this.s_verSpace);
                        }
                        else {
                            newY = this.s_verSpace;
                        }
                    }

                    if(newY < -(this.imgFromFile.height + this.s_verSpace - this.getTrueHeight())
                        && newY < -this.s_verSpace)
                    {
                        var gap1:number=0,gap2:number=0;
                        gap1 = newY+this.imgFromFile.height + this.s_verSpace - this.getTrueHeight();
                        gap2 = this.s_verSpace;
                        if(gap1<gap2) {
                            newY = -this.s_verSpace;
                        }
                        else {
                            newY = -(this.imgFromFile.height + this.s_verSpace - this.getTrueHeight());
                        }
                    }

                    this.midContentGroup.x = newX;
                    this.midContentGroup.y = newY;

                    var pt:gdeint.CPoint;
                    pt = new gdeint.CPoint();
                    pt.m_x = -this.midContentGroup.x;
                    pt.m_y = -this.midContentGroup.y + this.m_visibleStartY;

                    this.m_UIPresenter.inpImgSelPt(pt);

                    this.dispatchEvent(this.m_evtImgDragEnd); // No parmameter passed. Calculate inside this func!!
                }
                else if(evt.target == this.m_randomGraphShape) {
                    var dx:number , dy:number , newX:number , newY:number;
                    dx = evt.stageX - this.m2_imgTchStartPoint.m_x;
                    dy = evt.stageY - this.m2_imgTchStartPoint.m_y;
                    newX = this.m2_imgStartPoint.m_x + dx;
                    newY = this.m2_imgStartPoint.m_y + dy;
                    var graphShowWidth = this.m_randomGraphShape.width;

                    if(newX > this.s_horSpace 
                        && newX+graphShowWidth > this.getTrueWidth()+this.s_horSpace)
                    {
                        var gap1:number=0,gap2:number=0;
                        gap1 = newX - this.s_horSpace;
                        gap2 = newX+graphShowWidth - (this.getTrueWidth()+this.s_horSpace);
                        if(gap1 > gap2) {
                            newX = -(graphShowWidth - (this.getTrueWidth()+this.s_horSpace));
                        }
                        else {
                            newX = this.s_horSpace;
                        }
                    }

                    if(newX < -(graphShowWidth + this.s_horSpace - this.getTrueWidth())
                        && newX < -this.s_horSpace)
                    {
                        var gap1:number=0,gap2:number=0;
                        gap1 = newX + graphShowWidth + this.s_horSpace - this.getTrueWidth();
                        gap2 = newX + this.s_horSpace;
                        if(gap1<gap2) {
                            newX = -this.s_horSpace;
                        }
                        else {
                            newX = -(graphShowWidth + this.s_horSpace - this.getTrueWidth());
                        }
                    }

                    if(newY > this.s_verSpace 
                        && newY+720-this.getTrueHeight()>this.s_verSpace)
                    {
                        var gap1:number=0,gap2:number=0;
                        gap1 = newY - this.s_verSpace;
                        gap2 = newY+720-this.getTrueHeight()-this.s_verSpace;
                        if(gap1>gap2) {
                            newY = -(720-this.getTrueHeight()-this.s_verSpace);
                        }
                        else {
                            newY = this.s_verSpace;
                        }
                    }

                    if(newY < -(720 + this.s_verSpace - this.getTrueHeight())
                        && newY < -this.s_verSpace)
                    {
                        var gap1:number=0,gap2:number=0;
                        gap1 = newY+720 + this.s_verSpace - this.getTrueHeight();
                        gap2 = this.s_verSpace;
                        if(gap1<gap2) {
                            newY = -this.s_verSpace;
                        }
                        else {
                            newY = -(720 + this.s_verSpace - this.getTrueHeight());
                        }
                    }

                    this.midContentGroup.x = newX;
                    this.midContentGroup.y = newY;

                    var pt:gdeint.CPoint;
                    pt = new gdeint.CPoint();
                    pt.m_x = -this.midContentGroup.x;
                    pt.m_y = -this.midContentGroup.y + this.m_visibleStartY;

                    this.m_UIPresenter.inpImgSelPt(pt);

                    this.dispatchEvent(this.m_evtImgDragEnd); // No parmameter passed. Calculate inside this func!!

                }
            }
            else {
            }
        }

        private touchEnd(evt:egret.TouchEvent):void {
            this.m2_isImgMoving = false;

            this.dispatchEvent(this.m_evtImgDragEnd);
        }

        public setVisibleStartY(vsy:number) {
            this.m_visibleStartY = vsy;
            this.m_UIPresenter.m_visibleStartY = vsy;
        }

        public setTrueWidth(tw: number): void {
            this.m_trueWidth = tw;
            if(this.m2_cc) {
                if(this.width < this.m_trueWidth) {
                    this.width = this.m_trueWidth;
                }
                this.redrawBg();
            }
        }

        public getTrueWidth():number {
            return this.m_trueWidth;
    //        return 480;
        }

        public setTrueHeight(th:number) :void {
            this.m_trueHeight = th;
            this.redrawBg();
        }
        
        public getTrueHeight():number {
            return this.m_trueHeight;
        }
    }
}
