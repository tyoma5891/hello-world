'use strict';

var Header = {

    init : function()
    {
        if ( !is_mobile ) {
            this.fixed();
        }
        this.events();
    },

    fixed : function()
    {
        jQuery('.header__head').addClass('header__head--fixed');
        jQuery('.all').css('paddingTop',  jQuery('.header__head').outerHeight() +'px');
    },

    showMobilemenu : function()
    {
        jQuery('#show-menu').addClass('close');
        jQuery('body').addClass('menu__open');
    },

    hideMobilemenu : function()
    {
        jQuery('#show-menu').removeClass('close');
        jQuery('body').removeClass('menu__open');
    },

    events : function()
    {
        jQuery('#show-menu').click(function(event) {
            event.stopPropagation();

            Header.showMobilemenu();
        });

        jQuery('.menu__bg').click(function() {
            Header.hideMobilemenu();   
        });

        jQuery('.menu__bg').swipeleft(function() {
           Header.hideMobilemenu();    
        });
    }

}

jQuery(function()
{
    Header.init();
});