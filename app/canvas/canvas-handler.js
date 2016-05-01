var canvas;
var ctx;
var drawMode = false;
var prevX=0, prevY=0, currX=0, currY=0;
var xOffset = 0;
var yOffset = 0;
const left = 0;
const right = 2;


module.exports = function(canvasSource){
    if(canvasSource){
        canvas = canvasSource;
        ctx = canvas.getContext("2d");
        canvas.addEventListener('mousedown', mouseDown, false);
        canvas.addEventListener('mouseup', mouseUp, false);
        canvas.addEventListener('mousemove', mouseMove, false);
        canvas.addEventListener('mouseout', mouseOut, false);
    }

    return {
        setOffset: setOffset,
        resizeCanvasAndSetOffset: resizeCanvasAndSetOffset,
        clearCanvas: clearCanvas,
        saveCanvas: saveCanvas
    }
}

function setOffset(x, y){
    if(x || x === 0){
        xOffset = x;
    }
    if(y || y === 0){
        yOffset = y;
    }
}

function resizeCanvasAndSetOffset(x, y){
    if(y || y === 0){
        yOffset = y;
        canvas.height = window.innerHeight - yOffset - 1;
    }
    if(x || x === 0){
        xOffset = x;
        canvas.width = window.innerWidth - xOffset - 150 - 2;
    }
}


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas(fileName){
    var fs = require('fs');
    var image = canvas.toDataURL('image/png')
                      .replace(/^data:image\/png;base64,/, "");
    fs.writeFile(fileName, image, 'base64', err => {
        if(err){
            alert(err);
        }
    });
}

function mouseDown(e){
    if(e.button === left){
        drawMode = true;
        findXy('mousedown', e);
    }
    else if(e.button === right){
        alert('right');
    }
}

function mouseUp(e){
    if(e.button === left){
        drawMode = false;
    }
    else if(e.button === right){
        alert('right');
    }
}

function mouseMove(e){
    if(drawMode){
        findXy('mousemove', e);
    }
}

function mouseOut(e){
    drawMode = false;
}

function findXy(action, e){
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.offsetLeft - xOffset;
    currY = e.clientY - canvas.offsetTop;
    //console.log('x: ' + currX + ' y: ' + currY);
    //console.log('offset-left: ' + canvas.offsetLeft);
    if(action=== 'mousedown'){
        ctx.beginPath();
        ctx.fillRect(currX, currY, 2, 2);
        ctx.closePath();
    }else {
        drawPath();
    }
}

function drawPath() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}
