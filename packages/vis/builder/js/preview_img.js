/*
 * Url preview script
 * powered by jQuery (http://www.jquery.com)
 *
 * written by Alen Grakalic (http://cssglobe.com)
 *
 * for more info visit http://cssglobe.com/post/1695/easiest-tooltip-and-image-preview-using-jquery
 *
 */

this.screenshotPreview = function(){
    /* CONFIG */
    $('body').mousemove(function(g) {
        var x = g.screenX;
        var y = g.screenY;
        var scrW = $("#screenshot").width();
        var scrH = $("#screenshot").height();
        if(x <= 600){
            var set = 70;
            var shet = (scrH/2);
            xOffset = shet;
            yOffset = set;

        } else  {
            var set = scrW+70;
            var shet = (scrH/2);
            xOffset = shet;
            yOffset = -set;

        }
        if (y >=700) {
            var shet = scrH+70;
            xOffset = shet;
        } else if (y <=250) {
            var shet = (scrH/4)-50;
            xOffset = shet;

        }

    });

    // these 2 variable determine popup's distance from the cursor
    // you might want to adjust to get the right result

    /* END CONFIG */

    $("a.screenshot").hover(function(e){

            this.t = this.title;
            this.title = "";
            var c = (this.t != "") ? "<br/>" + this.t : "";
            $("body").append("<p id='screenshot'><img src='"+ this.rel +"' alt='url preview' />"+ c +"</p>");
            $("#screenshot")
                .css("top",(e.pageY - xOffset) + "px")
                .css("left",(e.pageX + yOffset) + "px")
                .fadeIn("slow");
        },
        function(){
            this.title = this.t;
            $("#screenshot").remove();
        });
    $("a.screenshot").mousemove(function(e){
        $("#screenshot")
            .css("top",(e.pageY - xOffset) + "px")
            .css("left",(e.pageX + yOffset) + "px");
    });
};


// starting the script on page load
$(document).ready(function(){
    screenshotPreview();
    $('.prev_img_index').mouseover(function(e) {
        $(this).animate({borderRadius:'5%'},'slow','linear');
    });
    $('.prev_img_index').mouseout(function(e) {
        $(this).animate({borderRadius:'50%'},'slow','linear');
    });
});