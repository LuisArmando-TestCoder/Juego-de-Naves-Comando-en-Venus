function createObjects() {
    //Where the real deal starts
    genImages();
    spaceShipY = canvas.height/2-spaceShipSize/2;
    window.requestAnimationFrame(draw);
}

function draw(){
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    drawPlanet();
    ctx.drawImage(imagesObj.spaceShip[1], 300, spaceShipY, spaceShipSize, spaceShipSize);
    window.requestAnimationFrame(draw);
}

window.addEventListener('keydown', e=>{
    switch(e.keyCode){
        case 40:
            spaceShipY+=spaceShipSpeed;
            if(spaceShipY > canvas.height){
                spaceShipY = 0 - spaceShipSize;
            }
            break;
        case 38:
            if(spaceShipY < 0 - spaceShipSize){
                spaceShipY = canvas.height;
            }
            spaceShipY-=spaceShipSpeed;
            break;
        case 83:
            spaceShipY+=spaceShipSpeed;
            if(spaceShipY > canvas.height){
                spaceShipY = 0 - spaceShipSize;
            }
            break;
        case 87:
            if(spaceShipY < 0 - spaceShipSize){
                spaceShipY = canvas.height;
            }
            spaceShipY-=spaceShipSpeed;
            break;
    }
});