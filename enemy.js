class enemy{
    constructor(position, speed, size){
        this.position = position;
        this.speed = speed;
        this.size = size;
    }

    updatePosition(targetpos){
        var vecdir = Victor(this.position.x,this.position.y);
        vecdir.subtract(targetpos).normalize();
        vecdir.multiply(Victor(this.speed, this.speed));
        this.position = this.position.subtract(vecdir);
        //console.log(this.position);
    }
}