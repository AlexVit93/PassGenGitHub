function updateSettings() {
  const length = document.getElementById("length");
  const digits = document.getElementById("digits");
  const capitals = document.getElementById("capitals");
  const symbols = document.getElementById("symbols");

  document.getElementById("length-value").textContent = length.value;
  document.getElementById("digits-value").textContent = digits.value;
  document.getElementById("capitals-value").textContent = capitals.value;
  document.getElementById("symbols-value").textContent = symbols.value;

  updateImage(length.value);
}
function updateImage(length) {
  const image = document.getElementById("animal-image");
  if (length <= 14) {
    image.src = "./goat.png";
  } else {
    image.src = "./bear.png";
  }
}

function generatePassword() {
  const length = document.getElementById("length").value;
  const digits = document.getElementById("digits").value;
  const capitals = document.getElementById("capitals").value;
  const symbols = document.getElementById("symbols").value;

  const password = generateRandomPassword(length, digits, capitals, symbols);
  document.getElementById("result").value = password;
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
  const text = document.getElementById("result").value;
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Text copied successfully");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}

function clearPassword() {
  document.getElementById("result").value = "";
}

window.onload = function () {
  updateSettings();
};
