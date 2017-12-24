function applyHeaderBlur(navbar, header, scrollTop, pivotPoint) {

    if (scrollTop > pivotPoint) {
        header.css('opacity', '0');
        navbar.css('top', '0px');
        navbar.addClass('fixed');
    } else {
        header.css('opacity', '1');
        header.css('filter', 'blur(' + scrollTop / 2 + 'px)');
        header.css('top', '-' + scrollTop + 'px');
        navbar.css('top', (pivotPoint - scrollTop) + 'px');
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
        autoplaySpeed: 3000,
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