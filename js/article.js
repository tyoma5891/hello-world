'use strict';

var GenereteIframe = {

    init : function()
    {
        var all = jQuery(".article iframe, .article object, .article embed, .article video");
        ( all.length ) ? this.replace(all) : false;
    },

    replace : function( all )
    {
        all.each(function()
        {
            var el = jQuery(this);
            el.wrap("<div class='flex-video'></div>");
        });
    }

}

var GenereteTable = {

    init : function() {
        var all = jQuery('.article table');
        ( all.length ) ? GenereteTable.replace(all) : false;
    },

    replace : function( all )
    {
        //clear in article table inline style
        all.each(function()
        {
            var el = jQuery(this);
                el.removeAttr('style').removeAttr('border').removeAttr('cellspacing').removeAttr('cellpadding');
                el.find('thead, tbody, tfooter, tr, td, th, p').removeAttr('style').removeAttr('border').removeAttr('cellspacing').removeAttr('cellpadding').removeAttr('rel');
                el.wrap("<div class='table-container'></div>");
        });
    }

}

jQuery(function()
{
    GenereteIframe.init();
    GenereteTable.init();
});
