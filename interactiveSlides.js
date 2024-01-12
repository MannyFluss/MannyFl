document.addEventListener('DOMContentLoaded', function() {
    let currentGameIndex = 1;
    const totalGames = document.querySelectorAll('.game').length;
    let isTransitioning = false; // Flag to indicate if a transition is in progress
    let autoChangeTimeout;

    document.querySelector('#game' + currentGameIndex).classList.add('active');
    setupAutoChange();

    document.getElementById('leftButton').addEventListener('click', function() {
        if (!isTransitioning) {
            changeGame(-1);
            setupAutoChange();
        }
    });

    document.getElementById('rightButton').addEventListener('click', function() {
        if (!isTransitioning) {
            changeGame(1);
            setupAutoChange();
        }
    });

    function changeGame(direction) {
        if (isTransitioning) return; // Do nothing if a transition is already in progress

        isTransitioning = true; // Set the flag
        clearTimeout(autoChangeTimeout); // Clear existing timeout

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
            isTransitioning = false; // Reset the flag
            setupAutoChange(); // Set up next auto change
        }, 500); // This matches the CSS transition time
    }

    function setupAutoChange() {
        clearTimeout(autoChangeTimeout);
        autoChangeTimeout = setTimeout(() => {
            changeGame(1);
        }, 15000); // 15 seconds
    }
});
