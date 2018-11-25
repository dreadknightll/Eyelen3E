/**
 *
 * 功能类似 window.alert。区别在于提示的是消息气球而不是对话框。
 *
 */
namespace eyelen3E {
    export class CBalloonTip extends eui.Panel {
        public constructor() {
            super();
            this.x = 0;
            this.y = 0;

            this.m_evtClose = new CBalloonTipEvent(CBalloonTipEvent.EVT_CLOSE);
        }

        content: eui.Label;
        closeBtn: eui.Button;
        arrow: eui.Image;

        private cc_content: string;
        private m_cc: boolean = false;
        private m_evtClose: CBalloonTipEvent;

        public childrenCreated(): void {
            this.m_cc = true;
            this.content.text = this.cc_content;
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtn,this);

            var tw = egret.Tween.get( this.arrow , { loop:true});
            tw.to({ y: 355 },200).wait(300).to({ y: 345 },200).wait(100);
        }

        private onCloseBtn(evt: egret.TouchEvent): void {
            this.close();
            this.dispatchEvent(this.m_evtClose);
        }

        public setContent(con: string) {
            this.cc_content = con;
            if(this.m_cc) {
                this.content.text = this.cc_content;
            }
        }
    }
}