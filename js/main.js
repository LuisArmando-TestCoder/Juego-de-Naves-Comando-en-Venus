function createObjects() {
    //Where the real deal starts
    genImages();
    ship.y = canvas.height / 2 - ship.size / 2;
    window.requestAnimationFrame(draw);
}

function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    drawPlanet();
    ctx.drawImage(imagesObj.spaceShip[1], ship.x, ship.y, ship.size, ship.size);
    if (bulletArray.length > 0) drawBullets();
    window.requestAnimationFrame(draw);
}

window.addEventListener('keydown', e => {
    ship.controls(e);
});