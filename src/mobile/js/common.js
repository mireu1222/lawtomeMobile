$(function () {
    headerEvt();
    targetToggle();
});

$(window).on('load', function(){
});

function headerEvt() {
    // menu toggle
    $('header .btn-menu').on('click', function(){
        if ($(this).hasClass('open')){
            $('header').removeClass('open');
            $(this).removeClass('open');
            $(this).find('span.blind').text('전체메뉴 보기');
            $('header .menu-all').removeClass('open');
            setTimeout(function(){
                $('header .menu-all').hide();
            }, 300);
        } else {
            $('header').addClass('open');
            $(this).addClass('open');
            $(this).find('span.blind').text('전체메뉴 닫기');
            $('header .menu-all').show();
            setTimeout(function(){
                $('header .menu-all').addClass('open');
            }, 50);
        }
    });
    // depth2 toggle
    $('#gnb .depth1').on('click', function(){
        var depth1 = $(this);
        var depth1All = $('#gnb .depth1');
        var depth2 = depth1.siblings('ul.depth2');
        var depth2All = $('#gnb ul.depth2');

        if (depth1.hasClass('open')){
            depth1.removeClass('open');
            depth2.slideUp(200);
        } else {
            depth1All.removeClass('open');
            depth2All.slideUp();
            depth1.addClass('open');
            depth2.slideDown(200);
        }
    });
    // scroll evt
    var didScroll,
        lastScrollTop = 0,
        delta = 5,
        navbarHeight = $('header').outerHeight();

    $(window).scroll(function (e) {
        didScroll = true;
    });
    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 150);

    function hasScrolled() {
        var st = $(this).scrollTop();
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > navbarHeight) {
            $('header').addClass('scroll');
        } else if (st < lastScrollTop && st < navbarHeight) {
            $('header').removeClass('scroll');
        }

        lastScrollTop = st;
    }
}

function targetToggle() {
    $('.btn-toggle').on('click', function(){
        var target = $(this).data('target');

        if ($(this).hasClass('open')){
            $(this).removeClass('open');
            $(target).slideUp();
        } else {
            $(this).addClass('open');
            $(target).slideDown();
        }
    });
}