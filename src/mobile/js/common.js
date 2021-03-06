$(function () {
    headerEvt();
    targetToggle();
    $(this).find('.datepicker').datepicker();
    classToggle();
    allChecker();
    modalToggle();
});

$(window).on('load', function(){
    xScroll('nav.depth2-tabs');
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

// iscroll outerwidth
function calcWidth(target) {
    var $target = $(target);

    $target.each(function(){
        var child = $(this).children(),
            width = 0;

        child.each(function(){
            width += $(this).outerWidth(true);
        });
        $(this).css('width', width+32);
    });
}

// iscroll
function xScroll(obj) {
    var $obj = $(obj),
        tabs = $obj.find('.tabs');

    if ( $(obj).length <= 0 ) {
        return
    } else {
        $(window).resize(function(){
            calcWidth(tabs);
        });
        calcWidth(tabs);
        new IScroll(obj , {
            scrollX : true,
            scrollY : false,
            mouseWheel : false,
            autoCenterScroll : true,
            bounce : true
        });
    }
}

// input category
function categoryToggle() {
    $('[data-toggle="category-collapse"] input').on('change', function(){
        var self = $(this),
            my = self.attr('data-visible-target'),
            myArr = my? my.split(',') : [],
            targets = $('[data-collapse-num]');

        if (self.is(':checked')) {
            targets.hide();

            var target = '';
            $.each(myArr, function(index, value){
                target = '[data-collapse-num="'+value.trim()+'"]';
                $(target).show();
            });
        } else {
            return;
        }
    });

    $('[data-toggle="category-collapse"] input#cate05').click();
}

// rdo select writable 
function writableGroup() {
    $('[data-toggle="writable"] input[type=radio]').on('change', function(){
        var self = $(this),
            wrap = self.parents('[data-toggle="writable"]'),
            allInput = wrap.find('[data-writable-target]'),
            myInput = self.closest('.rdo-wrap').siblings('[data-writable-target]');

        if( self.is(':checked') ){
            // 전체 disabled
            $.each(allInput, function(index, value){
                var type = $(this).data('writable-target');
                if( type === 'select' ){
                    $(this).find('select').prop('disabled', true);
                    $(this).find('div.nice-select').addClass('disabled');
                } else if( type === 'input' ){
                    $(this).prop('disabled', true);
                }
            })
            // target writable
            if (myInput.data('writable-target') === 'select'){
                myInput.find('select').prop('disabled', false);
                myInput.find('div.nice-select').removeClass('disabled').addClass('open');
            } else if (myInput.data('writable-target') === 'input'){
                myInput.prop('disabled', false);
                myInput.eq(0).focus();
            }
        }
    });
}

// class toggle
function classToggle() {
    $('[data-toggle="class-toggle"]').find('button, a').click(function(){
        var li = $(this).closest('li');
        var lis = li.siblings('li');
        var wraps = $(this).closest($('[data-toggle="class-toggle"]'));
        var toggleSelf = wraps.data('toggle-self');
        var toggleClass = wraps.data('toggle-class');
        var className = toggleClass === undefined ? 'active' : toggleClass;

        if (toggleSelf){
            if (li.hasClass(className)){
                li.removeClass(className);
            } else {
                lis.removeClass(className);
                li.addClass(className);
            }
        } else {
            lis.removeClass(className);
            li.addClass(className);
        }
    });
}

// accordion
function accordion() {
    var wrap = $('.ui-accordion'),
        list = wrap.find('li'),
        title = wrap.find('.accord-title'),
        toggle = title.find('.btn-toggle');

    if(wrap.length <= 0) return;

    // 접근성 대응
    list.each(function(){
        var $btn = $(this).find('.accord-title .btn-toggle'),
            $content = $(this).find('.accord-cont'),
            id = $(this).index();

        $btn.attr({
            'id' : 'accord-toggle' + id,
            'aria-controls' : 'accord-cont' + id
        });
        $content.attr({
            'id' : 'accord-cont' + id,
            'role' : 'region',
            'aria-labelledby' : 'accord-toggle' + id
        })
    });

    toggle.click(function(){
        var li = $(this).parent('.accord-title').parent('li'),
            cont = $(this).parent('.accord-title').siblings('.accord-cont'),
            blind = $(this).find('.blind');

        if (li.hasClass('open')) {
            $(this).attr('aria-expanded', 'false');
            cont.slideUp();
            li.removeClass('open');
            blind.text('상세보기');
        } else {
            $(this).attr('aria-expanded', 'true');
            cont.slideDown();
            li.addClass('open');
            blind.text('닫기');
        }
    });
}

function popupOpen(url, name) {
    var options;
    window.open(url, name, options);
}

// checkbox all check
function allChecker() {
    var obj = '[data-toggle="allChk"]',
        $obj = $(obj);

    if ($obj.length <= 0) return;
    $obj.each(function(){
        var $input = $(this).find('.chk-all'),
            name = $input.attr('name');

        $input.on('change', function(){
            var $name = $(this).attr('name'),
                $wrapper = $(this).parents(obj),
                $childs = $wrapper.find('input[name='+ $name +']');
            
            if ($(this).prop("checked")) {
                $childs.prop("checked", true);
            } else {
                $childs.prop("checked", false);
            }
        });
        
        $('input[name=' + name + ']').each(function () {
            var $this = $(this);
    
            $this.on('change', function () {
                var total = $('input[name=' + name + ']').length;
                var chked = $('input[name=' + name + ']:checked').not($input).length + 1;
                if (chked == total) {
                    $input.prop("checked", true);
                } else {
                    $input.prop("checked", false);
                }
            });
        });
    });
}

// display toggle
function displayToggle() {
    $('[data-toggle="display"] .rdo-wrap').click(function(){
        var id = $(this).find('input').attr('id');

        $('[data-display-id]').hide();
        $('[data-display-id="'+id+'"]').show();
    });
}

// modal
function modalToggle() {
    var modalToggle = $('[data-toggle="modal"]'),
        modalClose = $('[data-toggle="modal-close"]');

    if (modalToggle.length <= 0) return;

    modalToggle.on('click', function(){
        var modalTarget = $(this).data('target') || $(this).attr('href');
            modal = $(modalTarget);

        modal.removeAttr('aria-hidden');
        modal.attr('aria-modal', true);
        modal.show();
    });

    modalClose.on('click', function(){
        var modal = $(this).parents('.modal');

        modal.hide();
        modal.removeAttr('aria-modal');
        modal.attr('aria-hidden', true);
    });
}