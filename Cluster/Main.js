function RemoveThisPointFromMass(mass, curPoint) {
    for (let i = 0; i < mass.length; i++) {
        if (CheckEquals(mass[i], curPoint)) {
            mass.splice(i, 1);
        }
    }
}
function ClearMatrixCluster() {    
    ctx.clearRect(0, 0, canv.width, canv.height);
    mass = new Array();
}
function PrintCluster() {
    for (let i = 0; i < mass.length; i++){
        ctx.fillStyle = mass[i].astroid.param;
        ctx.fillRect(mass[i].x*pixelSize, mass[i].y*pixelSize, pixelSize, pixelSize);   
    }
}
function RemoveNode(){
    isSetBtnActive = true;
    isRemuveBtnActive = false;
}
function SetNode(){
    isSetBtnActive = false;
    isRemuveBtnActive = true;
}
let countAstroid = 3;
let e = 10; //радиус
let m = 4; //минимальное число точек в окрестности     aka параметры DBSCAN

let isDrowable = false;
let isSetBtnActive = false;
let isRemuveBtnActive = false;

let mass = new Array();

let canv = document.getElementById("matrix");
let ctx = canv.getContext("2d");

let rows = 795;
let columns = 500;
let pixelSize = 5;

let maxRows = 1590 / pixelSize;
let maxColumns = 1000 / pixelSize;

let pointToDrowCluster = new Array();

canv.width = maxRows * pixelSize;
canv.height = maxColumns * pixelSize;

canv.onmousedown = function(){
    isDrowable = true;
}
canv.onmouseup = function(){
    isDrowable = false;
}
canv.onmousemove = function(event){
    if (isDrowable) {
        let flag = true;
        let x = Number(event.offsetX);
        let y = Number(event.offsetY);
        let correctX = x - (x % pixelSize);
        let correctY = y - (y % pixelSize);
        if(isSetBtnActive){
            RemoveThisPointFromMass(mass, Point(correctX/pixelSize, correctY/pixelSize));
            ctx.clearRect(correctX, correctY, pixelSize, pixelSize);
            flag = false;
        } else if (isRemuveBtnActive && flag) {
            if (!CheckPoint(mass, Point(correctX/pixelSize, correctY/pixelSize))) {
                mass.push(Point(correctX/pixelSize, correctY/pixelSize))
                ctx.fillStyle = 'gray';
                ctx.fillRect(correctX, correctY, pixelSize, pixelSize);
            }
        }
        flag = true;
    } 
}
astroidSetter.oninput = function() {
    countAstroid = document.getElementById('astroidSetter').value;
}
mDBSCANsetter.oninput = function() {
    m = document.getElementById('mDBSCANsetter').value;
}
eDBSCANsetter.oninput = function() {
    e = document.getElementById('eDBSCANsetter').value;
}
canv.onclick = function(event){
    let flag = true;
    let x = event.offsetX;
    let y = event.offsetY;
    let correctX = x - (x % pixelSize);
    let correctY = y - (y % pixelSize);
    if(isDrowable){
        if(isSetBtnActive){
            RemoveThisPointFromMass(mass, Point(correctX, correctY));
            ctx.clearRect(correctX, correctY, pixelSize, pixelSize);
            flag = false;
        } else if(isRemuveBtnActive && flag) {
            
            mass.push(Point(correctX/pixelSize, correctY/pixelSize))
            ctx.fillStyle = 'gray';
            ctx.fillRect(correctX, correctY, pixelSize, pixelSize);
        }
        flag = true;
    } 
}

function LaunchKmeans() {
    AlgorithmClusterKmeans(mass, countAstroid);
}
function LaunchAffinityPropagation() {
    AlgorithmAffinityPropagation(mass);
}
function LaunchHierarchy() {
    AlgorithmHierarchy(mass, countAstroid);
}
function LaunchDBSCAN() {
    AlgorithmDBSCAN(mass);
}