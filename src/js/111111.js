/**
 * Created by m1342 on 2019/7/22.
 */
/**
 * 公共类
 * @authors Arafat @ http://www.ijiandou.com
 * @date    2018-03-26 10:00:00
 * @version v1.0.0
 */

// 取消默认滑动事件
$("body").bind("touchmove",function(e){e.preventDefault();});

// var musFlag = 1;
// 当用户第一次滑动屏幕，就加载音频文件
$("body").on("touchstart",function(){
    // if (musFlag==1) {
    //     camMus.play();
    //     camMus.stop();
    // }
});

// 启动动画
function startAct(){
    // $('.text0').fadeIn(500);
    $(".starBtn").show();
    $(".ldbg p").fadeOut(500);
    $('.loadPage').fadeOut(500);
    $('.container').fadeIn(500);
    setTimeout(function(){
        $(".clock").css({"width":"300%","top":"80%","left":"-100%","transform":"translateZ(400px) rotate(30deg)"});
        $(".fs").css({"transform":"translateZ(0) scale(1)","opacity":"1"});
        $(".text1").show();
        $(".text1 p").addClass("fadeInUp animated2");
        $(".text0").addClass("fadeOutDown animated");
    },1000);
    setTimeout(function(){
        $(".starBtn").css({"top":"10%","opacity":"1"});
        $(".role").css({"transform":"scale(1)","opacity":"1"});
    },2000);

    setTimeout(function(){
        firstAct();
        $(".fs").css({"transition-duration":"0s"});
        $(".role").css({"transition-duration":"0s"});
    },4000);

}

// 1.星星降落至婴儿车中，并提示用户滑动屏幕
var starFlag = 1;
function firstAct(){
    if (starFlag==1) {
        $(".starBtn").css({"top":"80%","opacity":"0"});
        setTimeout(function(){
            $(".gesture").hide();
            // 并提示用户滑动屏幕
            $(".clock").css({"transition-duration":"0s"});
            $(".clock").css({"transform":"translateZ(0) rotate(30deg)"});
            $(".slideTip").fadeIn(500);
        },2000);
        starFlag=0;
    }
}


// 初始化myScroll
var myScroll;
var thisX1 = 0;
var thisX2 = 0;
function loaded () {
    myScroll = new IScroll('#wrapper', {
        probeType: 3,
        mouseWheel: true,
        scrollY : false,         //滚动方向（垂直）
        scrollX : true,         //滚动方向（水平）
        indicators: [{
            el: document.getElementById('starfield1'),
            resize: false,
            ignoreBoundaries: true,
            speedRatioX: 0.2
        }, {
            el: document.getElementById('starfield2'),
            resize: false,
            ignoreBoundaries: true,
            speedRatioX: 0.12
        }]
    });
}
loaded();

myScroll.on('scroll', updatePosition);
var moveX;
function updatePosition() {
    sp = (this.x>>0)/(this.maxScrollX)*1000;
    moveX = this.x;
    console.log("Math.floor(sp):"+Math.floor(sp));
    // 调试专用
    // $(".console").html(Math.floor(sp));

    thisX1 = this.x*0.4;
    thisX2 = this.x*0.2;

    $(".role").removeClass("stop");
    $(".clock").css({"transform":"rotate("+(30-sp/2.78)+"deg)"});
    move();
}

// 滑动停止时，人物也停止动画
myScroll.on('scrollEnd', stopMove);
function stopMove(){
    $(".role").addClass("stop");
}

var thisRole = 1;
function move(){

    console.log(sp);
    if (sp<200) {
        $(".clast").hide();
        $(".slideTip").fadeOut(500);
    }
    if (sp>200) {
        $(".clast").show();
    }
    // 视差效果
    if (sp<=100) {
        var thisSP = sp-0;
        $(".cloud1").css({"transform":"translate3d("+(sp/1.5)+"px,0,0)"});
    }
    if (sp<=175) {
        var thisSP = sp-0;
        $(".cloud2").css({"transform":"translate3d("+(sp/1.7)+"px,0,0)"});
        $(".house").css({"transform":"translate3d("+(sp/1.6)+"px,0,0)"});
        $(".night").css({"transform":"translate3d("+(sp/1.5)+"px,0,0)"});
        $(".p1").css({"transform":"translate3d("+(sp/1.5)+"px,0,0)"});
    }
    if (sp>=145 && sp<175) {
        var thisSP = sp-145;
        $(".tree2").css({"transform":"translateZ(0) rotate("+(-90+(thisSP-0)*3)+"deg)"});
    }

    if (sp>=180 && sp<330) {
        var thisSP = sp-180;
        $(".house2").css({"transform":"translate3d("+(thisSP/1.3)+"px,0,0)"});
    }


    if (sp>=270 && sp<=290) {
        var thisSP = sp-270;
        $(".boy").css({"transform":"translateZ(0) rotate("+thisSP+"deg)"});
        $(".boy").css({"bottom":(264-thisSP*3.3)+"px","left":(1800+thisSP*4.4)+"px"});
    }

    if (sp>=270 && sp<440) {
        var thisSP = sp-270;
        $(".tree3").css({"transform":"translate3d("+(thisSP/1.6)+"px,0,0)"});
    }

    if (sp>=390 && sp<510) {
        var thisSP = sp-390;
        $(".wall").css({"transform":"translate3d("+(thisSP/1.5)+"px,0,0)"});
    }

    if (sp>=450 && sp<600) {
        var thisSP = sp-450;
        $(".tree4").css({"transform":"translate3d("+(thisSP/1.7)+"px,0,0)"});
    }

    if (sp>=530 && sp<800) {
        var thisSP = sp-530;
        $(".autumn").css({"transform":"translate3d("+(thisSP/1.5)+"px,0,0)"});
    }

    if (sp>=630 && sp<820) {
        var thisSP = sp-630;
        $(".table").css({"transform":"translate3d("+(thisSP/1.7)+"px,0,0)"});
    }

    if (sp>=750 && sp<910) {
        var thisSP = sp-750;
        $(".tree5").css({"transform":"translate3d("+(thisSP/1.5)+"px,0,0)"});
    }

    if (sp>=810) {
        var thisSP = sp-810;
        $(".grandpa").css({"transform":"translate3d("+(-thisSP/2)+"px,0,0)"});
    }

    // 人物变换 - 出生
    if(sp<124){
        thisRole = 1;
        $(".role")[0].className = "role role1";
    }
    // 学走路
    if(sp>=124 && sp<207){
        thisRole = 2;
        $(".role")[0].className = "role role2";
    }
    // 孩子玩耍
    if(sp>=207 && sp<290){
        thisRole = 3;
        $(".role")[0].className = "role role3";
    }
    // 青少年
    if(sp>=290 && sp<382){
        thisRole = 4;
        $(".role")[0].className = "role role4";
    }
    // 进入职场
    if(sp>=382 && sp<466){
        thisRole = 5;
        $(".role")[0].className = "role role5";
    }
    // 结婚
    if(sp>=466 && sp<560){
        thisRole = 6;
        $(".role")[0].className = "role role6";
    }
    // 生孩子
    if(sp>=560 && sp<624){
        thisRole = 7;
        $(".role")[0].className = "role role7";
    }
    // 事业有成
    if(sp>=624 && sp<706){
        thisRole = 8;
        $(".role")[0].className = "role role8";
    }
    // 子女结婚
    if(sp>=706 && sp<788){
        thisRole = 9;
        $(".role")[0].className = "role role9";
    }
    // 遛鸟
    if(sp>=788 && sp<873){
        thisRole = 10;
        $(".role")[0].className = "role role10";
    }
    // 带孙女玩
    if(sp>=873 && sp<956){
        thisRole = 11;
        $(".role")[0].className = "role role11";
    }
    // 变老逝去
    if(sp>=956){
        thisRole = 12;
        $(".role")[0].className = "role role12";
    }
    if (sp==1000) {
        $(".gesture").show();
        $(".ls").css({"transition-duration":"2s"});
        $(".role").css({"transition-duration":"1.5s"});
        $(".clock").css({"transform":"translateZ(400px) rotate(-330deg)"});
        setTimeout(function(){
            $(".role").css({"transform":"scale(0)","top":"30%","opacity":"0"});
            $(".starBtn").css({"top":"10%","opacity":"1"});
            setTimeout(function(){
                $(".starBtn").css({"left":"-30%","top":"60%"});
            },3000);
        },2000);
        setTimeout(function(){
            $(".ls").css({"transform":"translateZ(0) scale(0)","opacity":"0"});
            $(".clock").css({"transition-duration":"2s","width":"50%","top":"20%","left":"25%","transform":"translateZ(400px) rotate(-720deg)"});
            $(".ostars").fadeIn(500);
            $(".text13").show();
            $(".text13 p").addClass("fadeInUp animated3");
        },6000);
        setTimeout(function(){
            $(".clock").css({"transition-duration":"4s","top":"-40%","opacity":"0"});
            $(".night2").css({"bottom":"-100%"});
            $(".logo").show();
            $(".ewm").show();
            $(".text13").addClass("fadeOutUp animated2");
            $(".text14").show();
        },10000);
    }
}




// 背景音乐
function musicAct(){
    if ($('.music').hasClass('on')) {
        musicid.pause();
        $('.music').removeClass('on roate').addClass('off');
        $('.music').attr('src','images/musicoff.png');
    } else {
        musicid.play();
        $('.music').removeClass('off').addClass('on roate');
        $('.music').attr('src','images/musicon.png');
    }
}
$('.music').on('click', function() {
    musicAct();
});