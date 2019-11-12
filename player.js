class Player{
    bulletList;
    constructor(pos, speed, deg){
        this.position = pos;
        this.speed = speed;
        this.rotation = deg;

        this.bulletList = [];
    }

    movePlayerPos(movement){
        this.position.x += movement.x*this.speed;
        this.position.y += movement.y*this.speed;
    }

    updatePlayerPos(pos){
        this.position = pos;
    }

    updateRotation(deg){
        this.rotation = deg;
    }

    addBullet(bulletActiveTime, bulletspeed, mousepos){
        var bullet = new Bullet(pos,bulletspeed,Victor(-(pos.x - mousepos.x), -(pos.y - mousepos.y)));
        var index = this.bulletList.push(bullet);
        setTimeout(deleteBullet, bulletActiveTime);
    }

    deleteBullet(){
        this.bulletList.splice(0,1);
    }
}