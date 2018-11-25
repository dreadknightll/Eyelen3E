module.exports = function(grunt) {
    grunt.initConfig({
        ts: {
            default : {
                src: ["**/*.ts", "!node_modules/**/*.ts",
                    "../libs/modules/libGdeint/libGdeint.d.ts",
                    "inc\funcs\eyelen\funcs_Eyelen3E.ts",
                    "UI\containers\Eyelen\IEyelenPraContainer.ts",
                    "UI\containers\Eyelen\CEyelenPraContainer.ts",
                    "components\praMachine\Eyelen\IPlainLenPraMachine.ts",
                    "components/praMachine/Eyelen/IGridLenPraMachine.ts",
                    "components\lenCheckers\ILenChecker.ts",
                    "components\lenCheckers\IPlainLenChecker.ts",
                    "components\lenCheckers\ILenCheckerWithCa.ts",
                    "components\UIComponents\common\IScoreFlagRect.ts",
                    "components\UIComponents\common\CScoreFlagRect.ts",
                    "components\winModels\common\IWinModel.ts",
                    "components\winModels\common\ITMBWinModel.ts",
                    "components\winModels\Eyelen\IEyelen3EWinModelV2.ts",
                    "components\winModels\Eyelen\CEyelen3EWinModelV2.ts",
                    "components/lenCheckers/IGridLenChecker.ts",
                    "components/lenCheckers/ILenCheckerEasy.ts",
                    "components/lenCheckers/CLenCheckerEasy.ts",
                    "components\lenCheckers\ILenCheckerDifficult.ts",
                    "components\lenCheckers\CLenCheckerDifficult.ts",
                    "components\renderFilters\Eyelen\IEyelen3ERenderFilter.ts",
                    "components/renderFilters/Eyelen/CNoChangeRenderFilterLen.ts",
                    "components/renderFilters/Eyelen/CEyelen3ERenderFilter.ts",
                    "components\praMachine\common\IPraMachine.ts",
                    "components\praMachine\Eyelen\ILenPraMachine.ts",
                    "components/praMachine/Eyelen/CEyelen3EPraMachineEasy.ts",
                    "components/praMachine/Eyelen/CEyelen3EPraMachineDifficult.ts",
                    "inc/structs/eyelen/CLen.ts",
                    "test/mocks/CMockPage.ts"

                ]
            }
        }
    });
    grunt.loadNpmTasks("grunt-ts");
    grunt.registerTask("default", ["ts"]);
};
