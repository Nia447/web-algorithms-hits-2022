class Topology{
    InputCount;
    OutputCount;
    HiddenLayers;
    constructor(inputCount = 0, outputCount = 0, hiddenLayers = 0){
        this.InputCount = inputCount;
        this.OutputCount = outputCount;
        this.HiddenLayers = hiddenLayers;
    }
}