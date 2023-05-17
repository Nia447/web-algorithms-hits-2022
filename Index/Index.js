let canv = document.getElementById('canv');
let ctx = canv.getContext('2d');
canv.width = 1920;
canv.height = 1040;

let points = [];

function Generate(){
    pointSpawner(150, points);
}
Generate();

canv.onmousemove = (e) =>{
    points.push(new Point(e.offsetX, e.offsetY, 0, 1, 0, "m"));
}
function Render(){
    ctx.clearRect(0, 0, 1920, 1040);
    for(let i = 0; i < points.length; i++){
        points[i].connectLine(ctx, points);
        points[i].print(ctx);
        if(points[i].type != "a"){
            points.splice(i, 1);
            continue;
        }
        points[i] = points[i].move();
    }
    window.requestAnimationFrame(Render);
}
window.requestAnimationFrame(Render);