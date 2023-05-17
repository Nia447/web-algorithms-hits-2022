let canv = document.getElementById('canvas');
let ctx = canv.getContext("2d");

canv.width = 1600;
canv.height = 1000;

let defoultPcount = 1;

let Nodes = new Array();

let GlobalMinimalWay = new Array();// содержит наикратчайший путь

let index = 0;

let setNodeFlag = false;
let removeNodeFlag = false;
let launched = false;

function setNode(){
    setNodeFlag = true;
    removeNodeFlag = false;
}

function removeNode(){
    removeNodeFlag = true;
    setNodeFlag = false;
}

canv.onclick = function(event){
    let x = event.offsetX;
    let y = event.offsetY;

    if(setNodeFlag){
        Nodes.push(new Point(new Position(x, y), index, new Array()));
        ctx.fillStyle = 'rgb(255, 0, 89)';
        for(let i = 0; i < Nodes.length; i++){
            let newWays = new Array();
            ctx.beginPath();
            ctx.arc(Nodes[i].position.x, Nodes[i].position.y, 8, 0, Math.PI * 2, true);
            ctx.fill();
            for(let j = 0; j < Nodes.length; j++){
                newWays.push(new Edge(Nodes[i], Nodes[j], distance(Nodes[i].position, Nodes[j].position), defoultPcount));
            }
            Nodes[i].ways = newWays;
        }
        index++;
    }
}

function Launch(){
    launched = true;
    Render();
}

function Refresh(){
    for(let i = 0; i < Nodes.length; i++){
        for(let j = 0; j < Nodes[i].ways.length; j++){
            Nodes[i].ways[j].pCount = defoultPcount;
        }
    }
}

function Render(){
    if(Nodes.length > 0){
        document.getElementById('minLength').textContent = "Current Minimal Length: " + Math.ceil(GlobalMinWay);
        if(removeNodeFlag){
            Nodes.splice(0, Nodes.length);
            launched = false;
        }
        ctx.clearRect(0, 0, 1600, 1000);
        let PointsToRender = ants2(Nodes, GlobalMinimalWay);
        ctx.strokeStyle = 'rgb(217, 0, 55)';
        for(let i = 0; i < PointsToRender.length - 1; i++){
            ctx.beginPath();
            ctx.moveTo(PointsToRender[i].position.x, PointsToRender[i].position.y);
            ctx.lineTo(PointsToRender[i + 1].position.x, PointsToRender[i + 1].position.y);
            ctx.stroke();
        }
        ctx.strokeStyle = 'rgb(111, 255, 0)';
        for(let i = 0; i < GlobalMinimalWay.length - 1; i++){
            ctx.beginPath();
            ctx.moveTo(GlobalMinimalWay[i].position.x, GlobalMinimalWay[i].position.y);
            ctx.lineTo(GlobalMinimalWay[i + 1].position.x, GlobalMinimalWay[i + 1].position.y);
            ctx.stroke();
        }
        ctx.fillStyle = 'rgb(255, 0, 89)';
        for(let i = 0; i < Nodes.length; i++){
            ctx.beginPath();
            ctx.arc(Nodes[i].position.x, Nodes[i].position.y, 8, 0, Math.PI * 2, true);
            ctx.fill();
        }
    }
    if(launched){
        window.requestAnimationFrame(Render);
    }
}
//window.requestAnimationFrame(Render);
setInterval("console.log(Nodes)", 16);