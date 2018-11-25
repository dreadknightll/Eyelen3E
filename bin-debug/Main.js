// Main.ts
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2018-present, Li Liang.
//  All rights reserved.
//
//////////////////////////////////////////////////////////////////////////////////////
// 宜英（eint或gdeint）是本作者设立的个人品牌。
// 本程序采用北京白鹭公司的白鹭引擎为核心。
// 本程序调用了libGdeint库。libGdeint是本作者开发的共享库，供多套软件调用，命名空间主要是gdeint。
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
/**************************************************
 *
 * Main类为程序入口类。
 *
**************************************************/
//var S_IS_IOS: boolean = false; // 若要以 iOS app形式发布程序，则应把此开关设为 true。
var S_WEB = 1;
var S_NATIVE_ANDROID = 2;
var S_NATIVE_IOS = 3;
var S_NATIVE_WP = 4;
var S_WECHAT = 5; // 发布成微信小游戏。另须移除项目里的resoure/pics目录。否则体积太大。
var S_BUILD_FOR = S_WECHAT;
var S_NO_IMG_MODE = true; // 无图模式开关。只在S_WECHAT模式有效。开启后Pic从本地读取，且不使用img。
var S_CHECK_UPDATE_ANDROID = false; // 是否检查更新。
var g_winWidth; // 保存屏幕宽度。
var g_winHeight; // 保存屏幕高度。
var g_console = new egret.TextField(); // 调试终端。
var s_topSpaceHeight = 0; // 顶部空白条的高度。默认：0，iOS：0或25。横竖校准等调试时可考虑增加到300。
if (S_BUILD_FOR == S_NATIVE_IOS) {
    s_topSpaceHeight = 0;
}
var g_scenePos; // 此处gdeint为libGdeint使用的命名空间。
var g_scale = 1;
var g_praDifficultScene; // 困难难度练习场景。
var g_praEasyScene; // 简单难度练习场景。
var g_resCache = {};
/*var g_imgResCache:{[index:string]:egret.Texture};
var g_jsonResCache:{[index:string]:JSON};*/
var g_resLoader; //资源读取器。用于通过资源名读取已加载到缓存的资源。可灵活选择从本地读取还是通过网络读取。可供显示容器使用。
//简单难度显示容器。该容器除了包含练习场景，还可注入各式各样的提示框、功能对话框等插件。此设计便于代码测试和重用。
var g_praEasyContainer;
var g_praDifficultContainer; //困难难度显示容器。
var g_welcomeScene; // 欢迎屏幕画面。
var g_mainMenu; // 主菜单画面
//画面采用分层设计。不同类型的元素应显示在不同的层上，以维持合理的前后顺序。
var g_sceneLayer = new egret.DisplayObjectContainer(); // 场景层。
var g_dlgLayerContainer = new egret.DisplayObjectContainer(); // 对话框层。
var g_notiLayerContainer = new egret.DisplayObjectContainer(); // 提示层。
var g_level = 0; // 当前练习的难度。0：未知。1：简单。2：中等。3：困难。
var g_pageJumper; // 页面跳转器。在libGdeint里实现。用一个页面跳转器把上面的页面串起来。
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        //程序开始运行时会自动执行此构造函数。
        //但由于此时页面元素尚未准备好，页面元素相关的操作须转到createChildren里进行。
        var _this = _super.call(this) || this;
        // 初始化一些全局变量：
        g_scenePos = new gdeint.CPoint();
        g_console.size = 24;
        g_console.x = 80;
        g_console.y = 60;
        g_console.width = 600;
        g_console.height = 800;
        g_console.textColor = 0xFF0000;
        g_pageJumper = new gdeint.CPageJumper();
        return _this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //获取舞台宽度和高度：
        g_winWidth = this.stage.stageWidth;
        g_winHeight = this.stage.stageHeight;
        //计算适配屏幕应采用的图形缩放比例和起始显示坐标。新版白鹭引擎下可考虑去掉：
        var scaleX = g_winWidth / 480;
        var scaleY = g_winHeight / 800;
        if (scaleX < scaleY) {
            g_scale = scaleX;
            g_scenePos.m_x = 0;
            g_scenePos.m_y = (g_winHeight - 800 * g_scale) / 2;
        }
        else {
            g_scale = scaleY;
            g_scenePos.m_x = (g_winWidth - 480 * g_scale) / 2;
            g_scenePos.m_y = 0;
        }
        //把三个核心自定义层添加到舞台：
        this.addChild(g_sceneLayer);
        this.addChild(g_dlgLayerContainer);
        this.addChild(g_notiLayerContainer);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //注入素材解析器，以对界面等素材文件进行解析和显示。
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runProgram().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runProgram = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView1, loadingView2, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 12, , 13]);
                        loadingView1 = new LoadingUI_NoUI();
                        this.stage.addChild(loadingView1);
                        loadingView1.visible = true;
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        if (!(S_BUILD_FOR == S_WECHAT)) return [3 /*break*/, 5];
                        if (!S_NO_IMG_MODE) return [3 /*break*/, 3];
                        return [4 /*yield*/, RES.loadConfig("resource/picRes_NoImg.res.json", "resource/")];
                    case 2:
                        _a.sent();
                        g_resLoader = new CEgretDefaultResLoader();
                        return [3 /*break*/, 4];
                    case 3:
                        g_resLoader = new CNetResLoaderWithEgret();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, RES.loadConfig("resource/picRes_WebGL.res.json", "resource/")];
                    case 6:
                        _a.sent();
                        g_resLoader = new CEgretDefaultResLoader();
                        _a.label = 7;
                    case 7: return [4 /*yield*/, this.loadTheme()];
                    case 8:
                        _a.sent(); // Theme里定义了exml皮肤和typescript类的对应关系。
                        return [4 /*yield*/, RES.loadGroup("logo", 0, loadingView1)];
                    case 9:
                        _a.sent(); //logo资源组有宜英logo等资源。
                        loadingView1.visible = false;
                        this.stage.removeChild(loadingView1);
                        loadingView2 = new LoadingUI_Eint_V2(); //起始画面的资源加载界面。已自定义。
                        loadingView2.setWinSize(g_winWidth, g_winHeight);
                        loadingView2.create();
                        this.stage.addChild(loadingView2);
                        loadingView2.visible = true;
                        return [4 /*yield*/, RES.loadGroup("eint", 0, loadingView2)];
                    case 10:
                        _a.sent(); //eint资源组有宜英通用的图片音乐等资源。
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView2)];
                    case 11:
                        _a.sent(); //preload资源组为系统默认资源组。未人工分类的资源都在这里。资源较多。
                        return [3 /*break*/, 13];
                    case 12:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     */
    Main.prototype.createScene = function () {
        g_praEasyScene = new eyelen3E.CPraEasyScene();
        if (S_BUILD_FOR == S_WECHAT && S_NO_IMG_MODE) {
            g_praEasyScene.m_NoImgMode = true;
        }
        g_dlgLayerContainer.addChild(g_praEasyScene.getDlgLayer().toEgretDispObjContainer());
        g_notiLayerContainer.addChild(g_praEasyScene.getNotiLayer().toEgretDispObjContainer());
        g_praDifficultScene = new eyelen3E.CPraDifficultScene();
        if (S_BUILD_FOR == S_WECHAT && S_NO_IMG_MODE) {
            g_praDifficultScene.m_NoImgMode = true;
        }
        g_dlgLayerContainer.addChild(g_praDifficultScene.getDlgLayer().toEgretDispObjContainer());
        g_notiLayerContainer.addChild(g_praDifficultScene.getNotiLayer().toEgretDispObjContainer());
        g_praEasyContainer = new CEyelenPraContainer();
        if (S_BUILD_FOR == S_WECHAT && S_NO_IMG_MODE) {
            g_praEasyContainer.m_NoImgMode = true;
        }
        g_praEasyContainer.setResLoader(g_resLoader); // 显示容器里包含一个资源加载器，随时加载资源。
        if (S_BUILD_FOR == S_WECHAT) {
            if (!S_NO_IMG_MODE) {
                g_praEasyContainer.setResNameFinder(new CEyelen3EHTTPSResUrlFinder());
            }
        }
        else {
        }
        g_praEasyContainer.setPraScene(g_praEasyScene);
        var cad = new eyelen3E.CAlertPanel();
        cad.setSceneRect(g_scenePos.m_x, g_scenePos.m_y, 480 * g_scale, 800 * g_scale); // 把主场景的位置和尺寸告诉警告框插件，让其可以自行计算警告框的位置和尺寸。
        g_praEasyContainer.setAlertDlg(cad);
        var cp = new eyelen3E.CConfirmPanel();
        cp.setSceneRect(g_scenePos.m_x, g_scenePos.m_y, 480 * g_scale, 800 * g_scale);
        g_praEasyContainer.setConfirmDlg(cp);
        var pui = new eyelen3E.CPreloaderUI();
        pui.setSceneRect(g_scenePos.m_x, g_scenePos.m_y, 480 * g_scale, 800 * g_scale);
        g_praEasyContainer.setPreloaderUI(pui);
        g_sceneLayer.addChild(pui);
        g_praEasyContainer.setPreloaderUI(pui);
        var cd = new eyelen3E.CCaliDlg();
        cd.setSceneRect(g_scenePos.m_x, g_scenePos.m_y, 480 * g_scale, 800 * g_scale);
        cd.hide();
        g_praEasyContainer.setCaliDlg(cd);
        g_praDifficultContainer = new CEyelenPraContainer();
        if (S_BUILD_FOR == S_WECHAT && S_NO_IMG_MODE) {
            g_praDifficultContainer.m_NoImgMode = true;
        }
        g_praDifficultContainer.setResLoader(g_resLoader);
        if (S_BUILD_FOR == S_WECHAT) {
            if (!S_NO_IMG_MODE) {
                g_praDifficultContainer.setResNameFinder(new CEyelen3EHTTPSResUrlFinder());
            }
        }
        g_praDifficultContainer.setPraScene(g_praDifficultScene);
        var cad2 = new eyelen3E.CAlertPanel();
        cad2.setSceneRect(g_scenePos.m_x, g_scenePos.m_y, 480 * g_scale, 800 * g_scale);
        g_praDifficultContainer.setAlertDlg(cad2);
        var cp2 = new eyelen3E.CConfirmPanel();
        cp2.setSceneRect(g_scenePos.m_x, g_scenePos.m_y, 480 * g_scale, 800 * g_scale);
        g_praDifficultContainer.setConfirmDlg(cp2);
        var pui2 = new eyelen3E.CPreloaderUI();
        pui2.setSceneRect(g_scenePos.m_x, g_scenePos.m_y, 480 * g_scale, 800 * g_scale);
        pui2.hide();
        g_sceneLayer.addChild(pui2);
        g_praDifficultContainer.setPreloaderUI(pui2);
        var cd2 = new eyelen3E.CCaliDlg();
        cd2.setSceneRect(g_scenePos.m_x, g_scenePos.m_y, 480 * g_scale, 800 * g_scale);
        cd2.hide();
        g_praDifficultContainer.setCaliDlg(cd2);
        g_welcomeScene = new eyelen3E.CWelcomeScene_Eyelen3E();
        g_mainMenu = new eyelen3E.CMainMenu();
        g_mainMenu.setTrueWidth(this.stage.stageWidth);
        g_mainMenu.setTrueHeight(this.stage.stageHeight);
        g_mainMenu.visible = false;
        g_sceneLayer.addChild(g_welcomeScene);
        g_welcomeScene.scaleX = g_scale;
        g_welcomeScene.scaleY = g_scale; //scaleX、scaleY保持相等，确保横竖检验功能正常。
        g_welcomeScene.x = g_scenePos.m_x;
        g_welcomeScene.y = g_scenePos.m_y;
        var welcomeSceneAdapter = new CPage2EuiAdapter();
        welcomeSceneAdapter.m_adaptee = g_welcomeScene;
        var mainMenuSceneAdapter = new CPage2EuiAdapter();
        mainMenuSceneAdapter.m_adaptee = g_mainMenu;
        var praEasyContainerAdapter = new CPage2EyelenPraContainerAdapter();
        praEasyContainerAdapter.m_adaptee = g_praEasyContainer;
        var praDifficultContainerAdapter = new CPage2EyelenPraContainerAdapter();
        praDifficultContainerAdapter.m_adaptee = g_praDifficultContainer;
        // 把以上场景添加到页面跳转器，方便跳转。
        g_pageJumper.setPage("WelcomeScene", welcomeSceneAdapter);
        g_pageJumper.setPage("MainMenu", mainMenuSceneAdapter);
        g_pageJumper.setPage("PraEasyScene", praEasyContainerAdapter);
        g_pageJumper.setPage("PraDifficultScene", praDifficultContainerAdapter);
        g_praDifficultScene.setWinWidth(g_winWidth);
        g_praDifficultScene.setWinHeight(g_winHeight);
        g_praDifficultScene.hide();
        g_sceneLayer.addChild(g_praDifficultScene); // 把场景添加到场景显示层。
        g_praEasyScene.setWinWidth(g_winWidth);
        g_praEasyScene.setWinHeight(g_winHeight);
        g_praEasyScene.hide();
        g_sceneLayer.addChild(g_praEasyScene);
        g_mainMenu.visible = false;
        g_mainMenu.width = this.stage.stageWidth;
        g_mainMenu.height = this.stage.stageHeight;
        g_sceneLayer.addChild(g_mainMenu);
        g_sceneLayer.addChild(g_console);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
