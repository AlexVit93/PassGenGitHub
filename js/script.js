function updateSettings() {
  const length = document.getElementById("length");
  const digits = document.getElementById("digits");
  const capitals = document.getElementById("capitals");
  const symbols = document.getElementById("symbols");

  document.getElementById("length-value").textContent = length.value;
  document.getElementById("digits-value").textContent = digits.value;
  document.getElementById("capitals-value").textContent = capitals.value;
  document.getElementById("symbols-value").textContent = symbols.value;

  updateImage(length.value, digits.value, capitals.value, symbols.value);
  updateStrengthIndicator(
    length.value,
    digits.value,
    capitals.value,
    symbols.value
  );
}
function updateImage(length, digits, capitals, symbols) {
  const total =
    parseInt(length) +
    parseInt(digits) +
    parseInt(capitals) +
    parseInt(symbols);
  const image = document.getElementById("animal-image");
  const category =
    total <= 14
      ? 0
      : total <= 25
      ? 1
      : total <= 35
      ? 2
      : total <= 40
      ? 3
      : total <= 49
      ? 4
      : 5;

  switch (category) {
    case 0:
      image.src = "./img/goat.png";
      break;
    case 1:
      image.src = "./img/goatburn.png";
      break;
    case 2:
      image.src = "./img/goatboom.png";
      break;
    case 3:
      image.src = "./img/bear.png";
      break;
    case 4:
      image.src = "./img/bear_idle.png";
      break;
    case 5:
      image.src = "./img/dragon.png";
      break;
    default:
      console.log("Unhandled category");
      break;
  }
}
let isPasswordGenerated = false;
function generatePassword() {
  const length = document.getElementById("length").value;
  const digits = document.getElementById("digits").value;
  const capitals = document.getElementById("capitals").value;
  const symbols = document.getElementById("symbols").value;

  const password = generateRandomPassword(length, digits, capitals, symbols);
  document.getElementById("result").value = password;
  isPasswordGenerated = true;
  updateSettings();
}

function updateStrengthIndicator(length, digits, capitals, symbols) {
  const totalStrength =
    parseInt(length) +
    parseInt(digits) +
    parseInt(capitals) +
    parseInt(symbols);
  const maxPossibleStrength = 50;
  const strengthIndicator = document.getElementById("strength-indicator");
  const strengthPercentage = (totalStrength / maxPossibleStrength) * 100;

  strengthIndicator.style.width = `${strengthPercentage}%`;

  if (totalStrength < 16) {
    strengthIndicator.style.backgroundColor = "red";
  } else if (totalStrength < 25) {
    strengthIndicator.style.backgroundColor = "orange";
  } else {
    strengthIndicator.style.backgroundColor = "green";
  }
}

function generateRandomPassword(length, digits, capitals, symbols) {
  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialSymbols = '!@#$%^&*()_+-=[]{}|;:",.<>?';

  let validChars = lowercaseLetters;
  let password = "";

  if (capitals > 0) {
    validChars += uppercaseLetters;
  }
  if (digits > 0) {
    validChars += numbers;
  }
  if (symbols > 0) {
    validChars += specialSymbols;
  }

  if (capitals > 0) {
    for (let i = 0; i < capitals; i++) {
      password += uppercaseLetters.charAt(
        Math.floor(Math.random() * uppercaseLetters.length)
      );
    }
  }
  if (digits > 0) {
    for (let i = 0; i < digits; i++) {
      password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
  }
  if (symbols > 0) {
    for (let i = 0; i < symbols; i++) {
      password += specialSymbols.charAt(
        Math.floor(Math.random() * specialSymbols.length)
      );
    }
  }

  for (let i = password.length; i < length; i++) {
    password += validChars.charAt(
      Math.floor(Math.random() * validChars.length)
    );
  }

  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return password;
}
function copyToClipboard() {
  const text = document.getElementById("result").value.trim();
  const tooltip = document.getElementById("copy-tooltip");
  if (!isPasswordGenerated || !text) {
    tooltip.textContent = "Generate a password!";
    tooltip.style.visibility = "visible";
    tooltip.style.opacity = "1";
    setTimeout(() => {
      tooltip.style.visibility = "hidden";
      tooltip.style.opacity = "0";
    }, 2000);
  } else {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        tooltip.textContent = "Copied!";
        tooltip.style.visibility = "visible";
        tooltip.style.opacity = "1";
        setTimeout(() => {
          tooltip.style.visibility = "hidden";
          tooltip.style.opacity = "0";
        }, 2000);
        console.log("Text copied successfully");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }
}

function clearPassword() {
  document.getElementById("length").value = 3;
  document.getElementById("digits").value = 2;
  document.getElementById("capitals").value = 2;
  document.getElementById("symbols").value = 2;

  document.getElementById("length-value").textContent = "3";
  document.getElementById("digits-value").textContent = "2";
  document.getElementById("capitals-value").textContent = "2";
  document.getElementById("symbols-value").textContent = "2";

  document.getElementById("result").value = "";

  const strengthIndicator = document.getElementById("strength-indicator");
  strengthIndicator.style.width = "0%";
  strengthIndicator.style.backgroundColor = "red";
  isPasswordGenerated = false;
  updateSettings();
}

window.onload = function () {
  updateSettings();
};
