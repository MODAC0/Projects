// todo: 캔버스를 만듭니다.
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d"); // HTMLCanvasElement.getContext() 메소드는 캔버스의 드로잉 컨텍스트를 반환합니다
document.body.append(canvas);
canvas.width = 1920;
canvas.height = 1040;

// todo: 게임 오버 변수
let gameOver = false;
let score = 0;

// todo: 이미지를 로드합니다.
const backgroundImg = new Image();
backgroundImg.src = "img/background.jpg";
const fighterImg = new Image();
fighterImg.src = "img/ico_fighter.svg";
const bulletImg = new Image();
bulletImg.src = "img/bullet.svg";
const enemyImg = new Image();
enemyImg.src = "img/enemy.svg";
const gameoverImg = new Image();
gameoverImg.src = "img/gameover.png";

// todo: 총알의 좌표값을 저장하는 배열입니다.
let bulletList = [];

// todo: 총알의 좌표값을 지정합니다.
function bullet() {
  this.X = 0;
  this.Y = 0;
  this.init = () => {
    this.X = fighterImgX + 100;
    this.Y = fighterImgY + 50;
    this.alive = true; // 살아있는 총알
    bulletList.push(this);
  };
  this.update = function () {
    this.X += 7;
  };
  this.checkHit = () => {
    for (i = 0; i < enemyList.length; i++) {
      if (
        this.Y >= enemyList[i].Y &&
        this.X >= enemyList[i].X &&
        this.X <= enemyList[i].X + 100
      ) {
        // alive가 false면 점수획득, 적 삭제
        score++;
        this.alive = false;
        enemyList.splice(i, 1);
      }
    }
  };
}

// todo: 적의 좌표값을 저장하는 배열입니다.
let enemyList = [];

// todo: 적을 생성합니다.
function Enemy() {
  this.X = 0;
  this.Y = 0;
  this.init = () => {
    this.X = canvas.width - 100;
    this.Y = genurateRandomValue(0, canvas.height - 100);
    enemyList.push(this);
  };
  this.update = () => {
    this.X -= 3;
    // 적이 바닥에 닿을 때 게임 종료
    if (this.X <= 0) {
      gameOver = true;
    }
  };
}

// todo: 적이 생성되는 좌표값을 랜덤으로 지정하는 함수
const genurateRandomValue = (min, max) => {
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
};

// todo: 총알을 생성합니다.
const creatBullet = () => {
  console.log("총알생성");
  let b = new bullet();
  b.init();
  console.log("새로운 총알 리스트", bullet);
};

// todo: 적군을 생성합니다.
const creatEnemy = () => {
  const interval = setInterval(() => {
    let e = new Enemy();
    e.init();
  }, 1000);
};

// todo: 캐릭터의 좌표값을 지정합니다.
let fighterImgX = canvas.width / 7;
let fighterImgY = canvas.height / 2.5;

// todo: keysdown은 키보드 입력값을 저장합니다. 키: keyCode 값: true
let keysdown = {};

// todo: 키보드 입력값을 객체에 저장합니다.
const setupKeyboardListener = () => {
  // * keydown이 실행되면 keyCode:true 를 객체 keysdown에 저장합니다.
  document.addEventListener("keydown", (event) => {
    keysdown[event.keyCode] = true;
  });
  // * keyup이 실행되면 keyCode를 객체 keysdown에서 삭제합니다.
  document.addEventListener("keyup", (event) => {
    delete keysdown[event.keyCode];
    if (event.keyCode === 65) creatBullet();
  });
};

// todo: keysdown 객체의 키값이 할당되면 캐릭터의 좌표값을 변경합니다.
const update = () => {
  // * keysdown 객체의 키값이 일치하면 캐릭터의 좌표를 상하좌우로 이동합니다.
  if (38 in keysdown) fighterImgY -= 3;
  else if (40 in keysdown) fighterImgY += 3;
  else if (37 in keysdown) fighterImgX -= 3;
  else if (39 in keysdown) fighterImgX += 3;

  // * 캐릭터가 영역을 벗어나면 화면 안으로 되돌아옵니다.
  if (fighterImgY <= 0 || fighterImgY > canvas.height) fighterImgY = 0;
  if (fighterImgX <= 0 || fighterImgX > canvas.width) fighterImgX = 0;

  // * 총알의 좌표를 업데이트합니다
  for (i = 0; i < bulletList.length; i++) {
    if (bulletList[i].alive) {
      bulletList[i].update();
      bulletList[i].checkHit();
    }
  }

  // * 적의 좌표를 업데이트합니다
  for (i = 0; i < enemyList.length; i++) {
    enemyList[i].update();
  }
};

// todo: 이미지를 렌더링합니다.
const imgRender = () => {
  // * 배경화면
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  // * 캐릭터
  ctx.drawImage(fighterImg, fighterImgX, fighterImgY, 100, 100);
  // * 총알
  for (i = 0; i < bulletList.length; i++) {
    if (bulletList[i].alive)
      ctx.drawImage(bulletImg, bulletList[i].X, bulletList[i].Y, 10, 10);
  }

  for (i = 0; i < enemyList.length; i++) {
    ctx.drawImage(enemyImg, enemyList[i].X, enemyList[i].Y, 100, 100);
  }
};

// todo: 모든 함수를 호출하고 랜더링합니다.
const render = () => {
  if (!gameOver) {
    update();
    imgRender();
    // window.requestAnimationFrame는 자바스크립트 내장함수로 화면에 에니메이션을 랜더링합니다.
    requestAnimationFrame(render);
  } else ctx.drawImage(gameoverImg, 10, 10);
};

setupKeyboardListener();
creatEnemy();
render();
