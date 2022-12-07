import {updateRangeCSS} from './update-range.js'

const rangeInputEl = document.getElementById("charactersrange");
const inputEl = document.getElementById("password");
const buttonEl = document.getElementById("generate");
const clibboardButtonEl = document.getElementById("clipboard");

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
  const randomNumbers = crypto.getRandomValues(new Uint32Array(passwordLength)).map(number => {
    //create decimal random number
    const randomNumber = Math.floor((number / 0x100000000) * validChars.length);

    // return a character based on the valid characters list
    return randomNumber;
  });

  const password = randomNumbers.toString().split(",").map(randomNumber => {
    return validChars[Number(randomNumber)];
  }).join("");
  
  return password;
}

function handleClickGeneratePassword(event) {
  event.preventDefault();

  const hasUppercase = document.forms["password-form"]["uppercase"].checked;
  const hasLowercase = document.forms["password-form"]["lowercase"].checked;
  const hasNumbers = document.forms["password-form"]["numbers"].checked;
  const hasSymbols = document.forms["password-form"]["symbols"].checked;
  const validChars = getValidChars({hasUppercase, hasLowercase, hasNumbers, hasSymbols});

  const passwordLength = document.forms["password-form"]["charactersrange"].value;
  const password = generatePassword(passwordLength, validChars);

  inputEl.value = password;
}

buttonEl.addEventListener('click', handleClickGeneratePassword);

clibboardButtonEl.addEventListener('click', () => {
  const { value } = inputEl;
  
  navigator.clipboard.writeText(value);
});

rangeInputEl.addEventListener('input', updateRangeCSS);
