/**
 *
 * 实现本接口表示可以作为各种 noitfication 的父界面。
 * 不依赖 INotification，由 INotification 指定父容界面。
 * 由于不依赖 INotification，所以消息可以传达给下一个 INotiParent 处理。
 *
 */
interface INotiParent {
    disableForNoti():void;
    resumeAfterNoti():void;
    applyFunc(func:any , argArr:Array<any>):void;
    getNotiLayer():IDiv;
}
