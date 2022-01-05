`use strict`;
//selecting elements
const inputField = document.querySelector(`#email`);
const checkBox = document.querySelector(`input[name="terms"]`);
const btn = document.querySelector(`#btn`);
const form = document.querySelector(`form`);
const socMedia = document.querySelectorAll(`.soc-media`);
const succsess = document.querySelector(`.succsess`);
const aside = document.querySelector(`aside`);

inputField.value = "";
checkBox.checked = false;
//regEx
const regxEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regxDomain = /(\.\w+)$/g;

const showError = function (message) {
  const small = document.querySelector(`small`);
  small.classList.add(`error`);
  small.innerHTML = message;
};

const allDone = function () {
  const small = document.querySelector(`small`);
  small.classList.remove(`error`);
  small.innerHTML = " ";
};

const checkEmail = function (field) {
  if (field.value === "") {
    return showError(`Email adress is required`);
  } else if (!regxEmail.test(field.value.trim())) {
    return showError(`Please provide a valid e-mail adress`);
  }
};

const checkColumbians = function (field) {
  let check = field.value.match(regxDomain);
  if (!check) {
    return;
  } else if (check[0] === `.co`) {
    showError(`We are not accepting subscriptions from Colombia emails`);
  } else {
    showSuccess();
  }
};

const showSuccess = function () {
  form.style.display = `none`;
  succsess.style.display = `block`;
  socMedia[1].style.display = `none`;
  //should have planned layout better
  aside.style.gridTemplateRows = `repeat(2,1fr)`;
};

//show succsess
btn.addEventListener(`click`, (e) => {
  e.preventDefault();
  if (!checkBox.checked) {
    showError(`You must accept terms and coditions`);
  } else if (checkBox.checked) {
    checkEmail(inputField);
    checkColumbians(inputField);
  } else {
    form.submit();
  }
});
