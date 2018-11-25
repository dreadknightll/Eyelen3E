//  src/test/test_subCmps.js
/*
  测试3行10列显示矩阵模型。该模型用于当前得分显示。
*****************************************************************/

QUnit.test( "test_CScoreFlagRect", function( assert ) {
  var fr = new CScoreFlagRect();
  fr.setCnts(12);
  var resArr = fr.getFlagArr();

  //选几个点。
  assert.equal(resArr[0][0] , 1);
  assert.equal(resArr[0][9] , 1);
  assert.equal(resArr[1][1] , 1);
  assert.equal(resArr[1][2] , 0);
  assert.equal(resArr[2][0] , 0);

});

