document.addEventListener('DOMContentLoaded', () => {
  const heartsContainer = document.querySelector('.hearts-container'); 
  const playButton = document.querySelector('.play-btn');
  const mainBody = document.querySelector('main');

  // Background music
  let gameAudio = new Audio('game-audio.mp3');
  gameAudio.volume = 1.0;
  gameAudio.loop = true; 

  // Start game when Play is clicked
  playButton.addEventListener('click', () => {
    gameAudio.play();
    heartsContainer.style.display = 'block';

    // Function to create falling hearts
    function createHeart() {
      const heart = document.createElement('div');
      heart.classList.add('heart');

      // Random horizontal position
      heart.style.left = `${Math.random() * 100}vw`;

      // Random speed (3–7s)
      const duration = Math.random() * 4 + 3;
      heart.style.animationDuration = `${duration}s`;

      // Random delay (0–2s)
      const delay = Math.random() * 2;
      heart.style.animationDelay = `${delay}s`;

      heartsContainer.appendChild(heart);

      // Remove when done
      heart.addEventListener('animationend', () => {
        heart.remove();
      });
    }

    // Keep spawning hearts
    const heartInterval = setInterval(createHeart, 500);

    // After 0.4s, go to game.html
    setTimeout(() => {
      clearInterval(heartInterval);
      window.location.href = 'game.html';
    }, 400);
  });
});
