
// ======= Imports =======

import MarsImg from '../img/port_mars.png';
import MountaintopImg from '../img/port_mountaintop.png';
import OpakueImg from '../img/port_opakue.png';
import SudokuImg from '../img/port_sudoku.png';
import WebsiteImg from '../img/port_website.png';
import BlankImg from '../img/port_blank.png';


// CSS
import '../styles/portfolio.css';

// ======= Code =======

$(document).ready(function() {
    $('#port-pic-mars').attr("src", MarsImg);
    $('#port-pic-mountaintop').attr("src", MountaintopImg);
    $('#port-pic-opakue').attr("src", OpakueImg);
    $('#port-pic-sudoku').attr("src", SudokuImg);
    $('#port-pic-website').attr("src", WebsiteImg);
    $('#port-pic-blank').attr("src", BlankImg);
});