/***********************************************************
* /src/components/notifications/CAlertPanel.ts
* 功能类似于 window.alert 。作为显示容器的插件使用。
*
************************************************************/

namespace eyelen3E {
    export class CAlertPanel extends eui.Panel implements IAlertDlg,IContainerPlugin {

        private m_parent:INotiParent;
        private m_parentContainer:IUIContainer;
        private m_closeListener:Function;

        content:eui.Label;
        closeBtn:eui.Button;
        private cc_content:string;
        private m_cc:boolean = false;

        public constructor() {
            super();
            this.visible = false;
            this.x = 0;
            this.y = 0;
        }

        /*
            设置父窗体。
        */
        public setParent(p:INotiParent) {
            this.m_parent = p;
        }

        public getParent():INotiParent {
            return this.m_parent;
        }

        public setCloseListener(func:Function):void {
            this.m_closeListener = func;
        }

        /*
            设置要提示的内容。
        */
        public setContent(con:string):void {
            this.cc_content = con;
            if(this.m_cc) {
                this.content.text = this.cc_content;
            }
        }

        /*
            显示警告框。
        */
        public showDlg():void {
            this.getParent().getNotiLayer().addChild(CDispObj2EgretDOAdapter.from(this));
            this.getParent().getNotiLayer().show();
            this.visible = true;
            this.getParent().disableForNoti();
        }


        /*
            传入父场景的大小和坐标偏移量，以便根据父场景确定本框的显示位置。
        */
        public setSceneRect(x:number , y:number , wid:number , hei:number):void 
        {
            this.x = x + (wid-300)/2;
            this.y = y + (hei-300)/5*2;
        }

        /*
            设置父容器。因实现多接口所以难以避免代码重复。
        */
        public _setParentContainer(pc:IUIContainer):void {
            this.m_parentContainer = pc;
        }

        public _getParentContainer(): IUIContainer {
            window.alert("Don't use _getParentContainer() here. Use getParent() instead.");
            return this.m_parentContainer;
        }

        public childrenCreated():void {
            this.m_cc = true;
            this.content.text = this.cc_content;
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onCloseBtn , this);
        }

        private onCloseBtn(evt:egret.TouchEvent): void {
            this.visible = false;
            this.getParent().getNotiLayer().hide();//.visible = false;
            this.getParent().applyFunc(this.m_closeListener,null);
            this.getParent().resumeAfterNoti();
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