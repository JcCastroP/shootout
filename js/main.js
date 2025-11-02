const gameStart = new Audio(`../sounds/gameStart.mp3`);
const pistolShoot = new Audio(`../sounds/pistolShoot.m4a`);
const duelOver = new Audio(`../sounds/duelOver.mp3`);
const gameStartFinal = new Audio(`../sounds/gameStartFinal.mp3`);

let shoot = document.getElementById("shoot");
let go = document.getElementById("go");
let indicador = document.getElementById("indicador");
let enemy = document.getElementById("enemy");
let hero = document.getElementById("hero");
let nivel = document.getElementById("nivel");
let restart = document.getElementById("restart");

let canShoot = false;
let reacted = false;
let preShootTimer = null;
let shootWindowTimer = null;
let stage = 1;
let gameOver = false;
let delay = 0;

pistolShoot.preload = 'auto';
gameStart.preload = 'auto';
gameStartFinal.preload = 'auto';
duelOver.preload = 'auto';

go.hidden = false;

go.addEventListener("click", handleGoClick);
shoot.addEventListener("click", handleShootClick);
restart.addEventListener("click", handleRestartClick);


function handleGoClick() {
    if (gameOver) return;
    switch (stage) {
        case 1:
            startStage(500);
            break;
        case 2:
            startStage(350);
            break;
        case 3:
            startStage(200);
            break;
    }
}

function handleShootClick() {
    if (gameOver) return;
    reacted = true;
    shoot.hidden = true;

    if (!canShoot) {
        tooSoon();
        return;
    }

    clearTimeout(shootWindowTimer);
    indicador.textContent = "¡Eres el más rápido del oeste!";
    pistolShootSound();
    duelOverSound();
    enemy.src = "../imgs/enemyD.png";
    hero.src = "../imgs/heroS.png"
    indicador.style.backgroundColor = "gray";

    if (stage < 3) {
        stage++;
        nivel.textContent = `Nivel ${stage}`;
        setTimeout(updateUI, 6000);
    } else {
        gameOver = true;
        setTimeout(() => restart.hidden = false, 2000);
    }
}

function startStage(windowTime) {
    if (stage === 1 || stage === 2) {
        gameStartSound();
    } else {
        gameStartSoundFinal();
    }

    go.hidden = true;
    shoot.hidden = false;
    indicador.textContent = "¡La paciencia vence al más impaciente!";
    indicador.style.backgroundColor = "red";

    if (stage === 1 || stage === 2) {
        delay = Math.floor(Math.random() * 9000) + 3000;
    } else {
        delay = Math.floor(Math.random() * 12000) + 6000;
    }

    preShootTimer = setTimeout(() => {
        canShoot = true;
        indicador.textContent = "¡Haz que cuente, vaquero!";
        enemy.src = "../imgs/enemyS.png";
        indicador.style.backgroundColor = "green";

        shootWindowTimer = setTimeout(() => {
            if (!reacted) tooSlow();
        }, windowTime);
    }, delay);
}

function tooSoon() {
    clearTimeout(preShootTimer);
    indicador.textContent = "¡Demasiado pronto, vaquero!";

    pistolShootSound();

    hero.src = "../imgs/heroE.png";
    enemy.src = "../imgs/enemyS.png"

    indicador.style.backgroundColor = "gray";
    gameOver = true;
    setTimeout(() => restart.hidden = false, 2000);
}

function tooSlow() {
    shoot.hidden = true;
    indicador.textContent = "¡Tú eras rápido… pero no suficiente!";

    pistolShootSound();

    enemy.src = "../imgs/enemyS.png"
    hero.src = "../imgs/heroD.png";

    indicador.style.backgroundColor = "gray";
    gameOver = true;
    setTimeout(() => restart.hidden = false, 2000);
}

function pistolShootSound() {
    pistolShoot.currentTime = 0;
    pistolShoot.volume = 0.1;
    pistolShoot.play();
}

function duelOverSound() {
    duelOver.currentTime = 0;
    duelOver.volume = 0.1;
    duelOver.play();
}

function gameStartSound() {
    gameStart.currentTime = 0;
    gameStart.volume = 0.6;
    gameStart.play();
}

function gameStartSoundFinal() {
    gameStartFinal.currentTime = 0;
    gameStartFinal.volume = 0.3;
    gameStartFinal.play();
}

function updateUI() {
    hero.src = ".././imgs/hero.png";
    enemy.src = ".././imgs/enemy.png";
    indicador.style.backgroundColor = "";
    indicador.textContent = "";
    canShoot = false;
    reacted = false;
    preShootTimer = null;
    shootWindowTimer = null;
    go.hidden = false;
    shoot.hidden = true;
    restart.hidden = true;
}

function handleRestartClick() {
    location.reload();

}
