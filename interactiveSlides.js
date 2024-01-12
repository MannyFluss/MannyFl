document.addEventListener('DOMContentLoaded', function() {
    let currentGameIndex = 1;
    const totalGames = document.querySelectorAll('.game').length;
    let isTransitioning = false;
    let autoChangeTimeout;
//swipe funcs
    let touchStartX = 0;
    let touchEndX = 0;

    function checkSwipeDirection() {
        if (touchEndX < touchStartX) {
            changeGame(1); // Left Swipe, go to next
        }
        if (touchEndX > touchStartX) {
            changeGame(-1); // Right Swipe, go to previous
        }
    }

    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        checkSwipeDirection();
    });


////
    //new
    const dots = document.querySelectorAll('#timelineDots .dot');
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideNumber = parseInt(this.getAttribute('data-slide'));
            changeGameToSlide(slideNumber);
        });
    });

    function changeGameToSlide(slideNumber) {
        if (currentGameIndex !== slideNumber) {
            changeGame(slideNumber - currentGameIndex);
        }
    }

//

    document.querySelector('#game' + currentGameIndex).classList.add('active');
    updateDots(currentGameIndex);
    setupAutoChange();

    document.getElementById('leftButton').addEventListener('click', function() {
        if (!isTransitioning) {
            changeGame(-1);
        }
    });

    document.getElementById('rightButton').addEventListener('click', function() {
        if (!isTransitioning) {
            changeGame(1);
        }
    });

    function changeGame(direction) {
        if (isTransitioning) return;

        isTransitioning = true;
        clearTimeout(autoChangeTimeout);
        let currentGame = document.querySelector('#game' + currentGameIndex);
        currentGame.classList.remove('active');

        setTimeout(() => {
            currentGameIndex += direction;
            if (currentGameIndex > totalGames) {
                currentGameIndex = 1;
            } else if (currentGameIndex < 1) {
                currentGameIndex = totalGames;
            }

            let nextGame = document.querySelector('#game' + currentGameIndex);
            nextGame.classList.add('active');
            isTransitioning = false;
            updateDots(currentGameIndex);
            setupAutoChange();
        }, 500);
    }

    function setupAutoChange() {
        clearTimeout(autoChangeTimeout);
        autoChangeTimeout = setTimeout(() => {
            changeGame(1);
        }, 15000);
    }

    function updateDots(index) {
        let dots = document.querySelectorAll('#timelineDots .dot');
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === index - 1);
        });
    }
});
