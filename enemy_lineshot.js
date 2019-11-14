class lineshot extends enemyshot{
    bulletspeed = 1;

    constructor(position, target){
        super(position, target);
        for(var i = 0; i < 5; i++){
            setTimeout(this.initializebullets(),500*i);
        }
    }

    initializebullets(){
        var bullet = new Bullet(this.position,bulletspeed,Victor(-(this.position.x - this.target.x), -(this.position.y - this.target.y)));
        this.bullets.push(bullet);
    }
}