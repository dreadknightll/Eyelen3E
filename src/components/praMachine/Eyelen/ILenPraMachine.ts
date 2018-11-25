// TypeScript file
interface ILenPraMachine extends IPraMachine {
    setLenArr(lenArr: Array<CLen>): void;
    nextLen():void;
    getCurLen():CLen;
    getLastLenRank():number;

}