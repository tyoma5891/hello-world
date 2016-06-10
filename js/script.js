'use strict';    

    console.log('window width '+$(window).width());

    /*mobile*/
    var useragents=['android','astel','audiovox','blackberry','chtml','docomo','ericsson','hand','iphone ','ipod','2me','ava','j-phone','kddi','lg','midp','mini','minimo','mobi','mobile','mobileexplorer','mot-e','motorola','mot-v','netfront','nokia', 'palm','palmos','palmsource','pda','pdxgw','phone','plucker','portable','portalmmm','sagem','samsung','sanyo','sgh','sharp','sie-m','sie-s','smartphone','softbank','sprint','symbian','telit','tsm','vodafone','wap','windowsce','wml','xiino'];

    var agt=navigator.userAgent.toLowerCase();
    var is_mobile=false;
      for(var i=0;i<useragents.length;i++){
        if(agt.indexOf(useragents[i])!=-1){
          is_mobile=true;
          var user_agent=agt; break;
        }
      }
    /*!mobile*/
    
    jQuery('.mainmenu__link.products').click(function(e) {
        e.preventDefault();
        var tabs = jQuery('#hometabs');
        var top = tabs.offset().top - jQuery('.all').css('padding-top').split('px')[0];
        if ( jQuery(document).scrollTop() != top ) {
            jQuery("body,html").animate({"scrollTop":top}, 500);
        }
    });

    function bannerTabs() {
        jQuery('.bannertabs__link').hover(function() {
            var index = jQuery(this).attr('data-index');
            jQuery('#banner-tabscontent-'+index).fadeIn();
        }, function() {
            jQuery('.bannertabscontent__item').fadeOut();
        });
    }

    function cardHovers() {
        jQuery('.banner__item').hover(function() {
            jQuery(this).addClass('js-hover');
        }, function() {
            jQuery(this).removeClass('js-hover');
        });
    }

    function Progress(container,duration) {
    container.each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: duration,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
}

    jQuery(function()
    {
        bannerTabs();
        cardHovers();
        Tabs.init('hometabs');
        Progress( $('.counter'), 1000 );

        //Platinum slider
        $('.platinum__slider').slick({
            dots: true,
            arrows: true,
            prevArrow: '<button type="button" class="slick-prev"></button>',
            nextArrow:'<button type="button" class="slick-next"></button>'
        });
        
        $('.platinum__slider').on('afterChange', function(event, slick, currentSlide){
            var prevSlid = $(".slick-active").parents(".slick-track").find('.slick-slide').children().children();
            $(prevSlid).removeClass('shadow');
            $(".slick-active").children().children().addClass('shadow');
        });

               
    });
