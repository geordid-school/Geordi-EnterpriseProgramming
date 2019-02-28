
$.get("nav.html", function(data){
    $("#nav-placeholder").replaceWith(data);
    switch(window.location.pathname) {
        case '/index.html':
        case '/':
            $('#navbar-home').addClass('active');
            break;
        case '/portfolio.html':
            $('#navbar-portfolio').addClass('active');
            break;
        case '/resume.html':
            $('#navbar-resume').addClass('active');
            break;
        case '/contact.html':
            $('#navbar-contact').addClass('active');
            break;
    }
});
