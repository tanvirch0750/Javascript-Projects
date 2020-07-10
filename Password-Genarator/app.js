/******************************************
 * todo -> Get DOM Elements
 *****************************************/
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtnEl = document.getElementById('generate');
const clipBoardBtnEl = document.getElementById('clipboard');


/******************************************
 * todo -> State Object
 *****************************************/
const randomFunction = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
}


/******************************************
 * todo -> Generator Functions
 *****************************************/
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.~'
  return symbols[Math.floor(Math.random() * symbols.length)];
};


/******************************************
 * todo -> Make Password 
 *****************************************/
function makePassword(lower, upper, number, symbol, length) {
  // 1) Initialize Password Variable;
  let generatedPassword = '';

  // 2) Filter Out unchecked types;
  const typeCount = lower + upper + number + symbol;


  const typesArr = [{
    lower
  }, {
    upper
  }, {
    number
  }, {
    symbol
  }].filter(item => Object.values(item)[0]);



  if (typeCount === 0) {
    return '';
  }


  // 3) Loop over length call generator function for each type;
  for (let i = 0; i < length; i += typeCount) {
    typesArr.forEach(type => {

      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunction[funcName]();

    });
  };


  // 4) Add final password to the password variable and return;
  const finalPassword = (generatedPassword.slice(0, length));
  return finalPassword;
}

/******************************************
 * todo -> Generate Password Function 
 *****************************************/
function generatePassword() {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = makePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
}

/******************************************
 * todo -> Copy Password to Clipboard
 *****************************************/
function copyToClipboard() {
  const textArea = document.createElement('textarea');
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textArea.value = password;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  textArea.remove();
  alert('Password copied to clipboard');
}



/******************************************
 * todo -> Event Listener
 *****************************************/
generateBtnEl.addEventListener('click', generatePassword);
clipBoardBtnEl.addEventListener('click', copyToClipboard);