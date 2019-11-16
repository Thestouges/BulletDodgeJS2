class lineshot extends enemyshot{
    bulletspeed = 1;
    totalbullets = 1;

    constructor(position, target){
        super(position, target);
        for(var i = 0; i < this.totalbullets; i++){
            this.initializebullets();
        }
    }

    initializebullets(){
        var bullet = new Bullet(this.position,this.bulletspeed,Victor(-(this.position.x - this.target.x), -(this.position.y - this.target.y)));
        this.bullets.push(bullet);
    }
}