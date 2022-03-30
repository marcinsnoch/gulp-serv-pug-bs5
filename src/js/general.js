$(function () {
    $.fn.scrollToTop = function () {
        $(this).hide().removeAttr("href");
        if ($(window).scrollTop() !== 0) {
            $(this).fadeIn("slow");
        }
        var scrollDiv = $(this);
        $(window).on("scroll", function () {
            if ($(window).scrollTop() === 0) {
                $(scrollDiv).fadeOut("slow");
            } else {
                $(scrollDiv).fadeIn("slow");
            }
        });
        $(this).on("click", function () {
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
        });
    };
});
$(function () {
    $("#toTop").scrollToTop();
});
jQuery.validator.setDefaults({
    onfocusout: function (e) {
        this.element(e);
    },
    onkeyup: false,
    highlight: function (element) {
        jQuery(element).closest('.form-control').addClass('is-invalid');
    },
    unhighlight: function (element) {
        jQuery(element).closest('.form-control').removeClass('is-invalid');
        jQuery(element).closest('.form-control').addClass('is-valid');
    },
    errorElement: 'div',
    errorClass: 'invalid-feedback',
    errorPlacement: function (error, element) {
        if (element.parent('.input-group-prepend').length) {
            $(element).siblings(".invalid-feedback").append(error);
            //error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    }
});
$("#myForm, #contactForm").validate({
    debug: false,
    messages: {
        first_name: "Please specify your name",
        last_name: "general.js L:54",
        email: {
          required: "We need your email address to contact you",
          email: "Your email address must be in the format of name@domain.com"
        }
    }
});