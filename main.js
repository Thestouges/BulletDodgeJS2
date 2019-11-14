var canvas;
var context;
var arenaSize = 150;

var player;
var playerSpeed = 2;
var playersize = 50;

var bulletspeed = 8;
var bulletsize = 5;

var keyStack;
var mousePos;

var enemies = [];
var enemySpawnDistance;
var enemyBulletList = [];

function initialize(){
    initializeGame();
    setTimerInvervals();
    setEventListeners()
}

function initializeGame(){
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext("2d");
    context.translate(canvas.width/2, canvas.height/2);

    context.lineWidth = 1;

    mousePos = new Victor(0,0);

    SetMovementKeys();
    getCurrentCenter();
    initializePlayer();

    enemySpawnDistance = Math.max(canvas.height, canvas.width);
    //spawnEnemy();
}

function setEventListeners(){
    window.addEventListener('resize', getCurrentCenter);
    canvas.addEventListener('mousemove', updatePlayer);
    window.addEventListener("keydown", keyboardDownEvent);
    window.addEventListener("keyup", keyboardUpEvent);
    canvas.addEventListener('click', FireBullet, false);
}

function setTimerInvervals(){
    setInterval(redraw, 10);
    setInterval(spawnEnemy,1000);
}

function SetMovementKeys(){
    keyStack = new Object();
    keyStack['a'] = false;
    keyStack['d'] = false;
    keyStack['s'] = false;
    keyStack['w'] = false;
}

function keyboardDownEvent(e){
    var keyCode = e.key;

    if(keyCode == 'a' || keyCode == 'A'){
        keyStack['a'] = true;
    }
    if(keyCode == 'd' || keyCode == 'D'){
        keyStack['d'] = true;
    }
    if(keyCode == 'w' || keyCode == 'W'){
        keyStack['w'] = true;
    }
    if(keyCode == 's' || keyCode == 'S'){
        keyStack['s'] = true;
    }
}

function keyboardUpEvent(e){
    var keyCode = e.key;

    if(keyCode == 'a' || keyCode == 'A'){
        keyStack['a'] = false;
    }
    if(keyCode == 'd' || keyCode == 'D'){
        keyStack['d'] = false;
    }
    if(keyCode == 'w' || keyCode == 'W'){
        keyStack['w'] = false;
    }
    if(keyCode == 's' || keyCode == 'S'){
        keyStack['s'] = false;
    }
}

function updatePlayerRotation(){
    var linetofromcenter = Victor(mousePos.x,mousePos.y);
    var playerRot = new Victor(linetofromcenter.x, linetofromcenter.y);
    playerRot.subtract(player.position);
    player.updateRotation(playerRot.horizontalAngleDeg()* Math.PI / 180);
}

function updatePlayer(e){
    
    var mousepos = getMousePos(canvas,e);
    mousePos.x = mousepos.x;
    mousePos.y = mousepos.y;

    var linetofromcenter = Victor(mousepos.x,mousepos.y);

    var playerRot = new Victor(linetofromcenter.x, linetofromcenter.y);
    playerRot.subtract(player.position);
    player.updateRotation(playerRot.horizontalAngleDeg()* Math.PI / 180);
}

function initializePlayer(){
    player = new Player(new Victor(0,0),playerSpeed,0, playersize);
}

function drawPlayer(){
    context.beginPath();

    context.save();
    context.translate(player.position.x,player.position.y);
    context.rotate(player.rotation);
    context.translate(-player.position.x,-player.position.y);
    context.rect(player.position.x-player.size/2,player.position.y-player.size/2,player.size,player.size);
    context.stroke();
    context.restore();

    context.beginPath();
    context.arc(player.position.x,player.position.y,playersize/2,0,2*Math.PI);
    context.stroke();
}

function redraw(){
    getCurrentCenter();
    movePlayer();
    updatePlayerRotation();
    checkPlayerPositionInArena();
    clearCanvas();
    drawArena();
    drawPlayer();
    DrawUpdateBullets();

    drawEnemies();
    updateEnemyPos();
    drawEnemyBullets();
}

function movePlayer(){
    if(keyStack['a']){
        player.movePlayerPos(new Victor(-1,0));
    }
    if(keyStack['d']){
        player.movePlayerPos(new Victor(1,0));
    }
    if(keyStack['s']){
        player.movePlayerPos(new Victor(0,1));
    }
    if(keyStack['w']){
        player.movePlayerPos(new Victor(0,-1));
    }
}

function getCurrentCenter(){
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    center = Victor(canvas.width/2,canvas.height/2);

    context.translate(center.x, center.y);
}

function drawArena(){
    context.beginPath();
    context.arc(0,0,arenaSize,0,2*Math.PI);
    context.stroke();
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: ((evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width) - canvas.width/2,
        y: ((evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height) - canvas.height/2
    };
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);

}

function FireBullet(e){
    var mousepos = getMousePos(canvas, e);
    var bullet = new Bullet(player.position,bulletspeed,Victor(-(player.position.x - mousepos.x), -(player.position.y - mousepos.y)));
    player.bulletList.push(bullet);
}

function DrawUpdateBullets(){
    player.bulletList.forEach(element => {
        
        context.beginPath();
        context.arc(element.position.x,element.position.y,bulletsize,0,2*Math.PI);
        context.stroke();

        element.updatePosition();
    });
}

function CheckIntersection(object1Size, object1Pos, object2Size, object2Pos){
    var radius = object2Size + object1Size;
    var centerPosition = new Victor(object1Pos.x, object1Pos.y); 
    var newLocation = new Victor(object2Pos.x,object2Pos.y);
    var distance = newLocation.distance(centerPosition);

    if(distance <= radius){
        return true;
    }
    else{
        return false;
    }
}

function checkPlayerPositionInArena(){
    player.checkPlayerPositionInArena(arenaSize);
}

function spawnEnemy(){
    var posx = Math.random()*2 - 1;
    var posy = Math.random()*2 - 1;
    
    var normVec = new Victor(posx, posy);
    normVec.normalize();

    normVec.multiply(Victor(enemySpawnDistance, enemySpawnDistance))

    enemies.push(new enemy(normVec,playerSpeed,playersize));
}

function drawEnemies(){
    enemies.forEach(element => {
        context.beginPath();
        context.arc(element.position.x,element.position.y,playersize/2,0,2*Math.PI);
        context.stroke();
        
        context.beginPath();
        context.moveTo(element.position.x, element.position.y);
        context.lineTo(player.position.x,player.position.y);
        context.stroke();
        
    });
}

function drawEnemyBullets(){
    enemyBulletList.forEach(bulletSet =>{
        bulletSet.forEach(element => {
            context.beginPath();
            context.arc(element.position.x,element.position.y,bulletsize,0,2*Math.PI);
            context.stroke();

            element.updatePosition();
        });
    });
}

function updateEnemyPos(){
    for(var i = 0; i < enemies.length; i++){
        if(CheckIntersection(arenaSize, Victor(0,0), enemies[i].size/2, enemies[i].position)){
            spawnEnemyShots(enemies[i].position, player.position);
            enemies.splice(i,1);
            i--;
        }
        else{
            enemies[i].updatePosition(Victor(0,0));
        }
    }
}

function spawnEnemyShots(position, target){
    var num = Math.floor(Math.random() * 2);

    if(num == 0){
        var bulletspawn = new bombshot(position, target);
        enemyBulletList.push(bulletspawn.bullets);
    }
    else if(num == 1){
        var bulletspawn = new lineshot(position, target);
        enemyBulletList.push(bulletspawn.bullets);
    }
}

function DestroyBullets(){
    for(var i = 0; i < enemyBulletList.length; i++){
        for(var j = 0; j < enemyBulletList[i].length; j++){
            if(enemyBulletList[i].position.x < -canvas.width/2 || enemyBulletList[i].position.y < -canvas.height/2
                || enemyBulletList[i].position.x > canvas.width/2 || enemyBulletList[i].position.y > canvas.height/2){
                    enemyBulletList[i].splice(j,1);
                    j--;
            }
        }
        if(enemyBulletList[i].length == 0){
            enemyBulletList.splice(i,1);
            i--;
        }
    }
}