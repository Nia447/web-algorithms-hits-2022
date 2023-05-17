let canv = document.getElementById("matrix");
let ctx = canv.getContext("2d");

let rows = 70;
let columns = 70;
let pixelSize = 5;

let maxRows = 1590 / pixelSize;
let maxColumns = 1000 / pixelSize;

let pointToDrow = new Array();//collects points to drow with printPoint()

canv.width = rows * pixelSize;
canv.height = columns * pixelSize;

let lol = matrixArray(rows, columns, 0);//contains Labyrinth

window.requestAnimationFrame(printLabyrinth);
window.requestAnimationFrame(printPoint);

let indexToGetPoint = 0;

let isDrowable = false;//to drow on canvas
let isSetBtnActive = false;
let isRemuveBtnActive = false;

let startPosSetter = false;
let finishPosSetter = false;

let pointsToClear = [];//для очищения лабиринта от А*

let correctX, correctY, matrixX, matrixY;

function startPosBtn(){
    startPosSetter = true;
}
function finishPosBtn(){
    finishPosSetter = true;  
}
function Launch(){
    let sX = Number(document.getElementById('startPositionX').value);
    let sY = Number(document.getElementById('startPositionY').value);
    let fX = Number(document.getElementById('finishPositionX').value);
    let fY = Number(document.getElementById('finishPositionY').value);
    
    pointToDrowPath = new Array();
    Refresh();
    FindPath(lol, new point(sX, sY), new point(fX, fY));
    printPoint();
    pointsToClear = pointToDrowPath;
    if(pointsToClear.length > 0){
        Clear(pointsToClear, 'gray');
    }
}
function Clear(clearArr, color){// получает массив типа point который будет покрашен в данный цвет,
    ctx.fillStyle = color;
    for(let i = 0; i < clearArr.length; i++){
        ctx.fillRect(clearArr[i].x * pixelSize, clearArr[i].y * pixelSize, pixelSize, pixelSize);        
    }
}
function setWall(){
    isSetBtnActive = true;
    isRemuveBtnActive = false;
}
function removeWall(){
    isSetBtnActive = false;
    isRemuveBtnActive = true;
}
canv.onclick = function(event){    
    let x = event.offsetX;
    let y = event.offsetY;
    correctX = x - (x % pixelSize);
    correctY = y - (y % pixelSize);
    matrixX = correctX / pixelSize;
    matrixY = correctY / pixelSize;
    
    if(startPosSetter){
        document.getElementById('startPositionX').value = matrixX;
        document.getElementById('startPositionY').value = matrixY;
        startPosSetter = false;
        Refresh();
        pointDrowStartFinish(new point(matrixX, matrixY), new point(document.getElementById('finishPositionX').value, document.getElementById('finishPositionY').value));
    }
    if(finishPosSetter){
        document.getElementById('finishPositionX').value = matrixX;
        document.getElementById('finishPositionY').value = matrixY;
        finishPosSetter = false;
        Refresh();
        pointDrowStartFinish(new point(document.getElementById('startPositionX').value, document.getElementById('startPositionY').value), new point(matrixX, matrixY))
    }
}
canv.onmousedown = function(){
    isDrowable = true;
}
canv.onmouseup = function(){
    isDrowable = false;
}
canv.onmousemove = function(event){//Gets mouse pos and drows smth

    let x = event.offsetX;
    let y = event.offsetY;
    correctX = x - (x % pixelSize);
    correctY = y - (y % pixelSize);
    matrixX = correctX / pixelSize;
    matrixY = correctY / pixelSize;

    if(isDrowable && !startPosSetter && !finishPosSetter){
        let flag = true;//позволяет не перекрашивать один и тотже пиксель вовремя передвижения мыши
        if(isSetBtnActive && lol[matrixX][matrixY] == 0){
            lol[matrixX][matrixY] = 1;
            ctx.clearRect(correctX, correctY, pixelSize, pixelSize);
            flag = false;
        }else if(isRemuveBtnActive && lol[matrixX][matrixY] == 1 && flag) {
            lol[matrixX][matrixY] = 0;
            ctx.fillStyle = 'gray';
            ctx.fillRect(correctX, correctY, pixelSize, pixelSize);
        }
        flag = true;
    }
}
function Labyrinth(lab, rows, columns){//returns Labyrinth
    let s = point(rand(1, rows / 2) * 2 - 1, rand(1, columns / 2) * 2 - 1, 'trail');// s = start point
    pointToDrow.push(s);
    setPointType(lab, s.x, s.y, 0);
    
    let ways = new Array();
    if(isAvailable(s.x, s.y - 2, rows, columns)){
        ways.push(new point(s.x, s.y - 2, 'inter'));
    }
    if(isAvailable(s.x, s.y + 2, rows, columns)) {
        ways.push(new point(s.x, s.y + 2, 'inter'));
    }
    if(isAvailable(s.x - 2, s.y, rows, columns)){
        ways.push(new point(s.x - 2, s.y, 'inter'));
    }
    if(isAvailable(s.x + 2, s.y, rows, columns)){
        ways.push(new point(s.x + 2, s.y, 'inter'));
    }
    while(ways.length > 0){
        let getRandomPoint  = rand(0, ways.length);
        let curP = popIndex(ways, getRandomPoint);//current Point
        curP.type = 'trail';
        pointToDrow.push(curP);
        if (lab[curP.x][curP.y] == 0){
            continue;
        }
        setPointType(lab, curP.x, curP.y, 0);
        let Direction = ['l', 't', 'r', 'b'];
        while(Direction.length > 0){
            let dir = rand(0, Direction.length);
            switch(Direction[dir]){
                case 'l':
                    if(isAvailable(curP.x - 2, curP.y, rows, columns) && isClear(lab, curP.x - 2, curP.y)){
                        setPointType(lab, curP.x - 1, curP.y, 0);
                        pointToDrow.push(new point(curP.x - 1, curP.y, 'trail'));
                        Direction = [];
                    }
                break;
                case 't':
                    if(isAvailable(curP.x, curP.y - 2, rows, columns) && isClear(lab, curP.x, curP.y - 2)){
                        setPointType(lab, curP.x, curP.y - 1, 0)
                        pointToDrow.push(new point(curP.x, curP.y - 1, 'trail'));
                        Direction = [];
                    }
                break;
                case 'r':
                    if(isAvailable(curP.x + 2, curP.y, rows, columns) && isClear(lab, curP.x + 2, curP.y)){
                        setPointType(lab, curP.x + 1, curP.y, 0);
                        pointToDrow.push(new point(curP.x + 1, curP.y, 'trail'));
                        Direction = [];
                    }
                break;
                case 'b':
                    if(isAvailable(curP.x, curP.y + 2, rows, columns) && isClear(lab, curP.x, curP.y + 2)){
                        setPointType(lab, curP.x, curP.y + 1, 0);
                        pointToDrow.push(new point(curP.x, curP.y + 1, 'trail'));
                        Direction = [];
                    }
                break;
            }
            Direction.splice(dir, 1);
        }
        if(isAvailable(curP.x - 2, curP.y, rows, columns) && isWall(lab, curP.x - 2, curP.y)){
            ways.push(new point(curP.x - 2, curP.y, 'inter'));
            pointToDrow.push(new point(curP.x - 2, curP.y, 'inter'));
        }
        if(isAvailable(curP.x, curP.y - 2, rows, columns) && isWall(lab, curP.x, curP.y - 2)){
            ways.push(new point(curP.x, curP.y - 2, 'inter'));
            pointToDrow.push(new point(curP.x, curP.y - 2, 'inter'));
        }
        if(isAvailable(curP.x + 2, curP.y, rows, columns) && isWall(lab, curP.x + 2, curP.y)){
            ways.push(new point(curP.x + 2, curP.y, 'inter'));
            pointToDrow.push(new point(curP.x + 2, curP.y, 'inter'));
        }
        if(isAvailable(curP.x, curP.y + 2, rows, columns) && isWall(lab, curP.x, curP.y + 2)){
            ways.push(new point(curP.x, curP.y + 2, 'inter'));
            pointToDrow.push(new point(curP.x, curP.y + 2, 'inter'));
        }
    }
    // if (rows % 2 == 0)
    //     lab = fixedRow(lab, rows, columns)
    // if (columns % 2 == 0)
    //     lab = fixedColumn(lab, rows, columns)
    return lab;
}
widthSetter.oninput = function(){
    pointToDrow = [];
    rows = document.getElementById('widthSetter').value;
    if(rows > maxRows){
        rows = maxRows;
    }
    canv.width = rows * pixelSize;
}
heightSetter.oninput = function(){
    pointToDrow = [];
    columns = document.getElementById('heightSetter').value;
    if(columns > maxColumns){
        columns = maxColumns;
    }
    canv.height = columns * pixelSize;
}
function Create(){//Creates new Labyrinth
    if(pointToDrow.length > 0){
        pointToDrow = [];
    }
    ctx.clearRect(0, 0, canv.width, canv.height);
    lol = Labyrinth(matrixArray(rows, columns, 1), rows, columns);
    printLabyrinth();
}
function printLabyrinth(){//Animates how Labyrinth was drawning up
    pointDrowStartFinish(new point(Number(document.getElementById('startPositionX').value), Number(document.getElementById('startPositionY').value)), new point(Number(document.getElementById('finishPositionX').value), Number(document.getElementById('finishPositionY').value)));

    let currentPoints = pointToDrow.splice(0, Math.ceil(pointToDrow.length * 0.0067));
    for(let i = 0; i < currentPoints.length; i++){
        if(currentPoints[i].type == 'inter'){
            ctx.fillStyle = 'red';
        }
        if(currentPoints[i].type == 'trail'){
            ctx.fillStyle = 'gray';
        }
        ctx.fillRect(currentPoints[i].x * pixelSize, currentPoints[i].y * pixelSize, pixelSize, pixelSize);   
    }
    if(pointToDrow.length > 0){
        window.requestAnimationFrame(printLabyrinth);
    }
}
function matrixArray(rows, columns, number) {//returns a matrix filled with Walls
    let arr = new Array();

    pointDrowStartFinish(new point(Number(document.getElementById('startPositionX').value), Number(document.getElementById('startPositionY').value)), new point(Number(document.getElementById('finishPositionX').value), Number(document.getElementById('finishPositionY').value)));

    for(let i = 0; i < rows; i++) {
        arr[i] = new Array();
        for(let j = 0; j < columns; j++) {
            arr[i][j] = number;
            if (number == 0) {
                ctx.fillStyle = 'gray';
                ctx.fillRect(i * pixelSize, j * pixelSize, pixelSize, pixelSize);
            }
        }
    }

    pointDrowStartFinish(new point(Number(document.getElementById('startPositionX').value), Number(document.getElementById('startPositionY').value)), new point(Number(document.getElementById('finishPositionX').value), Number(document.getElementById('finishPositionY').value)));

    return arr;
}
function point(x, y, type){
    //TODO: set defoult typr
    return {
        x: x = x,
        y: y = y,
        type: type = type,
    };
}
function isAvailable(x, y, rows, columns) {//returns true if point is not out of matrix 
    if (0 <= x && 0 <= y && x < (rows) && y < (columns)){
        return true;
    }
    else{
        return false;
    }
}
function setPointType(array, x, y, param){//makes point 1->Wall or 0->Empty
    array[x][y] = param;
}
function rand(min, max){//random int
    let a = min + Math.round(Math.random() * (max - min - 1));
    return a;
}
function popIndex(arr, index){//returns and removes arr[index]
    let a = arr[index];
    arr.splice(index, 1);
    return a;
}
function isWall(arr, x, y){// check wall(1)
    if(arr[x][y] == 1){
        return true;
    }else{
        return false;
    }
}
function isClear(arr, x, y){// check wall(1)
    if(arr[x][y] == 0){
        return true;
    }else{
        return false;
    }
}
function Refresh() {
    for (let i = 0; i < lol.length; i++) {
        for (let j = 0; j < lol[i].length; j++) {
            if (lol[i][j] == 0) {
                ctx.fillStyle = 'gray';
                ctx.fillRect(i * pixelSize, j * pixelSize, pixelSize, pixelSize);
            } else if (lol[i][j] == 1) {
                ctx.fillStyle = '#000910';
                ctx.fillRect(i * pixelSize, j * pixelSize, pixelSize, pixelSize);
            }
        }
    }
}
function clearMatrix() {
    lol = matrixArray(rows, columns, 0);
    pointDrowStartFinish(new point(Number(document.getElementById('startPositionX').value), Number(document.getElementById('startPositionY').value)), new point(Number(document.getElementById('finishPositionX').value), Number(document.getElementById('finishPositionY').value)));
}