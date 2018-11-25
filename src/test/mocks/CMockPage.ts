// UI/scenes/Eyelen/CCommonEyelenPraScene.ts
/**
 *
 * 通用练习场景。简单难度练习场景和困难难度练习场景都从本类派生。 
 *
 */
class CMockPage extends gdeint.CPage {
    public m_visible:boolean;
    public m_pageName:string;
    show(): void {
        this.m_visible = true;
    }

    hide(): void {
        this.m_visible = false;
    }

    isVisible(): boolean {
        return this.m_visible;
    }
}
