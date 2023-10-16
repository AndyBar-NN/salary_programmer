let itemHidden = document.querySelector('.hidden');
let itemDetailed = document.querySelector('.detailed');
let betContentSum = document.querySelectorAll('.bet_content-sum');
let depositSum = document.querySelector('.deposit');
let quantityMoney = document.querySelector('.quantity_money');

let days = document.querySelectorAll('.days');
let daysText = document.querySelectorAll('.days_text');
let hoursProg = document.querySelectorAll('.hours');

let form = document.querySelector('form');
let formControl = document.querySelector('.form_control');
let formVacation = document.querySelector('.form_vacation');
let formSalary = document.querySelector('.form_salary');
let formSalaryDefault = document.querySelector('.form_salary-default');
let formDetailed = document.querySelector('.form_detailed');
let inputBtnVacation = document.querySelector('.input_btn-vacation');
let inputBtn = document.querySelector('.input_btn');

let tax = document.querySelectorAll('.tax');
let taxSum = document.querySelectorAll('.tax_sum');

let vacation = document.querySelectorAll('.vacation');
let vacationMoney = document.querySelectorAll('.vacation_money');
let vacationDays = document.querySelectorAll('.vacation_days');

let salary = document.querySelectorAll('.salary');
let salaryWhole = document.querySelectorAll('.salary_whole');
let salaryProg = document.querySelectorAll('.salary_prog');
let salaryContent = document.querySelectorAll('.salary_content');
let salaryProgContent = document.querySelectorAll('.salary_prog_content');

let quantityVacation = document.querySelector('.quantity_vacations').value;
quantityVacation = parseInt(quantityVacation);
let quantityVacationItem = document.querySelector('.quantity_vacations');
let vacationNum = document.querySelector('.num_vacations');

let salaryElem = document.querySelectorAll('.salary_elem');
let monthlySalary = document.querySelector('.monthly_salary'); 
let salaries = document.querySelector('.salaries'); 

let arrSalaryNums = [];
let arrSalary = [];
let sumSalary;
let vacationCount;

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let arrDate = [month + 1, year].join('.');

monthlySalary.addEventListener('click', (e) => {
  arrSalary = JSON.parse(localStorage.getItem("Годовая зарплата"));

  e.preventDefault();
  salaryElem.forEach(function(n, i) {
    n.innerHTML = arrSalary[i].join(': ') + ' ₽';
  });

  return false;
});

formSalaryDefault.addEventListener('click', (e) => {
  e.preventDefault();
  
  arrSalary = [
    ['Октябрь', 15582],
    ['Ноябрь', 48200],
    ['Декабрь', 32943], 
    ['Январь', 31206], 
    ['Февраль', 32529], 
    ['Март', 43571], 
    ['Апрель', 47005], 
    ['Май', 44933], 
    ['Июнь', 49856], 
    ['Июль', 56704], 
    ['Август', 46797], 
    ['Сентябрь', 33939]
  ];
  
  localStorage.setItem("Годовая зарплата", JSON.stringify(arrSalary));
  
  formSalaryDefault.disabled = true;
  return false;
});

inputBtn.addEventListener('click', (e) => { // вывести годовую зп
  e.preventDefault();
  arrSalary = JSON.parse(localStorage.getItem("Годовая зарплата"));

  for(let i in arrSalary) {
    arrSalaryNums[i] = arrSalary[i][1];
  }

  sumSalary = arrSalaryNums.reduce((acc, number) => acc + number);
  quantityMoney.value = sumSalary;
  return false;
});

//
vacationNum.value = arrDate == '1.2024' ? '28' : JSON.parse(localStorage.getItem("Количество отпускных"));
if(vacationNum.value == '0' || vacationNum.value == '') formVacation.disabled = true;

quantityVacationItem.addEventListener('input', function() {
  vacationCount = JSON.parse(localStorage.getItem("Количество отпускных"));
  let quantityVacationElem = parseInt(this.value);
  vacationNum.value = vacationCount - quantityVacationElem;
});

inputBtnVacation.addEventListener('click', (e) => { // вывести количество отпускных
  e.preventDefault();
  if(arrDate == '1.2024') {
    localStorage.setItem("Количество отпускных", JSON.stringify('28'));
    formVacation.disabled = false;
  } 
  
  vacationCount = JSON.parse(localStorage.getItem("Количество отпускных"));
  vacationNum.value = vacationCount;
  return false;
});
//

function clickBtn(item, show, style) {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    show.classList.toggle(style);
    form.classList.toggle('shift');
    return false;
  });
}

clickBtn(formVacation, itemHidden, 'show-hidden');

formControl.addEventListener('click', (e) => { // кнопка посчитать
  e.preventDefault();
  let betProg = 325;

  let quantityDays = document.querySelector('.quantity_days').value;
  quantityDays = parseInt(quantityDays);

  let timeProg = document.querySelector('.time_prog').value;
  timeProg = parseInt(timeProg);

  let taxMoney = document.querySelector('.tax_money').value;
  taxMoney = parseInt(taxMoney);

  let salarySum;
  let salaryVacationTaxSum;
  let salarySumAndTax;
  let deposit;
  let vacationSum;

  quantityVacation = quantityVacationItem.value;

  if (quantityDays && timeProg && taxMoney) {
    let taxSumHalf = (taxMoney / 3) / 2;
    let betContent = 30000 / (quantityDays * 8);
    let salaryProgSum = betProg * timeProg;
    let salaryContentSum = (quantityDays * 8 - timeProg) * betContent;

    if(quantityMoney.value && quantityVacation) {
      vacationSum = ((quantityMoney.value / 12) / 20.5) * quantityVacation;
      salaryVacationTaxSum = (betProg * timeProg) + ((quantityDays * 8 - timeProg) * betContent) + vacationSum + taxSumHalf;
    } else {
      salarySumAndTax = (betProg * timeProg) + ((quantityDays * 8 - timeProg) * betContent) + taxSumHalf;
    }

    if(quantityMoney.value && quantityVacation) {
      deposit = salaryVacationTaxSum / 10;
    } else {
      deposit = salarySumAndTax / 10;
    }

    salarySum = (betProg * timeProg) + ((quantityDays * 8 - timeProg) * betContent);

    depositSum.innerHTML = Math.round(deposit);

    function foreachData(item, input) {
      item.forEach((i) => {
        i.innerHTML = input;
      });
    }

    let numDay = quantityVacation % 10;
    let daysDeclination;

    if(quantityVacation > 4 && quantityVacation < 20 || numDay == 0) {
      daysDeclination = "дней";
    } else if(numDay > 1 && numDay < 5) {
      daysDeclination = "дня";
    } else if(quantityVacation == 1) {
      daysDeclination = "день";
    }

    if(quantityMoney.value && quantityVacation) {
      foreachData(salaryWhole, Math.round(salaryVacationTaxSum)); /* зп округлённое */
    } else {
      foreachData(salaryWhole, Math.round(salarySumAndTax)); /* зп округлённое */
    }

    //
    let itemDetailedTextTax = "<span>Налоги:</span><br><b>"
    + taxMoney + "</b> - сумма налогов за квартал<br>"
    + "<b>" + taxMoney + " / 3) / 2 = " + taxSumHalf + "</b> - половина от налогов за месяц<br><br>";

    let itemDetailedTextSalary = "ЗП (с контентными работами):<br>"
    + "<b>" + quantityDays + "</b> - отработанные дни<br><br>"
    + "<b>30000 / (" + quantityDays + " * 8) = " + betContent + "</b> - ставка контента за 1 час<br>"
    + "<b>(" + quantityDays + " * 8 - " + timeProg + ") * " + betContent + " = " + salaryContentSum + "</b> - зп за контентые работы"
    + "<p><b>"
    + timeProg + " * 325 = " + salaryProgSum
    + "</b> - зп за программерские работы </p>"
    + "<p><b>"
    + salaryProgSum + " + " + salaryContentSum + " = " + salarySum
    + "</b></p>"
    + "<p><b>";

    itemDetailed.innerHTML += quantityMoney.value && quantityVacation ? itemDetailedTextTax
      + "Отпускные:<br><b>((" + quantityMoney.value + " / 12) / 20,5) * " + quantityVacation + " = " + vacationSum + "</b> - отпускные за " + quantityVacation + " " + daysDeclination
      + "<br>"
      + "<br>"
      + itemDetailedTextSalary
      + salarySum + " + " + vacationSum + " + " + taxSumHalf + " = " + salaryVacationTaxSum
      + "</b></p>" : itemDetailedTextTax
      + itemDetailedTextSalary
      + salarySum + " + " + taxSumHalf + " = " + salarySumAndTax
      + "</b></p>";
    //

    if(quantityVacation !== '' || quantityVacation !== 0) {
      localStorage.setItem("Количество отпускных", JSON.stringify(vacationNum.value));
    }

    function replacingElem(item) {
      arrSalary[11][1] = item;
      arrSalary[11].pop();
      arrSalary[11].push(Math.round(item));
    }

    formSalary.addEventListener('click', (e) => {
      e.preventDefault();

      if(arrSalary[11][1] == Math.round(salaryVacationTaxSum) ||
         arrSalary[11][1] == Math.round(salarySumAndTax)) {

        alert("Вы уже добавили данные в таблицу");
        return false;
      } else {

        arrSalary.push(arrSalary.shift());

        if(quantityMoney.value && quantityVacation) {
          replacingElem(salaryVacationTaxSum);
        } else {
          replacingElem(salarySumAndTax);
        }

        localStorage.setItem("Годовая зарплата", JSON.stringify(arrSalary));

        formSalary.disabled = true;
        return false;
      }
    });

    clickBtn(formDetailed, itemDetailed, 'show');
    clickBtn(formDetailed, salaries, 'show');

  } else {
    alert("Введите корректные данные");
    return false;
  }
});