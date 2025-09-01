document.addEventListener('DOMContentLoaded', () => {

  // ---------------- DOM ELEMENTS ----------------
  const roseContainer = document.querySelector('.roseContainer');
  const yesBtn = document.querySelector('.yesBtn');

  const upButton = document.querySelector('.upButton');
  const rightButton = document.querySelector('.rightButton');
  const leftButton = document.querySelector('.leftButton');
  const downButton = document.querySelector('.downButton');

  const sabCharacter = document.querySelector('.sab');
  const ishaCharacter = document.querySelector('.isha');

  const maze = document.querySelector('.mazeScene');
  const controls = document.querySelector('.controls');
  const finishScene = document.querySelector('.finishScene');
  const nextButton = document.querySelector('.nextButton');

  const sabStand = document.querySelector('.sabStand');
  const giveRose = document.querySelector('.giveRose');

  const dialogueContainer = document.querySelector('.dialogueContainer');

  let finishTexts = document.querySelectorAll('.finish');

  // ---------------- AUDIO ----------------
  let gameAudio = new Audio('game-audio.mp3');
  let finishAudio = new Audio('finish-audio.mp3');
  gameAudio.volume = 1.0;
  gameAudio.loop = true;
  gameAudio.play();

  // ---------------- FALLING ROSES ----------------
  function createRose() {
    const rose = document.createElement('div');
    rose.classList.add('rose');
    rose.style.left = `${Math.random() * 100}vw`;

    const duration = Math.random() * 4 + 3; // 3-7 seconds
    rose.style.animationDuration = `${duration}s`;

    const delay = Math.random() * 2;
    rose.style.animationDelay = `${delay}s`;

    roseContainer.appendChild(rose);

    rose.addEventListener('animationend', () => rose.remove());
  }

  const roseInterval = setInterval(createRose, 1000);

  // ---------------- START MAZE ----------------
  yesBtn.addEventListener('click', () => {
    dialogueContainer.style.display = 'none';
    maze.style.display = 'flex';
    maze.style.justifyContent = 'center';
    maze.style.alignItems = 'center';
    controls.style.display = 'grid';
  });

  // ---------------- CHARACTER MOVEMENT ----------------
  const moveStep = 20;
  function moveCharacter(direction) {
    let currentTop = parseInt(getComputedStyle(sabCharacter).top);
    let currentLeft = parseInt(getComputedStyle(sabCharacter).left);

    switch(direction) {
      case 'up': currentTop -= moveStep; break;
      case 'down': currentTop += moveStep; break;
      case 'left': currentLeft -= moveStep; break;
      case 'right': currentLeft += moveStep; break;
    }

    sabCharacter.style.top = currentTop + 'px';
    sabCharacter.style.left = currentLeft + 'px';
    checkWin(currentLeft, currentTop);
  }

  // ---------------- WIN LOGIC ----------------
  function checkWin(left, top) {
    // Example winning zone (adjust according to maze layout)
    const winLeft = 560;
    const winTopMin = 340;
    const winTopMax = 380;

    if(left === winLeft && top >= winTopMin && top <= winTopMax){
      gameAudio.pause();
      finishAudio.play();

      maze.style.display = 'none';
      controls.style.display = 'none';
      finishScene.style.display = 'flex';
      sabStand.style.display = 'none';
      giveRose.style.display = 'block';

      let nextLine = 0;
      nextButton.addEventListener('click', () => {
        if(nextLine < finishTexts.length){
          finishTexts.forEach(el => el.style.opacity = 0);
          finishTexts[nextLine].style.opacity = 1;
          nextLine++;
        } else {
          clearInterval(roseInterval);
          setTimeout(() => {
            window.location.href = 'jas.html';
          }, 400);
        }
      });
    }
  }

  // ---------------- CONTROL BUTTON EVENTS ----------------
  upButton.addEventListener('click', () => moveCharacter('up'));
  downButton.addEventListener('click', () => moveCharacter('down'));
  leftButton.addEventListener('click', () => moveCharacter('left'));
  rightButton.addEventListener('click', () => moveCharacter('right'));

  document.addEventListener('keydown', (e) => {
    switch(e.key){
      case 'ArrowUp': moveCharacter('up'); break;
      case 'ArrowDown': moveCharacter('down'); break;
      case 'ArrowLeft': moveCharacter('left'); break;
      case 'ArrowRight': moveCharacter('right'); break;
    }
  });

});
