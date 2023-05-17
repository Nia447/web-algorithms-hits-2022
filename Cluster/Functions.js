function matrixArray(rows, columns) {//returns a matrix filled with Walls
    let arr = new Array();
    for (let i = 0; i < rows; i++) {
        arr[i] = new Array();
        for (let j = 0; j < columns; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}
function Point(x = 0, y = 0, astroid = CreateAstroid(1, 1, 'gray')) {
    return {
        x: x = x,
        y: y = y,
        astroid: astroid = astroid,
    }
}
function isUsed(mass, currentNode) {//Была ли взята вершина
    for (let i = 0; i < mass.length; i++) {
        if (CheckEquals(mass[i], currentNode)) {
            return true;
        }
    }
    return false;
}
function CheckPoint(mass, curPoint){
    for (let i = 0; i < mass.length; i++) {
        if (mass[i].x == curPoint.x && mass[i].y == curPoint.y) {
            return true;
        }
    }
    return false;
}
function rand(min, max){
    let a = min + Math.round(Math.random() * (max - min - 1));
    return a;
}
function CheckEquals(node1, node2) {
    if (node1.x == node2.x && node1.y == node2.y) {
        return true;
    } else {
        return false;
    }
}
function GetDistance(node, astroid) {
    return Math.sqrt((node.x - astroid.x) * (node.x - astroid.x) + (node.y - astroid.y) * (node.y - astroid.y));
}

function Donut() {
    ClearMatrixCluster();

    let a = 0;
    let a_sum = Math.PI * 2 / 200;
    let midX = 150;
    let midY = 70;
    for (let i = 0; i < 200; i++) {
        for (let j = 0; j < 20; j++) {
            mass.push(Point(Math.round(midX + j + 30 * Math.cos(a)), Math.round(midY + 10 + 30 * Math.sin(a))));
            mass.push(Point(Math.round(midX + 10 + 30 * Math.cos(a)), Math.round(midY + j + 30 * Math.sin(a))));
        }
        a += a_sum;
    }
    a = 0;
    a_sum = Math.PI * 2 / 380;
    midX = 150;
    midY = 70;
    for (let i = 0; i < 380; i++) {
        for (let j = 0; j < 20; j++) {
            mass.push(Point(Math.round(midX + j + 60 * Math.cos(a)), Math.round(midY + 10 + 60 * Math.sin(a))));
            mass.push(Point(Math.round(midX + 10 + 60 * Math.cos(a)), Math.round(midY + j + 60 * Math.sin(a))));
        }
        a += a_sum;
    }
    PrintCluster();
}
function Square() {
    ClearMatrixCluster();

    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            mass.push(Point(110 + i,  30 + j))
        }
    }
    PrintCluster();
}   
function Triangle() {
    ClearMatrixCluster();

    let count = 1/110;
    for (let i = 1; i < 110; i++) {
        let widthCircle = Math.round(55 * count);
        for (let j = 0; j < widthCircle; j++) {
            mass.push(Point(155 + j, i + 30));
            mass.push(Point(155 - j, i + 30));
        }
        count += 1/110;
    }
    PrintCluster();
}   
function Circle() {
    ClearMatrixCluster();
    
    let x = 0;
    let y = 50;
    let midX = 155;
    let midY = 80; 
    let delta = 1 - 2 * y;
    let error = 0;
    while (y >= 0) {
        for (let i = 0; i < x; i++) {
            mass.push(Point(midX + i, midY - y));
            mass.push(Point(midX - i, midY - y));
            mass.push(Point(midX + i, midY + y));
            mass.push(Point(midX - i, midY + y));
        }
        error = 2 * (delta + y) - 1;
        if (delta < 0 && error <= 0) {
            delta += 2 * ++x + 1;
            continue;
        }
        if (delta > 0 && error > 0) {
            delta -= 2 * --y + 1;
            continue;
        }
        delta += 2 * (++x - --y);
    }

    PrintCluster();
}  