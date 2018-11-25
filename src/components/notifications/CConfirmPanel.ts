
/***********************************************************
* /src/components/notifications/CConfirmPanel.ts
* 功能类似于 window.confirm 。作为显示容器的插件使用。
*
************************************************************/

namespace eyelen3E {
    export class CConfirmPanel extends eui.Panel implements IConfirmDlg,IContainerPlugin {
        public constructor() {
            super();
            this.x = 0;
            this.y = 0;
        }
        content:eui.Label;
        yesBtn:eui.Button;
        noBtn: eui.Button;
        bgGrp:eui.Group;

        setParent(p:INotiParent) {
            this.m_parent = p;
        }
        getParent():INotiParent {
            return this.m_parent;
        }

        public setCloseListener(func: Function) {
            this.m_closeListener = func;
        }

        public _setContent(content:string) {
            this.m_content = content;
            
            if(this.m_cc) {
                this.content.text = this.m_content;
            }
        }

        public showDlg(): void {

            this.title = "确认";

            var ret:boolean;
            this.getParent().getNotiLayer().addChild(CDispObj2EgretDOAdapter.from(this));
            this.getParent().getNotiLayer().show();
            this.show();

            this.getParent().disableForNoti();

            this.addEventListener(CConfirmPanelEvent.EVT_CLOSE,this.m_closeListener,this.getParent());
        }

        public _getParentContainer(): IUIContainer {
            window.alert("Don't use _getParentContainer() here. Use getParent() instead.");
            return this.m_parentContainer;
        }

        _setParentContainer(c:IUIContainer): void {
            this.m_parentContainer = c;
        }
        
        public getResult(): boolean {
            return false;
        }

        public setSceneRect(x:number , y:number , wid:number , hei:number) {
            this.x = x + (wid - 400)/2;
            this.y = y + (hei - 280)/5*2;
        }

        private m_parent:INotiParent;
        private m_parentContainer:IUIContainer;
        private m_closeListener;
        private m_content;

        private m_cc:boolean = false;
        private m_bg:egret.Shape;
        public m_ret: boolean = false;

        public childrenCreated():void {
            this.m_cc = true;
            this.content.text = this.m_content;
            this.yesBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onYesBtn , this);
            this.noBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNoBtn,this);

            this.m_bg = new egret.Shape();
            this.m_bg.graphics.beginFill(0xaaaaFF);
            this.m_bg.graphics.drawRect(0,0,this.width,this.height);
            this.m_bg.graphics.endFill();
            this.bgGrp.addChild(this.m_bg);
        }

        private onYesBtn(evt:egret.TouchEvent): void {
            this.m_ret = true;
            this.getParent().getNotiLayer().hide();
            this.close();
            var params:Array<any> = new Array<any>();
            params[0] = this.m_ret;
            this.getParent().applyFunc(this.m_closeListener , params);
            this.getParent().resumeAfterNoti();
        }

        private onNoBtn(evt: egret.TouchEvent): void {
            this.m_ret = false;
            this.getParent().getNotiLayer().hide();
            this.close();
            var params:Array<any> = new Array<any>();
            params[0] = this.m_ret;
            this.getParent().applyFunc(this.m_closeListener , params);
            this.getParent().resumeAfterNoti();
        }

        public getRet():boolean {
            return this.m_ret;
        }

        public show():void {
            this.visible = true;
        }

        public hide():void {
            this.visible = false;
        }

        public isVisible():boolean {
            return this.visible;
        }
    }
}