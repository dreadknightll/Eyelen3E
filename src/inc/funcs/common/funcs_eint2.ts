/*
 * 
 * 函数杂烩。（依赖于 egret）
 * 
 */

var g2_sndObjs: Array<egret.Sound> = new Array<egret.Sound>();
var g2_curSndTag: number = 0;
var g2_sndChls: Array<egret.SoundChannel> = Array<egret.SoundChannel>();

function playBtnSnd_default() {
    g2_sndObjs[g2_curSndTag] = RES.getRes("buttonSnd_mp3");
    g2_sndChls[g2_curSndTag] = g2_sndObjs[g2_curSndTag].play(0,1);
    g2_curSndTag = (g2_curSndTag + 1) % 2;

}

function playBtnSnd_iOS() {

    if(null != g2_sndChls[0]) {
        g2_sndChls[0].stop();
    }

    g2_sndObjs[g2_curSndTag] = RES.getRes("buttonSnd_mp3");
    g2_sndChls[0] = g2_sndObjs[g2_curSndTag].play(0,1);
}

function playBtnSnd() {
    if(S_BUILD_FOR == S_NATIVE_IOS) {
        playBtnSnd_iOS();
    }
    else {
        playBtnSnd_default();
    }
}
