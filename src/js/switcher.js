const darkTheme = {
  primaryText: '#fff',
  primarytextDark: '#fff',
  secondaryText: ' #fff',
  notificationText: '#ff001b',
  accentText: '#d5363e',
  bgbodycolor: '#171d1f',
  secondaryBgColor: '#545454',
  bgfootercolor: '#151516',
  btnAccent: '#d5363e',
  bgColorHeader: 'rgba(0, 0, 0, 0.56)',
  btnBoxShadow: 'rgba(197, 8, 8, 0.526) 0px 6px 10px',
  filmRatingGrey: '#625c5c',
  switcher: '#ff6b08',
};
// --primary-text-color: #fff;
//   --primary-text-color-dark: #000;
//   --secondary-text-color: #545454;
//   --notification-text-color: #ff001b;
//   --accent-text-color: #ff6b08;
//   --bg-footer-color: #f7f7f7;
//   --bg-body-color: #fff;
//   --bg-color-header: rgba(0, 0, 0, 0.56);
//   --btn-accent-color: #ff6b01;
//   --secondary-bg-color: #fff;
// --btn-box-shadow: rgba(118, 66, 6, 0.526) 0px 4px 5px;
// --film-rating-grey: #f7f7f7;

const lightTheme = {
  primaryText: '#fff',
  primarytextDark: '#000',
  secondaryText: ' #545454',
  notificationText: '#ff001b',
  accentText: '#ff6b08',
  bgbodycolor: '#fff',
  secondaryBgColor: '#fff',
  bgfootercolor: '#f7f7f7',
  btnAccent: '#ff6b08',
  bgColorHeader: 'rgba(0, 0, 0, 0.56)',
  btnBoxShadow: 'rgba(118, 66, 6, 0.526) 0px 6px 10px',
  filmRatingGrey: '#f7f7f7',
  switcher: '#d5363e',
};

let currentTheme = 'light';
const root = document.querySelector(':root');
function switchTheme() {
  //   const aboutMeContainer = document.querySelector('.about');
  //   const factsContainer = document.querySelector('.codex');
  if (currentTheme === 'dark') {
    root.style.setProperty('--primary-text-color', lightTheme.primaryText);
    root.style.setProperty(
      '--primary-text-color-dark',
      lightTheme.primarytextDark
    );
    root.style.setProperty('--secondary-text-color', lightTheme.secondaryText);
    root.style.setProperty(
      '--notification-text-color',
      lightTheme.notificationText
    );
    root.style.setProperty('--accent-text-color', lightTheme.accentText);
    root.style.setProperty('--bg-body-color', lightTheme.bgbodycolor);
    root.style.setProperty('--secondary-bg-color', lightTheme.secondaryBgColor);
    root.style.setProperty('--bg-footer-color', lightTheme.bgfootercolor);
    root.style.setProperty('--btn-accent-color', lightTheme.btnAccent);
    root.style.setProperty('--bg-color-header', lightTheme.bgColorHeader);
    root.style.setProperty('--btn-box-shadow', lightTheme.btnBoxShadow);
    root.style.setProperty('--film-rating-grey', lightTheme.filmRatingGrey);
    root.style.setProperty('--switcher-color', lightTheme.switcher);

    // aboutMeContainer.classList.add('about--light');
    // factsContainer.classList.add('codex--light');

    currentTheme = 'light';
  } else {
    root.style.setProperty('--primary-text-color', darkTheme.primaryText);
    root.style.setProperty(
      '--primary-text-color-dark',
      darkTheme.primarytextDark
    );
    root.style.setProperty('--secondary-text-color', darkTheme.secondaryText);
    root.style.setProperty(
      '--notification-text-color',
      darkTheme.notificationText
    );
    root.style.setProperty('--accent-text-color', darkTheme.accentText);
    root.style.setProperty('--bg-body-color', darkTheme.bgbodycolor);
    root.style.setProperty('--secondary-bg-color', darkTheme.secondaryBgColor);
    root.style.setProperty('--bg-footer-color', darkTheme.bgfootercolor);
    root.style.setProperty('--btn-accent-color', darkTheme.btnAccent);
    root.style.setProperty(' --bg-color-header', darkTheme.bgColorHeader);
    root.style.setProperty(' --btn-box-shadow', darkTheme.btnBoxShadow);
    root.style.setProperty('--film-rating-grey', darkTheme.filmRatingGrey);
    root.style.setProperty('--switcher-color', darkTheme.switcher);

    // aboutMeContainer.classList.remove('about--light');
    // factsContainer.classList.remove('codex--light');

    currentTheme = 'dark';
  }
}

const themeSwitch = document.querySelector('#theme-switch');
if (themeSwitch) {
  themeSwitch.addEventListener('change', switchTheme);
}
