let radToDeg = 180 / Math.PI;

let GlobalMinWay = Infinity;

let ALPHA = 1;
let BETA = 1;

let leavingPheramoneCount = 0.2;

let M = 1;
let Q = 1; // константа на которую делится длина пути чтобы оставить феромон

AlphaSeter.oninput = function(){
    let a = document.getElementById('AlphaSeter').value;
    if(a == 'undefined') a = 1;
    ALPHA = a;
}
BetaSeter.oninput = function(){
    let a = document.getElementById('BetaSeter').value;
    if(a == 'undefined') a = 1;
    BETA = a;
}
QSetter.oninput = function(){
    let a = document.getElementById('QSetter').value;
    if(a == 'undefined') a = 1;
    Q = a;
}
MSetter.oninput = function(){
    let a = document.getElementById('MSetter').value;
    if(a == 'undefined') a = 1;
    M = a;
}
function d(a){//returns distance weight
    return M/a;
}

function wish(a, b){//а = кол-во ферамонов b = расстояние между вершинами
    return Math.pow(a, ALPHA) * Math.pow(d(b), BETA);
}

function isNotUsed(item, array){
    for(let i = 0; i < array.length; i++){
        if(item == array[i]) return false;
    }
    return true;
}

function cloneArray(original, clone){
    for(let i = 0; i < original.length; i++){
        clone.push(original[i]);
    }
}

function chance(array = [], resultArr){//gets point's ways and returns chances
    for(let i = 0; i < array.length; i++){
        let a = wish(array[i].pCount, array[i].len);// а - это число которое обозночает желание муравья пойти в какую либо вершину
        let P = 0;
        for(let j = 0; j < array.length; j++){
            P += (wish(array[j].pCount, array[j].len)); 
        }
        resultArr.push(a / P);
    }
}

function chanceDFS(array = [], resultArr, visited){//gets point's ways and returns chances
    for (let i = 0; i < array.length; i++){
        if (visited[i]) continue;

        let a = wish(array[i].pCount, array[i].len);
        let P = 0;
        
        for (let j = 0; j < array.length; j++){
            if (visited[j]) continue;

            P += (wish(array[j].pCount, array[j].len));
        }
        resultArr.push(a / P);
    }
}

function distance(node_1, node_2){
    return Math.sqrt(Math.pow(Math.abs(node_1.x - node_2.x), 2) + Math.pow(Math.abs(node_1.y - node_2.y), 2));
}

function PheromoneRegulator(Ways, Points){//ways - массив объектов содержаших длину пути и вершины по которым прошёл муравей
    for(let i = 0; i < Points.length; i++){
        for(let j = 0; j < Points[i].ways.length; j++){
            if(Points[i].ways[j].pCount < 0.001) continue;
            Points[i].ways[j].pCount *= leavingPheramoneCount;
            Points[i].ways[j].edited = true;
        }
    }

    let minDisIndex = 0;
    for(let i = 0; i < Ways.length; i++){
        if(Ways[i].dis < GlobalMinWay){
            GlobalMinWay = Ways[i].dis;
            minDisIndex = i;
        }
        for(let j = 0; j < Ways[i].Points.length - 1; j++){
            let sPIndex = Ways[i].Points[j].index;
            let ePIndex = Ways[i].Points[j + 1].index;
            for(let k = 0; k < Points.length; k++){
                for(let n = 0; n < Points[k].ways.length; n++){
                    let currentEdge = Points[k].ways[n];
                    if((currentEdge.startNode.index == sPIndex && currentEdge.endNode.index == ePIndex) || (currentEdge.endNode.index == sPIndex && currentEdge.startNode.index == ePIndex)){
                        Points[k].ways[n].pCount += (Q / Ways[i].dis);
                    }
                }
            }
        }
    }
    GlobalMinWay = Ways[minDisIndex].dis;
    return Ways[minDisIndex].Points;
}