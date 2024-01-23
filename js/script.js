const questionnaires = document.querySelectorAll(".questionnaire__wrapper"),
    pacient = document.querySelector("#pacient"),
    modal = document.querySelector('.modal');

const today = document.querySelector('#today');
let date = new Date();
let output = String(date.getDate()).padStart(2, '0') + '.' + String(date.getMonth() + 1).padStart(2, '0') + '.' + date.getFullYear();
today.textContent = output;

const fadeIn = (el, timeout, display) => {
    el.style.opacity = 0;
    el.style.display = display || 'block';
    el.style.transition = `opacity ${timeout}ms`;
    setTimeout(() => {
        el.style.opacity = 1;
    }, 10);
};

const fadeOut = (el, timeout) => {
    el.style.opacity = 1;
    el.style.transition = `opacity ${timeout}ms`;
    el.style.opacity = 0;
    setTimeout(() => {
        el.style.display = 'none';
    }, timeout);
};

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let name_p = getRandomIntInclusive(100,300);
let lastname = getRandomIntInclusive(100,300);
pacient.textContent = name_p + "" + lastname;

function questionnaireSubmit() {
    let NRI, albumin, weight_before, weight_now;

    albumin = document.querySelector('#albumin').value.replace(',', ".");
    weight_before = document.querySelector('#weight_before').value.replace(',', ".");
    weight_now = document.querySelector('#weight_now').value.replace(',', ".");
    
    NRI = 1.519 * albumin + 0.417 * (weight_now/weight_before * 100);
    console.log(NRI);
    let conclusion;
    if (NRI > 97.5) {
        conclusion = "Нет нутритивной недостаточности, рекомендовано дополнительно провести биоимпедансометрию";
    } 
    else if ((NRI >= 83.5) && (NRI <= 97.5)){
        conclusion = "Средняя степень недостаточности питания, рекомендовано подключить нутритивную поддержку";
    } else {
        conclusion = "Тяжелая степень недостаточности питания, рекомендовано подключить нутритивную поддержку";
    }

    let resultModal = document.getElementById("modal__body");
    resultModal.innerText = conclusion;

    fadeIn(modal,500);
}

document
    .querySelector(".modal__btn-close")
    .addEventListener("click", () => fadeOut(modal,500));
document
    .querySelector(".close")
    .addEventListener("click", () => fadeOut(modal,500));
