function startGame() {
    console.log('El juego empezó');
    canvas.style.setProperty('z-index', `9001`);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    createObjects();
}

function startStoryTelling() {
    onSky.style.setProperty('opacity', `0`);
    if (storyTellingBool) {
        let time = 42;
        storyContainer.style.setProperty('animation', `from-bottom-to-top ${time}s linear forwards`);
        wt(() => {
            startGame();
        }, time * 1000);
        theStartInterval = wi(() => {
            startCounter.innerHTML = time;
            time--;
            if (time < 0) {
                window.clearInterval(theStartInterval);
                startCounter.innerHTML = '';
            }
        }, 1000);
        storyTellingBool = false;
    } else {
        startGame();
    }
}

startButton.addEventListener('click', () => {
    canvas.className = '';
    startScreen.style.setProperty('z-index', -1);
    startScreen.style.setProperty('opacity', 0);
    startStoryTelling();
});

function genSky(selector, manyStars) {
    let star = '<div class="star"></div>';
    let onSky = qs(selector);
    sp(onSky, 'opacity', '1');
    let colorArr = ['white'];

    for (let i = 0; i < manyStars; i++) {
        ih(onSky, star);
        sp(onSky.lastChild, 'top', r(0, 99) + '.' + r(0, 100) + '%');
        sp(onSky.lastChild, 'left', r(0, 99) + '.' + r(0, 100) + '%');
        sp(onSky.lastChild, 'background', colorArr[r(0, colorArr.length)]);
        sp(onSky.lastChild, 'animation', 'opac 2.' + r(1, 9) + 's infinite');
        sp(onSky.lastChild, 'animation-delay', r(0, 1) + '.' + r(0, 9) + 's');
        let size = r(1, 5);
        sp(onSky.lastChild, 'width', size + 'px');
        sp(onSky.lastChild, 'height', size + 'px');
    }
}
genSky('.sky', 50);
function genParticles(selector, manyLines) {
    let line = '<div class="line"></div>';
    onSky = qs(selector);
    for (let i = 0; i < manyLines; i++) {
        ih(onSky, line);
        sp(onSky.lastChild, 'left', r(0, 99) + '.' + r(0, 100) + '%');
        sp(onSky.lastChild, 'animation-delay', r(0, 9) + '.' + r(0, 9) + 's');
    }
}
genParticles('.particles', 20);
