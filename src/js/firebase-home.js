import { Notify } from 'notiflix';
import { initializeApp } from 'firebase/app';
import { getDatabase, set, ref, update } from 'firebase/database';
import {
  getAuth,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

// Конфигурация Firebase вашего веб-приложения
const firebaseConfig = {
  apiKey: 'AIzaSyC4axheHgy30RAlpQyWJSvsbT5mQm6T9AA',
  authDomain: 'goup-filmoteka.firebaseapp.com',
  databaseURL: 'https://goup-filmoteka-default-rtdb.firebaseio.com',
  projectId: 'goup-filmoteka',
  storageBucket: 'goup-filmoteka.appspot.com',
  messagingSenderId: '720228305884',
  appId: '1:720228305884:web:3e134cf761d2d193e65d19',
  measurementId: 'G-7JJQJB9HNZ',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Инициализировать базу данных реального времени и получить ссылку на сервис
const database = getDatabase(app);
const auth = getAuth(app);

//
const refs = {
  onLogin: document.getElementById('login-sighUp'),
  pageLibrary: document.getElementById('firebase-library'),
  backdrop: document.querySelector('.backdrop-fr'), // бекдроп модалки регистрации и входа
  btnSighUpBtn: document.getElementById('sign-up-btn'),
  btnSighInBtn: document.getElementById('sign-in-btn'),
  formSighUpUser: document.getElementById('login-sighUp'),
  formLoginUser: document.getElementById('login-box'),
  buttonSelectInput: document.querySelector('.form-button'),
  closeFormLogin: document.querySelector('.form-login__close '),
  closeFormSighUp: document.querySelector('.form-sighUp__close'),
  closeFormContainerButtom: document.getElementById('form-button__close'),
  iconLoginUser: document.querySelector('.login-user__btn'),
  iconUserEnter: document.querySelector('.enter'),
  iconUserСheck: document.querySelector('.check'),
  userExit: document.querySelector('.user-exit'), //вход и выход выбор
  exitOk: document.querySelector('.user-exit__ok'),
  exitNot: document.querySelector('.user-exit__not'),
  loginUser: document.querySelector('.login-user__name'),
};

let loginUserFilmoteka = false;

if (refs.onLogin) {
  refs.onLogin.addEventListener('submit', onSubmitUser);
}
if (refs.pageLibrary) {
  refs.pageLibrary.addEventListener('click', сheckingUser);
}
if (refs.closeFormLogin) {
  refs.closeFormLogin.addEventListener('click', onCloseFormLogin);
}
if (refs.btnSighInBtn) {
  refs.btnSighInBtn.addEventListener('click', onFormLogin);
}
if (refs.btnSighUpBtn) {
  refs.btnSighUpBtn.addEventListener('click', onFormSighUp);
}
if (refs.closeFormSighUp) {
  refs.closeFormSighUp.addEventListener('click', onCloseFormSighUp);
}
if (refs.formLoginUser) {
  refs.formLoginUser.addEventListener('submit', onLoginUser);
}
if (refs.closeFormContainerButtom) {
  refs.closeFormContainerButtom.addEventListener(
    'click',
    closeFormContainerButtom
  );
}
if (refs.exitOk) {
  refs.exitOk.addEventListener('click', removeUserLocalStorage);
}
if (refs.exitNot) {
  refs.exitNot.addEventListener('click', addClasModalUserLocalStorage);
}
if (refs.iconLoginUser) {
  refs.iconLoginUser.addEventListener('click', openModalExit);
}

//закрітие модельного окна с кнопками вход и регистрация
function closeFormContainerButtom() {
  refs.backdrop.classList.add('hidden');
}
// разлогинится пользователю на сайте по клику на кнопку OK
function removeUserLocalStorage() {
  localStorage.removeItem('my-loginUser');
  localStorage.removeItem('my-email');
  loginUserFilmoteka = false;
  window.location.href = './index.html';
}
function addClasModalUserLocalStorage() {
  refs.userExit.classList.add('hidden');
}

function onClickModal(e) {
  if (e.key === 'Escape') {
    refs.userExit.classList.add('hidden');
    window.removeEventListener('keydown', onClickModal); // удаляем слушателя з клавиатури
  }
}

function openModalExit() {
  if (dataSeve === null) {
    window.addEventListener('keydown', onClickEscapeLogin);
    refs.backdrop.classList.remove('hidden');
    return;
  }
  refs.userExit.classList.remove('hidden');
  window.addEventListener('keydown', onClickModal); // добавляем слушателя на клавиатуру
}

// при нажатии срабативает проверка на авторизацию
function сheckingUser() {
  if (!loginUserFilmoteka) {
    refs.pageLibrary.setAttribute('href', '#');
    refs.backdrop.classList.remove('hidden');
    window.addEventListener('keydown', onClickModalForm); // удаляем слушателя з клавиатури
    return;
  }
  refs.pageLibrary.setAttribute('href', './library.html');
  return;
}
// добавление информации по входу в систему true или fasle
function localStorageUserTrue(boolean) {
  localStorage.setItem('my-loginUser', JSON.stringify({ loginUser: boolean }));
}
const dataSeve = JSON.parse(localStorage.getItem('my-loginUser'));

//добавление email в localStorage
function addMailLocalStorage(email) {
  localStorage.setItem('my-email', JSON.stringify({ email: email }));
}
const loginPage = JSON.parse(localStorage.getItem('my-email'));
//Проверка через localStorage вход на сайт
if (dataSeve === null) {
  loginUserFilmoteka = false;
  // refs.iconLoginUser.dis;
  if (loginPage === null) {
    refs.loginUser.textContent = 'Guest';
    refs.iconUserEnter.classList.remove('hidden');
    refs.iconUserСheck.classList.add('hidden');
  } else {
    if (refs.loginUser) {
      refs.loginUser.textContent = loginPage.email;
    }
    if (refs.iconUserEnter) {
      refs.iconUserEnter.classList.add('hidden');
    }
    if (refs.iconUserСheck) {
      refs.iconUserСheck.classList.remove('hidden');
    }
  }
} else {
  loginUserFilmoteka = dataSeve.loginUser;
  if (loginPage === null) {
    refs.loginUser.textContent = 'Guest';
    refs.iconUserEnter.classList.remove('hidden');
    refs.iconUserСheck.classList.add('hidden');
  } else {
    if (refs.loginUser) {
      refs.loginUser.textContent = loginPage.email;
    }
    if (refs.iconUserEnter) {
      refs.iconUserEnter.classList.add('hidden');
    }
    if (refs.iconUserEnter) {
      refs.iconUserEnter.classList.add('hidden');
    }
    if (refs.iconUserСheck) {
      refs.iconUserСheck.classList.remove('hidden');
    }
  }
}

// кнопка закрытия формы для входа на сайт
function onCloseFormLogin() {
  refs.backdrop.classList.add('hidden');
  refs.buttonSelectInput.classList.remove('hidden');
  refs.formLoginUser.classList.add('hidden');
}
// откритые окна для входа
function onFormLogin() {
  refs.btnSighUpBtn.classList.remove('hidden');
  refs.buttonSelectInput.classList.add('hidden');
  refs.formLoginUser.classList.remove('hidden');
}
// окно регистрации
function onFormSighUp() {
  refs.formSighUpUser.classList.remove('hidden');
  refs.buttonSelectInput.classList.add('hidden');
}
// кнопка закрытия формы для регистрации
function onCloseFormSighUp() {
  refs.backdrop.classList.add('hidden');
  refs.buttonSelectInput.classList.remove('hidden');
  refs.formSighUpUser.classList.add('hidden');
}
// регистрация пользователя на сайте
async function onSubmitUser(e) {
  e.preventDefault();
  const username = e.target.elements.username.value;
  const email = e.target.elements.email.value;
  const password = e.target.elements.password.value;

  //Перевірка на заповненість полів форми
  if (!email || !password || !username) {
    Notify.info('Not all fields are filled in!');
    return;
  }
  await createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      set(ref(database, 'users/' + user.uid), {
        username: username,
        email: email,
      });
      Notify.success('You have successfully registered. ');
      refs.formLoginUser.classList.remove('hidden');
      refs.formSighUpUser.classList.add('hidden');
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Notify.failure(
        `Error, the user under the mail ${email} is already registered. `
      );
      console.log(`Ошибка ${errorCode} и ${errorMessage} `);
    });

  refs.onLogin.reset();
}

// Залогиниться на сайте
async function onLoginUser(e) {
  e.preventDefault();
  const email = e.target.elements.email.value;
  const password = e.target.elements.password.value;

  await signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const dt = new Date();
      const user = userCredential.user;
      update(ref(database, 'users/' + user.uid), {
        last_login: dt,
      });
      Notify.success('The entry to Filmoteka was a success!');
      setTimeout(() => {
        Notify.info(
          'Hi. How are you doing? Have you added movies to your library yet?'
        );
      }, 3000);
      refs.backdrop.classList.add('hidden');
      refs.buttonSelectInput.classList.remove('hidden');
      refs.formLoginUser.classList.add('hidden');
      refs.formLoginUser.reset();
      loginUserFilmoteka = true;
      localStorageUserTrue(loginUserFilmoteka);
      addMailLocalStorage(email);
      window.location.href = './library.html';
      return;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Notify.warning('You entered the wrong email or password!');
      console.log(`Ошибка ${errorCode} и ${errorMessage} `);
    });
}

function onClickModalForm(e) {
  if (e.key === 'Escape') {
    refs.backdrop.classList.add('hidden');
    window.removeEventListener('keydown', onClickModalForm); // удаляем слушателя з клавиатури
    // refs.backdrop.classList.add('hidden');
    refs.buttonSelectInput.classList.remove('hidden');
    refs.formLoginUser.classList.add('hidden');
    refs.formSighUpUser.classList.add('hidden');
  }
}

function onClickEscapeLogin(e) {
  if (e.key === 'Escape') {
    refs.backdrop.classList.add('hidden');
    window.removeEventListener('keydown', onClickEscapeLogin);
  }
}
