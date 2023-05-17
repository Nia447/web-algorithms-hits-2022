class Neuron{
    Weights;
    Type;
    Outputs = [];
    constructor(weights = [], type = 0){
        this.Weights = weights;
        this.Type = type;
    }
    FeedForward(inputs = []){
        let sum = 0;
        if(this.Type == 0){
            for(let i = 0; i < inputs.length; i++){
                sum += inputs[i];
            }
        }
        else{
            for(let i = 0; i < inputs.length; i++){
                sum += inputs[i] * this.Weights[i];
            }
        }
        if(this.Type != 0){
            this.Outputs = sigmoid(sum);
        }
        else{
            this.Outputs = sum;
        }
        return this.Outputs;
    }
}