let canv = document.getElementById('world');
let ctx = canv.getContext("2d");

let ants = new Array();
let food = new Array();

let width = 1000;
let height = 1000;
let chunkSize = 10;// должен быть кратен 10

let caveSpawnArray = wallMatrix(width/chunkSize, height/chunkSize);
let strtPos = new Position(rand(1, (width/chunkSize) / 2) * 2 - 1, rand(1, (height/chunkSize) / 2) * 2 - 1);
let cave = Labyrinth(caveSpawnArray, strtPos, width/chunkSize, height/chunkSize);

canv.width = width;
canv.height = height;

let thigsPosition = new Array();//has food and Colony position
thigsPosition.length = 1000;

let ColonyPosition = new Position(strtPos.x * chunkSize, strtPos.y * chunkSize);
let colony = new Colony(ColonyPosition, 5);

let world;

let worldView = new Image;// has world view in PNG

let Pheromones = [];

function generateWorld(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 1000, 1000);

    for(let i = 0; i < cave.length; i++){
        for(let j = 0; j < cave[i].length; j++){
            if(cave[i][j] == 0){
                ctx.fillStyle = 'gray';
                ctx.fillRect(i * chunkSize, j * chunkSize, chunkSize, chunkSize);
            }
        }
    }

    for(let i = 0; i < thigsPosition.length; i++){
        thigsPosition[i] = new Array();
        thigsPosition[i].length = 1000;
    }

    resizeArray(cave, thigsPosition, chunkSize);
    world = new World(width - 4, height - 4, thigsPosition);

    ctx.fillStyle = 'rgb(37, 0, 161)';
    ctx.beginPath();
    ctx.arc(colony.position.x, colony.position.y, colony.radius, 0, Math.PI * 2, true);
    ctx.fill();

    worldView.src = canv.toDataURL();

    AntSpawner(200, ants);
    foodSpawner(10, food, world.objects);
}

generateWorld();

function Render(){
    ctx.fillStyle = 'red';
    for(let i = 0; i < Pheromones.length; i++){
        Pheromones[i].count -= 10;
        if(Pheromones[i].count < 10){
            world.objects[Pheromones[i].position.x][Pheromones[i].position.y] = 0;
            Pheromones.splice(i, 1);
        }
        ctx.beginPath();
        ctx.arc(Pheromones[i].position.x, Pheromones[i].position.y, Pheromones[i].radius, 0, Math.PI * 2, true);
        ctx.fill();
    }
    ctx.fillStyle = 'blue';
    for(let i = 0; i < ants.length; i++){
        let objsInSight = [];
        if(ants[i].satiety <= 0){
            ants.splice(i, 1);
            continue;
        }
        ctx.beginPath();
        ctx.arc(ants[i].position.x, ants[i].position.y, ants[i].radius, 0, Math.PI * 2, true);
        ctx.fill();
        ants[i] = ants[i].movement(world);
        if(ants[i].PheramoneCount > 100){
            ants[i].leavePheromone(world, Pheromones);
            ants[i].PheramoneCount -= (ants[i].PheramoneCount * 0.01);
        }
        console.log(ants[i].satiety);
        ants[i].satiety--;
        search(world, ants[i], objsInSight);
    }
    ctx.fillStyle = 'green';
    for(let i = 0; i < food.length; i++){
        //console.log(food[i].portion);
        if(food[i].portion <= 0){
            food.splice(i, 1);
            continue;
        }
        ctx.beginPath();
        ctx.arc(food[i].position.x, food[i].position.y, food[i].radius, 0, Math.PI * 2, true);
        ctx.fill();
    }
    if(ants.length > 0 && food.length > 0){
        window.requestAnimationFrame(Render);
    }
}
window.requestAnimationFrame(Render);
setInterval("ctx.drawImage(worldView, 0, 0)", 10);