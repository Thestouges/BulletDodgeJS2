class enemyLineShot{
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
        console.log(this.position);
    }

    checkEnemyPositionHitArena(arenaSize){
        var radius = arenaSize + this.size/2;
        var centerPosition = new Victor(0, 0); 
        var newLocation = new Victor(this.position.x,this.position.y);
        var distance = newLocation.distance(centerPosition);
        
        if (distance <= radius)
        {
            //this.updatePosition(Victor(0,0));
        }
        else{
            this.updatePosition(Victor(0,0));
        }
    }
}