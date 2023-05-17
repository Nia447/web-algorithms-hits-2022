function CreateAstroid(x, y, param) {
    return {
        x: x = x,
        y: y = y,
        param: param = param,
    }
}
function SetLocateNewAstroidsRandom(mass, countAstroid) {
    massAstroid = new Array();

    for (let i = 0; i < countAstroid; i++) {
        let param;
        switch (i % 10) {
            case 0:
                param = 'red';
                break;
            case 1:
                param = 'green';
                break;
            case 2:
                param = 'blue';
                break;
            case 3:
                param = 'goldenrod';
                break;
            case 4:
                param = 'yellow';
                break;
            case 5:
                param = 'lime';
                break;
            case 6:
                param = 'aquamarine';
                break;
            case 7:
                param = 'salmon';//Сушенный лосось
                break;
            case 8:
                param = 'fuchsia';
                break;
            case 9:
                param = 'snow';
                break;
        }
        let RandomNumber = rand(0, mass.length - 1);

        let AstroidX = mass[RandomNumber].x;
        let AstroidY = mass[RandomNumber].y;

        let currentAstroid = CreateAstroid(AstroidX, AstroidY, param);

        massAstroid.push(currentAstroid);
    }
    return massAstroid;
}
function SetLocateAstroid(massAstroid, mass) {
    for (let i = 0; i < massAstroid.length; i++) {
        let sumX = 0, sumY = 0, count = 0;

        for (let j = 0; j < mass.length; j++) {
            if (mass[j].astroid.param == massAstroid[i].param) {
                sumX += mass[j].x;
                sumY += mass[j].y; 
                count++;
            }
        }
        if (count != 0) {
            massAstroid[i].x = Math.round(sumX / count);
            massAstroid[i].y = Math.round(sumY / count); 
        }
    }
    return massAstroid;
}
function SetMassWithAstroid(mass, massAstroid) {
    for (let i = 0; i < mass.length; i++) {
        mass[i].astroid = massAstroid[0];
        for (let j = 0; j < massAstroid.length; j++) {
            if (GetDistance(Point(mass[i].astroid.x, mass[i].astroid.y), Point(mass[i].x, mass[i].y) > GetDistance(Point(massAstroid[j].x, massAstroid[j].y), Point(mass[i].x, mass[i].y)))) {
                mass[i].astroid = massAstroid[j];
            }
        }
    }
}
function AlgorithmClusterKmeans(mass, countAstroid) {

    let massAstroid = SetLocateNewAstroidsRandom(mass, countAstroid)

    SetMassWithAstroid(mass, massAstroid);

    let change = true;
    while (change) {
        change = false;

        for (let i = 0; i < mass.length; i++) {
            let currentNode = mass[i].astroid.param;

            for (let j = 0; j < massAstroid.length; j++) {
                if (GetDistance(mass[i], mass[i].astroid) > GetDistance(mass[i], massAstroid[j])) {
                    mass[i].astroid = massAstroid[j];
                }
            }
            
            if (currentNode != mass[i].astroid.param) {
                change = true;
            }
        }
        massAstroid = SetLocateAstroid(massAstroid, mass);
    }
    PrintCluster();
}




// function SetLocateNewAstroids(mass, countAstroid) {
//     massAstroid = new Array();
//     let R = 1; 
//     let midX = 0;
//     let midY = 0;

//     for (let i = 0; i < mass.length; i++) {
//         midX += mass[i].x;
//         midY += mass[i].y;
//     }

//     midX = midX / mass.length;
//     midY = midY / mass.length;

//     for (let i = 0; i < mass.length; i++) {
//         if (R < GetDistance(Point(mass[i].x, mass[i].y), Point(midX, midY))) {
//             R = GetDistance(Point(mass[i].x, mass[i].y), Point(midX, midY));
//         }
//     }
//     let a = 0;
//     let a_sum = Math.PI * 2 / countAstroid;
//     for (let i = 0; i < countAstroid; i++) {
//         let param;
//         switch(i % 10) {
//             case 0:
//                 param = 'red';
//                 break;
//             case 1:
//                 param = 'green';
//                 break;
//             case 2:
//                 param = 'blue';
//                 break;
//             case 3:
//                 param = 'goldenrod';
//                 break;
//             case 4:
//                 param = 'lime';
//                 break;
//             case 5:
//                 param = 'aquamarine';
//                 break;
//             case 6:
//                 param = 'violet';
//                 break;
//             case 7:
//                 param = 'salmon';//Сушенный лосось
//                 break;
//             case 8:
//                 param = 'yellow';
//                 break;
//             case 9:
//                 param = 'indigo';
//                 break;
//         }
//         let AstroidX = Math.round(midX + R / 2 * Math.cos(a));
//         let AstroidY = Math.round(midY + R / 2 * Math.sin(a));

//         let currentAstroid = CreateAstroid(AstroidX, AstroidY, param);

//         massAstroid.push(currentAstroid);
//         a += a_sum;
//     }
//     return massAstroid;
// }