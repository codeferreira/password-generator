import {updateRangeCSS} from './update-range.js'

const rangeInputEl = document.getElementById("charactersrange");
const inputEl = document.getElementById("password");
const buttonEl = document.getElementById("generate");
const clibboardButtonEl = document.getElementById("clipboard");

//Get checkbox inputs
const checkboxUppercaseEl = document.getElementById("uppercase");
const checkboxLowercaseEl = document.getElementById("lowercase");
const checkboxNumbersEl = document.getElementById("numbers");
const checkboxSymbolsEl = document.getElementById("symbols");

function getValidChars({
  hasUppercase = true,
  hasLowercase = true,
  hasNumbers = false,
  hasSymbols = false,
}) {
  let validChars = "";

  if (hasNumbers) {
    validChars += "0123456789"
  }

  if (hasSymbols) {
    validChars += ",.-{}+!#$%/()=?"
  }

  if (hasLowercase) {
    validChars += "abcdefghijklmnopqrstuvwxyz"
  }

  if (hasUppercase) {
    validChars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  }
  
  return validChars;
}


function generatePassword(passwordLength = 5, validChars) {
  let password = "";

  for (let index = 0; index < passwordLength; index++) {
    let randomNumber = crypto.getRandomValues(new Uint32Array(1))[0];
    randomNumber = randomNumber / 0x100000000;
    randomNumber = Math.floor(randomNumber * validChars.length);
    const char = validChars[randomNumber];
    password += char;
  }
  
  return password;
}

function handleClickGeneratePassword(event) {
  event.preventDefault();

  const hasUppercase = checkboxUppercaseEl.checked;
  const hasLowercase = checkboxLowercaseEl.checked;
  const hasNumbers = checkboxNumbersEl.checked;
  const hasSymbols = checkboxSymbolsEl.checked;
  const validChars = getValidChars({hasUppercase, hasLowercase, hasNumbers, hasSymbols});


  const passwordLength = rangeInputEl.value;
  const password = generatePassword(passwordLength, validChars);

  inputEl.value = password;
}

buttonEl.addEventListener('click', handleClickGeneratePassword);

clibboardButtonEl.addEventListener('click', () => {
  const { value } = inputEl;
  
  navigator.clipboard.writeText(value);
});

rangeInputEl.addEventListener('input', updateRangeCSS);
