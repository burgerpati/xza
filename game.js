document.addEventListener('DOMContentLoaded', () => {
  const roseContainer = document.querySelector('.roseContainer');
  const yesBtn = document.querySelector('.yesBtn');
  const maze = document.querySelector('.mazeScene');
  const controls = document.querySelector('.controls');
  const sabCharacter = document.querySelector('.sab');
  const finishScene = document.querySelector('.finishScene');
  const nextButton = document.querySelector('.nextButton');
  const sabStand = document.querySelector('.sabStand');
  const giveRose = document.querySelector('.giveRose');

  // Buttons
  const upButton = document.querySelector('.upButton');
  const rightButton = document.querySelector('.rightButton');
  const leftButton = document.querySelector('.leftButton');
  const downButton = document.querySelector('.downButton');

  // Music
  const gameAudio = new Audio('game-audio.mp3');
  gameAudio.volume = 1.0;
  gameAudio.loop = true;

  const finishAudio = new Audio('finish-audio.mp3');

  // Falling Roses
  function createRose() {
    const rose = document.createElement('div');
    rose.classList.add('rose');
    rose.style.left = `${Math.random() * 100}vw`;
    rose.style.animationDuration = `${Math.random() * 4 + 3}s`;
    rose.style.animationDelay = `${Math.random() * 2}s`;
    roseContainer.appendChild(rose);
    rose.addEventListener('animationend', () => rose.remove());
  }

  const roseInterval = setInterval(createRose, 2000);

  // Start Maze after Yes Button Click
  yesBtn.addEventListener('click', () => {
    document.querySelector('.dialogueContainer').style.display = 'none';
    maze.style.display = 'flex';
    maze.style.justifyContent = 'center';
    maze.style.alignItems = 'center';
    controls.style.display = 'grid';

    // Start music AFTER user interaction
    if (gameAudio.paused) gameAudio.play().catch(err => console.log('Autoplay blocked:', err));
  });

  const moveStep = 20;
  let isClicked = false;

  function smallCharacter() {
    if (isClicked) {
      sabCharacter.style.height = `2rem`;
      sabCharacter.style.width = `2rem`;
    }
  }

  function winChecker() {
    const currentLeft = parseInt(getComputedStyle(sabCharacter).left);
    const currentTop = parseInt(getComputedStyle(sabCharacter).top);

    if ((currentLeft === 560 && (currentTop === 360 || currentTop === 380))) {
      gameAudio.pause();
      finishAudio.play();

      sabCharacter.style.height = `4rem`;
      sabCharacter.style.width = `4rem`;
      sabCharacter.style.top = `348px`;

      maze.style.display = 'none';
      controls.style.display = 'none';
      finishScene.style.display = 'flex';

      let nextLine = 0;
      nextButton.addEventListener('click', () => {
        nextLine++;
        const lines = ['firstLine','secondLine','thirdLine','fourthLine','fifthLine','sixthLine','seventhLine'];
        if (nextLine < lines.length) {
          document.querySelector(`.${lines[nextLine-1]}`).style.opacity = 0;
          document.querySelector(`.${lines[nextLine]}`).style.opacity = 1;
          if(nextLine === 5) { sabStand.style.display='none'; giveRose.style.display='block'; }
        } else {
          clearInterval(roseInterval);
          setTimeout(()=> window.location.href='jas.html',400);
        }
      });
    }
  }

  function moveCharacter(direction) {
    isClicked = true;
    smallCharacter();
    let currentTop = parseInt(getComputedStyle(sabCharacter).top || 0);
    let currentLeft = parseInt(getComputedStyle(sabCharacter).left || 0);

    switch(direction) {
      case 'up': sabCharacter.style.top = currentTop - moveStep + 'px'; break;
      case 'down': sabCharacter.style.top = currentTop + moveStep + 'px'; break;
      case 'left': sabCharacter.style.left = currentLeft - moveStep + 'px'; break;
      case 'right': sabCharacter.style.left = currentLeft + moveStep + 'px'; break;
    }
    winChecker();
  }

  upButton.addEventListener('click', ()=> moveCharacter('up'));
  downButton.addEventListener('click', ()=> moveCharacter('down'));
  leftButton.addEventListener('click', ()=> moveCharacter('left'));
  rightButton.addEventListener('click', ()=> moveCharacter('right'));

  document.addEventListener("keydown", (event) => {
    switch(event.key) {
      case 'ArrowUp': moveCharacter('up'); break;
      case 'ArrowDown': moveCharacter('down'); break;
      case 'ArrowLeft': moveCharacter('left'); break;
      case 'ArrowRight': moveCharacter('right'); break;
    }
  });
});
