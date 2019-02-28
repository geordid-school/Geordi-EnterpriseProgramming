
// ======= Imports =======

// CSS
import '../styles/resume.css';

// Images
// import ProfileImg from '../img/profile_pic.jpg';

// ======= Code =======

$(document).ready(function() {
    //$('#home-about-pic').attr("src", ProfileImg);

    $('.progress .progress-bar').css("width",function() {
        return $(this).attr("aria-valuenow") + "%";
    })

});
