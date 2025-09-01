document.addEventListener('DOMContentLoaded', () => {
  const dialogue = document.querySelector('.dialogueContainer');
  const yesBtn = document.querySelector('.yesBtn');
  const maze = document.querySelector('.mazeScene');
  const finish = document.querySelector('.finishScene');
  const sab = document.querySelector('.sab');
  const controls = document.querySelector('.controls');
  const nextBtn = document.querySelector('.nextButton');
  const finishTexts = document.querySelectorAll('.finish');
  const particleContainer = document.querySelector('.particleContainer');

  let currentLine = 0;
  let moveStep = 20;

  // Play background music
  let bgMusic = new Audio('game-audio.mp3');
  bgMusic.loop = true;
  bgMusic.volume = 0.8;
  bgMusic.play();

  // Particle hearts
  function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDuration = `${3 + Math.random()*3}s`;
    particleContainer.appendChild(particle);
    particle.addEventListener('animationend', () => particle.remove());
  }
  setInterval(createParticle, 500);

  // Start game
  yesBtn.addEventListener('click', () => {
    dialogue.style.display = 'none';
    maze.style.display = 'block';
    controls.style.display = 'grid';
  });

  // Movement functions
  function moveCharacter(direction){
    sab.classList.add('moving');
    setTimeout(()=> sab.classList.remove('moving'), 200);

    let top = parseInt(getComputedStyle(sab).top);
    let left = parseInt(getComputedStyle(sab).left);

    if(direction==='up') top -= moveStep;
    if(direction==='down') top += moveStep;
    if(direction==='left') left -= moveStep;
    if(direction==='right') left += moveStep;

    sab.style.top = top + 'px';
    sab.style.left = left + 'px';

    checkWin();
  }

  // Keyboard control
  document.addEventListener('keydown', e => {
    if(e.key==='ArrowUp') moveCharacter('up');
    if(e.key==='ArrowDown') moveCharacter('down');
    if(e.key==='ArrowLeft') moveCharacter('left');
    if(e.key==='ArrowRight') moveCharacter('right');
  });

  // Button controls
  document.querySelector('.upButton').addEventListener('click', () => moveCharacter('up'));
  document.querySelector('.downButton').addEventListener('click', () => moveCharacter('down'));
  document.querySelector('.leftButton').addEventListener('click', () => moveCharacter('left'));
  document.querySelector('.rightButton').addEventListener('click', () => moveCharacter('right'));

  // Win checker
  function checkWin() {
    let top = parseInt(getComputedStyle(sab).top);
    let left = parseInt(getComputedStyle(sab).left);
    if(left > 540 && left < 580 && top > 340 && top < 380){
      maze.style.display = 'none';
      controls.style.display = 'none';
      finish.style.display = 'block';
    }
  }

  // Finish dialogue
  nextBtn.addEventListener('click', () => {
    finishTexts.forEach(t => t.style.opacity=0);
    if(currentLine<finishTexts.length){
      finishTexts[currentLine].style.opacity=1;
      currentLine++;
    }
  });
});
