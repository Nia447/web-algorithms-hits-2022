class Layer{
    Neurons;//массив нейронов данного слоя
    NeuronsCount;
    Type;
    constructor(neurons = [], type = 0){
        this.Neurons = neurons;
        this.Type = type;
        this.NeuronsCount = this.Neurons.length;
    }
    GetSignals(){
        let res = [];
        res.length = this.NeuronsCount;
        for(let i = 0; i < this.NeuronsCount; i++){
            res[i] = this.Neurons[i].Outputs;
        }
        return res;
    }
}