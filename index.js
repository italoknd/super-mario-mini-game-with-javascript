const mario = document.querySelector("#mario");
const pipe = document.querySelector("#pipe");
const game_over = document.querySelector("#game-over");
const clouds = document.querySelector("#clouds");

const score = document.querySelector("#score");
const life_counter = document.querySelector("#life-counter");

const gameplay_audio = new Audio("./audios/Super Mario Bros. Theme Song.mp3");
const death_audio = new Audio("./audios/Mario deathGame over sound effect.mp3");

const start_game = document.querySelector("#start-button");

const handleKeydown = (event) => {
  if (event.key === " ") {
    mario.classList.add("jump");

    setTimeout(() => {
      mario.classList.remove("jump");
    }, 500);
  }
};

const checkGameOver = () => {
  let is_scoring = 0;

  const pipe_x_position = pipe.offsetLeft;
  const clouds_position = clouds.offsetLeft;
  const mario_y_position = +getComputedStyle(mario).bottom.replace("px", "");
  if (
    pipe_x_position <= 123 &&
    pipe_x_position > 0 &&
    mario_y_position <= 100
  ) {
    gameOverAnimation(pipe_x_position, clouds_position);
  } else if (pipe_x_position === -1) {
    is_scoring++;
    score.innerHTML = `${is_scoring}pts`;
  }
  requestAnimationFrame(checkGameOver);
};

const gameOverAnimation = (pipe_x_position, clouds_position) => {
  let life = 3;
  life--;

  pipe.style.animation = "none";
  pipe.style.left = `${pipe_x_position}px`;

  game_over.style.display = "block";
  mario.style.display = "none";

  clouds.style.animation = "none";
  clouds.style.left = `${clouds_position}px`;

  life_counter.innerHTML = `X${life}`;
  gameplay_audio.pause();
  death_audio.play();
};

checkGameOver();

const startGame = () => {
  gameplay_audio.play();
  start_game.style.display = "none";
  mario.style.display = "block";
  pipe.style.display = "block";
};

document.addEventListener("keydown", handleKeydown);

start_game.addEventListener("click", startGame);
