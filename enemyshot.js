class enemyshot{
    bullets = [];

    constructor(position, target){
        this.position = position;
        this.target = target;
    }

    initializebullets(){
    }

    updateBullets(){
        this.bullets.forEach(element => {
            element.updatePosition();
        });
    }
}