//#region Canvases
let canv = document.getElementById('canvas');
let downScaleCanv = document.getElementById('downScale');
let centerCanv = document.getElementById('center');

let ctx = canv.getContext("2d");
let downScaleContex = downScaleCanv.getContext("2d");
let centerContext = centerCanv.getContext("2d");

canv.width = 700;
canv.height = 700;

ctx.fillStyle = 'rgb(0, 0, 0)';
ctx.fillRect(0, 0, 700, 700);

centerCanv.width = 700;
centerCanv.height = 700;

downScaleCanv.width = 28;
downScaleCanv.height = 28;
//#endregion
let radius = 45;
let Edges = [1000, 0, 1000, 0];// будет содержать Xmin[0] Xmax[1] Ymin[2] Ymax[3] для центрирование изоборажения в 

let drawFlag = false;
let EraseFlag = false;
let brushColor = 'rgb(0, 0, 0)';
let isDrawable = false;

let image = new Image();

//#region Buttuns
function Draw(){
    brushColor = 'rgb(255, 255, 255)';
}
function Erase(){
    brushColor = 'rgb(0, 0, 0)';
}
function Clear(){
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, 700, 700);
    centerContext.fillRect(0, 0, 700, 700);
    Edges = [1000, 0, 1000, 0];
    //image.src = canv.toDataURL();
}
canv.onmousedown = function(){
    isDrawable = true;
}
canv.onmouseup = function(){
    isDrawable = false;
}
//#endregion

let neuralNetwork = new NeuralNetwork();

let px = 0;
let py = 0;
canv.onmousemove = function(event){
    let x = event.offsetX;
    let y = event.offsetY;
    if(isDrawable){
        Brush(px, py, event.offsetX, event.offsetY, radius, ctx, brushColor);
        downScaleContex.drawImage(image, 0, 0, 28, 28);
        if(brushColor != 'rgb(0, 0, 0)') getEdges(x, y, radius, Edges);
    }
    px = x;
    py = y;
}

function Render(){
    let correctImage = ctx.getImageData(Edges[0], Edges[2], Edges[1] - Edges[0], Edges[3] - Edges[2]);
    centerContext.putImageData(correctImage, (700-(Edges[1] - Edges[0])) / 2, (700-(Edges[3] - Edges[2])) / 2);
    image.src = centerCanv.toDataURL();
    downScaleContex.drawImage(image, 0, 0, 28, 28);
    let answer = AIAnswer(neuralNetwork, GetMatrixFromImage(downScaleContex));
    document.getElementById('output').textContent = answer;
}
setInterval("Render()", 33);