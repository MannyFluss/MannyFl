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
      document.querySelector('#game' + currentGameIndex).classList.remove('active');
      currentGameIndex += direction;
  
      if (currentGameIndex > totalGames) {
        currentGameIndex = 1;
      } else if (currentGameIndex < 1) {
        currentGameIndex = totalGames;
      }
  
      document.querySelector('#game' + currentGameIndex).classList.add('active');
    }
  });