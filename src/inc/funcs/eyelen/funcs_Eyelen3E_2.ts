/*
 * 函数杂烩（尺眼通3加强版专用函数）。
 */ 

function getCurScene():IEyelenPraScene
{
    switch(g_level)
    {
        case 0:
            return null;

        case 1:
//            return g_praEasyScene;
            return null;
//            break;
            
        case 2:
            return null;
//            break;
            
        case 3:
            return g_praDifficultScene;
//            break;
    }
    return g_praDifficultScene;
}
