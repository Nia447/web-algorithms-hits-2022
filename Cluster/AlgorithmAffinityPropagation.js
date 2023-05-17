function CreateMatrixAffinity(mass) {
    let arr = new Array();
    for(let i = 0; i < mass.length; i++) {
        arr[i] = new Array();
        for(let j = 0; j < mass.length; j++) {
            arr[i][j] = GetDistance(mass[i], mass[j]);
        }
    }
    return arr;
}
function CreateAstroidAffinity(param = 'aquamarine') {
    return {
        mark: mark = new Array(),
        param: param = param,
    }
}
function AlgorithmAffinityPropagation(mass) {
    let S = CreateMatrixAffinity(mass);
    let R = matrixArray(mass.length, mass.length);
    let A = matrixArray(mass.length, mass.length);
    let iter = 0, MaxIteration = 300, radious = 500;
    while (iter < MaxIteration) {
        for (let i = 0; i < mass.length; i++) {
            for (let k = 0; k < mass.length; k++) {
                let MaxNumber;
                for (let j = 0; j < mass.length; j++) {
                    if (j == k) {
                        continue;
                    }
                    if (typeof(MaxNumber) == 'undefined') {
                        MaxNumber = A[i][j] + S[i][j];
                    }
                    if (typeof(MaxNumber) != 'undefined' && MaxNumber < A[i][j] + S[i][j]) {
                        MaxNumber = A[i][j] + S[i][j];
                    }
                }
                R[i][k] = S[i][k] - MaxNumber;
            }
        }
        for (let i = 0; i < mass.length; i++) {
            for (let k = 0; k < mass.length; k++) {
                if (i == k) {
                    continue;
                }
                let Sum = 0;
                for (let j = 0; j < mass.length; j++) {
                    if (j == i || j == k) {
                        continue;
                    }
                    Sum += Math.max(0, R[j][k]);
                }
                A[i][k] = Math.min(0, R[k][k] + Sum);
            }
        }
        for (let k = 0; k < mass.length; k++) {
            let Sum = 0;
            for (let j = 0; j < mass.length; j++) {
                if (j == k) {
                    continue;
                }
                Sum += Math.max(0, R[j][k]);
            }
            A[k][k] = Sum;
        }
        iter++;
    }
    massAstroid = new Array();
    for (let i = 0; i < mass.length; i++) {
        let CheckAffinity = false;
        let MaxNumber = A[i][0] + R[i][0];
        for (let k = 0; k < mass.length; k++) {
            if (MaxNumber < A[i][k] + R[i][k]) {
                MaxNumber = A[i][k] + R[i][k];
            }
        }
        for (let j = 0; j < massAstroid.length; j++) {
            for (let k = 0; k < massAstroid[j].mark.length; k++) {
                if (Math.abs(massAstroid[j].mark[k] - MaxNumber) < radious) {
                    mass[i].astroid = massAstroid[j];
                    massAstroid[j].mark.push(MaxNumber);
                    
                    CheckAffinity = true;
                    j = massAstroid.length;
                    break;
                }
            }
        }
        if (!CheckAffinity) {
            massAstroid.push(CreateAstroidAffinity());
            massAstroid[massAstroid.length - 1].mark.push(MaxNumber);
            mass[i].astroid = massAstroid[massAstroid.length - 1];
        }
    }
    for (let i = 0; i < massAstroid.length; i++) {
        switch (i % 10) {
            case 0:
                massAstroid[i].param = 'red';
                break;
            case 1:
                massAstroid[i].param = 'green';
                break;
            case 2:
                massAstroid[i].param = 'blue';
                break;
            case 3:
                massAstroid[i].param = 'goldenrod';
                break;
            case 4:
                massAstroid[i].param = 'yellow';
                break;
            case 5:
                massAstroid[i].param = 'lime';
                break;
            case 6:
                massAstroid[i].param = 'aquamarine';
                break;
            case 7:
                massAstroid[i].param = 'salmon';//Сушенный лосось
                break;
            case 8:
                massAstroid[i].param = 'fuchsia';
                break;
            case 9:
                massAstroid[i].param = 'snow';
                break;
        }
    }
    PrintCluster();
}