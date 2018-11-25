//  src/test/gruntfile.js
/*
    本产品的单元测试需要另行编译待测组件、测试所需的Mock等。
    上述编译任务由Grunt执行。本文件为任务配置文件。
*/

module.exports = function(grunt) {
    grunt.initConfig({
        ts: {
            default : {
                src: ["node_modules/*.ts", "!node_modules/**/*.ts",
                    "../../libs/modules/libGdeint/libGdeint.d.ts",
                    "../inc/structs/eyelen/CLen.ts",
                    "../inc/funcs/eyelen/funcs_Eyelen3E.ts",
                    "../components/finders/Eyelen/IEyelen3EResNameFinder.ts",
                    "../components/finders/Eyelen/CEyelen3EResNameFinder.ts",
                    "../components/finders/Eyelen/CEyelen3EHTTPSResUrlFinder.ts",
                    "../UI/containers/common/*.ts",
                    "../UI/containers/Eyelen/*.ts",
                    "../UI/scenes/common/I*.ts",
                    "../UI/scenes/Eyelen/I*.ts",
                    "../components/**/I*.ts",
                    "../components/praMachine/Eyelen/IPlainLenPraMachine.ts",
                    "../components/praMachine/Eyelen/IGridLenPraMachine.ts",
                    "../components/lenCheckers/ILenChecker.ts",
                    "../components/lenCheckers/IPlainLenChecker.ts",
                    "../components/lenCheckers/ILenCheckerWithCa.ts",
                    "../components/UIComponents/common/IScoreFlagRect.ts",
                    "../components/UIComponents/common/CScoreFlagRect.ts",
                    "../components/winModels/common/IWinModel.ts",
                    "../components\\winModels\\common\\ITMBWinModel.ts",
                    "../components\\winModels\\Eyelen\\IEyelen3EWinModelV2.ts",
                    "../components\\winModels\\Eyelen\\CEyelen3EWinModelV2.ts",
                    "../components\\calibrate\\Basic_CaliPresenter.ts",
                    "../components\\calibrate\\CCaliPresenterAdapter.ts",
                    "../components/lenCheckers/IGridLenChecker.ts",
                    "../components/lenCheckers/ILenCheckerEasy.ts",
                    "../components/lenCheckers/CLenCheckerEasy.ts",
                    "../components\\lenCheckers\\ILenCheckerDifficult.ts",
                    "../components/lenCheckers/CLenCheckerDifficult.ts",
                    "../components\\renderFilters\\Eyelen\\IEyelen3ERenderFilter.ts",
                    "../components/renderFilters/Eyelen/CNoChangeRenderFilterLen.ts",
                    "../components/renderFilters/Eyelen/CEyelen3ERenderFilter.ts",
                    "../components\\praMachine\\common\\IPraMachine.ts",
                    "../components\\praMachine\\Eyelen\\ILenPraMachine.ts",
                    "../components/praMachine/Eyelen/CEyelen3EPraMachineEasy.ts",
                    "../components/praMachine/Eyelen/CEyelen3EPraMachineDifficult.ts",
                    "mocks/*.ts"

                ]
            }
        }
    });
    grunt.loadNpmTasks("grunt-ts");
    grunt.registerTask("default", ["ts"]);
};
