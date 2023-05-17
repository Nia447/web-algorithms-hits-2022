function ID3(mass, massData, massParam) {
    
    let length = massData.length;
    let lengthY = 0;
    let used = new Array();

    for (let i = 0; i < massData[0].params.length; i++) {
        used.push(false);
    }

    let massY = new Array();
    for (let i = 0; i < length; i++) {
        let flag = true;
        for (let j = 0; j < massY.length; j++) {
            if (massY[j] == massData[i].Y) {
                flag = false;
            }
        }
        if (flag) {
            massY.push(massData[i].Y);
            lengthY++;
        }
    }

    SetNode(mass, massData, massParam, massY, length, lengthY, used);

}

function SetNode(mass, massData, massParam, massY, length, lengthY, used, IndexParent = null) {

    let FullEntropy = GetFullEntropy(massData, massY, length, lengthY);

    let massGain = new Array();

    let globalMassLeaf = new Array();
    let globalMassLeafParam = new Array();
    let globalMassParam = new Array();

    let MaxValue = -100, MaxIndex;
    
    let CurrentGain;
    let StartIndex = 0;

    for (let i = 0; i < massData[0].params.length; i++) {
        CurrentGain = 0;

        let currentMassParams = new Array();
        let CurrentMassLeafParamY = new Array();

        for (let j = 0; j < length; j++) {
            let flag = true;
            let param = massData[j].params[i];

            for (let l = 0; l < currentMassParams.length; l++) {
                if (currentMassParams[l] == param) {
                    flag = false;
                }
            }

            if (flag) {
                currentMassParams.push(param);
                CurrentMassLeafParamY.push(massData[j].Y);
            }
        }
        
        let massLeaf = new Array();

        for (let j = 0; j < currentMassParams.length; j++) {
            massLeaf.push(false);
        }

        let count;
        let sum;
        for (let j = 0; j < currentMassParams.length; j++) {
            count = 0;
            sum = 0;

            let param = currentMassParams[j];
            let MassCountY = new Array();
            for(let l = 0; l < lengthY; l++) {
                MassCountY[l] = 0;
            }

            for (let l = 0; l < length; l++) {
                if (param == massData[l].params[i]) {
                    count++;
                    for (let k = 0; k < lengthY; k++) {
                        if (massData[l].Y == massY[k]) {
                            MassCountY[k]++;
                        }
                    }
                }
            }

            for (let l = 0; l < lengthY; l++) {
                if (MassCountY[l] != 0) {
                    sum -= MassCountY[l] / count * Math.log2(MassCountY[l] / count);   
                } else {
                    massLeaf[j] = true;
                }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
            }

            CurrentGain += (count / length) * sum;

        }

        if (used[i]) {
            massGain.push(0);
            StartIndex++;
            if (typeof(MaxIndex) == 'undefined') {
                globalMassLeaf = massLeaf;
                globalMassParam = currentMassParams;
                globalMassLeafParam = CurrentMassLeafParamY;
            }
            continue;
        }

        massGain.push(FullEntropy - CurrentGain);  

        if (i == StartIndex) {
            MaxValue = massGain[0];
            MaxIndex = StartIndex;
            globalMassLeaf = massLeaf;
            globalMassParam = currentMassParams;
            globalMassLeafParam = CurrentMassLeafParamY;
        } else if (MaxValue < massGain[massGain.length - 1]) {
            MaxValue = massGain[massGain.length - 1];
            MaxIndex = i;
            globalMassLeaf = massLeaf;
            globalMassParam = currentMassParams;
            globalMassLeafParam = CurrentMassLeafParamY;
        }

    }

    if (typeof(MaxIndex) == 'undefined') {
        MaxIndex = massData[0].params.length - 1;
        used[MaxIndex] = true;
        if (IndexParent != null) {
            mass[IndexParent].ChildIndex.push(mass.length);
            mass.push(new TLeaf(globalMassLeafParam[globalMassLeafParam.length - 1]));
        }
        return null;
    }

    used[MaxIndex] = true;

    let currentTNode = new TNode(massParam[MaxIndex]);
    let currentIndexParent = mass.length;
    mass.push(currentTNode);

    currentTNode.ChildName = globalMassParam;

    if (IndexParent != null) {
        mass[IndexParent].ChildIndex.push(currentIndexParent);
    }

    for (let i = 0; i < globalMassParam.length; i++) {
        if (globalMassLeaf[i]) {
            mass.push(new TLeaf(globalMassLeafParam[i]));
            currentTNode.ChildIndex.push(mass.length - 1);
        } else {
            let CurrentMassData = new Array();
            for (let j = 0; j < length; j++) {
                if (globalMassParam[i] == massData[j].params[MaxIndex]) {
                    CurrentMassData.push(massData[j]);
                }
            }
            SetNode(mass, CurrentMassData, massParam, massY, CurrentMassData.length, lengthY, used, currentIndexParent);
        }
    }
}

function GetFullEntropy(massData, massY, length, lengthY) {
    let count;
    let param;
    let sum = 0;

    for (let i = 0; i < lengthY; i++) {
        count = 0;
        param = massY[i];

        for (let j = 0; j < length; j++) {
            if (massData[j].Y == param) {
                count++;
            }
        }

        sum -= count / length * Math.log2(count / length);
    }

    return sum;
}