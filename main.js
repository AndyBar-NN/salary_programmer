let days = document.querySelectorAll('.days');
let tax = document.querySelectorAll('.tax');
let taxSum = document.querySelectorAll('.tax_sum');
let vacation = document.querySelectorAll('.vacation');
let salaryWhole = document.querySelectorAll('.salary_whole');
let salaryWholeText = document.querySelectorAll('.salary_whole_text');
let salaryProg = document.querySelectorAll('.salary_prog');
let salaryContent = document.querySelectorAll('.salary_content');
let salaryElem = document.querySelectorAll('.salary_elem');
let inputElem = document.querySelectorAll('input[type="number"]');

let itemHidden = document.querySelector('.hidden');
let itemDetailed = document.querySelector('.detailed');
let depositSum = document.querySelector('.deposit');
let quantityMoney = document.querySelector('.quantity_money');
let form = document.querySelector('form');
let formControl = document.querySelector('.form_control');
let formVacation = document.querySelector('.form_vacation');
let formSalary = document.querySelector('.form_salary');
let formSalaryDefault = document.querySelector('.form_salary-default');
let formDetailed = document.querySelector('.form_detailed');
let inputBtn = document.querySelector('.input_btn');
let hiddenCopyText = document.querySelector('.hidden_copy_text');
let quantityVacationItem = document.querySelector('.quantity_vacations');
let vacationNum = document.querySelector('.num_vacations');
let monthlySalarySend = document.querySelector('.monthly_salary-send');
let monthlySalarySave = document.querySelector('.monthly_salary-save');
let salaries = document.querySelector('.salaries');
let btnVacations = document.querySelector('.btn_vacations');

let sumSalary;
let vacationCount;

let arrSalaryNums = [];
let arrSalary = [];
let arrSalaryElems = [];

let date = new Date();
let day = date.getDate();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let arrDate = [day, month, year].join('.');

let numMonth = month - 1;

let arrSalaryDefault = [
  ['Январь', 50000],
  ['Февраль', 50000],
  ['Март', 50000],
  ['Апрель', 50000],
  ['Май', 50000],
  ['Июнь', 50000],
  ['Июль', 50000],
  ['Август', 50000],
  ['Сентябрь', 50000],
  ['Октябрь', 50000],
  ['Ноябрь', 50000],
  ['Декабрь', 50000],
];

let arrSalaryActual = [...arrSalaryDefault.slice(numMonth), ...arrSalaryDefault.slice(0, numMonth)]

function clickBtn(item, show, style) {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    show.classList.toggle(style);
    form.classList.toggle('shift');
  });
}

function foreachData(item, input) {
  item.forEach((i) => {
    i.innerHTML = input;
  });
}

function replacingElem(item) {
  arrSalary[11][1] = item;
  arrSalary[11].pop();
  arrSalary[11].push(Math.round(item));
}

function annualSalary(name) {localStorage.setItem("Годовая зарплата", JSON.stringify(name))}

function inputVacation(count) {
  count = JSON.parse(localStorage.getItem("Количество отпускных"));
  vacationNum.value = count;
}

inputElem.forEach((input) => {
  input.addEventListener('input', (e) => {
    e.preventDefault();
    input.value = input.value.replace(/[^0-9]/g, '');
  });
});

arrSalaryElems = JSON.parse(localStorage.getItem("Годовая зарплата"));
salaryElem.forEach((input) => {
  if (input.value == '' && arrSalaryElems !== null) {
    salaryElem.forEach((item, num) => item.value = arrSalaryElems[num].join(': '));
  } else {
    input.addEventListener('input', (e) => {
      e.preventDefault();
      monthlySalarySave.disabled = false;
    });
  }
});

salaryElem.forEach((item) => arrSalary.push(item.value));
let arrSalaryNestedArr = arrSalary.map((item) => {return item});
let arrSalarySplitArr = arrSalaryNestedArr.map((elem) => {return elem.split(': ').map(String)});
arrSalary = arrSalarySplitArr;

if (JSON.parse(localStorage.getItem("Годовая зарплата")) == null) {
  annualSalary(arrSalaryActual);
  arrSalary = JSON.parse(localStorage.getItem("Годовая зарплата"));
  salaryElem.forEach((item, num) => item.value = arrSalary[num].join(': '));
} 

monthlySalarySave.addEventListener('click', (e) => {
  e.preventDefault();
  monthlySalarySave.disabled = true;
  monthlySalarySend.disabled = false;
  location.reload();
});

monthlySalarySend.addEventListener('click', (e) => {
  e.preventDefault();
  arrSalary ? annualSalary(arrSalary) : '';
  monthlySalarySend.disabled = true;
});

inputBtn.addEventListener('click', (e) => { // вывести годовую зп
  e.preventDefault();
  arrSalary = JSON.parse(localStorage.getItem("Годовая зарплата"));
  for(let i in arrSalary) {arrSalaryNums[i] = Number(arrSalary[i][1])}
  
  sumSalary = arrSalaryNums.reduce((acc, number) => acc + number);
  console.log(sumSalary);
  quantityMoney.value = sumSalary;
});

//
localStorage.getItem("Сегодняшний год") == year ? btnVacations.disabled = true : btnVacations.disabled = false;

btnVacations.addEventListener('click', (e) => {
  e.preventDefault();
  if(vacationNum.value > 0 && vacationNum.value <= 28) {
    localStorage.setItem("Количество отпускных", vacationNum.value);
    localStorage.setItem("Сегодняшний год", year);
    location.reload();
  } else {
    alert('Введите число в диапозоне от 1 до 28 включительно!');
  }
});

inputVacation(vacationCount);

quantityVacationItem.oninput = function() {
  vacationCount = JSON.parse(localStorage.getItem("Количество отпускных"));
  let quantityVacationElem = parseInt(this.value);
  quantityVacationItem.max = vacationCount;
  vacationNum.value = vacationCount - quantityVacationElem;
};

if(vacationNum.value == 0 || vacationNum.value == '') {
  formVacation.disabled = true;
  vacationNum.readOnly = false;
} else {
  formVacation.disabled = false;
  vacationNum.readOnly = true;
}
//

clickBtn(formVacation, itemHidden, 'show-hidden');

formControl.addEventListener('click', (e) => { // кнопка посчитать
  e.preventDefault();
  let betProg = 325;

  let timeProg = document.querySelector('.time_prog').value; // время программиста
  timeProg = parseInt(timeProg);

  let taxMoney = document.querySelector('.tax_money').value; // сумма налогов
  taxMoney = parseInt(taxMoney);

  let salaryVacationTaxSum;
  let salarySumAndTax;
  let deposit;
  let vacationSum;

  let quantityVacation = quantityVacationItem.value;

  if (timeProg && taxMoney) {
    let taxSumHalf = (taxMoney / 3) / 2; // половина от налогов за 1 месяц
    let salaryProgSum = betProg * timeProg; // зп программиста

    if(quantityMoney.value && quantityVacation) {
      vacationSum = ((quantityMoney.value / 12) / 20.5) * quantityVacation;
      salaryVacationTaxSum = (betProg * timeProg) + vacationSum + taxSumHalf; // зп + отпускные + половина налога за месяц
    } else {
      salarySumAndTax = (betProg * timeProg) + taxSumHalf; // зп + половина налога за месяц
    }

    quantityMoney.value && quantityVacation ? deposit = salaryVacationTaxSum / 10 : deposit = salarySumAndTax / 10;

    let salarySum = betProg * timeProg;

    depositSum.innerHTML = Math.round(deposit);

    let numDay = quantityVacation % 10;
    let daysDeclination;

    quantityVacation > 4 && quantityVacation < 20 || numDay == 0 ? daysDeclination = "дней" :
    numDay > 1 && numDay < 5 ? daysDeclination = "дня" :
    quantityVacation == 1 ? daysDeclination = "день" : "";

    function numLetters(k, d) {  // целое число прописью, это основа
      var i = '', e = [
        ['','тысяч'],
        ['а','и',''],
        ['','а']
      ];
      if (k == '' || k == '0') return ' ноль'; // 0
      k = k.split(/(?=(?:\d{3})+$)/);  // разбить число в массив с трёхзначными числами
      if (k[0].length == 1) k[0] = '00'+k[0];
      if (k[0].length == 2) k[0] = '0'+k[0];
      for (var j = (k.length - 1); j >= 0; j--) {  // соединить трёхзначные числа в одно число, добавив названия разрядов с окончаниями
        if (k[j] != '000') {
          i = (((d && j == (k.length - 1)) || j == (k.length - 2)) && (k[j][2] == '1' || k[j][2] == '2') ? t(k[j],1) : t(k[j])) + declOfNum(k[j], e[0][k.length - 1 - j], (j == (k.length - 2) ? e[1] : e[2])) + i;
        }
      }
      function t(k, d) {  // преобразовать трёхзначные числа
        var e = [
          ['',' один',' два',' три',' четыре',' пять',' шесть',' семь',' восемь',' девять'],
          [' десять',' одиннадцать',' двенадцать',' тринадцать',' четырнадцать',' пятнадцать',' шестнадцать',' семнадцать',' восемнадцать',' девятнадцать'],
          ['','',' двадцать',' тридцать',' сорок',' пятьдесят',' шестьдесят',' семьдесят',' восемьдесят',' девяносто'],
          ['',' сто',' двести',' триста',' четыреста',' пятьсот',' шестьсот',' семьсот',' восемьсот',' девятьсот'],
          ['',' одна',' две']
        ];
        return e[3][k[0]] + (k[1] == 1 ? e[1][k[2]] : e[2][k[1]] + (d ? e[4][k[2]] : e[0][k[2]]));
      }
      return i;
    }

    function declOfNum(n, t, o) {  // склонение именительных рядом с числительным: число (typeof = string), корень (не пустой), окончание
      var k = [2,0,1,1,1,2,2,2,2,2];
      return (t == '' ? '' : ' ' + t + (n[n.length-2] == "1"?o[2]:o[k[n[n.length-1]]]));
    }

    function razUp(e) {  // сделать первую букву заглавной и убрать лишний первый пробел
      return e[1].toUpperCase() + e.substring(2);
    }

    function sumLetters(a) {
      a = Number(a).toFixed(2).split('.');  // округлить до сотых и сделать массив двух чисел: до точки и после неё
      return razUp(numLetters(a[0]) + declOfNum(a[0], 'рубл', ['ь','я','ей']) + ' ' + a[1] + declOfNum(a[1], 'копе', ['йка','йки','ек']));
    }

    if(quantityMoney.value && quantityVacation) {
      foreachData(salaryWhole, Math.round(salaryVacationTaxSum));
      foreachData(salaryWholeText, sumLetters(Math.round(salaryVacationTaxSum)));
    } else {
      foreachData(salaryWhole, Math.round(salarySumAndTax));
      foreachData(salaryWholeText, sumLetters(Math.round(salarySumAndTax)));
    } 

    let itemDetailedTextTax = `
      <b>Налоги:</b><br>
      <b>${taxMoney}</b> - сумма налогов за квартал<br>
      <b>(${taxMoney} / 3) / 2 = ${taxSumHalf}</b> - половина от налогов за месяц<br><br>
    `;

    let itemDetailedTextSalary = `
      <b>ЗП:</b><br>
      <b>${timeProg} * 325 = ${salaryProgSum}</b> - зп за программерские работы <br>
      <b>
    `;

    let ititemDetailedTextVacation = `
      <b>Отпускные:</b><br>
      <b>((${quantityMoney.value} / 12) / 20,5) * ${quantityVacation} = ${vacationSum}</b> - отпускные за ${quantityVacation + ' ' + daysDeclination}<br><br>
      ${itemDetailedTextSalary}
      ${salarySum} + ${vacationSum} + ${taxSumHalf} = ${salaryVacationTaxSum}</b></p>
    `;

    itemDetailed.innerHTML = quantityMoney.value && quantityVacation ? itemDetailedTextTax + ititemDetailedTextVacation :
    itemDetailedTextTax + itemDetailedTextSalary + salarySum + " + " + taxSumHalf + " = " + salarySumAndTax + "</br></p>";
    if(quantityVacation !== '' || quantityVacation !== 0) localStorage.setItem("Количество отпускных", JSON.stringify(vacationNum.value));

    formSalary.addEventListener('click', (e) => {
      e.preventDefault();

      if(arrSalary[11][1] == Math.round(salaryVacationTaxSum) ||
        arrSalary[11][1] == Math.round(salarySumAndTax)) {
        alert("Вы уже добавили данные в таблицу");
        return false;
      } else {
        arrSalary.push(arrSalary.shift());
        quantityMoney.value && quantityVacation ? replacingElem(salaryVacationTaxSum) : replacingElem(salarySumAndTax);
        arrSalary ? annualSalary(arrSalary) : annualSalary(arrSalaryActual);
        formSalary.disabled = true;
        return false;
      }
    });

    clickBtn(formDetailed, itemDetailed, 'show');
    clickBtn(formDetailed, salaries, 'show');

    let btnCopy = document.querySelector('.btn_copy');

    function copyText() {
      let elemBlock = document.getElementById("text");
      let elemText = document.createElement("textarea");
      elemText.value = elemBlock.innerText;
      document.body.appendChild(elemText);
      elemText.select();
      document.execCommand("copy");
      document.body.removeChild(elemText);
      console.log("Текст скопирован!");
    }

    btnCopy.addEventListener('click', (e) => {
      e.preventDefault();
      copyText();
      hiddenCopyText.style.display = 'block';
      setTimeout(() => hiddenCopyText.style.display = "", 3900);
    });

  } else {
    return false;
  }
});
