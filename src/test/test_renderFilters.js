// src/test/test_renderFilters.js ////////////////////////////////
/*
    测试输出过滤器。
*****************************************************************/

QUnit.test( "test_nochangeRenderFilter", function( assert ) {
    { // Test whether Dots converted corrected:
        var rf = new CNoChangeRenderFilter();
        var inpDot = new gdeint.CPoint();
        inpDot.m_x = 33;
        inpDot.m_y = 128;
        var outpDot;
        outpDot = rf.ptOConv(inpDot);
        assert.equal(outpDot.m_x , 33);
        assert.equal(outpDot.m_y , 128);

    }
});

QUnit.test( "test_eyelen3ERenderFilter", function( assert ) {
    { // 点转换（输出）：
        var rf = new CEyelen3ERenderFilter();
        var inpDot = new gdeint.CPoint();
        inpDot.m_x = 33;
        inpDot.m_y = 128;
        var outpDot;
        outpDot = rf.ptOConv(inpDot); // 未设置校准系数，转换后保持原样。
        assert.equal(outpDot.m_x , 33);
        assert.equal(outpDot.m_y , 128);

        rf.setCaRat(2);
        outpDot = rf.ptOConv(inpDot); // 已设置校准系数，转换后变换坐标。
        assert.equal(outpDot.m_x , 66);
        assert.equal(outpDot.m_y , 128);

    }
    { // 点转换（输入）：
        var rf = new CEyelen3ERenderFilter();
        var usrPt = new gdeint.CPoint();
        usrPt.m_x = 25;
        usrPt.m_y = 40;
        var resPt = rf.ptIConv(usrPt); // 未设置校准系数。
        assert.equal(resPt.m_x , 25);
        assert.equal(resPt.m_y , 40);
        rf.setCaRat(2);
        resPt = rf.ptIConv(usrPt);
        assert.equal(resPt.m_x , 12.5);
        assert.equal(resPt.m_y , 40);

    }
    { // 矩形转换（输出）：
        var rf = new CEyelen3ERenderFilter();
        var inpRect = new gdeint.CRect();
        inpRect.m_left = 70;
        inpRect.m_top = 90;
        inpRect.m_width = 223;
        inpRect.m_height = 445;
        var outpRect;
        outpRect = rf.rectOConv(inpRect); // 未设置校准系数，转换后保持原样。
        assert.equal(outpRect.m_left , 70);
        assert.equal(outpRect.m_top , 90);
        assert.equal(outpRect.m_width , 223);
        assert.equal(outpRect.m_height , 445);

        rf.setCaRat(0.8);
        outpRect = rf.rectOConv(inpRect); // 已设置校准系数。转换后坐标尺寸经过变换。
        assert.equal(outpRect.m_left , 56);
        assert.equal(outpRect.m_top , 90);
        assert.equal(outpRect.m_width , 178.4);
        assert.equal(outpRect.m_height , 445);
    }
    { // 矩形转换（输入）：
        var rf = new CEyelen3ERenderFilter();
        var usrRect = new gdeint.CRect();
        var resRect;
        usrRect.m_left = 80;
        usrRect.m_top = 110;
        usrRect.m_width = 210;
        usrRect.m_height = 310;

        resRect = rf.rectIConv(usrRect); // 未设置校准系数。
        assert.equal(resRect.m_left , 80);
        assert.equal(resRect.m_top , 110);
        assert.equal(resRect.m_width , 210);
        assert.equal(resRect.m_height , 310);

        rf.setCaRat(2);
        resRect = rf.rectIConv(usrRect);
        assert.equal(resRect.m_left , 40);
        assert.equal(resRect.m_top , 110);
        assert.equal(resRect.m_width , 105);
        assert.equal(resRect.m_height , 310);

    }
});
