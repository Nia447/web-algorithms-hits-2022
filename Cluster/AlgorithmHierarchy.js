function CreateAstroidHierarchy(x, y, param = "lime", arrayPoints = new Array()) {
    return {
        x: x = x,
        y: y = y,
        param: param = param,
        arrayPoints: arrayPoints = arrayPoints,
    }
}
function SetLocateNewAstroidHierarchy(mass) {
    let currentMassAstroid = new Array();
    for (let i = 0; i < mass.length; i++) {
        currentMassAstroid.push(CreateAstroidHierarchy(mass[i].x, mass[i].y));
        currentMassAstroid[i].arrayPoints.push(mass[i])
    }
    return currentMassAstroid;
}
function AlgorithmHierarchy(mass, countAstroid) {
    let massAstroid = SetLocateNewAstroidHierarchy(mass);
    for (let i = 0; i < mass.length; i++) {
        mass[i].astroid = CreateAstroid(1, 1, 'gray');
    }
    while (true) {
        if (massAstroid.length == countAstroid) {
            break;
        }

        //Метод одиночной связи
        let minIndex1, minIndex2, minValue;
        for (let i = 0; i < massAstroid.length; i++) {
            for (let j = i + 1; j < massAstroid.length; j++) {
                for (let l = 0; l < massAstroid[i].arrayPoints.length; l++) {
                    for (let k = 0; k < massAstroid[j].arrayPoints.length; k++) {
                        if (typeof(minValue) == 'undefined') {
                            minValue = GetDistance(massAstroid[i].arrayPoints[l], massAstroid[j].arrayPoints[k]);
                            minIndex1 = i;
                            minIndex2 = j;
                        }
                        if (typeof(minValue) != 'undefined' && minValue > GetDistance(massAstroid[i].arrayPoints[l], massAstroid[j].arrayPoints[k])) {
                            minValue = GetDistance(massAstroid[i].arrayPoints[l], massAstroid[j].arrayPoints[k]);
                            minIndex1 = i;
                            minIndex2 = j;
                        }
                    }
                }
            }
        }
        for (let i = 0; i < massAstroid[minIndex2].arrayPoints.length; i++) {
            massAstroid[minIndex1].arrayPoints.push(massAstroid[minIndex2].arrayPoints[i]);
        }
        massAstroid.splice(minIndex2, 1);
    }
    for (let i = 0; i < massAstroid.length; i++) {
        for (let j = 0; j < massAstroid[i].arrayPoints.length; j++) {
            switch (i) {
                case 0:
                    massAstroid[i].arrayPoints[j].astroid.param = 'red';
                    break;
                case 1:
                    massAstroid[i].arrayPoints[j].astroid.param = 'green';
                    break;
                case 2:
                    massAstroid[i].arrayPoints[j].astroid.param = 'blue';
                    break;
                case 3:
                    massAstroid[i].arrayPoints[j].astroid.param = 'goldenrod';
                    break;
                case 4:
                    massAstroid[i].arrayPoints[j].astroid.param = 'yellow';
                    break;
                case 5:
                    massAstroid[i].arrayPoints[j].astroid.param = 'lime';
                    break;
                case 6:
                    massAstroid[i].arrayPoints[j].astroid.param = 'aquamarine';
                    break;
                case 7:
                    massAstroid[i].arrayPoints[j].astroid.param = 'salmon';//Сушенный лосось
                    break;
                case 8:
                    massAstroid[i].arrayPoints[j].astroid.param = 'fuchsia';
                    break;
                case 9:
                    massAstroid[i].arrayPoints[j].astroid.param = 'snow';
                    break;
            }
        }
    }
    PrintCluster();
}