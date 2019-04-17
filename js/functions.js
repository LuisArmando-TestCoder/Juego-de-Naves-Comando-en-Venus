function getResources() {
  let arrayItemsToLoad = [];
  let itemIndex = 0;
  arrayItemsToLoad.push(soundsObj.inicio);
  for (let i in soundsObj) {
    // to get resources between index [0] and the penultimate element
    if (itemIndex != 0 && itemIndex < 6) {
      for (let a of soundsObj[i]) {
        arrayItemsToLoad.push(a);
      }
    }
    itemIndex += 1;
  }
  for (let i in soundsObj.extra) {
    arrayItemsToLoad.push(soundsObj.extra[i]);
  }
  genImages(false);
  itemIndex = 0;
  for (let i in imagesObj) {
    if (itemIndex < 4) {
      for (let a of imagesObj[i]) {
        arrayItemsToLoad.push(a);
      }
    }
    itemIndex += 1;
  }
  itemsToLoad = arrayItemsToLoad.length - 1;
  arrayItemsToLoad.push(imagesObj.venus);
  return arrayItemsToLoad;
  // to get from soundsObj the Audios
}

function detectLoadOfResoucesOnArray(resourcesArray) {
  for (let i of resourcesArray) {
    i.addEventListener("load", () => {
      currentIndexElementLoaded++;
      loadValue += 100 / itemsToLoad; //to upgrade bar by percentage
    });
    i.addEventListener("canplaythrough", () => {
      currentIndexElementLoaded++;
      loadValue += 100 / itemsToLoad; //to upgrade bar by percentage
    });
  }
  loadIntervalIndex = wi(changeLoadState, 0);
}

function changeLoadState() {
  // loadValue
  if (loadValue < 100) {
    loadBar.style.setProperty("width", `${loadValue}%`);
    ih(theMessages, `Generando ${messages[currentIndexElementLoaded]}`, false);
  } else if (loadValue > 100) {
    loadBar.style.setProperty("width", "100%");
    ih(theMessages, `Generando ${messages[messages.length - 1]}`, false);
    window.clearInterval(loadIntervalIndex);
    startScreen.style.setProperty("opacity", 1);
    loadingScreen.style.setProperty("display", "none");
  }
}

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
  window.addEventListener("keydown", e => {
    if (e.keyCode === 80) {
      pause = !pause;
      if (pause) {
        sp(pauseScreen, "display", "grid");
        soundsObj.cancionesDelJuego[randomSongInGameIndex].pause();
        soundsObj.intro[randomIntroSoundIndex].pause();
      } else {
        sp(pauseScreen, "display", "none");
        soundsObj.cancionesDelJuego[randomSongInGameIndex].play();
        if (seeIfIntroSoundStarted) {
          soundsObj.intro[randomIntroSoundIndex].play();
          soundsObj.intro[randomIntroSoundIndex].addEventListener(
            "ended",
            () => {
              seeIfIntroSoundStarted = false;
            }
          );
        }
      }
    }
  });
  seeIfStartBool = false;
  canvas.style.setProperty("box-shadow", "0 0 1vh");
  soundsObj.inicio.pause();
  skipStory.style.setProperty("visibilty", "hidden");
  life.style.setProperty("opacity", 1);
  onSky.style.setProperty("opacity", 0);
  nextSongButton.style.setProperty("display", "inline");
  canvas.style.setProperty("z-index", `9001`);
  setCanvasSize(window.innerWidth, 500);
  window.addEventListener("resize", () => {
    setCanvasSize(window.innerWidth, 500);
  });

  createObjects();
  soundsObj.bienvenida[randomSongIntroIndex].pause();
  soundsObj.cancionesDelJuego[randomSongInGameIndex].play();
  soundsObj.cancionesDelJuego[randomSongInGameIndex].volume = 0.05;
  if (storyTellingBool) {
    soundsObj.intro[randomIntroSoundIndex].play();
  }

  for (let i of soundsObj.cancionesDelJuego) {
    i.addEventListener("ended", () => {
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

  nextSongButton.addEventListener("click", changeSong);
}

function generate() {
  let requestIteration = 0;
  return {
    byFrame() {
      requestIteration += 1;
      if(requestIteration % 100 === 0) createAsteroid();
      if(requestIteration % 80 === 0) createEnemy();
    }
  }
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
  skipStory.style.setProperty("visibility", "visible");
  let time = 42;
  startScreen.style.setProperty("z-index", -1);
  startScreen.style.setProperty("opacity", 0);
  onSky.style.setProperty("opacity", 0);
  soundsObj.bienvenida[randomSongIntroIndex].play();
  soundsObj.bienvenida[randomSongIntroIndex].volume = 0.05;
  soundsObj.inicio.play();
  storyContainer.style.setProperty(
    "animation",
    `from-bottom-to-top ${time}s linear forwards`
  );
  wt(() => {
    storyContainer.style.setProperty("animation", "");
    if (seeIfStart) {
      skipToStart();
    } else {
      startScreen.style.setProperty("z-index", 10);
      startScreen.style.setProperty("opacity", 1);
      onSky.style.setProperty("opacity", 1);
      skipStory.style.setProperty("visibility", "hidden");
    }
  }, time * 1000 + 1000);
  theStartInterval = wi(() => {
    startCounter.innerHTML = time;
    time--;
    if (time < 0) {
      window.clearInterval(theStartInterval);
      startCounter.innerHTML = "";
    }
  }, 1000);
}

function skipToStart() {
  startScreen.style.setProperty("opacity", 0);
  canvas.style.setProperty("display", "block");
  skipStory.style.setProperty("visibility", "hidden");
  storyContainer.style.setProperty("animation", "");
  if (seeIfStartBool) {
    startGame();
  }
  window.clearInterval(theStartInterval);
  startCounter.innerHTML = "";
}

function genImages(bool = true) {
  imagesObj.asteroids[0].src =
    "https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/img/003-asteroid.svg";
  imagesObj.asteroids[1].src =
    "https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/img/008-asteroid-1.svg";
  imagesObj.boom[0].src =
    "https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/img/011-explosion.svg";
  imagesObj.boom[1].src =
    "https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/img/012-boom.svg";
  imagesObj.ufo[0].src =
    "https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/img/001-ufo.svg";
  imagesObj.ufo[1].src =
    "https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/img/002-ufo-1.svg";
  imagesObj.ufo[2].src =
    "https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/img/004-ufo-2.svg";
  imagesObj.ufo[3].src =
    "https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/img/005-ufo-3.svg";
  imagesObj.venus.src =
    "https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/img/009-venus.svg";
  imagesObj.boom[0].src =
    "https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/img/011-explosion.svg";
  imagesObj.spaceShip[0].src =
    "https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/img/006-spaceship.svg";
  if (bool) {
    imagesObj.spaceShip[0].src =
      "https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/img/006-spaceship.svg";
    let imgCounter = 0;
    wi(() => {
      imgCounter++;
      if (imgCounter === 3) {
        imgCounter = 0;
      }
      imagesObj.spaceShip[1].src = `https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/img/007-spaceship-1-${imgCounter}.svg`;
    }, 250);
  }
}

function drawPlanet() {
  ctx.drawImage(
    imagesObj.venus,
    xMovement,
    25,
    canvas.height - 50,
    canvas.height - 50
  );
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
    ctx.fillStyle = "#fecf01";
    ctx.fill();
    i.x += bulletSpeed;
    if (i.x - i.r > canvas.width) bulletArray.splice(bulletArray.indexOf(i), 1);
  }
}

function createExplosion(x, y, w, h) {
  explosionArray.push({
    x: x,
    y: y,
    w: w,
    h: h,
    speed: 1,
    count: 0
  });
}

function drawExplosions() {
  for (let i of explosionArray) {
    ctx.drawImage(imagesObj.boom[1], i.x, i.y, i.w, i.h);
    i.count += 5;
    i.x -= i.speed;
    if (i.count > 100) {
      explosionArray.splice(explosionArray.indexOf(i), 1);
    }
  }
}

function createEnemy() {
  enemiesArray.push({
    x: canvas.width,
    y: r(0, canvas.height - 60),
    w: 60,
    h: 50,
    img: imagesObj.ufo[r(0, imagesObj.ufo.length - 1)],
    speed: r(5, 10),
    dmg: 0,
    enemyIndex: enemyIndex
  });
  enemyIndex++;
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
    speed: r(10, 28)
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
  for (let i of document.querySelector(".sky").children) {
    let left = i.getAttribute("left") - 0.05;
    if (left < 0) {
      left = 100;
      sp(i, "top", r(0, 99) + "%");
    }
    sp(i, "left", left + "%");
    sa(i, "left", left);
  }
}

function watchBulletAsteroidCollision() {
  for (let i of bulletArray) {
    for (let a of asteroidsArray) {
      if (
        !(
          a.x - (i.x + i.r) >= 0 ||
          i.x + i.r * -1 - (a.x + a.w) >= 0 ||
          a.y - (i.y + i.r) >= 0 ||
          i.y + i.r * -1 - (a.y + a.h) >= 0
        )
      ) {
        bulletArray.splice(bulletArray.indexOf(i), 1);
      }
    }
  }
}

function watchBulletEnemyCollision() {
  for (let i of bulletArray) {
    for (let a of enemiesArray) {
      if (
        !(
          a.x - (i.x + i.r) >= 0 ||
          i.x + i.r * -1 - (a.x + a.w) >= 0 ||
          a.y - (i.y + i.r) >= 0 ||
          i.y + i.r * -1 - (a.y + a.h) >= 0
        )
      ) {
        if (a.dmg < 1) {
          bulletArray.splice(bulletArray.indexOf(i), 1);
          a.dmg++;
        } else {
          createExplosion(a.x, a.y, a.w, a.h);

          enemiesArray.splice(enemiesArray.indexOf(a), 1);
          getPoint();
        }
      }
    }
  }
}

function watchThingsSpaceShipCollision() {
  for (let a of enemiesArray) {
    if (
      !(
        a.x - (ship.x + ship.size / 2) >= 0 ||
        ship.x + (ship.size / 2) * -1 - (a.x + a.w) >= 0 ||
        a.y - (ship.y + ship.size / 2) >= 0 ||
        ship.y + (ship.size / 2) * -1 - (a.y + a.h) >= 0
      )
    ) {
      createExplosion(a.x, a.y, a.w, a.h);
      enemiesArray.splice(enemiesArray.indexOf(a), 1);
      getPoint();
      ship.life--;
      life.innerHTML = "";
      if (ship.life === 0) {
        gameOver();
      }
      for (let i = 0; i < ship.life; i++) {
        life.innerHTML += "❤";
      }
    }
  }
  for (let a of asteroidsArray) {
    //MY OWN COLLISIONS BABY!!!!! FINALLY I DID IT!!!!
    if (
      !(
        a.x - (ship.x + ship.size / 2) >= 0 ||
        ship.x + (ship.size / 2) * -1 - (a.x + a.w) >= 0 ||
        a.y - (ship.y + ship.size / 2) >= 0 ||
        ship.y + (ship.size / 2) * -1 - (a.y + a.h) >= 0
      )
    ) {
      ship.life--;
      life.innerHTML = "";
      if (ship.life === 0) {
        gameOver();
      }
      for (let i = 0; i < ship.life; i++) {
        life.innerHTML += "❤";
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
  localStorage.setItem("lastScore", globalPoints);
  if (localStorage.getItem("bestScore") < globalPoints) {
    localStorage.setItem("bestScore", globalPoints);
  }
  location.replace("index.html");
}

function setCanvasSize(w, h) {
  canvas.width = w;
  canvas.height = h;
}
