$(document).ready(function () {

    //mobile menu toggling
    $("#menu_icon").click(function () {
        $("header nav ul").toggleClass("show_menu");
        $("#menu_icon").toggleClass("close_menu");
        return false;
    });

    //Contact Page Map Centering
    var hw = $('header').width() + 50;
    var mw = $('#map').width();
    var wh = $(window).height();
    var ww = $(window).width();

    $('#map').css({
        "max-width": mw,
        "height": wh
    });

    if (ww > 1100) {
        $('#map').css({
            "margin-left": hw
        });
    }

    //Tooltip
    $("a").mouseover(function () {

        var attr_title = $(this).attr("data-title");

        if (attr_title == undefined || attr_title == "") return false;

        $(this).after('<span class="tooltip"></span>');

        var tooltip = $(".tooltip");
        tooltip.append($(this).data('title'));


        var tipwidth = tooltip.outerWidth();
        var a_width = $(this).width();
        var a_hegiht = $(this).height() + 3 + 4;

        //if the tooltip width is smaller than the a/link/parent width
        if (tipwidth < a_width) {
            tipwidth = a_width;
            $('.tooltip').outerWidth(tipwidth);
        }

        var tipwidth = '-' + (tipwidth - a_width) / 2;
        $('.tooltip').css({
            'left': tipwidth + 'px',
            'bottom': a_hegiht + 'px'
        }).stop().animate({
            opacity: 1
        }, 200);
    });

    $("a").mouseout(function () {
        var tooltip = $(".tooltip");
        tooltip.remove();
    });
});

var that = this;
var currentViewId = "home";
window.addEventListener("hashchange", function () {
    var id = window.location.hash.replace("#", "");
    var hashArray = new Array("home", "about", "team", "journal", "contact");
    var hashChange = false;
    for (var i = 0; i < hashArray.length; i++) {
        if (id == hashArray[i] && id != currentViewId) {
            hashChange = true;
            break;
        }
    }

    if (hashChange) {
        // 切换div
        $("#" + id).css('display', '');
        $("#" + currentViewId).css('display', 'none');

        $("#" + id + "_link").attr("class", "selected");
        $("#" + currentViewId + "_link").removeClass("selected");
        
        currentViewId = id;
    }

}, false);


// (function(window,document){
//     var currentViewId = "-main-view",
//         viewPool = {},
//         app = {
//             init:function(th){
//                 if(/(windows)/i.test(navigator.userAgent)){
//                     location.href = 'views/pc.html';
//                 }
//                 document.addEventListener('DOMContentLoaded',function(){
//                     app.initViewPool();
//                     app.bindTapEvent();
//                     app.bindHashEvent();
//                 },false);
//             }(),
//             forward:function(pageId,direction){
//                 direction = direction || 'left';
//
//                 //页面向左平移
//                 var currentViewStart = "translate3d(0,0,0)", //currentView初始位置
//                     applyViewStart = "translate3d(100%,0,0)", //applyView初始位置
//                     currentViewEnd = "translate3d(-100%,0,0)",//currentView的最终位置
//                     applyViewEnd = "translate3d(0,0,0)";     //applyView最终位置
//                 //页面向右平移
//                 if (direction == "right") {
//                     currentViewStart = "translate3d(0,0,0)";
//                     applyViewStart = "translate3d(-100%,0,0)";
//                     currentViewEnd = "translate3d(100%,0,0)";
//                     applyViewEnd = "translate3d(0,0,0)"
//                 }
//
//                 //获取当前页面的DOM对象
//                 var currentView = viewPool[currentViewId];
//                 //获取新页面的DOM对象
//                 var applyView = viewPool[pageId];
//
//                 //设置新页面的初始位置
//                 applyView.style.webkitTransform = applyViewStart;
//                 //设置当前页面的初始位置
//                 currentView.style.webkitTransform = currentViewStart;
//
//                 //设置新页面显示
//                 applyView.style.display = "";
//
//                 var t1 = setTimeout(function(){
//                     //当设置最终位置时，页面就会以过渡效果平移到最终位置
//                     applyView.style.webkitTransform = applyViewEnd;
//                     currentView.style.webkitTransform = currentViewEnd;
//                 },200);
//
//                 var t2 = setTimeout(function(){
//
//                     //400ms后，页面平移结束，设置currentView为隐藏
//                     currentView.style.display = "none";
//                     //将新页面设置为当前页面
//                     currentViewId = pageId;
//
//                     if (direction === 'left'){
//                         window.location.hash = currentViewId.substring(1);
//                     }
//
//                     window.clearTimeout(t1);
//                     window.clearTimeout(t2);
//                 },500);
//             },
//             //初始化执行
//             initViewPool:function(){
//                 var views = document.querySelectorAll(".pageview");
//                 //通过call使用数组的forEach来遍历NodeList
//                 Array.prototype.forEach.call(views,function(item){
//                     //viewPool是一个全局对象
//                     viewPool[item.id] = item; //将DOM的id作为键
//                 });
//             },
//             bindTapEvent:function(){
//                 var isMove;
//                 var that = this;
//                 document.addEventListener("touchstart",function(){
//                     isMove = false;
//                 },false);
//                 document.addEventListener("touchmove",function(){
//                     isMove = true;
//                 },false);
//                 document.addEventListener("touchend",function(){
//                     if (!isMove){
//                         var target = event.target;
//                         if (target.className === "right-arrow"){
//                             that.forward(target.title);
//                         }
//                         if (target.className === "left-arrow"){
//                             history.back();
//                         }
//                     }
//                 },false);
//
//
//             },
//             bindHashEvent:function(){
//                 var that = this;
//                 window.addEventListener("hashchange", function () {
//
//                     //当点击返回键时，hash会回退到上一页的hash值
//                     //获取上一页的hash值，并转化为对应view的id
//                     var id = window.location.hash.replace("#", "-");
//
//                     // 判断当前页面不是首页，
//                     // 并且触发的浏览器的`back`操作，即点击返回键，因为页面前进的时候也会发生hash变化
//                     if (currentViewId != "-main-view" && id != currentViewId) {
//                         id = id || "-main-view"; //如果上一页是首页，则hash为空，这时需要补上对应的id
//                         //调用forward方法从当前页面切换到上一页
//                         that.forward(id, "right");
//                     }
//                 }, false);
//             }
//         }
// })(window,document);




