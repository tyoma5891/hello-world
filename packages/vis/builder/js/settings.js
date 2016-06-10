"use strict";

var Settings =
{
    init: function()
    {
        Settings.handleStartLoad();

        $(".select_text").click(function(){
            var w = window.getSelection();
            var range = document.createRange();
            range.selectNode(this);
            w.addRange(range);
        });

    }, // end init

    handleSaveSetting: function()
    {
        var langEditor = "en";

        if (langCms == "ua") {
            langEditor = "uk";
        } else {
            langEditor = langCms;
        }

        $('.text_block').froalaEditor(
            {
                inlineMode: false,
                imageUploadURL: '/admin/upload_image',
                heightMin: 100,
                heightMax: 500,
                fileUploadURL: "/admin/upload_file",
                imageManagerLoadURL: "/admin/load_image",
                imageDeleteURL: "/admin/delete_image",
                language: langEditor,
            });
        $("a[href='https://froala.com/wysiwyg-editor']").parent().remove();

        var $checkoutForm = $('#form_page').validate({
            rules : {
                title : {
                    required : true
                },
                slug : {
                    required : true
                }
            },
            messages : {
                title : {
                    required : 'Нужно заполнить название'
                },
                slug : {
                    required : 'Нужно заполнить код '
                }
            },
            errorPlacement : function(error, element) {
                error.insertAfter(element.parent());
            },
            submitHandler: function(form) {

                Settings.doSaveSetting();
            }
        });
    }, //handleSaveSetting

    handleStartLoad: function()
    {
        var idPage = Core.urlParam('id_setting');
        if ($.isNumeric(idPage)) {
            Settings.getEdit(idPage);
        }

        var activeGroup = $.trim($(".btn-group ul li.active").text());
        $(".btn-group button span").text(activeGroup);

    }, // end handleStartLoad

    getCreateForm: function()
    {
        $("#modal_form").modal('show');
        Settings.preloadPage();
        var urlPage = "settings_all";
        window.history.pushState(urlPage, '', urlPage);
        $.post("/admin/settings/create_pop", {},
            function(data) {
                $("#modal_form .modal-content").html(data);
                Settings.handleSaveSetting();
            });
    }, // end getCreateForm

    doSaveSetting: function()
    {

        Settings.loadAction();

        var fileData = $("#modal_form [name=file]").prop("files")[0];
        var formData = new FormData();
        formData.append("file", fileData)
        formData.append("data", $('#form_page').serialize());

        $.ajax({
            url: "/admin/settings/add_record",
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            type: 'post',
            success: function(response) {

                Settings.loadAction("hide");

                if (response.status == "ok") {
                    TableBuilder.showSuccessNotification(response.ok_messages);
                    $("#modal_form").modal('hide');
                    $(".modal-backdrop").remove();

                    doAjaxLoadContent(window.location.href);
                } else {
                    var messErrors = ""
                    $.each( response.errors_messages, function( key, value ) {
                        messErrors += value + "<br>";
                    });

                    TableBuilder.showErrorNotification(messErrors);
                }
            }
        });
    }, // end doSaveSetting

    doDelete: function(id, context)
    {
        jQuery.SmartMessageBox({
            title : "Удалить?",
            content : "Эту операцию нельзя будет отменить.",
            buttons : '[Нет][Да]'
        }, function(ButtonPressed) {
            if (ButtonPressed === "Да") {
                jQuery.ajax({
                    type: "POST",
                    url: "/admin/settings/delete",
                    data: { id: id},
                    dataType: 'json',
                    success: function(response) {
                        if (response.status) {
                            TableBuilder.showSuccessNotification("Запись удалена успешно");
                            $(".tr_" + id).remove();
                        } else {
                            TableBuilder.showErrorNotification("Что-то пошло не так, попробуйте позже");
                        }
                    }
                });
            }
        });
    }, // end doDelete

    getEdit: function(idPage)
    {
        $("#modal_form").modal('show');
        Settings.preloadPage();

        $("#modal_form .modal-dialog").css("margin-top",$(document).scrollTop()+30);

        var groupParam = Core.urlParam("group");
        if (groupParam != null) {
            var urlPage = "?group=" + groupParam + "&id_setting=" + idPage;
        } else {
            var urlPage = "?id_setting=" + idPage;
        }

        window.history.pushState(urlPage, '', urlPage);

        $.post("/admin/settings/edit_record", {id: idPage },
            function(data) {
                $("#modal_form .modal-content").html(data);

                $('#form_page table.sort_table tbody').sortable(
                    {
                        items: "> tr" ,
                        handle: ".td_mov"
                    }
                );
                Settings.handleSaveSetting();

            });
    }, // end getEdit

    preloadPage: function()
    {
        var preloadHtml = '<div id="table-preloader" class="text-align-center"><i class="fa fa-gear fa-4x fa-spin"></i></div>';
        $("#modal_form .modal-content").html(preloadHtml);

    }, // end preloadPage

    loadAction: function(action)
    {
        if (action=="hide") {
            $(".modal-footer .fa-spin").hide();
        } else {
            $(".modal-footer .fa-spin").show();
        }
    }, // end loadAction

    doDeleteSelect: function(idSelect)
    {
        $.post("/admin/settings/del_select", {id: idSelect },
            function(data){
                $(".tr_select_" + idSelect).remove();
            });
    }, //end doDeleteSelect

    addOption: function(optionId)
    {
        var insert_tr =  $(".type_" + optionId + " .last_tr").html();
        $(".type_" + optionId + " tbody").append("<tr>" + insert_tr + "</tr>");
    }, // end addOption

    typeChange: function(type)
    {
        $(".types").hide();
        $(".type_" + type.value).show();
    } // end typeChange
};

jQuery(document).ready(function() {
    Settings.init();

    $(document).on('click', '#modal_form .close, .modal-footer button', function (e) {
        var url = Core.delPrm("id_setting");
        window.history.pushState(url, '', url);
    });
});


