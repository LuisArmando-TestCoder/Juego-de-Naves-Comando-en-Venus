if (!(localStorage.getItem('bestScore') == null || localStorage.getItem('lastScore') == null)) {
    bestScore.innerHTML = `Mejor puntuación: ${localStorage.getItem('bestScore')}`;
    lastScore.innerHTML = `Puntuación más reciente: ${localStorage.getItem('lastScore')}`;
}

// localStorage.setItem('TellingTheBool', false);

if (localStorage.getItem('TellingTheBool') === 'true') {
    storyTellingBool = false;
} else {
    storyTellingBool = true;
    localStorage.setItem('TellingTheBool', true);
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


genSky('.sky', 80);
genParticles('.particles', 20);
nextSongButton.style.setProperty('display', 'none');

startButton.addEventListener('click', () => {
    canvas.className = '';
    startScreen.style.setProperty('z-index', -1);
    startScreen.style.setProperty('opacity', 0);
    startStoryTelling();
});

seeTheStory.addEventListener('click', () => {
    seeIfStart = false;
    tellStory();
});

skipStory.addEventListener('click', () => {
    seeIfStart = true;
    skipToStart();
})