let mass = new Array();

let canv = document.getElementById("matrix");
let ctx = canv.getContext("2d");

canv.width = 1600;
canv.height = 1000;

let TREE_CSV = document.getElementById('TreeSettings').value;
let ANSW_CSV = document.getElementById('InputParams').value;

let launched = false;
let Created = false;

let GlobalCurrentNode;
let GlobalCurrentTree;
let GlobalCurrentNodeIndex;

let massParam;
let GlobalCurrentAnswer;

let moveX = 0;
let moveY = 0;

let RenderNode = null;

let Scale = 1, maxScale = 3, minScale = 0.5, stepScale = 0.1;

document.getElementById('TreeSettings').addEventListener('keyup', function() {
    TREE_CSV = document.getElementById('TreeSettings').value;
}, false);

document.getElementById('InputParams').addEventListener('keyup', function() {
    ANSW_CSV = document.getElementById('InputParams').value;
}, false);

canv.onmousedown = () =>{
    if (Created) {
        canv.onmousemove = (e) =>{
            moveX += e.movementX;
            moveY += e.movementY;
            RenderTree();
        }
    }
}
canv.onmouseup=()=>{
    canv.onmousemove=null;
}

canv.onwheel = (e) =>{
    console.log(e);
    if(e.wheelDelta > 0 && maxScale >= Scale + stepScale){
        Scale += stepScale;
    }
    if(e.wheelDelta < 0 && minScale <= Scale - stepScale){
        Scale -= stepScale;
    }
    RenderTree();
}

function CreateTree() {
    ctx.clearRect(0, 0, canv.width, canv.height);

    Created = true;
    RenderNode = null;

    mass = new Array();
    massData = new Array();
    massParam = new Array();

    let CurrentNode = Papa.parse(TREE_CSV);

    massParam = CurrentNode.data[0];
    for (let i = 1; i < CurrentNode.data.length; i++) {
        massData.push(new Data(CurrentNode.data[i].splice(0, CurrentNode.data[i].length - 1), CurrentNode.data[i][CurrentNode.data[i].length - 1]))
    }
    
    ID3(mass, massData, massParam);

    GlobalCurrentTree = new Tree(mass);

    GlobalCurrentTree.PrintTree();

    //console.log(GlobalCurrentTree);
}

function RenderTree() {
    if (Created) {
        ctx.clearRect(0, 0, canv.width, canv.height);
        GlobalCurrentTree.PrintTree();
        GlobalCurrentTree.PrintNode(mass[GlobalCurrentNodeIndex], mass[GlobalCurrentNodeIndex].Position.x, mass[GlobalCurrentNodeIndex].Position.y, '#0090FF')
    }
}
function Launch() {
    GlobalCurrentAnswer = Papa.parse(ANSW_CSV).data[0];

    GlobalCurrentNode = mass[0];
    GlobalCurrentNodeIndex = 0;

    launched = true;
} 

function Render() {
    if (launched) {
        let NextIndex = null;

        if (mass[GlobalCurrentNodeIndex] instanceof TNode) {
            for (let i = 0; i < massParam.length; i++) {
                if (massParam[i] == mass[GlobalCurrentNodeIndex].Name) {
                    for (let j = 0; j < mass[GlobalCurrentNodeIndex].ChildName.length; j++) {
                        if (mass[GlobalCurrentNodeIndex].ChildName[j] == GlobalCurrentAnswer[i]) {
                            NextIndex = mass[GlobalCurrentNodeIndex].ChildIndex[j];
                        }
                    }
                }
            }
        }

        GlobalCurrentTree.PrintTree();
        GlobalCurrentTree.PrintNode(mass[GlobalCurrentNodeIndex], mass[GlobalCurrentNodeIndex].Position.x, mass[GlobalCurrentNodeIndex].Position.y, '#0090FF');

        if (NextIndex == null) {
            document.getElementById('Answer').textContent = "Answer: " +  mass[GlobalCurrentNodeIndex].Name;
            launched = false;
        } else {
            GlobalCurrentNodeIndex = NextIndex;
        }
    }
}

setInterval("Render()", 1000);

function Position(x, y) {
    return {
        x: x = x,
        y: y = y,
    }
}