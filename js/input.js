'use strict';

var Input = {

    events : function()
    {
        jQuery('input,textarea').placeholder();

        jQuery('input[type="radio"]').change(function()
        {
            var id = jQuery(this).attr('id'),
                name = jQuery(this).attr('name');

            if ( jQuery(this).prop('checked') )
            {
                jQuery('label[ data-input-name="'+name+'" ]').removeClass('active');
                jQuery('label[ for="'+id+'" ]').addClass('active');
            }
        });

        jQuery('input[type="checkbox"]').change(function()
        {
            var name = jQuery(this).attr('name');

            if ( jQuery(this).prop('checked') )
            {
                jQuery('label[ data-input-name="'+name+'" ]').addClass('active');
            } else {
                jQuery('label[ data-input-name="'+name+'" ]').removeClass('active');
            }
        });
    }

}

jQuery(function() {
    ( jQuery('input').length || $('textarea').length ) ? Input.events() : false;
});