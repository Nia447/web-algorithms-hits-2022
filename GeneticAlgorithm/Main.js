let canv = document.getElementById("matrix");
let ctx = canv.getContext("2d");

let pixelSize = 4;
let rows = 1590 / pixelSize;
let columns = 1000 / pixelSize;

let maxRows = 1590 / pixelSize;
let maxColumns = 1000 / pixelSize;

canv.width = rows * pixelSize;
canv.height = columns * pixelSize;

let mass = new Array();

let SetFlag = false;
let RemoveFlag = false;
let ClearFlag = false;

let correctX, correctY, matrixX, matrixY;


function SetNode() {
    SetFlag = true;
    RemoveFlag = false;
}

function RemoveNode() {
    RemoveFlag = true;
    SetFlag = false;  
}

function GetIndexNode(point) {
    for (let i = 0; i < mass.length; i++) {
        if (mass[i].x == point.x && mass[i].y == point.y) {
            return i;
        }
    }
    return -1;
}

function ClearNodes() {
    mass = new Array();
    ctx.clearRect(0, 0, canv.width, canv.height);
    Count = 0;
    ClearFlag = true;
}

canv.onclick = function(event){    
    let x = event.offsetX;
    let y = event.offsetY;
    correctX = x - (x % pixelSize);
    correctY = y - (y % pixelSize);
    matrixX = correctX / pixelSize;
    matrixY = correctY / pixelSize;
    
    if (SetFlag) {
        mass.push(point(matrixX, matrixY));
        ctx.fillStyle = 'rgb(37, 0, 161)';
        ctx.beginPath();
        ctx.arc(correctX, correctY, 10, 0, Math.PI * 2, true);
        ctx.fill();
    }
    if (RemoveFlag) {
        if (GetIndexNode(point(matrixX, matrixY)) >= 0) {
            mass.splice(GetIndexNode(point(matrixX, matrixY)), 1);
            ctx.fillStyle = 'rgb(0, 9, 10)';
            ctx.beginPath();
            ctx.arc(correctX, correctY, 10, 0, Math.PI * 2, true);
            ctx.fill();
        }
    }
}

generationSetter.oninput = function() {
    Generations = document.getElementById('generationSetter').value;
}

populationSetter.oninput = function() {
    Population = document.getElementById('populationSetter').value;
}

mutationSetter.oninput = function() {
    Mutation = document.getElementById('mutationSetter').value / 100;
}

let Generations = 6000;
let Population = 10;
let Mutation = 0.5;

function LaunchGenetic() {
    AlgorithmGenetic(mass, Generations, Population, Mutation);
}