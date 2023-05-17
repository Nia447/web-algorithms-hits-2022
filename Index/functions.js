let radToDeg = 180 / Math.PI;

p = function(x, y){
    return{
        x: x = x,
        y: y = y 
    }
}

function rand(min, max){//random int
    let a = min + Math.round(Math.random() * (max - min - 1));
    return a;
}

function distance(node_1, node_2){
    return Math.sqrt(Math.pow(Math.abs(node_1.x - node_2.x), 2) + Math.pow(Math.abs(node_1.y - node_2.y), 2));
}

function pointSpawner(pCount, array){
    for(let i = 0; i < pCount; i++){
        array.push(new Point(rand(10, 1910), rand(10, 990), 3, 0.3, rand(0, 360), "a"));
    }
}
