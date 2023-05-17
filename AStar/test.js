let canv = document.getElementById("myCanv");
let ctx = canv.getContext("2d");

let rows = 1000;
let columns = 1000;

canv.width = rows;
canv.height = columns;

let radToDeg = 180 / Math.PI;

let ALPHA = 1;
let BETA = 1;

class Position{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Edge{
    constructor(startNode, endNode, len = 0, pCount){
        this.startNode = startNode;
        this.endNode = endNode;
        this.len = len;
        this.pCount = pCount;
    }
}

class Point{
    constructor(position, index, ways = new Array()){
        this.position = position;
        this.index = index;
        this.ways = ways;
    }
}

let Nodes = new Array();

for(let i = 0; i < 20; i++){
    Nodes.push(new Point(new Position(rand(0, 1000), rand(0, 1000)), i, []))
}

for(let i = 0; i < Nodes.length; i++){
    for(let j = 0; j < Nodes.length; j++){
        if(i == j) continue;
        Nodes[i].ways.push(new Edge(Nodes[i], Nodes[j], distance(Nodes[i].position, Nodes[j].position), 1));
    }
}

function rand(min, max){//random int
    let a = min + Math.round(Math.random() * (max - min - 1));
    return a;
}

console.log(Nodes);

for(let i = 0; i < Nodes.length; i++){
    let used = new Array();
    DFS(Nodes[i], used)
    console.log(used);
}

function DFS(point, used){
    let chances = chance(point.ways);
    let randFloat = Math.random();
    //console.log(point);
    for(let i = 1; i < chances.length; i++){
        if(chances[i] > randFloat && isNotUsed(point.index, used)){
            used.push(point.index);
            //way.push(point.ways[i - 1].index);
            DFS(point.ways[i - 1].endNode, used);
        }
    }
}



function d(a){//returns distance weight
    return 200/a;
}

function wish(a, b){
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

function chance(array = []){//gets point's ways and returns chances
    let chances = new Array();
    for(let i = 0; i < array.length; i++){
        let a = wish(array[i].pCount, array[i].len);
        let P = 0;
        for(let j = 0; j < array.length; j++){
            P += (wish(array[j].pCount, array[j].len)); 
        }
        chances.push(a / P);
    }
    return chances.sort((a, b) => a - b);
}

function distance(node_1, node_2){
    return Math.sqrt(Math.pow(Math.abs(node_1.x - node_2.x), 2) + Math.pow(Math.abs(node_1.y - node_2.y), 2));
}
