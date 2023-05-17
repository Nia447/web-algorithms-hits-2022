function Brush(px, py, nx, ny, r, context, Color){
    context.strokeStyle = Color;
    ctx.lineCap = "round";
    ctx.lineWidth = r;
    context.beginPath();
    ctx.moveTo(px,py);
    ctx.lineTo(nx, ny);
    ctx.stroke();
}
function GetMatrixFromImage(context){
    let resultInput = new Array()
    resultInput.length = 28*28;
    let k = 0;
    for(let i = 0; i < 28; i++){
        for(let j = 0; j < 28; j++){
            let pixel = context.getImageData(j, i, 1, 1);
            if((pixel.data[0] + pixel.data[1] + pixel.data[2]) / 3 > 0) resultInput[k] = 1;
            else resultInput[k] = 0;
            k++;
        }
    }
    return resultInput;
}
function AIAnswer(neuralNetwork, inputs){
    let results = [];
    results.length = 10;
    results = neuralNetwork.FeedForward(inputs);
    let maxValueIndex = 0;
    for(let i = 0; i < results.length; i++){
        if(results[maxValueIndex] < results[i]) maxValueIndex = i;
    }
    return maxValueIndex;
}
function sigmoid(a = 0){
    let res = 1 / (1 + Math.pow(Math.E, -a));
    return res;
}

function getEdges(x, y, r, edges){
    if(x < edges[0]) edges[0] = x - 100;
    else if(x > edges[1]) edges[1] = x + 100;
    if(y < edges[2]) edges[2] = y - 100;
    else if(y > edges[3]) edges[3] = y + 100;
}