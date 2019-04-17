function createObjects() {
    genImages();
    ship.y = canvas.height / 2 - ship.size / 2;
    window.requestAnimationFrame(draw);
}

function draw() {
    if (!pause) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        drawPlanet();
        ship.setShipPosition();
        if (bulletArray.length > 0) drawBullets();
        if (enemiesArray.length > 0) drawEnemies();
        if (asteroidsArray.length > 0) drawAsteroids();
        if (explosionArray.length > 0) drawExplosions();
        watchBulletAsteroidCollision();
        watchBulletEnemyCollision();
        watchThingsSpaceShipCollision();
        moveSky();
        generateItem.byFrame();
    }

    window.requestAnimationFrame(draw);
}

window.addEventListener('keydown', e => {
    ship.controls(e);
});
window.addEventListener('keydown', e => {
    ship.controlsGun(e);
});

detectLoadOfResoucesOnArray(getResources());