function CreateMatrixAdjacency(mass) {
    let matrix = new Array();

    for (let i = 0; i < mass.length; i++) {
        matrix[i] = new Array();
        
        for (let j = 0; j < mass.length; j++) {
            matrix[i].push(GetDistance(mass[i], mass[j]));
        }
    }

    return matrix;
}

let BestIndividualToRenderALL = new Array();
let Matrix;
let CurrentGeneration;
let Count = 0;
let MinimalDistance;
let BestIndividualToRender

let CurrentMatrix;
let AnotherCurrentGeneration;
let AnotherMinimalDistance;

function AlgorithmGenetic(mass, Generations, Population, Mutation) {
    Matrix = CreateMatrixAdjacency(mass);
    CurrentGeneration = new Generation(mass, Matrix, Population, Mutation);
    MinimalDistance = CurrentGeneration.BestIndividual.Distance + 0;
    Count = 1;
    
    Render();
}

function Render() {
    if (Count > 0 && typeof(CurrentGeneration) != 'undefined') {
        for (let i = 0; i < 50; i++) {
            document.getElementById('MinimalLength').textContent = Math.round(CurrentGeneration.BestIndividual.Distance);
            document.getElementById('Generations').textContent = Count;
            CurrentGeneration.NextGeneration();
            Count++;
            if (Count > Generations) {
                break;
            }
            if (Count % 401 == 400) {
                AnotherCurrentGeneration = new Generation(mass, Matrix, Population, Mutation);
                for (let j = 0; j < Count; j++) {
                    AnotherCurrentGeneration.NextGeneration();
                }
                if (CurrentGeneration.BestIndividual.Distance > AnotherCurrentGeneration.BestIndividual.Distance) {
                    CurrentGeneration = AnotherCurrentGeneration;
                }
            }
        }
        
    }
    

    if (Count > 0 && typeof(CurrentGeneration) != 'undefined') {
        BestIndividualToRender = CurrentGeneration.BestIndividual.Genes.slice(0, mass.length);
    }
    ctx.clearRect(0, 0, canv.width, canv.height);

    ctx.fillStyle = 'rgb(37, 0, 161)';

    for (let i = 0; i < mass.length; i++) {
        ctx.beginPath();
        ctx.arc(mass[i].x * pixelSize, mass[i].y * pixelSize, 10, 0, Math.PI * 2, true);
        ctx.fill();
    }

    ctx.lineWidth = 4;
    ctx.strokeStyle = 'blue';
    
    for (let i = 0; Count != 0 && Count > 0 && typeof(BestIndividualToRender) != 'undefined' && i < BestIndividualToRender.length; i++) {
        if (i == 0) {
            ctx.moveTo(mass[BestIndividualToRender[0]].x * pixelSize, mass[BestIndividualToRender[0]].y * pixelSize);
        }
        ctx.lineTo(mass[BestIndividualToRender[i]].x * pixelSize, mass[BestIndividualToRender[i]].y * pixelSize);
        if (i == BestIndividualToRender.length - 1) {
            ctx.lineTo(mass[BestIndividualToRender[0]].x * pixelSize, mass[BestIndividualToRender[0]].y * pixelSize)
        }
    }

    ctx.stroke();
    if (ClearFlag) {
        Count = 0;
        ClearFlag = false;
        Matrix = CreateMatrixAdjacency(mass);
        CurrentGeneration = new Generation(mass, Matrix, Population, Mutation);
        BestIndividualToRender = CurrentGeneration.BestIndividual.Genes.slice(0, mass.length);
        ctx.clearRect(0, 0, canv.width, canv.height);
    }
    if (Count < Generations && Count > 0) {
        window.requestAnimationFrame(Render);
    }
}
window.requestAnimationFrame(Render);