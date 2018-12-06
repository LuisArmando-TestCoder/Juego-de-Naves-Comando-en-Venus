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
  soundsObj.cancionesDelJuego[randomSongInGameIndex].volume = 0.05;
}

function startGame() {
  soundsObj.inicio.pause();
  skipStory.style.setProperty('visibilty', 'hidden');
  life.style.setProperty('opacity', 1);
  wi(moveSky, 50);
  onSky.style.setProperty('opacity', 0);
  nextSongButton.style.setProperty('display', 'inline');
  canvas.style.setProperty('z-index', `9001`);
  setCanvasSize(window.innerWidth, 400);
  window.addEventListener('resize', () => {
      setCanvasSize(window.innerWidth, 400);
  });
  createObjects();
  soundsObj.bienvenida[randomSongIntroIndex].pause();
  soundsObj.cancionesDelJuego[randomSongInGameIndex].play(); //se detiene una y empieza otra canción
  soundsObj.cancionesDelJuego[randomSongInGameIndex].volume = 0.05;
  soundsObj.intro[r(0, soundsObj.intro.length - 1)].play();
  console.log(soundsObj.intro[r(0, soundsObj.intro.length - 1)])
  
  for (let i of soundsObj.cancionesDelJuego) {
      i.addEventListener('ended', () => {
          randomSongInGameIndex++;
          if (randomSongInGameIndex > soundsObj.cancionesDelJuego.length - 1) {
              randomSongInGameIndex = 0;
          }
          for (let a of soundsObj.cancionesDelJuego) {
              a.pause();
          }
          soundsObj.cancionesDelJuego[randomSongInGameIndex].play();
          soundsObj.cancionesDelJuego[randomSongInGameIndex].volume = 0.5;
      });
  }
  nextSongButton.addEventListener('click', changeSong);
  wt(() => {
      wi(() => {
          createEnemy();
      }, 2350);
  }, 1000);
  wt(() => {
      wi(() => {
          createAsteroid();
      }, 4000);
  }, 12000)
}

function startStoryTelling() {
  if (storyTellingBool) {
      tellStory();
      storyTellingBool = false;
  } else {
      startGame();
  }
}

function tellStory() {
  skipStory.style.setProperty('visibility', 'visible');
  let time = 42;
  startScreen.style.setProperty('z-index', -1);
  startScreen.style.setProperty('opacity', 0);
  onSky.style.setProperty('opacity', 0);
  soundsObj.bienvenida[randomSongIntroIndex].play();
  soundsObj.bienvenida[randomSongIntroIndex].volume = 0.05;
  soundsObj.inicio.play();
  storyContainer.style.setProperty('animation', `from-bottom-to-top ${time}s linear forwards`);
  wt(() => {
    storyContainer.style.setProperty('animation', '');
    if (seeIfStart) {
      skipToStart();
    } else {
      startScreen.style.setProperty('z-index', 10);
      startScreen.style.setProperty('opacity', 1);
      onSky.style.setProperty('opacity', 1);
      skipStory.style.setProperty('visibility', 'hidden');
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

function skipToStart() {
  startScreen.style.setProperty('opacity', 0);
  canvas.style.setProperty('display', 'block');
  skipStory.style.setProperty('visibility', 'hidden');
  storyContainer.style.setProperty('animation', '');
  startGame();
  window.clearInterval(theStartInterval);
  startCounter.innerHTML = '';
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
    x: ship.x + ship.size + 5,
    y: ship.y + ship.size / 2,
    r: 5
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

function createEnemy() {
  enemiesArray.push({
    x: canvas.width,
    y: r(0, canvas.height - 60),
    w: 60,
    h: 50,
    img: imagesObj.ufo[r(0, imagesObj.ufo.length - 1)],
    speed: r(4, 8),
    dmg: 0
  });
}

function drawEnemies() {
  for (let i of enemiesArray) {
    ctx.drawImage(i.img, i.x, i.y, i.w, i.h);
    i.x -= i.speed;
    if (i.x + i.w < 0) {
      lessPoint();
      enemiesArray.splice(enemiesArray.indexOf(i), 1);
    }
  }
}

function createAsteroid() {
  asteroidsArray.push({
    x: canvas.width,
    y: r(0, canvas.height - 60),
    w: 60,
    h: 50,
    img: imagesObj.asteroids[r(0, imagesObj.asteroids.length - 1)],
    speed: r(15, 18)
  });
}

function drawAsteroids() {
  for (let i of asteroidsArray) {
    ctx.drawImage(i.img, i.x, i.y, i.w, i.h);
    i.x -= i.speed;
    if (i.x + i.w < 0) asteroidsArray.splice(asteroidsArray.indexOf(i), 1);
  }

}

function moveSky() {
  xMovement -= 2;
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

function watchBulletAsteroidCollision() {
  for (let i of bulletArray) {
    for (let a of asteroidsArray) {
      //MY OWN COLLISIONS BABY!!!!! FINALLY I DID IT!!!!
      if (!(a.x - (i.x + i.r) >= 0 ||
          (i.x + i.r * -1) - (a.x + a.w) >= 0 ||
          a.y - (i.y + i.r) >= 0 ||
          (i.y + i.r * -1) - (a.y + a.h) >= 0)) {
        bulletArray.splice(bulletArray.indexOf(i), 1);
      }
    }
  }
}

function watchBulletEnemyCollision() {
  for (let i of bulletArray) {
    for (let a of enemiesArray) {
      //MY OWN COLLISIONS BABY!!!!! FINALLY I DID IT!!!!
      if (!(a.x - (i.x + i.r) >= 0 ||
          (i.x + i.r * -1) - (a.x + a.w) >= 0 ||
          a.y - (i.y + i.r) >= 0 ||
          (i.y + i.r * -1) - (a.y + a.h) >= 0)) {
        if (a.dmg < 1) {
          bulletArray.splice(bulletArray.indexOf(i), 1);
          a.dmg++;
          console.log(a.dmg);
        } else {
          enemiesArray.splice(enemiesArray.indexOf(a), 1);
          getPoint();
        }
      }
    }
  }
}

function watchThingsSpaceShipCollision() {
  for (let a of enemiesArray) {
    //MY OWN COLLISIONS BABY!!!!! FINALLY I DID IT!!!!
    if (!(a.x - (ship.x + ship.size / 2) >= 0 ||
        (ship.x + ship.size / 2 * -1) - (a.x + a.w) >= 0 ||
        a.y - (ship.y + ship.size / 2) >= 0 ||
        (ship.y + ship.size / 2 * -1) - (a.y + a.h) >= 0)) {
      enemiesArray.splice(enemiesArray.indexOf(a), 1);
      getPoint();
      ship.life--;
      life.innerHTML = '';
      if (ship.life === 0) {
        gameOver();
      }
      for (let i = 0; i < ship.life; i++) {
        life.innerHTML += '❤';
      }
    }
  }
  for (let a of asteroidsArray) {
    //MY OWN COLLISIONS BABY!!!!! FINALLY I DID IT!!!!
    if (!(a.x - (ship.x + ship.size / 2) >= 0 ||
        (ship.x + ship.size / 2 * -1) - (a.x + a.w) >= 0 ||
        a.y - (ship.y + ship.size / 2) >= 0 ||
        (ship.y + ship.size / 2 * -1) - (a.y + a.h) >= 0)) {
      ship.life--;
      life.innerHTML = '';
      if (ship.life === 0) {
        gameOver();
      }
      for (let i = 0; i < ship.life; i++) {
        life.innerHTML += '❤';
      }
    }
  }
}

function getPoint() {
  globalPoints++;
  startCounter.innerHTML = globalPoints;
}

function lessPoint() {
  globalPoints--;
  startCounter.innerHTML = globalPoints;
}

function gameOver() {
  localStorage.setItem('lastScore', globalPoints);
  if (localStorage.getItem('bestScore') < globalPoints) {
    localStorage.setItem('bestScore', globalPoints);
  }
  location.replace('index.html');
}

function setCanvasSize(w, h) {
  canvas.width = w;
  canvas.height = h;
}