class NeuralNetwork{
    Layers;
    constructor(){
        this.Layers = [];
        this.Layers.length = 3;
        this.CreateInputLayer();
        this.CreateHiddenLayer();
        this.CreateOutputLayer();
    }
    FeedForward(inputs = []){
        let result = [];
        result.length = 10;
        this.SendSignalsToInputNeurons(inputs);
        this.FeedForwardAllLayersAfterInput();
        for(let i = 0; i < result.length; i++){
            result[i] = this.Layers[2].Neurons[i].Outputs;
        }
        return result;
    }
    CreateInputLayer(){
        let inputNeurons = [];
        inputNeurons.length = InputLayer.Count;
        for(let i = 0; i < inputNeurons.length; i++){
            inputNeurons[i] = new Neuron(InputLayer.Neurons[i].Weights, InputLayer.Type);
        }
        this.Layers[0] = new Layer(inputNeurons, InputLayer.Type);
    }
    CreateHiddenLayer(){
        let hiddenNeurons = [];
        hiddenNeurons.length = HiddenLAyer.Count;
        for(let i = 0; i < hiddenNeurons.length; i++){
            hiddenNeurons[i] = new Neuron(HiddenLAyer.Neurons[i].Weights, HiddenLAyer.Type);
        }
        this.Layers[1] = new Layer(hiddenNeurons, HiddenLAyer.Type);
    }
    CreateOutputLayer(){
        let outputNeurons = [];
        outputNeurons.length = OutputLayer.Count;
        for(let i = 0; i < outputNeurons.length; i++){
            outputNeurons[i] = new Neuron(OutputLayer.Neurons[i].Weights, OutputLayer.Type);
        }
        this.Layers[2] = new Layer(outputNeurons, OutputLayer.Type);
    }
    SendSignalsToInputNeurons(inputs = []){
        for(let i = 0; i < inputs.length; i++){
            let signal = [];
            signal.length = 1;
            signal[0] = inputs[i];
            this.Layers[0].Neurons[i].FeedForward(signal);
        }
    }
    FeedForwardAllLayersAfterInput(){
        for(let i = 1; i < this.Layers.length; i++){
            let currentLayer = this.Layers[i];
            let previousLayerSignal = [];
            previousLayerSignal = this.Layers[i - 1].GetSignals();
            for(let j = 0; j < currentLayer.NeuronsCount; j++){//возможно тут будет ошибка currentLayer.NeuronsCount
                currentLayer.Neurons[j].FeedForward(previousLayerSignal);
            }
        }
    }
}