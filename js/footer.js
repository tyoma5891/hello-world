'use strict';

var Footer = {

    container: 'footer',
    jsFooter : '.js-footer',

    init : function()
    {
        this.setHeight();
        this.events();
    },

    setHeight : function()
    {

        var height = jQuery(Footer.container).find('.container').innerHeight();

        jQuery(Footer.container).css({
            'height' : height + 'px',
            'marginTop' : '-' + height + 'px'
        });

        jQuery(Footer.jsFooter).css({
            'height' : height + 'px'
        });
    },

    events : function()
    {
        if ( !is_mobile ) {
            jQuery(window).on('resize', function()
            {
                //for desktops
                Footer.setHeight();
            });
        } else {
            jQuery(window).on('orientationchange', function()
            {
                setTimeout(function() {
                    //for mobile devices
                    Footer.setHeight();
                }, 500);
            });
        }
    }

}

jQuery(function()
{
    Footer.init();
});