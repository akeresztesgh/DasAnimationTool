var canvasHandler;
var window;
var document;
var canvas;

module.exports = function(win){
    window = win;
    document = window.document;
    canvasHandler = require('./canvas/canvas-handler.js')(document.getElementById("mainCanvas"));

    setLeftButtons();
    var leftNav = document.getElementsByClassName("left-nav")[0];
    canvasHandler.resizeCanvasAndSetOffset(leftNav.offsetWidth);

    return {

    };
}

function setLeftButtons() {
    var mainContent = document.getElementsByClassName("main-content")[0];
    var retract = document.getElementsByClassName("left-nav-retract")[0];
    retract.onclick = function(e){
        e.preventDefault();
        var leftNav = document.getElementsByClassName("left-nav")[0];
        leftNav.classList.add('small');
        mainContent.classList.add('main-content-left-small');
        canvasHandler.resizeCanvasAndSetOffset(40);
    };

    var expand = document.getElementsByClassName("left-nav-expand")[0];
    expand.onclick = function(e){
        e.preventDefault();
        var leftNav = document.getElementsByClassName("left-nav")[0];
        leftNav.classList.remove('small');
        mainContent.classList.remove('main-content-left-small');
        canvasHandler.resizeCanvasAndSetOffset(leftNav.offsetWidth);
    };
}
