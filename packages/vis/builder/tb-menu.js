'use strict';

var TBMenu = 
{
    admin_uri: '',
    
    saveMenuPreference: function(option)
    {
        jQuery.ajax({
            type: "POST",
            url: TBMenu.admin_uri + '/tb/menu/collapse',
            data: { option: option },
            dataType: 'json',
            success: function(response) {
                if (response.status) {
                } else {

                }
            }
        });
    }, // end saveMenuPreference
};


//
jQuery(document).ready(function(){
    //TBMenu.init();
});
