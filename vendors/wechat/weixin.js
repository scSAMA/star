var debug = Asfm.util.getQueryString('debug') == null ? false : true;
var toURL = 'http://h5.bjasfm.com/gcwl';

// 渠道监测
var scid = Asfm.util.getQueryString('scid') == null ? 'other' : Asfm.util.getQueryString('scid');
// siteStatistics("分渠道监测", "渠道" + scid);

// 来源监测
var iswxshare = Asfm.util.getQueryString('iswxshare');
if (iswxshare != null) {
    // siteStatistics("其他", '来源', '分享连接');
}

// 分享语
var shareid = Asfm.util.getQueryString('shareid') == null ? 'other' : Asfm.util.getQueryString('shareid');
// siteStatistics("其他", '分享语', shareid);

// 分享话术列表
var defaultWxShareTitleList = [
    '加入蔚来 共创未来！',
    '加入蔚来 共创未来！'
];

// 分享话术索引
var defaultWxShareTitleIndex = parseInt(Math.random() * defaultWxShareTitleList.length);

// 分享话术
var defaultWxShareTitle = defaultWxShareTitleList[defaultWxShareTitleIndex];

// 分享详情
var wxShareDescription = '加入蔚来 共创未来！';

// 微信分享信息
var wxDefault = {
    title: defaultWxShareTitle,
    desc: wxShareDescription,
    imgUrl: toURL + '/images/share.jpg?v=1',
    link: toURL + "/index.html?iswxshare=true&scid=" + scid,
    success: function () {
        // siteStatistics("其他", "分享回调", "成功");
    }
};

$(function () {
    var pageUrl = location.href;
    $.ajax({
        //url: "https://h5.hecoe.com/wx/index.php?w=jssdk",
         url: "https://hongqi.bjasfm.com/api/v1/h5/wx_jsapi",
        dataType: "jsonp",
        jsonp: "jsoncallback",
        data: {
            url: encodeURIComponent(pageUrl)
        },
        success: function (data) {
            // console.log(data);
            data.debug = false;
            wx.config(data);
            wx.ready(function () {
                wxShare();
            });
        }
    });
});

/**
 * wxShare
 * 设置微信分享话术
 */
function wxShare(data) {
    if (typeof (wx) == "undefined") {
        return;
    }

    var newData = $.extend({}, wxDefault, data);
    wx.onMenuShareAppMessage(newData);
    wx.onMenuShareQQ(newData);
    wx.onMenuShareWeibo(newData);
    wx.onMenuShareTimeline(newData);
}

/*
 * 埋点统计
 * action：必填，访客跟元素交互的行为动作（分页曝光，点击，跳转，分渠道监测，其他）
 * page：必填，元素所在展示页面
 * detailed：选填，元素名称，分页曝光时可不填
 */
function siteStatistics(action, page, detailed) {
    if (!debug) {
        if (typeof (detailed) == "undefined") {
            // _czc.push(["_trackEvent", action, page]);
        } else {
            // _czc.push(["_trackEvent", action, page, detailed]);
        }
    }
}