$(function () {
    $('#sidebarToggler, .overlay').on('click', function () {
        $('.sidebar').toggleClass('dropdown').toggleClass('d-block');
        $('.overlay').toggleClass('active');
    });
});
