class Bullet{
    constructor(initialpos, speed, vector, size){
        this.position = Victor(initialpos.x, initialpos.y);
        this.speed = speed;
        this.direction = Victor.fromObject(vector).normalize();
        this.size = size;
    }

    updatePosition(){
        var vecdir = this.direction;
        vecdir.multiply(Victor(this.speed, this.speed));
        this.position = this.position.add(vecdir);
        this.direction.normalize();
    }
}