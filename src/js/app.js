/**
 * Created by allenhu on 2019/5/16.
 */

$(function () {
//window.onload = function(){
        var doc = document;
        var body = doc.body;
        var docElement = doc.documentElement;
        var browserVendor = Asfm.browser.jsVendor;
        var clientWidth = doc.documentElement.clientWidth;
        var clientHeight = doc.documentElement.clientHeight;
        var clientDpr = window.devicePixelRatio;
        var lastMouseEndTime = null;
        var allowLoading = false;
        var isMusicPlayingAllowed=false;
        var subjectContentClientWidth ; //7.5rem
        var subjectContentClientHeight ; //14.48rem
        var preload,mainfest,timelineMaxList,myScroll;
        var scrollerClientWidth;
        var scrollerClientHeight;
        if(clientWidth>=750){
            subjectContentClientWidth = 100 * 7.5;
            subjectContentClientHeight = 100 * 14.48;
            scrollerClientWidth = 100 * 55 ;
            scrollerClientHeight = 100 * 55.5 ;
        }else{
            subjectContentClientWidth = 100 * (clientWidth / 750) * 7.5;
            subjectContentClientHeight = 100 * (clientWidth / 750) * 14.48;
            scrollerClientWidth = 100 * (clientWidth / 750) * 130.66 ;
            scrollerClientHeight = 100 * (clientWidth / 750) * 14.48 ;
        }
        //console.log(subjectContentClientHeight);
        var htmlFontSize;
        var scrollerRatio;
        if(clientWidth>=750){
            htmlFontSize = 100;
            scrollerRatio= 1;
        }else{
            htmlFontSize = 100 * (clientWidth / 750);
            scrollerRatio = clientWidth / 750;
        }
        var translateXproportion = subjectContentClientWidth / 750;
        var translateYproportion = subjectContentClientHeight / 1448;
        var bgmIsPlay = true;
        var isAllowTouch = false;
        var clockIsAllowInit = false;
        initSystem();
        initH5();

        /**
         * initSystem
         * 初始化系统
         */
        function initSystem() {
            //console.log('system init');

            // 禁止默认行为
            body.style[browserVendor + 'TouchCallout'] = 'none';
            body.style[browserVendor + 'UserSelect'] = 'none';
            body.style[browserVendor + 'TextSizeAdjust'] = 'none';
            body.style[browserVendor + 'TapHighlightColor'] = 'rgba(0,0,0,0)';

            // 改变设备方向，重新加载
            if (Asfm.browser.supportOrientation) {
                window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', function () {
                    window.location = location;
                }, false)
            }
        };

        /**
         * initH5
         * 初始化H5
         */
        function initH5() {
            //console.log('h5 init');

            // 初始化loading
            //loading();

            // 初始化所有先决条件
            initPrerequisite();

            // 加载资源
            startPreload();


            // 加载页面动画
            initAnimations();

            // 加载事件
            initEvents();
        };

        /**
         * loading
         * 初始化loading
         */
        // function loading() {
        //     // siteStatistics("页面", "loading");

        //     var count = 0;

        //     var timer = setInterval(function () {
        //         count++;

        //         if (count >= 100) {
        //             // 3秒钟100次
        //             // 30 * 100 = 3000ms = 3s

        //             // loading完毕
        //             count = 100;
        //             clearInterval(timer);

        //             if (Asfm.browser.weibo) {

        //             } else {
        //                 // 播放视频
        //                 //playVideo();
        //             }

        //             /* $.ajax({
        //              url: "https://hongqi.bjasfm.com/api/v1/h5/test",
        //              dataType: "jsonp",
        //              jsonp: "jsoncallback",
        //              data: {

        //              },
        //              success: function (data) {
        //              // console.log(123);
        //              // console.log(data);
        //              if (data.errno == 200) {
        //              for (var i = 0; i < data.data.length; i++) {
        //              playedRecords.push(data.data[i].note + '已有' + data.data[i].num + '人申请假条');
        //              }
        //              // console.log(playedRecords);
        //              }
        //              },
        //              error: function (data) {
        //              // console.log(223);
        //              // console.log(data);
        //              }
        //              });*/
        //         }

        //         // 每30毫秒向左移动5rem
        //         $('#loading-carousel>p').css('marginLeft', -count * 0.05 + 'rem');

        //         // 进度条显示
        //         $('#loading-progress').html(count + '%');
        //     }, 30);
        // };

        /**
         * playVideo
         * 播放视频
         */
        function playVideo() {

            if (Asfm.browser.weibo) {
                enableInlineVideo(videoElement);
                videoElement.play();
                //$('.popup-box,.pop4').fadeOut();
            } else {
                videoElement.play();
                //bgmAudioElement.play();//
                //sound.play();
            }

            videoElement.addEventListener('ended', handleVideoEnd);

        };


        /**
         * initPrerequisite
         * 初始化loading前的所有先决条件
         */
        function initPrerequisite() {

            sound = new Howl({
                src: ['music/music.mp3'],
                //autoplay: true,
                loop: true,
                volume: 1,
                onend: function () {
                    //console.log('Finished!');
                    //$('#music-icon').addClass('animationMusicIcon');
                }
            });


            // 微信video/audio处理
            if (Asfm.browser.wechat) {
                if (typeof WeixinJSBridge == "undefined") {
                    doc.addEventListener('WeixinJSBridgeReady', function () {
                        /* //alert('wxready')
                         videoElement.load();
                         bgmAudioElement.load();
                         cameraAudioElement.load();
                         videoElement.addEventListener('canplay', function () {
                         // 该视频已准备好开始播放
                         });*/
                    }, false);
                }
            } else if (Asfm.browser.weibo) {
                // 微博处理
                $('.p3-2').hide();
            } else {
                /*videoElement.load();
                 //bgmAudioElement.load();
                 videoElement.addEventListener('canplay', function () {
                 // 该视频已准备好开始播放
                 });*/
            }

            // iphone ipad禁止500毫秒以内的连击
            if (Asfm.browser.iphone || Asfm.browser.ipad) {
                body.addEventListener(Asfm.browser.POINTER_END, function (e) {
                    var now = new Date().getTime();
                    lastMouseEndTime = lastMouseEndTime || now + 1;
                    var deltaTime = now - lastMouseEndTime;
                    // console.log(now);
                    // console.log(this.lastMouseEndTime);
                    // console.log(deltaTime);
                    if (0 < deltaTime && deltaTime < 500) {
                        // 距上次500毫秒以内的点击，禁止
                        //console.log('disable pointer end due to too fast!');
                        return e.preventDefault();
                    }

                    // 距上次500毫秒以上的点击，记录点击事件，为下次计时使用
                    lastMouseEndTime = now;
                }, false);
            }

            // 禁止鼠标右键
            doc.oncontextmenu = function (e) {
                // return false;
                e.preventDefault();
            }

            // 禁止页面拖动
            $("html,body,.loading-box,.main,.main>div,.video-box,video,.popup-box,.popup-box>div").on(Asfm.browser.POINTER_MOVE, function (e) {
                //e.preventDefault();
            });

            // IOS键盘消失
            $("textarea,input").blur(function () {
                $("html,body").stop().animate({
                        scrollTop: "0"
                    },
                    100);
            });

            // 初始化各个页面TimelineMax
            timelineMaxList = {};
            for (var i = 0; i < 5; i++) {
                timelineMaxList['page' + i] = new TimelineMax({
                    paused: true,
                    onComplete: function () {
                        //console.log('TimelineMax' + i + ' completed.');
                    }
                });
            }

            ////初始化iscroll
            //myScroll = new IScroll('#iscroll-container',{
            //    mouseWheel:true,
            //    scrollY:false,
            //    scrollX:true,
            //    probeType:3,
            //    indicators:{
            //        el:document.getElementById('iscroll-container'),
            //        resize: false,
            //        //ignoreBoundaries: true,
            //        speedRatioX: 0.2
            //    }
            //});





            // 页面隐藏/显示,暂停/播放音乐
            doc.addEventListener('visibilitychange', function () {
                if (doc.hidden) {
                    if (Asfm.browser.android) {
                        sound.pause();
                    } else {
                        //bgmAudioElement.pause();

                    }
                } else {
                    if (isMusicPlayingAllowed == true) {
                        // setTimeout(function () {
                        //     this.bgmAudioElement.play();
                        // }.bind(this), 300);

                        //bgmAudioElement.play();

                        if (Asfm.browser.android) {
                            //sound.play();
                        } else {
                            //bgmAudioElement.play();
                        }

                    }
                }
            });

            // 显示loading
            // 之所以将loading在此处进行显示而不是一开始就显示是为了保证video，music都load完之后再显示loading进度
            //setTimeout(function () {
            //    console.log('show loading box');
            //    $('#loading-box').show();
            //}, 600);
        };

        /**
         * startPreload
         * 预加载资源
         */
        function startPreload() {
            var baseUrl = "images/";
            var page0Url = "images/page0/";
            mainfest = [
                {
                    id:'clock',
                    src: baseUrl + 'clock.png'
                },
                {
                    src: baseUrl + 'musicon.png'
                },
                {
                    src:'music/music.mp3'
                },
                {
                    src: baseUrl + 'musicoff.png'
                },
                {
                    src: page0Url + 'image1.png'
                }
                ,
                {
                    src: page0Url + 'image2.png'
                }
                ,
                {
                    src: page0Url + 'image3.png'
                }
                ,
                {
                    src: page0Url + 'image4.png'
                }
                ,
                {
                    src: page0Url + 'image5.png'
                }
                ,
                {
                    src: page0Url + 'image6.png'
                }
                ,
                {
                    src: page0Url + 'image7.png'
                }
                ,
                {
                    src: page0Url + 'image8.png'
                }
                ,
                {
                    src: page0Url + 'image9.png'
                }
                ,
                {
                    src: page0Url + 'image10.png'
                }
                ,
                {
                    src: page0Url + 'image11.png'
                }
                ,
                {
                    src: page0Url + 'image12.png'
                }
            ];

            preload = new createjs.LoadQueue(true);
            // 注意加载音频文件需要调用如下代码行
            //preload.installPlugin(createjs.SOUND);

            //preload处理单个未见
            preload.on('fileload', function (e) {
                //console.log(e);
                    if(e.item.id == 'clock'){
                        allowLoading =true;
                        $('#music-icon').addClass('animationMusicIcon');
                        $('.loading-clock').css({
                            transition:'all 1.5s linear',
                        });
                        $('.loading-text').addClass('animationFadeIn');
                        sound.play();
                    }
            });

            // 为preloaded添加整个队列变化时展示的进度事件
            preload.addEventListener("progress", handlePreloadProgress);
            // 为preloaded添加当队列完成全部加载后触发事件
            preload.addEventListener("complete", handlePreloadComplete);
            // 设置最大并发连接数最大值为1
            preload.setMaxConnections(1);
            preload.loadManifest(mainfest);
        };

        /**
         * handlePreloadProgress
         * 当整个队列变化时展示的进度事件的处理函数
         */
        function handlePreloadProgress(event) {
            if(allowLoading){
                $('.loading-progress').text(Math.ceil(100 * event.loaded) + "%");
                $('.loading-clock').css({
                    transform: 'rotate(' + Math.ceil(360 * event.loaded) + 'deg)'
                });
                console.log(Math.round(360 * event.loaded));
            }
        };


        //1星星显示 2百分比隐藏 3 隐藏loading页 4 显示main


        /**
         * handlePreloadComplete
         * 处理preload添加当队列完成全部加载后触发事件
         */
        function handlePreloadComplete() {
            //alert('按钮出现');
            /*if (Asfm.browser.android) {
             sound.play();
             $('.android-video-post').show();
             } else {
             $('#video-box').fadeIn(function () {
             $('#loading-box').remove();
             //videoElement.playbackRate =3;

             videoElement.play();
             //bgmAudioElement.playbackRate =3;
             bgmAudioElement.play();
             //sound.play();
             });

             }*/


            // $('#loading-box').fadeOut();
            // $('.main').fadeIn();
            // $('#page0').fadeIn(function(){
            // });

        };


        /**
         * initAnimations
         * 初始化动画
         */
        function initAnimations() {
            // init animation
        };


        function showPage2() {

        }


        /**
         * initEvents
         * 初始化各种事件
         */
        function initEvents() {

            var mapScroller = new Scroller(function(left,top,zoom){
                if(!clockIsAllowInit){
                    return;
                }
                //console.log('top'+top);
                console.log('left'+left);
                $('#iscroll-container').css({
                    //transform:'translate('+(-left / 100)+'rem,'+(-top / 100)+'rem)'
                    //transform:'translate('+(-left / htmlFontSize)+'rem,'+(-top / htmlFontSize)+'rem)'
                    transform:'translate('+(-left)+'px,0)'
                });
                var scrollRatio = left / 6533;
                console.log(scrollRatio);
                $('.clock').css({
                    transform:'rotate('+ -(Math.ceil(360 * scrollRatio) )+'deg)'
                });

                //scrollerRatio

                if(left<1398*scrollerRatio){
                    $(".role")[0].className = "role animation-role1 background-position-role1";
                }

                if(left >= 1398*scrollerRatio){
                    $(".role")[0].className = "role animation-role2 background-position-role2";
                }


                if(left>=1828 *scrollerRatio  && left < 2414*scrollerRatio){
                    var bgOffsetX = left - (1828 *scrollerRatio);//得到针对此点的 背景移动距离
                    var absBgOffsetX = Math.abs(bgOffsetX);//正数
                    var maxTranslateX = 2414 - 1828;//得到此范围的总移动距离
                    var translateXratio = absBgOffsetX / maxTranslateX;//得到背景在此范围内移动的比例

                    $('.tree2').css({
                        transform:'translateZ(0) rotate('+(-60* (1 - translateXratio) )+'deg)'
                    })
                    $('.text2').css({
                        transform:'translate('+(-50 * translateXratio)+'px)'
                    })

                }


                if(left>=3342 *scrollerRatio  && left < 3620*scrollerRatio){
                    var bgOffsetX = left - (3342 *scrollerRatio);//得到针对此点的 背景移动距离
                    var absBgOffsetX = Math.abs(bgOffsetX);//正数
                    var maxTranslateX = 3620 - 3342;//得到此范围的总移动距离
                    var translateXratio = absBgOffsetX / maxTranslateX;//得到背景在此范围内移动的比例
                    console.log(translateXratio);
                    $('.boy').css({
                        transform:'rotate('+ 20 * translateXratio +'deg)',
                        bottom:5.28 - ((396 - 264) / htmlFontSize * translateXratio) + 'rem',
                        left: 36 + ((3772 - 3600) / htmlFontSize * translateXratio) + 'rem',
                    });

                }



                //if(currentQuestionNumber == 2 && isDian === true){
                //
                //    //-40.79rem,-13.5rem
                //    if(left == 4079 * scrollerRatio && top == 1350 * scrollerRatio){
                //        //执行结束
                //        scrollerIsTranslateEnd =true;
                //        isScrolling = false;
                //        isDian = false;
                //        console.log('isScrolling'+isScrolling);
                //        console.log('执行结束');
                //    }else{
                //        scrollerIsTranslateEnd = false;
                //        console.log('执行中');
                //    }
                //    console.log('left'+left);
                //    console.log('top'+top);
                //}

            },{
                zooming: false,
                //scrollingX: false,
                animating: true,
                //locking:true,
                animationDuration: 200,
                bouncing: true
            });

            console.log(subjectContentClientWidth);
            console.log(subjectContentClientHeight);
            console.log(scrollerClientWidth);
            console.log(scrollerClientHeight);
            // Configure to have an outer dimension of 1000px and inner dimension of 3000px
            mapScroller.setDimensions(subjectContentClientWidth, subjectContentClientHeight, scrollerClientWidth, scrollerClientHeight);

            $('#iscroll-container')[0].addEventListener('touchstart', e => {
                if(!isAllowTouch){
                    return;
                }
                $('#popup-box').fadeOut();
                $('#page2-mask').fadeOut();
                mapScroller.doTouchStart(e.touches, e.timeStamp);
            },false);

            $('#iscroll-container')[0].addEventListener('touchmove', e => {
                if(!isAllowTouch){
                    return;
                }
                $(".role").removeClass("stop");
                mapScroller.doTouchMove(e.touches, e.timeStamp, e.scale);
            }, false);

            $('#iscroll-container')[0].addEventListener('touchend', e => {
                if(!isAllowTouch){
                    return;
                }

                mapScroller.doTouchEnd(e.timeStamp);
                $('#iscroll-container')[0].addEventListener('transitionend',function(){
                    $(".role").addClass("stop");
                });
            }, false);






            //iscroll fail
          /*  myScroll.on('beforeScrollStart', function () {
                $('#popup-box').fadeOut();
                $('#page2-mask').fadeOut();
            });
          /!*  myScroll.on('scrollStart', function () {
                $('#popup-box').fadeOut();
                $('#page2-mask').fadeOut();
            });*!/
            myScroll.on('scroll', function () {
                console.log(this.x);
                console.log(this.maxScrollX);
            });*/



            //loading 钟表transition结束事件
            $('.loading-clock')[0].addEventListener('transitionend',function(){
                $('.loading-progress').fadeOut(1000,function(){
                    $('#main').show();
                    $('.clock').fadeIn(function(){
                        setTimeout(function(){
                            $(".clock").css({
                                "width":"24rem",
                                "height":"24rem",
                                "margin-top":"4rem",
                                "margin-left":"-12rem",
                                "transform":"translateZ(400px) rotate(30deg)"
                            });
                            //translateZ 无效果
                            $('#page1').fadeIn(function(){
                                $('.tree,.cloud1,.grass1').css({
                                    transform:'scale(1)'
                                });
                                TweenMax.to('.text1-p1', 0.5, {
                                    delay:1,
                                    alpha:1,
                                    x:-10,
                                    y:-10,
                                    ease: Power3.easeOut,
                                    onComplete: function () {

                                    },
                                    onStart: function () {
                                    }
                                });
                                TweenMax.to('.text1-p2', 0.5, {
                                    delay:1.3,
                                    alpha:1,
                                    x:-10,
                                    y:-10,
                                    ease: Power3.easeOut,
                                    onComplete: function () {

                                    },
                                    onStart: function () {
                                        $('.role').css({
                                            transform:'scale(1)'
                                        });
                                    }
                                });
                                timelineMaxList.page1.add(TweenMax.to('.star', 1, {
                                    opacity: 1,
                                    y:199 * translateYproportion,
                                    ease: Power3.easeOut,
                                    onComplete: function () {
                                        //$('#video-btn').addClass('animation-breathing')
                                    }
                                }), "+=1.5");
                                timelineMaxList.page1.add(TweenMax.to('.star',2.5, {
                                    y:960 * translateYproportion,
                                    opacity:0,
                                    ease: Power4.easeIn,
                                    onComplete: function () {
                                        $('#popup-box').fadeIn();
                                        $('#page2-mask').fadeIn(function(){
                                            isAllowTouch = true;
                                            clockIsAllowInit = true;
                                            $(".clock").css({
                                                transitionDuration:'0.8s'
                                            });
                                            $(".role").css({
                                                transitionDuration:'0s'
                                            });
                                        });
                                    }
                                }), "+=0.5");
                                timelineMaxList.page1.restart();
                            });
                        },500);
                        setTimeout(function(){
                            $('#loading-box').fadeOut();
                        },400)
                    });
                })
            });



            //点击music icon
            $('#music-icon').on('click', function () {
                if (bgmIsPlay) {
                    sound.pause();
                    $(this).find('img').attr('src', 'images/musicoff.png');
                    bgmIsPlay = false;
                    $(this).removeClass('animationMusicIcon');
                } else {
                    sound.play();
                    $(this).find('img').attr('src', 'images/musicon.png');
                    bgmIsPlay = true;
                    $(this).addClass('animationMusicIcon');
                }
            });



            function updateCanvas() {
                finalCanvas = document.getElementById('final-canvas');
                ctx = finalCanvas.getContext("2d");
                var bgImg = new Image();
                bgImg.src = posterImgUrl;
                bgImg.onload = function () {
                    ctx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height);
                    var qrCode = new Image();
                    qrCode.src = 'images/qr-code.png';
                    qrCode.onload = function () {
                        ctx.drawImage(qrCode, 608, 1330, qrCode.width, qrCode.height);
                        var logoImg = new Image();
                        logoImg.src = 'images/logo-black.png';
                        logoImg.onload = function () {
                            ctx.drawImage(logoImg, 60, 1350, logoImg.width, logoImg.height);
                            ctx.font = "normal normal normal 22px Arial";
                            ctx.fillStyle = "#7a8a8a";

                            var qrCodeText1Arr = qrCodeText1.split('');
                            qrCodeText1Arr.forEach(function (item, index) {
                                ctx.fillText(item, 400 + index * 22 + 8, 1360);
                            });
                            var qrCodeText2Arr = qrCodeText2.split('');
                            qrCodeText2Arr.forEach(function (item, index) {
                                ctx.fillText(item, 400 + index * 22 + 8, 1395);
                            });


                            ctx.font = "normal normal normal 22px Arial";
                            ctx.fillStyle = "#000";
                            //var posterTextArr = posterText.split('');
                            var firstLineText = '';
                            var secondLineText = '';
                            var thirdLineText = '';
                            if (posterText.length > 29) {
                                firstLineText = posterText.substring(0, 29);
                                ctx.fillText(firstLineText, 63, 1200);
                            } else {
                                ctx.fillText(posterText, 63, 1200);
                            }
                            /*else if(posterText.length>29 && posterText.length <= 58){
                             secondLineText = posterText.substring(29,posterText.length);
                             ctx.fillText(firstLineText,63 ,1250);
                             }else if(posterText.length > 58){
                             thirdLineText = posterText.substring(58,posterText.length);
                             ctx.fillText(firstLineText,63 ,1300);
                             }*/
                            if (posterText.length > 29 && posterText.length <= 58) {
                                secondLineText = posterText.substring(29, posterText.length);
                                ctx.fillText(secondLineText, 63, 1240);
                            }
                            if (posterText.length > 58) {
                                secondLineText = posterText.substring(29, 58);
                                ctx.fillText(secondLineText, 63, 1240);
                                thirdLineText = posterText.substring(58, posterText.length);
                                ctx.fillText(thirdLineText, 63, 1280);
                            }


                            /*posterTextArr.forEach(function(item,index){

                             });*/


                            ctx.font = "normal normal 100 72px Arial";
                            ctx.fillStyle = "#000";

                            /*var posterTypeArr = posterType.split('');
                             posterTypeArr.forEach(function(item,index){
                             ctx.fillText(item,310 + index * 72 + (index -1) * 18,1150);
                             });*/
                            ctx.fillText(posterType, 328, 1150);

                            var posterImgUrl = finalCanvas.toDataURL('images/jpeg', 1);
                            $('.poster-image').attr('src', posterImgUrl);
                        }

                    }
                }
            }

            //清空canvas 还原默认值
            function resetCavnas() {
                $('.level-img-wrapper.level1').trigger('touchstart');
                $('.level2-box-1 p:first-child').trigger('touchstart');
                $('.level2-box-2 p:first-child').trigger('touchstart');
                $('.level2-box-3 p').each(function () {
                    var defaultSrc = $(this).find('img').attr('data-src');
                    $(this).find('img').attr('src', defaultSrc);
                });
                defaultCanvasBgImg = $('.level2-box-2 p:first-child img').attr('data-canvas');
                //defaultShiJu = shiJuList[0];
                defaultCanvasIcon = '';
                defaultName = '';
                posterCanvasCtx.clearRect(0, 0, posterCanvasElement.width, posterCanvasElement.height);
            }


            //检测是否移动到边缘(上下左右)
            function checkMapIsTranslateToEdge() {
                //左


                //判断方向
                if (mapTouchMoveX > mapTouchStartX) {
                    //手滑的距离和最大移动距离相比较，如果手滑动的距离大于最大移动距离，地图移动距离应为最大移动距离
                    //page2的offsetLeft - 地图的offsetLeft  得到最大移动距离
                    //由于地图的offsetLeft 是 负值，所以用 page2的offsetLeft(正数) - map的offsetLeft(负数) 即得到 可移动的最大总宽度值
                    if (mapTranslateX >= offsetDefaultLeftX - offsetLeftX) {
                        //最大移动距离
                        mapTranslateX = offsetDefaultLeftX - offsetLeftX;
                    }

                    //if(地图移动距离 >= 最大移动距离){
                    //    地图移动距离 = 最大移动距离;
                    //}
                }


                //右
                if (mapTouchMoveX < mapTouchStartX) {
                    //手滑的距离和最大移动距离相比较，如果手滑动的距离大于最大移动距离，地图移动距离应为最大移动距离
                    if (mapTranslateX <= (subjectContentClientWidth + offsetDefaultLeftX) - (mapClientWidth + offsetLeftX)) {
                        //最大移动距离
                        mapTranslateX = (subjectContentClientWidth + offsetDefaultLeftX) - (mapClientWidth + offsetLeftX);
                    }
                }

                //上
                if (mapTouchMoveY > mapTouchStartY) {
                    if (mapTranslateY >= offsetDefaultTopY - offsetTopY) {
                        mapTranslateY = offsetDefaultTopY - offsetTopY;
                    }

                }

                //下
                if (mapTouchMoveY < mapTouchStartY) {
                    if (mapTranslateY <= (subjectContentClientHeight + offsetDefaultTopY) - (mapClientHeight + offsetTopY)) {
                        mapTranslateY = (subjectContentClientHeight + offsetDefaultTopY) - (mapClientHeight + offsetTopY);
                    }
                }
            }


        };


        //生成海报
        function generatePoster(defaultCanvasImgUrl) {
            $('#page4').fadeIn();
            $('#page3').fadeOut();

            posterCanvasElement = document.getElementById('poster-canvas');
            posterCanvasCtx = posterCanvasElement.getContext("2d");

            posterCanvasElementCopy = document.createElement('canvas');
            posterCanvasCtxCopy = posterCanvasElementCopy.getContext("2d");
            posterCanvasElementCopy.width = posterCanvasElement.width;
            posterCanvasElementCopy.height = posterCanvasElement.height;

            finalPosterCanvas = document.createElement('canvas');
            finalPosterCanvasCtx = finalPosterCanvas.getContext("2d");
            finalPosterCanvas.width = posterCanvasElement.width;
            finalPosterCanvas.height = posterCanvasElement.height;


            var bgImage = new Image();
            bgImage.src = defaultCanvasImgUrl;
            bgImage.onload = function () {
                posterCanvasCtxCopy.drawImage(bgImage, 0, 0, bgImage.width, bgImage.height);
                posterCanvasCtx.drawImage(posterCanvasElementCopy, 0, 0, posterCanvasElementCopy.width, posterCanvasElementCopy.height);
            }
        }

    }
);