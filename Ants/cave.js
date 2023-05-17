function Labyrinth(lab, startPos, rows, columns){//returns Cave
    let s = point(startPos.x, startPos.y, 'trail');// s = start point
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
                        Direction = [];
                    }
                break;
                case 't':
                    if(isAvailable(curP.x, curP.y - 2, rows, columns) && isClear(lab, curP.x, curP.y - 2)){
                        setPointType(lab, curP.x, curP.y - 1, 0)
                        Direction = [];
                    }
                break;
                case 'r':
                    if(isAvailable(curP.x + 2, curP.y, rows, columns) && isClear(lab, curP.x + 2, curP.y)){
                        setPointType(lab, curP.x + 1, curP.y, 0);
                        Direction = [];
                    }
                break;
                case 'b':
                    if(isAvailable(curP.x, curP.y + 2, rows, columns) && isClear(lab, curP.x, curP.y + 2)){
                        setPointType(lab, curP.x, curP.y + 1, 0);
                        Direction = [];
                    }
                break;
            }
            Direction.splice(dir, 1);
        }
        if(isAvailable(curP.x - 2, curP.y, rows, columns) && isWall(lab, curP.x - 2, curP.y)){
            ways.push(new point(curP.x - 2, curP.y, 'inter'));
        }
        if(isAvailable(curP.x, curP.y - 2, rows, columns) && isWall(lab, curP.x, curP.y - 2)){
            ways.push(new point(curP.x, curP.y - 2, 'inter'));
        }
        if(isAvailable(curP.x + 2, curP.y, rows, columns) && isWall(lab, curP.x + 2, curP.y)){
            ways.push(new point(curP.x + 2, curP.y, 'inter'));
        }
        if(isAvailable(curP.x, curP.y + 2, rows, columns) && isWall(lab, curP.x, curP.y + 2)){
            ways.push(new point(curP.x, curP.y + 2, 'inter'));
        }
    }
    for (let k = 0; k < 4; k++) {
        for (let i = 0; i < lab.length; i++) {
            for (let j = 0; j < lab[i].length; j++) {
                if (isClear(lab, i, j)) {
                    let CountNeighbors = 0;
                    if (i - 1 >= 0 && isClear(lab, i - 1, j)) {
                        CountNeighbors++;
                    }
                    if (i + 1 < lab.length && isClear(lab, i + 1, j)) {
                        CountNeighbors++;
                    }
                    if (j - 1 >= 0 && isClear(lab, i, j - 1)) {
                        CountNeighbors++;
                    }
                    if (j + 1 < lab[i].length && isClear(lab, i, j + 1)) {
                        CountNeighbors++;
                    }
                    if (CountNeighbors <= 1) {
                        setPointType(lab, i, j, new Wall(new Position(i, j)));
                    }
                }
            }
        }
    }
    for (let k = 0; k < 4; k++) {
        let Cells = new Array();
        for (let h = 0; h < columns; h++) {
            for (let w = 0; w < rows; w++) {
                if (isWall(lab, w, h)) {
                    let CountNeighbors = 0;
                    for (let a = -1; a <= 1; a++) {
                        for (let b = -1; b <= 1; b++) {
                            let NeighborsX = w - a;
                            let NeighborsY = h - b;
                            if (NeighborsX >= 0 && NeighborsX < rows && NeighborsY >= 0 && NeighborsY < columns) {
                                if(isClear(lab, NeighborsX, NeighborsY)) {
                                   CountNeighbors++;
                                }
                            }
                        }
                    }
                    if (CountNeighbors >= 4) {
                        Cells.push(point(w, h, 'trail'));
                    }
                }
            }
        }
        for (let i = 0; i < Cells.length; i++) {
            setPointType(lab, Cells[i].x, Cells[i].y, 0);
        }
    }
    return lab;
}
function point(x, y, type){
    //TODO: set defoult type
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
function popIndex(arr, index){//returns and removes arr[index]
    let a = arr[index];
    arr.splice(index, 1);
    return a;
}
function isWall(arr, x, y){// check wall(1)
    if(arr[x][y] instanceof Wall){
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