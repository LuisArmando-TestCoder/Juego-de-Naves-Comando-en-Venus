// localStorage.setItem('TellingTheBool', false);

if (localStorage.getItem('TellingTheBool') === 'true') {
    storyTellingBool = false;
} else {
    storyTellingBool = true;
    localStorage.setItem('TellingTheBool', true);
}

function startGame() {
    life.style.setProperty('opacity', 1);
    wi(moveSky, 50);
    onSky.style.setProperty('opacity', 0);
    nextSongButton.style.setProperty('display', 'inline');
    canvas.style.setProperty('z-index', `9001`);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    });
    createObjects();
    soundsObj.bienvenida[randomSongIntroIndex].pause();
    soundsObj.cancionesDelJuego[randomSongInGameIndex].play(); //se detiene una y empieza otra canción
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
        }, 1000);
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

function genSky(selector, manyStars) {
    let star = '<div class="star"></div>';
    let onSky = qs(selector);
    sp(onSky, 'opacity', '1');
    let colorArr = ['white'];

    for (let i = 0; i < manyStars; i++) {
        ih(onSky, star);
        sp(onSky.lastChild, 'top', r(0, 99) + '%');
        sp(onSky.lastChild, 'left', r(0, 99) + '%');
        sa(onSky.lastChild, 'left', r(0, 99));
        sp(onSky.lastChild, 'background', colorArr[r(0, colorArr.length)]);
        sp(onSky.lastChild, 'animation', 'opac 2.' + r(1, 9) + 's infinite');
        sp(onSky.lastChild, 'animation-delay', r(0, 1) + '.' + r(0, 9) + 's');
        let size = r(1, 3);
        sp(onSky.lastChild, 'width', size + 'px');
        sp(onSky.lastChild, 'height', size + 'px');
    }
}

function genParticles(selector, manyLines) {
    let line = '<div class="line"></div>';
    onSky = qs(selector);
    for (let i = 0; i < manyLines; i++) {
        ih(onSky, line);
        sp(onSky.lastChild, 'left', r(0, 99) + '.' + r(0, 100) + '%');
        sp(onSky.lastChild, 'animation-delay', r(0, 9) + '.' + r(0, 9) + 's');
    }
}


genSky('.sky', 180);
genParticles('.particles', 20);
nextSongButton.style.setProperty('display', 'none');

startButton.addEventListener('click', () => {
    canvas.className = '';
    startScreen.style.setProperty('z-index', -1);
    startScreen.style.setProperty('opacity', 0);
    startStoryTelling();
});

seeTheStory.addEventListener('click', () => {
    tellStory(false);
});