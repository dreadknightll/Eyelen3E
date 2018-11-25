// TypeScript file
interface ILenChecker {
    setCorreOriLen(len:number):void;
//    setInputDispLen(len:number):void; // Remove this, or gridLenChecker will be incompatible.
    checkLen(): number;
};
