class Point{
    constructor(x, y, r, vector, angle, type = 'a'){
        this.x = x;
        this.y = y; 
        this.r = r;
        this.vector = vector;
        this.angle = angle;
        this.type = type;
    }
    print(context){
        context.fillStyle = 'rgb(0, 221, 255)';
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        context.fill();
    }
    move(){
        //this.angle = (this.angle + rand(-6, 6)) % 360;
        let direction = (Math.PI / 180) * this.angle;
        let newX = this.x + (this.vector * Math.cos(direction));
        let newY = this.y + (this.vector * Math.sin(direction));
        if(this.x < 0 || this.x > 1920){
            this.angle = 180 - this.angle;
            direction = (Math.PI / 180) * this.angle;
            newX = this.x + (this.vector * Math.cos(direction));
        }
        if(this.y < 0 || this.y > 1040){
            this.angle = -this.angle;
            direction = (Math.PI / 180) * this.angle;
            newY = this.y + (this.vector * Math.sin(direction));
        }
        let newP = new Point(newX, newY, this.r, this.vector, this.angle);
        return newP;
    }
    connectLine(context, points = []){
        context.strokeStyle = 'rgb(255, 0, 183)';
        for(let i = 0; i < points.length; i++){
            let dis = distance(points[i], new p(this.x, this.y));
            if(points[i].x != this.x && points[i].y != this.y && dis < 110){
                context.lineWidth = (100 - dis) / 100 - 0.05;
                context.beginPath();
                context.moveTo(this.x, this.y);
                context.lineTo(points[i].x, points[i].y);
                context.stroke();
            }
        }
    }
}