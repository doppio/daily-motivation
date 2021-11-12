let settingsGear = document.getElementsByClassName('settings')[0];
let closeButton = document.getElementsByClassName('close')[0];
let closeButtonTooltip = document.getElementsByClassName('tooltip-close')[0];
let connectedThemeOption = document.getElementById('connected');
let connectedBlueThemeOption = document.getElementById('connectedBlue');
let clearThemeOption = document.getElementById('clear');
let connectedDarkBlueThemeOption = document.getElementById('connectedDarkBlue');

let quote = '';
let author = '';

let applyTheme = () => {
  let theme = localStorage.getItem('theme');

  if (theme === 'bubbles') {
    colorfulBubbles();
  } else if (theme === 'clear') {
    settingGearColorInvert(false);
    clear();
  } else if (theme === 'connected' || !theme) {
    settingGearColorInvert(false);
    canvasDots();
  } else if (theme === 'connectedBlue') {
    settingGearColorInvert(true);
    canvasDots('#fff', '#2196F3', '#fff');
  } else if (theme === 'connectedDarkBlue') {
    settingGearColorInvert(true);
    canvasDots('#5cdb95', '#05386b', '#edf5e1');
  }
};

let setTheme = function (theme) {
  localStorage.setItem('theme', theme);
  applyTheme();
};

/* ADD ONLOAD EVENTS */

window.onload = applyTheme();

/* ADD ALL THE ON CLICK EVENT LISTERNERS */
settingsGear.addEventListener('click', () => {
  openNav();
  turnTooltipOff();
});

closeButton.addEventListener('click', () => {
  closeNav();
});

closeButtonTooltip.addEventListener('click', () => {
  turnTooltipOff();
});

connectedThemeOption.addEventListener('click', () => {
  setTheme('clear');
  setTheme('connected');
  closeNav();
});

connectedBlueThemeOption.addEventListener('click', () => {
  setTheme('clear');
  setTheme('connectedBlue');
  closeNav();
});

connectedDarkBlueThemeOption.addEventListener('click', () => {
  setTheme('clear');
  setTheme('connectedDarkBlue');
  closeNav();
});

clearThemeOption.addEventListener('click', () => {
  setTheme('clear');
  closeNav();
});

function checkStorageForTooltipInformation() {
  let hide = localStorage.getItem('hideTooltip');

  if (hide) {
    let tooltipElement = document.getElementsByClassName('tooltip')[0];
    let parent = tooltipElement.parentElement;

    // Remove the element
    parent.removeChild(tooltipElement);
  }
}

/* CHECK TO SEE IF TOOLTIP HAS ALREADY BEEN SHOW */
checkStorageForTooltipInformation();

function turnTooltipOff() {
  let show = localStorage.setItem('hideTooltip', true);

  checkStorageForTooltipInformation();
}

function settingGearColorInvert(invert) {
  if (invert) {
    // Create the <style> tag
    let style = document.createElement('style');
    style.id = 'style';

    // WebKit hack :(
    style.appendChild(document.createTextNode(''));

    // Add the <style> element to the page
    document.head.appendChild(style);

    let sheet = style.sheet;

    sheet.insertRule("img.settings { filter: invert(100%); }");
  } else {
    let headElement = document.getElementsByTagName('head')[0];
    let styleElement = document.getElementById('style');

    // Remove the style element if it exists
    if (styleElement) {
      headElement.removeChild(styleElement);
    }
  }
}