/**
 *  /src/components/IScoreFlagRect.ts
 * 数字点阵转换器接口。用于把数字转换成点阵。程序中把得分以三行 旗子/点/叉 方式输出就要用到本转换器。
 */
interface IScoreFlagRect {
    setCnts(v1: number,v2: number): void; // 设置数值。
    getFlagArr(): Array < Array < number >>; // 获取当前数值转换得到的点阵。
}
