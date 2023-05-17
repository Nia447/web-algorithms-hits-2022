class Pheromone extends BaseObject{
    constructor(positon, radius, type = 'food', count, toHome = 10, toFood = 10){
        super(positon, radius);
        this.type = type;
        this.count = count;
        this.toHome = toHome;
        this.toFood = toFood;
    }
}