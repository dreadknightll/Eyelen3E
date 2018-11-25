/*
    1.Set m_adaptee.
    2.m_adaptee children created.
    3.firstShow.
    4.showPage/hidePage.
*/

class CPage2EyelenPraContainerAdapter extends gdeint.CPage {

        public m_adaptee:IEyelenPraContainer;

        public constructor() {
                super();
        }

        public show():void {
                super.show();
                this.m_adaptee.show();
        }

        public hide():void {
                super.hide();
                this.m_adaptee.hide();
	}

};