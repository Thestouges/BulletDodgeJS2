class Player{
    bulletList;
    constructor(pos, speed, deg, size){
        this.position = pos;
        this.speed = speed;
        this.rotation = deg;
        this.size = size;
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

    checkPlayerPositionInArena(arenaSize){
        var radius = arenaSize - playersize/2;
        var centerPosition = new Victor(0, 0); 
        var newLocation = new Victor(this.position.x,this.position.y);
        var distance = newLocation.distance(centerPosition);
        
        if (distance > radius)
        {
            var fromOriginToObject = newLocation.subtract(centerPosition);
            fromOriginToObject.x *= (radius / distance);
            fromOriginToObject.y *= (radius / distance);
            newLocation = centerPosition.add(fromOriginToObject);
            this.updatePlayerPos(newLocation);
        }
    }
}