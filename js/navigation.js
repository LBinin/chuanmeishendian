$(function(){
    // var contentHeight = $('.all-content').height();
    // var scrollAreaHeight = $('.scroll-area').height();
    // var scrollBarHeight = $('.scroll-bar').height();

    // // 设置progress高度
    // if (contentHeight > scrollAreaHeight) {
    //     $('.progress-bar').height( scrollBarHeight * (scrollAreaHeight / contentHeight) );
    // }else {
    //     $('.progress-bar').height('100%');
    //     $('.scroll-bar').css('display', 'none');
    // }
    // var progressBarHeight = $('.progress-bar').height();

    // // 空出来的高度
    // var blankHeight = scrollBarHeight - progressBarHeight

    // $('.progress-bar').on('touchstart mousedown', function(e){
    //     e.preventDefault();
    //     var startY = e.clientY;
    //     var startTop = parseInt($('.progress-bar').css('top'));

    //     // 拖动
    //     $(window).on('touchmove mousemove', function(e){
            
    //         var currTop = startTop + e.clientY - startY;
    //         if (currTop <= 0) currTop = 0;
    //         if (currTop >= blankHeight) currTop = blankHeight;
    //         $('.progress-bar').css('top', currTop + 'px' );

    //         $('.all-content').css('top', -currTop);
    //     })

    //     $(window).on('touchend mouseup', function(e){
    //         $(window).off('touchmove mousemove touchend mouseup')
    //         e.stopPropagation();
    //     });
    // })

    // // 鼠标滚动
    // $('.content').on('mousewheel', function(e){
    //     console.log(e);
    // })

    // 获取请求
    var request = window.location.search.substr(1, window.location.search.length).split('&');
    for (var i = 0; i < request.length; i++) {
        var temp = request[i].split('=');
        request[temp[0]] = temp[1];
    }
    var animating = false;
    $('.scroll-turnPage').mousewheel(function(e,d) {
        if (animating) {
            return
        }
        animating = true
        setTimeout(function() {
            animating = false
        }, 500);
        if (d > 0) {
            if (currPage == 1) return
            turnToPage(currPage - 1);
        }else if (d < 0) {
            if (currPage == 4) return
            turnToPage(currPage + 1);
        }
    })

    // 如果有请求则跳到请求也，没有则跳到第一个
    var currPage = $('.nav-item.' + request['select']).index() < 0 ? 1 : $('.nav-item.' + request['select']).index();

    // 跳到请求页
    turnToPage(currPage)

    // 监听按钮
    $('.nav-item').on('click', function(){
        var actionName = $(this).attr('class').split(' ')[1];

        switch (actionName) {
            case 'news':
                turnToPage(1);
                break;
            case 'video':
                turnToPage(2);
                break;
            case 'design':
                turnToPage(3);
                break;
            case 'shoot':
                turnToPage(4);
                break;
            default:
                break;
        }
    })

    // 页面跳转函数
    function turnToPage(toPage) {
        $('.nav-item').eq(currPage).removeClass('active');
        $('.float').eq(currPage - 1).fadeOut();
        currPage = toPage;
        // nav变色
        $('.nav-item').eq(currPage).addClass('active');
        $('.float').eq(currPage - 1).fadeIn();
    }
    
})