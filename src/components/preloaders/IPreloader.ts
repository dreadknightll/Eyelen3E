/**
 *
 * @author 
 *
 */
interface IPreloader {
    setResList(l:Array<string>):void;
    setCompleteListener(lsner:Function,thisObj:any):void;
    setProgressListener(lsner:(cur:number,total:number)=>void,thisObj:any):void;

    preload():void;
}
