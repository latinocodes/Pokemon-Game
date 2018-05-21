// Game state
var gameState = {
  userPokemon: '',
  rivalPokemon: '',
  pokemonDB: [
    {
      name: 'charmander',
      type: 'fire',
      hp: 39,
      attack: 52,
      defense: 43,
      level: 1,
      img: 'http://www.smogon.com/dex/media/sprites/xy/charmander.gif'
    },
    {
      name: 'bulbasaur',
      type: 'fire',
      hp: 45,
      attack: 49,
      defense: 49,
      level: 1,
      img: 'http://www.smogon.com/dex/media/sprites/xy/bulbasaur.gif'
    },
    {
      name: 'squirtle',
      type: 'water',
      hp: 44,
      attack: 48,
      defense: 65,
      level: 1,
      img: 'http://www.smogon.com/dex/media/sprites/xy/squirtle.gif'
    },
  ],
  elements: {
    // Elements for the Screen view
    pokemonsEL: document.querySelector('.select-screen').querySelectorAll('.character'),
    battleScreenEl: document.getElementById('battle-screen'),
    attackBtnsEl: document.getElementById('battle-screen').querySelectorAll('.attack')
  },
  play: function (userAttack, cpuAttack) {
    var currentPokemon = gameState.currentPokemon[0];
    var rivalCurrentPokemon = gameState.rivalCurrentPokemon[0];
    currentPokemon.owner = 'user';
    rivalCurrentPokemon.owner = 'cpu';

    switch (userAttack) {
      case 'rock':
        if (cpuAttack == 'paper') {
          if (currentPokemon.health >= 1 && rivalCurrentPokemon.health >= 1) {
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, rivalCurrentPokemon, currentPokemon);
            if (rivalCurrentPokemon.health  >= 1) {
              gameState.attackMove(rivalCurrentPokemon.attack, rivalCurrentPokemon.level, .8, 2, currentPokemon, rivalCurrentPokemon);
            }
          }
        }
        if (cpuAttack == 'scissors') {
          if (currentPokemon.health >= 1 && rivalCurrentPokemon.health >= 1) {
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, rivalCurrentPokemon, currentPokemon);
            if (rivalCurrentPokemon.health  >= 1) {
              gameState.attackMove(rivalCurrentPokemon.attack, rivalCurrentPokemon.level, .8, .5, currentPokemon, rivalCurrentPokemon);
            }
          }
        }
        if (cpuAttack == 'rock') {
          if (currentPokemon.health >= 1 && rivalCurrentPokemon.health >= 1) {
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, rivalCurrentPokemon, currentPokemon);
            if (rivalCurrentPokemon.health  >= 1) {
              gameState.attackMove(rivalCurrentPokemon.attack, rivalCurrentPokemon.level, .8, 1, currentPokemon, rivalCurrentPokemon);
            }
          }
        }
      case 'paper':
        if (cpuAttack == 'paper') {
          if (currentPokemon.health >= 1 && rivalCurrentPokemon.health >= 1) {
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, rivalCurrentPokemon, currentPokemon);
            if (rivalCurrentPokemon.health  >= 1) {
              gameState.attackMove(rivalCurrentPokemon.attack, rivalCurrentPokemon.level, .8, 1, currentPokemon, rivalCurrentPokemon);
            }
          }
        }
        if (cpuAttack == 'scissors') {
          if (currentPokemon.health >= 1 && rivalCurrentPokemon.health >= 1) {
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, rivalCurrentPokemon, currentPokemon);
            if (rivalCurrentPokemon.health  >= 1) {
              gameState.attackMove(rivalCurrentPokemon.attack, rivalCurrentPokemon.level, .8, 2, currentPokemon, rivalCurrentPokemon);
            }
          }
        }
        if (cpuAttack == 'rock') {
          if (currentPokemon.health >= 1 && rivalCurrentPokemon.health >= 1) {
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, rivalCurrentPokemon, currentPokemon);
            if (rivalCurrentPokemon.health  >= 1) {
              gameState.attackMove(rivalCurrentPokemon.attack, rivalCurrentPokemon.level, .8, .5, currentPokemon, rivalCurrentPokemon);
            }
          }
        }
        break;
      case 'scissors':
        if (cpuAttack == 'paper') {
          if (currentPokemon.health >= 1 && rivalCurrentPokemon.health >= 1) {
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, rivalCurrentPokemon, currentPokemon);
            if (rivalCurrentPokemon.health  >= 1) {
              gameState.attackMove(rivalCurrentPokemon.attack, rivalCurrentPokemon.level, .8, .5, currentPokemon, rivalCurrentPokemon);
            }
          }
        }
        if (cpuAttack == 'scissors') {
          if (currentPokemon.health >= 1 && rivalCurrentPokemon.health >= 1) {
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, rivalCurrentPokemon, currentPokemon);
            if (rivalCurrentPokemon.health  >= 1) {
              gameState.attackMove(rivalCurrentPokemon.attack, rivalCurrentPokemon.level, .8, 1, currentPokemon, rivalCurrentPokemon);
            }
          }
        }
        if (cpuAttack == 'rock') {
          if (currentPokemon.health >= 1 && rivalCurrentPokemon.health >= 1) {
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, rivalCurrentPokemon, currentPokemon);
            if (rivalCurrentPokemon.health >= 1) {
              gameState.attackMove(rivalCurrentPokemon.attack, rivalCurrentPokemon.level, .8, 2, currentPokemon, rivalCurrentPokemon);
            }
          }
        }
        break;
    }
  },
  cpuAttack: function () {
    var attacks = ['rock', 'paper', 'scissors'];
    return attacks[gameState.randomNumnber(0, 3)]
  },
  calculateInitialHealth: function (user) {
    return ((0.20 * Math.sqrt(user[0].level)) * user[0].defense) * user[0].hp
  },
  attackMove: function (attack, level, stack, critical, enemy, attacker) {
    var attackAmount = (attack * level) * (stack + critical)
    enemy.health -= attackAmount;
    var userHP = document.querySelector('.player1').querySelector('.stats').querySelector('.health').querySelector('.health-bar')
    var cpuHP = document.querySelector('.player2').querySelector('.stats').querySelector('.health').querySelector('.health-bar')
    if(enemy.owner == 'user'){
      var minusPercent = ((enemy.health * 100) / enemy.originalHealth)
      userHP.style.width = ((minusPercent < 0) ? 0 : minusPercent) + '%';
    } else{
      var minusPercent = ((attacker.health * 100) / attacker.originalHealth)
      cpuHP.style.width = ((minusPercent < 0) ? 0 : minusPercent) + '%';
    }
    gameState.checkWinner(enemy, attacker);
  },
  checkWinner: function (enemy, attacker) {
    if (enemy.health <= 0) {
      console.log('winner ' + attacker.name)
    }
  },
  // Generator for index on random pokemon
  randomNumnber: function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },

  // Selecting Random pokemon for the computer to use
  cpuPick: function () {
    do {
      var cpuChoice = gameState.elements.pokemonsEL[gameState.randomNumnber(0, 3)].dataset.pokemon;
    } while (gameState.userPokemon === cpuChoice)

    gameState.rivalPokemon = cpuChoice;
  },
  init: function () {
    // Initial loop to get elements on the pokemon list
    for (var i = 0; i < gameState.elements.pokemonsEL.length; i++) {
      gameState.elements.pokemonsEL[i].onclick = function () {
        // Get the data name from the pokemon being click 
        var name = this.dataset.pokemon;

        // Sets the name to the state of the game
        gameState.userPokemon = name;

        // Select Element for the pokemons to fight
        var playerOneImg = document.querySelector('.player1').getElementsByTagName('img')[0];
        var playerTwoImg = document.querySelector('.player2').getElementsByTagName('img')[0];

        // Selecting Element for pokemons names
        var playerOneName = document.querySelector('.player1').getElementsByClassName('name')[0];
        var playerTwoName = document.querySelector('.player2').getElementsByClassName('name')[0];

        // Selecting Element for pokemons names
        var playerOneLevel = document.querySelector('.player1').getElementsByClassName('level')[0];
        var playerTwoLevel = document.querySelector('.player2').getElementsByClassName('level')[0];

        // pick random pokemon call
        gameState.cpuPick();

        gameState.elements.battleScreenEl.classList.toggle('active');

        gameState.currentPokemon = gameState.pokemonDB.filter(function (pokemon) {
          return pokemon.name === gameState.userPokemon
        })

        gameState.rivalCurrentPokemon = gameState.pokemonDB.filter(function (pokemon) {
          return pokemon.name === gameState.rivalPokemon
        })
        playerOneImg.src = gameState.currentPokemon[0].img
        playerOneLevel = 'Lv' + gameState.currentPokemon[0].level
        playerOneName.innerHTML = gameState.currentPokemon[0].name + "   " + playerOneLevel


        playerTwoImg.src = gameState.rivalCurrentPokemon[0].img
        playerTwoLevel = 'Lv' + gameState.currentPokemon[0].level
        playerTwoName.innerHTML = gameState.rivalCurrentPokemon[0].name + "   " + playerTwoLevel


        // Pokemon Initial Health
        gameState.currentPokemon[0].health = gameState.calculateInitialHealth(gameState.currentPokemon);
        gameState.currentPokemon[0].originalHealth = gameState.calculateInitialHealth(gameState.currentPokemon);
        gameState.rivalCurrentPokemon[0].health = gameState.calculateInitialHealth(gameState.rivalCurrentPokemon);
        gameState.rivalCurrentPokemon[0].originalHealth = gameState.calculateInitialHealth(gameState.rivalCurrentPokemon);

      }
    }

    for (var a = 0; a < gameState.elements.attackBtnsEl.length; a++) {
      gameState.elements.attackBtnsEl[a].onclick = function () {
        var attackName = this.dataset.attack;
        gameState.currentUserAttack = attackName;
        gameState.play(attackName, gameState.cpuAttack());
      }
    }

  }
};


gameState.init();
