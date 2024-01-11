document.addEventListener('DOMContentLoaded', function() {
    let currentGameIndex = 1;
    const totalGames = document.querySelectorAll('.game').length;
    document.querySelector('#game' + currentGameIndex).classList.add('active');
  
    document.getElementById('leftButton').addEventListener('click', function() {
      changeGame(-1);
    });
  
    document.getElementById('rightButton').addEventListener('click', function() {
      changeGame(1);
    });
  
    function changeGame(direction) {
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
        }, 500); // This matches the CSS transition time
    }


  });