function applyHeaderBlur(navbar, header, scrollTop, pivotPoint) {

    if (scrollTop > pivotPoint) {
        navbar.addClass('fixed');
    } else {
        header.css('filter', 'blur(' + scrollTop / 15 + 'px)');
        navbar.removeClass('fixed');
    }
}

$(document).ready(function () {
    var scrollTop = $(window).scrollTop();
    var navbar = $('.navbar');
    var header = $(".hero-collapsing-header");
    var pivotPoint = ($(window).height() * 0.8);

    applyHeaderBlur(navbar, header, scrollTop, pivotPoint);

    $('.project-items').slick({
        autoplay: true,
        arrows: false,
        slidesToShow: 3,
        speed: 150,
        centerMode: true,
        autoplaySpeed: 6000,
        dotsClass: 'position-dots',
        dots: true
    });

    $('.experience-items').slick({
        autoplay: true,
        arrows: false,
        speed: 150,
        autoplaySpeed: 5000,
        dotsClass: 'position-dots',
        dots: true
    });
});

$(window).scroll(function () {
    var navbar = $('.navbar');
    var scrollTop = $(window).scrollTop();
    var header = $(".hero-collapsing-header");
    var pivotPoint = ($(window).height() * 0.8);
    applyHeaderBlur(navbar, header, scrollTop, pivotPoint);
});