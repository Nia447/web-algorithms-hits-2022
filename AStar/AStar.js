let pointToDrowPath = new Array();
function pointDrow(x, y, param) {//Для визуалиции алгоритма
    return {
        x: x = x,
        y: y = y,
        param: param = param, //1 - Рассмотренная вершина, 2 - Рассматриваемая вершина, 3 - маршрут
    }
}
function CheckEquals(point1, point2) {
    if (point1.x === point2.x && point1.y === point2.y) {
        return true;
    } else {
        return false;
    }
}

function isUsed(closedSet, currentNode) {//Была ли взята вершина
    for (let i = 0; i < closedSet.length; i++) {
        if (CheckEquals(closedSet[i].Position, currentNode.Position)) {
            return true;
        }
    }
    return false;
}

function NextPoint(x, y, params, mass) {//8 направлений движений клеток
    switch(params) {
        case 0:
            return point(x, y - 1, {x, y});
        case 1:
            if (x + 1 < mass.length && y - 1 >= 0 && (mass[x + 1][y] === 0 || mass[x][y - 1] === 0)) return point(x + 1, y - 1, {x, y});
        case 2:
            return point(x + 1, y, {x, y});
        case 3:
            if (x + 1 < mass.length && y + 1 < mass[0].length && (mass[x + 1][y] === 0 || mass[x][y + 1] === 0)) return point(x + 1, y + 1, {x, y});
        case 4:
            return point(x, y + 1, {x, y});
        case 5:
            if (x - 1 >= 0 && y + 1 < mass[0].length && (mass[x - 1][y] === 0 || mass[x][y + 1] === 0)) return point(x - 1, y + 1, {x, y});
        case 6:
            return point(x - 1, y, {x, y});
        case 7:
            if (x - 1 >= 0 && y - 1 >= 0 && (mass[x - 1][y] === 0 || mass[x][y - 1] === 0)) return point(x - 1, y - 1, {x, y});
    }
    return null;
}
function PathNode(Position, PathLengthFromStart, CameFrom, HeuristicEstimatePathLength) {//Объект по параметрам которого рассматривают более потенциально выгодный узел
    return {
        Position: Position = {
            x: x = Position.x,
            y: y = Position.y,
        },
        PathLengthFromStart: PathLengthFromStart = PathLengthFromStart,//Расстояние от начала
        CameFrom: CameFrom = CameFrom, //С откуда попал в эту клетку 
        HeuristicEstimatePathLength: HeuristicEstimatePathLength = HeuristicEstimatePathLength,//Еврестическое расстояние означает потенциально более близкое более приоритетное к финишу клетка(чем ниже значение тем меньше расстояние тем выгодней для взятия)
        EstimateFullPathLength: EstimateFullPathlength = PathLengthFromStart + HeuristicEstimatePathLength,//Полное потенциальное расстояние от начало до конца
    }
}

function GetHeuristicPathLength(from, to) {//Вычисление еврестического расстояния путем нахождения значения гипотенузы от
    //return Math.max(Math.abs(from.x - to.x), Math.abs(from.y - to.y))
    return Math.sqrt((from.x - to.x) * (from.x - to.x) + (from.y - to.y) * (from.y - to.y));
}

function GetDistanceBetweenNeighbours(from, to) {
    //return 1; //для обычного хода, ниже для оптимального на глаз маршрута
    if (from.x !== to.x && from.y !== to.y) {
        return Math.sqrt(2);
    }
    else {
        return 1;
    }
}

function GetNeighbours(Node, finish, mass) {
    let result = new Array();
    let check;

    for (let i = 0; i < 8; i++) {
        check = NextPoint(Node.Position.x, Node.Position.y, i, mass);
        if (check === null) {
            continue;
        }
        if (check.x < 0 || check.x >= mass.length) {
            continue;
        }
        if (check.y < 0 || check.y >= mass[0].length) {
            continue;
        }
        if (mass[check.x][check.y] !== 0) {
            continue;
        }
        let neighbourNode = PathNode(check, Node.PathLengthFromStart + GetDistanceBetweenNeighbours(Node.Position, check), Node, GetHeuristicPathLength(check, finish));
        result.push(neighbourNode);
    }
    return result;
}

function CheckPathLengthFromStart(node, openSet, finish) {
    for (let i = 0; i < openSet.length; i++) {
        if (CheckEquals(node.Position, openSet[i].Position)) {
            if (node.PathLengthFromStart < openSet[i].PathLengthFromStart) {
                openSet[i].CameFrom = node;
                openSet[i].PathLengthFromStart = node.PathLengthFromStart;
                openSet[i].EstimateFullPathLength = openSet[i].PathLengthFromStart + GetHeuristicPathLength(openSet[i].Position, finish);
            }
        }
    }
}

function PopMinimalFullPathLength(openSet) {//Нахождение самой выгодной вершины
    node = openSet[0];
    for (let i = 1; i < openSet.length; i++) {
        if (node.EstimateFullPathLength > openSet[i].EstimateFullPathLength) {
            node = openSet[i];
        }
    }
    for (let i = 0; i < openSet.length; i++) {
        if (node === openSet[i]) {
            openSet.splice(i, 1);
        }
    }
    return node;
}

function GetPathForNode(pathNode) {//Восстановление пути от конца до начала
    let result = new Array();
    let currentNode = pathNode;
    while (currentNode.CameFrom !== null) {
        result.push(currentNode.Position);
        pointToDrowPath.push(pointDrow(currentNode.Position.x, currentNode.Position.y, 3));//Маршрут для отрисовки
        currentNode = currentNode.CameFrom;
    }
    result.reverse();
    return result;
}
function GetPathForCurrentNode(pathNode, pointToDrowPath) {//Восстановление пути от конца до начала
    let result = new Array();
    let currentNode = pathNode;
    while (currentNode !== null) {
        result.push(currentNode.Position);
        pointToDrowPath.push(pointDrow(currentNode.Position.x, currentNode.Position.y, 3));//Маршрут для отрисовки
        currentNode = currentNode.CameFrom;
    }
    result.reverse();
    for (let i = 0; i < result.length; i++) {
        pointToDrowPath.push(pointDrow(result[i].x, result[i].y, 3));
    }
    for (let i = 0; i < result.length; i++) {
        pointToDrowPath.push(pointDrow(result[i].x, result[i].y, 1));
    }
}
function FindPath(mass, start, finish) {//Основная функция A* 
    let closedSet = new Array();
    let openSet = new Array();
    startNode = PathNode(start, 0, null, GetHeuristicPathLength(start, finish));
    pointToDrowPath.push(pointDrow(startNode.Position.x, startNode.Position.y, 1));//Будет в дальнейшем рассматриваться эта вершина
    openSet.push(startNode);
    while(openSet.length > 0) {
        let currentNode = PopMinimalFullPathLength(openSet);
        
        if (CheckEquals(currentNode.Position, finish)) {
            return GetPathForNode(currentNode);
        }

        closedSet.push(currentNode);

        if (!CheckEquals(currentNode.Position, start)) pointToDrowPath.push(pointDrow(currentNode.Position.x, currentNode.Position.y, 1));//Уже рассмотрена текущая вершина

        //GetPathForCurrentNode(currentNode, pointToDrowPath);// анализ текущего маршрута

        let Neighbours = GetNeighbours(currentNode, finish, mass);

        for (let i = 0; i < Neighbours.length; i++) {
            let currentPathLengthFromStart = currentNode.PathLengthFromStart + GetDistanceBetweenNeighbours(currentNode.Position, Neighbours[i].Position);

            if (isUsed(closedSet, Neighbours[i])) {
                continue;
            }

            CheckPathLengthFromStart(Neighbours[i], openSet, finish);

            if (!isUsed(closedSet, Neighbours[i])) {
                Neighbours[i].CameFrom = currentNode;
                Neighbours[i].PathLengthFromStart = currentPathLengthFromStart;
                Neighbours[i].EstimateFullPathLength = Neighbours[i].PathLengthFromStart + GetHeuristicPathLength(Neighbours[i].Position, finish);
                if (!isUsed(openSet, Neighbours[i])) {
                    openSet.push(Neighbours[i]);
                    if (!isUsed(closedSet, Neighbours[i])) {
                        pointToDrowPath.push(pointDrow(Neighbours[i].Position.x, Neighbours[i].Position.y, 2));//Будет в дальнейшем рассматриваться эта вершина
                    }
                }
            }
        }
    }
    return null;
}
pointsToClear = pointToDrowPath;
function printPoint(){

    pointDrowStartFinish(new point(Number(document.getElementById('startPositionX').value), Number(document.getElementById('startPositionY').value)), new point(Number(document.getElementById('finishPositionX').value), Number(document.getElementById('finishPositionY').value)));

    let currentPoints = pointToDrowPath.splice(0, Math.ceil(pointToDrowPath.length * 0.0037));
    for(let i = 0; i < currentPoints.length; i++){

        if(currentPoints[i].param === 1){
            ctx.fillStyle = 'green';
        }
        if(currentPoints[i].param === 2){
            ctx.fillStyle = 'red';
        }
        if(currentPoints[i].param === 3){
            ctx.fillStyle = 'blue';
        }
        if(currentPoints[i].param === 4){
            ctx.fillStyle = 'yellow';
        }
        ctx.fillRect(currentPoints[i].x*pixelSize, currentPoints[i].y*pixelSize, pixelSize, pixelSize);   
    }
    if(pointToDrowPath.length > 0){
        window.requestAnimationFrame(printPoint);
    }
}

function pointDrowStartFinish(start, finish) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(start.x * pixelSize, start.y * pixelSize, pixelSize, pixelSize);
    ctx.fillRect(finish.x * pixelSize, finish.y * pixelSize, pixelSize, pixelSize);
}