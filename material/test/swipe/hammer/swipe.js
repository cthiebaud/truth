import hammerjs from 'https://cdn.jsdelivr.net/npm/hammerjs@2.0.8/+esm'

const swipeContent = document.getElementById('swipeContent');

const hammertime = new hammerjs(swipeContent);

const leChampsDesPossibles = {
    RIGHT: {
        hammerCommand: 'swiperight',
        text: 'RIGHT',
        there: 'about.html'
    },
    LEFT: {
        hammerCommand: 'swipeleft',
        text: 'LEFT',
        there: 'index.html'
    }
}

const nécessitéDeLaContingence = leChampsDesPossibles[swipeContent.dataset.direction]

if (nécessitéDeLaContingence) {
    const paragraphs = swipeContent.getElementsByTagName('p');
    Array.from(paragraphs).forEach(p => p.innerHTML = nécessitéDeLaContingence.text)

    hammertime.on(nécessitéDeLaContingence.hammerCommand, function () {
        navigate(nécessitéDeLaContingence.there);
    });
}

function navigate(url) {
    window.location.href = url;
}

