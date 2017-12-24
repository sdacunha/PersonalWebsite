function applyHeaderBlur(header, scrollTop, pivotPoint) {
    header.css('filter', 'blur(' + scrollTop / 2 + 'px)');

    if (scrollTop > pivotPoint) {
        header.css('opacity', '0');
        header.css('top', '-' + pivotPoint + 'px');
    } else {
        header.css('opacity', '1');
        header.css('top', '-' + scrollTop + 'px');
    }
}

$(document).ready(function () {
    var scrollTop = $(window).scrollTop();
    var header = $(".hero-collapsing-header");
    var pivotPoint = ($(window).height() * 0.8) - 65;

    applyHeaderBlur(header, scrollTop, pivotPoint);

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
    var scrollTop = $(window).scrollTop();
    var header = $(".hero-collapsing-header");
    var pivotPoint = ($(window).height() * 0.8) - 65;
    applyHeaderBlur(header, scrollTop, pivotPoint);
});