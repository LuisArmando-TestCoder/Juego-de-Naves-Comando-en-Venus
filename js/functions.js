/***********	
  Funciones	
************/
function changeSong() {
  soundsObj.cancionesDelJuego[randomSongInGameIndex].pause();
  randomSongInGameIndex++;
  if (randomSongInGameIndex > soundsObj.cancionesDelJuego.length - 1) {
    randomSongInGameIndex = 0;
  }
  for (let i of soundsObj.cancionesDelJuego) {
    i.pause();
  }
  soundsObj.cancionesDelJuego[randomSongInGameIndex].play();
}
function tellStory(seeIfStart = true) {
  let time = 42;
  startScreen.style.setProperty('z-index', -1);
  startScreen.style.setProperty('opacity', 0);
  onSky.style.setProperty('opacity', 0);
  soundsObj.bienvenida[randomSongIntroIndex].play();
  storyContainer.style.setProperty('animation', `from-bottom-to-top ${time}s linear forwards`);
  wt(() => {
    storyContainer.style.setProperty('animation', '');
    if (seeIfStart) {
      startGame();
    } else {
      startScreen.style.setProperty('z-index', 10);
      startScreen.style.setProperty('opacity', 1);
      onSky.style.setProperty('opacity', 1);
    }
  }, time * 1000 + 1000);
  theStartInterval = wi(() => {
    startCounter.innerHTML = time;
    time--;
    if (time < 0) {
      window.clearInterval(theStartInterval);
      startCounter.innerHTML = '';
    }
  }, 1000);
}
function genImages() {
  imagesObj.asteroids[0].src = 'img/003-asteroid.svg';
  imagesObj.asteroids[1].src = 'img/008-asteroid-1.svg';
  imagesObj.spaceShip[0].src = 'img/006-spaceship.svg';
  let imgCounter = 0;
  wi(() => {
    imgCounter++;
    if (imgCounter === 3) {
      imgCounter = 0;
    }
    imagesObj.spaceShip[1].src = `img/007-spaceship-1-${imgCounter}.svg`;
  }, 250);
  imagesObj.boom[0].src = 'img/011-explosion.svg';
  imagesObj.boom[1].src = 'img/012-boom.svg';
  imagesObj.ufo[0].src = 'img/001-ufo.svg';
  imagesObj.ufo[1].src = 'img/002-ufo-1.svg';
  imagesObj.ufo[2].src = 'img/004-ufo-2.svg';
  imagesObj.ufo[3].src = 'img/005-ufo-3.svg';
  imagesObj.venus.src = 'img/009-venus.svg';
}
function drawPlanet() {
  ctx.drawImage(imagesObj.venus, xMovement, 0, canvas.height, canvas.height);
}
function createBullet() {
  bulletArray.push({
    x: ship.x + ship.size,
    y: ship.y + ship.size / 2,
    r: 3
  });
}
function drawBullets() {
  for (let i of bulletArray) {
    ctx.beginPath();
    ctx.arc(i.x, i.y, i.r, 0, Math.PI * 2, false);
    ctx.fillStyle = '#fecf01';
    ctx.fill();
    i.x += bulletSpeed;
    if (i.x - i.r > canvas.width) bulletArray.splice(bulletArray.indexOf(i), 1);
  }
}

function createEnemy(){
  enemiesArray.push({
    x: canvas.width,
    y: r(0, canvas.height - 60),
    w: 60,
    h: 50,
    img: imagesObj.ufo[r(0, imagesObj.ufo.length - 1)],
    speed: r(1, 4)
  });
}
function drawEnemies(){
  for (let i of enemiesArray) {
    ctx.drawImage(i.img, i.x, i.y, i.w, i.h);
    i.x -= i.speed;
    if (i.x + i.w < 0) enemiesArray.splice(enemiesArray.indexOf(i), 1);
  }
}
function createAsteroid(){
  asteroidsArray.push({
    x: canvas.width,
    y: r(0, canvas.height - 60),
    w: 60,
    h: 50,
    img: imagesObj.asteroids[r(0, imagesObj.asteroids.length - 1)],
    speed: r(5, 8)
  });
}
function drawAsteroids(){
  for (let i of asteroidsArray) {
    ctx.drawImage(i.img, i.x, i.y, i.w, i.h);
    i.x -= i.speed;
    if (i.x + i.w < 0) asteroidsArray.splice(asteroidsArray.indexOf(i), 1);
  }
  
}

function moveSky() {
  xMovement -= 1;
  for (let i of document.querySelector('.sky').children) {
    let left = i.getAttribute('left') - 0.05;
    if (left < 0) {
      left = 100;
      sp(i, 'top', r(0, 99) + '%');
    }
    sp(i, 'left', left + '%');
    sa(i, 'left', left);
  }
}
