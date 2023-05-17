class Food extends BaseObject{
    constructor(position, radius, portion = 1){
        super(position, radius);
        this.portion = portion;
    }
}