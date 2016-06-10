'use strict';  

    var Tabs = {

        init : function( id )
        {
            var tabs = jQuery('#'+id);

            ( tabs.length ) ? this.events( id, tabs ) : false;
        },

        events : function( id, tabs )
        {
            var links = tabs.find('li a'),
                tabContainer = jQuery('.hometabscontent__item[ data-parent-id = "'+id+'" ]');

            links.on( 'click', function() {
                var _this = jQuery(this),
                    id = _this.attr('data-id'),
                    top = tabs.offset().top - jQuery('.all').css('padding-top').split('px')[0];

                if ( jQuery(document).scrollTop() != top ) {
                    jQuery("body,html").animate({"scrollTop":top}, 500);
                }

                tabs.find('li').removeClass('hometabs__child--active');
                _this.closest('li').addClass('hometabs__child--active');

                tabContainer.removeClass('hometabscontent__item--active');
                jQuery('#'+id).addClass('hometabscontent__item--active');
            });
        }
    }