class bombshot extends enemyshot{
    bulletspeed = 1;
    totalBulletsSpawn = 8;
    bulletsize = 10;

    constructor(position, target){
        super(position, target);
        for(var i = 0; i < this.totalBulletsSpawn; i++){
            this.initializebullets(359/this.totalBulletsSpawn * i);
        }
    }

    initializebullets(angle){
        var bullet = new Bullet(this.position,this.bulletspeed,Victor(1,0).rotateDeg(angle),this.bulletsize);
        this.bullets.push(bullet);
        console.log(Victor(0,0).rotateDeg(angle));
    }
}