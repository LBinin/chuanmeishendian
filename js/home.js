$(function(){

    var contentHeight = $('.home-content').height(); // 容器高度
    var preContentHeight = 610;

    var imgList = [
        'shoot.jpg',
        'design.jpg',
        'qna.jpg',
        'bigLOGO.jpg',
        'registration.jpg',
        'vote.jpg',
        'video.jpg',
        'news.jpg',
    ];
    var picSize = [];

    function loading(curr) {
        var currImg = new Image();
        currImg.src = './images/' + imgList[curr];
        currImg.onload = function() {
            // showProgress(Math.floor(curr / imgList.length * 100));
            picSize[imgList[curr]] = {width: currImg.width, height: currImg.height}
            AdjustSizeOfPic(imgList[curr])
            if (curr == imgList.length - 1) {
                // loadingDone();
                return;
            } else {
                loading(++curr);
            }
        }
    }
    loading(0);

    // 调整图片尺寸
    function AdjustSizeOfPic (picName) {
        resizeHeight = picSize[picName].height / preContentHeight * contentHeight;
        resizeWidth = resizeHeight * (picSize[picName].width / picSize[picName].height) / 3 - 1;
        if (picName == 'bigLOGO.jpg') {resizeWidth *= 3}

        $('.part.' + picName.split('.')[0]).css({
            'height': resizeHeight + 'px',
            'width' : resizeWidth + 'px',
            'background-image': 'url(./images/' + picName + ')',
        }).removeClass('willAppear');
    }

    $(window).resize(function() {
        contentHeight = $('.home-content').height(); // 容器高度
        for (var i = 0; i < imgList.length; i++) {
            AdjustSizeOfPic(imgList[i]);
        }
    })

    // 弹出遮罩层
    $('.part').on('click', function(){
        if ($(this).hasClass('dont')) return
        if ($(this).hasClass('willAppear')) return;
        var selectItemName = $(this).attr('class').split(" ")[1];
        $('.mask').addClass(selectItemName);
        $('.mask').addClass('appear');
    })
    $('.close-btn').on('touchstart click', function(){
        $('.mask').attr("class","mask");
    })
})