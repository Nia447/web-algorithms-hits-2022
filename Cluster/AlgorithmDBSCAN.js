function MatrixDBSCAN(MassDBSCAN, e) { //
    let Matrix = new Array();
    for (let i = 0; i < MassDBSCAN.length; i++) {
        Matrix[i] = new Array();
        for (let j = 0; j < MassDBSCAN.length; j++) {
            if (i == j) {
                continue;
            }
            if (GetDistanceDBSCAN(MassDBSCAN[i], MassDBSCAN[j]) < e) {
                Matrix[i].push(MassDBSCAN[j]);
            }
        }
    }
    return Matrix;
}
function GetMassDBSCAN(mass) {
    let Mass = new Array();
    for (let i = 0; i < mass.length; i++) {
        Mass.push(new PointDBSCAN(mass[i].x, mass[i].y));
    }
    return Mass;
}
function PointDBSCAN(x, y, param = 'None') {
    return {
        x: x = x,
        y: y = y,
        param: param = param, //'Main', 'Achievable', 'Noise'. 
        available: available = false,
        cluster: cluster = 0,
    }
}
function GetDistanceDBSCAN(point1, point2) {
    return Math.sqrt((point1.x - point2.x) * (point1.x - point2.x) + (point1.y - point2.y) * (point1.y - point2.y));
}
function OpenSetInMassDBSCAN(CurrentPoint, MassDBSCAN) {
    for (let i = 0; i < MassDBSCAN.length; i++) {
        if (CheckEquals(CurrentPoint, MassDBSCAN[i])) {
            return i;
        }
    }
}
function MergeMass(mass1, mass2) {
    for (let i = 0; i < mass2.length; i++) {
        for (let j = 0; j < mass1.length; j++) {
            if (CheckEquals(mass2[i], mass1[j])) {
                break;
            }
            if (j == mass1.length - 1) {
                 mass1.push(mass2[i]);
            }
        }
    }
}
function ExcludeMass(mass1, mass2) {
    for (let i = 0; i < mass1.length; i++) {
        for (let j = 0; j < mass2.length; j++) {
            if (CheckEquals(mass1[i], mass2[j])) {
                mass1.splice(i, 1);
                i--;
                break;
            }
        }
    }
}
function AlgorithmDBSCAN(mass) {
    let MassDBSCAN = GetMassDBSCAN(mass);
    let Matrix = MatrixDBSCAN(MassDBSCAN, e);
    let OpenSet = new Array();
    for (let i = 0; i < MassDBSCAN.length; i++) {
        OpenSet.push(MassDBSCAN[i]);
    }
    let count = 0;
    while (OpenSet.length > 0) {
        let CurrentPoint = rand(0, OpenSet.length);
        if (Matrix[OpenSetInMassDBSCAN(OpenSet[CurrentPoint], MassDBSCAN)].length < m) {
            OpenSet[CurrentPoint].param = 'Noise';
            OpenSet[CurrentPoint].available = true;
            OpenSet.splice(CurrentPoint, 1);
        } else {
            let K = new Array();
            for (let i = 0; i < Matrix[OpenSetInMassDBSCAN(OpenSet[CurrentPoint], MassDBSCAN)].length; i++) {
                K.push(Matrix[OpenSetInMassDBSCAN(OpenSet[CurrentPoint], MassDBSCAN)][i]);
            }
            for (let i = 0; i < K.length; i++) {
                if (K[i].param == 'Noise' || K[i].available == false) {
                    if (Matrix[OpenSetInMassDBSCAN(K[i], MassDBSCAN)].length >= m) {
                        K[i].param = 'Main';
                        MergeMass(K, Matrix[OpenSetInMassDBSCAN(K[i], MassDBSCAN)]);
                    } else {
                        K[i].param = 'Achievable';
                    }
                    K[i].available = true;
                    K.push(K[i]);
                }
            }
            K.push(OpenSet[CurrentPoint])
            for (let i = 0; i < K.length; i++) {
                K[i].cluster = count;
            }
            ExcludeMass(OpenSet, K);
            count++;
        }
    }
    PrintClusterDBSCAN(MassDBSCAN);
}
function PrintClusterDBSCAN(MassDBSCAN) {
    for (let i = 0; i < MassDBSCAN.length; i++){
        switch (MassDBSCAN[i].cluster % 10) {
            case 0:
                MassDBSCAN[i].cluster = 'red';
                break;
            case 1:
                MassDBSCAN[i].cluster = 'green';
                break;
            case 2:
                MassDBSCAN[i].cluster = 'blue';
                break;
            case 3:
                MassDBSCAN[i].cluster = 'goldenrod';
                break;
            case 4:
                MassDBSCAN[i].cluster = 'yellow';
                break;
            case 5:
                MassDBSCAN[i].cluster = 'lime';
                break;
            case 6:
                MassDBSCAN[i].cluster = 'aquamarine';
                break;
            case 7:
                MassDBSCAN[i].cluster = 'salmon';//Сушенный лосось
                break;
            case 8:
                MassDBSCAN[i].cluster = 'fuchsia';
                break;
            case 9:
                MassDBSCAN[i].cluster = 'snow';
                break;
        }
        ctx.fillStyle = MassDBSCAN[i].cluster;
        ctx.fillRect(MassDBSCAN[i].x*pixelSize, MassDBSCAN[i].y*pixelSize, pixelSize, pixelSize);   
    }
}