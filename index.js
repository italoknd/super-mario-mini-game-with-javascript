const mario = document.querySelector("#mario");
const pipe = document.querySelector("#pipe");
const game_over = document.querySelector("#game-over");
const clouds = document.querySelector("#clouds");

let jumped = false;

const handleKeydown = (event) => {
  if (event.key === " ") {
    mario.classList.add("jump");
    jumped = true;

    setTimeout(() => {
      mario.classList.remove("jump");
      jumped = false;
    }, 500);
  }
};

const checkGameOver = () => {
  const pipe_x_position = pipe.offsetLeft;
  const clouds_position = clouds.offsetLeft;
  const mario_y_position = +getComputedStyle(mario).bottom.replace("px", "");

  if (
    pipe_x_position <= 123 &&
    pipe_x_position > 0 &&
    mario_y_position <= 100
  ) {
    gameOverAnimation(pipe_x_position, clouds_position);
  }
  requestAnimationFrame(checkGameOver);
};

const gameOverAnimation = (pipe_x_position, clouds_position) => {
  pipe.style.animation = "none";
  pipe.style.left = `${pipe_x_position}px`;

  game_over.style.display = "block";
  mario.style.display = "none";

  clouds.style.animation = "none";
  clouds.style.left = `${clouds_position}px`;
};

checkGameOver();
document.addEventListener("keydown", handleKeydown);
