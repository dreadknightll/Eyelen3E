/**
 *
 * 实现本接口表示可以作为各种 noitfication 的父界面。
 * 不依赖 INotification，由 INotification 指定父容界面。
 *
 */
interface INotification {
    setParent(p:INotiParent);
    getParent():INotiParent;
}
