'use strict';

var TBUser = 
{
    admin_uri: '',
    groupRequiredFields: 1,
    id_user: null,
    stored_image: new FormData(),
    
    init: function()
    {
    }, // end init
    
    storeImage: function(file)
    {
        TBUser.stored_image.append("image", file);
    }, // end storeImage

    uploadImage: function(id, file)
    {
        var data = new FormData();
        data.append("image", file);
        data.append('id', id);
        
        jQuery.ajax({
            data: data,
            type: "POST",
            url: TBUser.admin_uri + '/tb/users/upload-image',
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
                if (response.status) {
                    jQuery('#tbu-avatar').attr('src', response.link);
                    jQuery('#tbu-image-input').val(response.short_link);
                } else {
                    console.log(':c');
                }
            }
        });
    }, // end uploadImage
    
    deleteImage: function()
    {
        jQuery('#tbu-avatar').attr('src', '/packages/vis/builder/img/blank_avatar.gif');
        jQuery('#tbu-image-input').val('');
    }, // end deleteImage
    
    doEdit: function(id)
    {
        var values = jQuery('#user-update-form').serializeArray();
        values.push({ name: 'id', value: id });
        
        jQuery.ajax({
            type: "POST",
            url: TBUser.admin_uri + '/tb/users/update',
            data: values,
            dataType: 'json',
            success: function(response) {
                if (response.status) {
                    TableBuilder.showSuccessNotification('Карточка пользователя успешно обновлена');

                } else {
                    var errors = '';
                    jQuery(response.errors).each(function(key, val) {
                        errors += val +'<br>';
                    });

                    TableBuilder.showErrorNotification(errors);
                }
            }
        });
    }, // end doEdit    
    
    doCreate: function()
    {
        var data = TBUser.stored_image;
        var values = jQuery('#user-create-form').serializeArray();
        jQuery.each(values, function(index, obj) {
            data.append(obj.name, obj.value);
        });
        
        jQuery.ajax({
            type: "POST",
            url: TBUser.admin_uri + '/tb/users/do-create',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
                if (response.status) {

                    TableBuilder.showSuccessNotification('Карточка пользователя успешно создана');

                    setTimeout(function() { 
                        window.location.href = TBUser.admin_uri + '/tb/users/'+ response.id;
                    }, 2000);
                } else {
                    var errors = '';
                    jQuery(response.errors).each(function(key, val) {
                        errors += val +'<br>';
                    });

                    TableBuilder.showErrorNotification(errors);
                }
            }
        });
        return false;
    }, // end doCreate
    
    doCreateGroup: function()
    {
        var values = jQuery('#group-create-form').serializeArray();
        if (values.length != TBUser.groupRequiredFields) {
            TableBuilder.showErrorNotification('Необходимо заполнить все поля');

            return false;
        }
        
        jQuery.ajax({
            type: "POST",
            url: TBUser.admin_uri + '/tb/groups/do-create',
            data: values,
            dataType: 'json',
            success: function(response) {
                if (response.status) {
                    TableBuilder.showSuccessNotification("Группа успешно создана");

                    setTimeout(function() { 
                        window.location.href = TBUser.admin_uri + '/tb/groups/'+ response.id;
                    }, 2000);
                } else {
                    var errors = '';
                    jQuery(response.errors).each(function(key, val) {
                        errors += val +'<br>';
                    });
                    TableBuilder.showErrorNotification(errors);
                }
            }
        });
        return false;
    }, // end doCreateGroup    
    
    doEditGroup: function(id)
    {
        var values = jQuery('#group-edit-form').serializeArray();
        if (values.length != TBUser.groupRequiredFields) {
            TableBuilder.showErrorNotification('Необходимо заполнить все поля');

            return false;
        }
        
        values.push({ name: 'id', value: id });
        
        jQuery.ajax({
            type: "POST",
            url: TBUser.admin_uri + '/tb/groups/update',
            data: values,
            dataType: 'json',
            success: function(response) {
                if (response.status) {
                    TableBuilder.showSuccessNotification("Группа успешно обновлена");

                } else {
                    var errors = '';
                    jQuery(response.errors).each(function(key, val) {
                        errors += val +'<br>';
                    });
                    TableBuilder.showErrorNotification(errors);
                }
            }
        });
        return false;
    }, // end doEditGroup
    
};

jQuery(document).ready(function(){
    TBUser.init();
});
