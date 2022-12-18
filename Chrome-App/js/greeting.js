// todo: 1. 로그인

// ? 노드를 불러온다.
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

// ? 반복되는 string값을 저장한 변수
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

// ? 값이 있을 때 컨텐츠를 노출시키고 저장된 텍스트를 담는 함수.
const paintGreeting = (name) => {
  greeting.classList.remove(HIDDEN_CLASSNAME);
  greeting.innerText = `Hello. ${name}`;
};

// ? submit된 인풋 텍스트를 로컬스트리지에 저장하고 paintGreeting 함수를 호출하는 함수
const onLoginSubmit = (event) => {
  loginForm.classList.add(HIDDEN_CLASSNAME);
  event.preventDefault();
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGreeting(USERNAME_KEY);
};

// ? 로컬스토리지에 저장된 키의 값을 불러와서 값이 있으면 화면에 그려주고 없으면 인풋을 노출하는 함수
const savedUsername = localStorage.getItem(USERNAME_KEY);
if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  paintGreeting(savedUsername);
}
