/*
 * /src/test/test_UIPresenter.js
 * 测试各个 presenter。
 * （未完成）
 */ 
QUnit.test("test_UIPresenters",function( assert ) {
    /*
     * 测试调用渲染过滤器。
     */ 
    function testWithRenderFilter() {
        var up,rf,scrImgRect;
        up = new CLenPraPresenter();

        var imgSelPt = new CPoint();
        imgSelPt.m_x = -50;
        imgSelPt.m_y = -70;
/*        up.m_imgSelRect.m_left = -50;
        up.m_imgSelRect.m_top = -70;*/
        up.setImgSelPt(imgSelPt);
        up.setImgWidth(200);
        up.setImgHeight(300);
        scrImgRect = up.rfgetScrImgRect();
        equal(scrImgRect.m_left,50);
        equal(scrImgRect.m_top,70);
        equal(scrImgRect.m_width,200);
        equal(scrImgRect.m_height,300);

//        rf = new CRenderFilterWithCa();
        rf = new CEyelen3ERenderFilter();
        up.setRenderFilter(rf);
        up.m_renderFilter.setCaRat(2);
        up.syncFromRenderFilter();
        scrImgRect = up.rfgetScrImgRect();

        equal(scrImgRect.m_left,100);
        equal(scrImgRect.m_top,70);
        equal(scrImgRect.m_width,400);
        equal(scrImgRect.m_height , 300);

    }

    /*
     * 测试缩略图计算。
    */
    function testWithThumb() {
        var up;
        var imgRect , imgSelRect;
        var thRect , thSelRect;

        up = new CLenPraPresenter();
        up.s_setThumbAreaX(30);
        up.s_setThumbAreaY(20);
        up.s_setThumbAreaWidth(400);
        up.s_setThumbAreaHeight(200);
        up.s_setThMaxWidth(300);
        up.s_setThMaxHeight(150);

        imgRect = new CRect();
        imgRect.m_width = 400;
        imgRect.m_height = 500;
        imgSelRect = new CRect();
        imgSelRect.m_left = 70;
        imgSelRect.m_top = 20;
        imgSelRect.m_width = 300;
        imgSelRect.m_height = 250;

        up.setImgWidth(imgRect.m_width);
        up.setImgHeight(imgRect.m_height);
        up.m_imgSelRect = imgSelRect;

        thRect = up.rfgetScrThumbRect();
        thSelRect = up.rfgetScrThumbSelRect();

        equal(thRect.m_left,170);
        equal(thRect.m_top,45);
        equal(thRect.m_width , 120);
        equal(thRect.m_height , 150);

    }

    /*
        测试校准系数改变后缩略图框的位置。
    */
    function testChgCaRat() {
        var up,rf,scrImgRect;
        up = new CLenPraPresenter();
        up.s_setThumbAreaX(30);
        up.s_setThumbAreaY(20);
        up.s_setThumbAreaWidth(400);
        up.s_setThumbAreaHeight(200);
        up.s_setThMaxWidth(300);
        up.s_setThMaxHeight(150);

        up.setImgSelWidth(150);
        up.setImgSelHeight(250);
        var tmpImgSelPt = new CPoint();
        tmpImgSelPt.m_x = -50;
        tmpImgSelPt.m_y = -70;
        up.setImgSelPt(tmpImgSelPt);
        up.setImgWidth(200);
        up.setImgHeight(300);
        scrImgRect = up.rfgetScrImgRect();
// Img rect.
        equal(scrImgRect.m_left,50);
        equal(scrImgRect.m_top,70);
        equal(scrImgRect.m_width,200);
        equal(scrImgRect.m_height,300);

        thRect = up.rfgetScrThumbRect();
        thSelRect = up.rfgetScrThumbSelRect();
// Thumb rect and thumbSel rect.
        equal(thRect.m_left,180);
        equal(thRect.m_top,45);
        equal(thRect.m_width , 100);
        equal(thRect.m_height , 150);
        equal(thSelRect.m_left,155);
        equal(thSelRect.m_top,10);
        equal(thSelRect.m_width , 75);
        equal(thSelRect.m_height , 125);

//        rf = new CRenderFilterWithCa();
        rf = new CEyelen3ERenderFilter();
        up.setRenderFilter(rf);
        up.m_renderFilter.setCaRat(2);
        up.syncFromRenderFilter();
        scrImgRect = up.rfgetScrImgRect();
// Scr img rect after ca.
        equal(scrImgRect.m_left,100);
        equal(scrImgRect.m_top,70);
        equal(scrImgRect.m_width,400);
        equal(scrImgRect.m_height , 300);

        // 1.Chang from presenter. 

        up.setCaRat(1.5);
        scrImgRect = up.rfgetScrImgRect();
        thRect = up.rfgetScrThumbRect();
        thSelRect = up.rfgetScrThumbSelRect();

            // Scr img rect after ca.
        equal(scrImgRect.m_left,75);
        equal(scrImgRect.m_top,70);
        equal(scrImgRect.m_width,300);
        equal(scrImgRect.m_height , 300);

            // Thumb rect after ca:
        equal(thRect.m_left,155);
        equal(thRect.m_top,45);
        equal(thRect.m_width , 150);
        equal(thRect.m_height , 150);
            // Thumb selRect after ca:
        equal(thSelRect.m_left,117.5);
        equal(thSelRect.m_top,10);
        equal(thSelRect.m_width , 75);
        equal(thSelRect.m_height , 125);

        // 2.Change from render filter.
        up.m_renderFilter.setCaRat(2.5);
        up.syncFromRenderFilter();
        scrImgRect = up.rfgetScrImgRect();
        thRect = up.rfgetScrThumbRect();
        thSelRect = up.rfgetScrThumbSelRect();

            // Scr img rect after ca.
        equal(scrImgRect.m_left,125);
        equal(scrImgRect.m_top,70);
        equal(scrImgRect.m_width,500);
        equal(scrImgRect.m_height , 300);
            // Thumb rect after ca:
        equal(thRect.m_left,105);
        equal(thRect.m_top,45);
        equal(thRect.m_width , 250);
        equal(thRect.m_height , 150);
            // Thumb selRect after ca:
        equal(thSelRect.m_left,42.5);
        equal(thSelRect.m_top,10);
        equal(thSelRect.m_width , 75);
        equal(thSelRect.m_height , 125);
    }

    testWithRenderFilter();
    testWithThumb();
    testChgCaRat();

    // 界面调整或发现bug在此添加测试用例。


});
