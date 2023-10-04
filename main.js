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
let inputBtn = document.querySelector('.input_btn');

let tax = document.querySelectorAll('.tax');
let taxSum = document.querySelectorAll('.tax_sum');

let vacation = document.querySelectorAll('.vacation');
let vacationNum = document.querySelector('.num_vacations').innerHTML;
let vacationMoney = document.querySelectorAll('.vacation_money');
let vacationDays = document.querySelectorAll('.vacation_days');

let salary = document.querySelectorAll('.salary');
let salaryWhole = document.querySelectorAll('.salary_whole');
let salaryProg = document.querySelectorAll('.salary_prog');
let salaryContent = document.querySelectorAll('.salary_content');
let salaryProgContent = document.querySelectorAll('.salary_prog_content');

let arrSalary = [];
let sumSalary;

formSalaryDefault.addEventListener('click', (e) => {
  e.preventDefault();
  arrSalary = [34375, 15582, 48200, 32943, 31206, 32529, 43571, 47005, 44933, 49856, 56704, 46797];
  localStorage.setItem("Годовая зарплата", JSON.stringify(arrSalary));
  formSalaryDefault.disabled = true;
  return false;
});

inputBtn.addEventListener('click', (e) => {
  e.preventDefault();
  arrSalary = JSON.parse(localStorage.getItem("Годовая зарплата"));
  sumSalary = arrSalary.reduce((acc, number) => acc + number);

  quantityMoney.value = sumSalary;
  return false;
});

function clickBtn(item, show, style) {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    show.classList.toggle(style);
    form.classList.toggle('shift');
    return false;
  });
}

console.log(vacationNum);

let quantityVacation = document.querySelector('.quantity_vacations').value;
quantityVacation = parseInt(quantityVacation);

vacationNum.innerHTML = vacationNum - quantityVacation

if(vacationNum == '0') formVacation.disabled = true;

clickBtn(formVacation, itemHidden, 'show-hidden');

formControl.addEventListener('click', (e) => {
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

    arrSalary = JSON.parse(localStorage.getItem("Годовая зарплата"));

    formSalary.addEventListener('click', (e) => {
      e.preventDefault();

      if(arrSalary[11] == Math.round(salaryVacationTaxSum) ||
         arrSalary[11] == Math.round(salarySumAndTax)) {

        alert("Вы уже добавили данные в таблицу");
        return false;
      } else {

        arrSalary.shift();

        if(quantityMoney.value && quantityVacation) {
          arrSalary.push(Math.round(salaryVacationTaxSum));
        } else {
          arrSalary.push(Math.round(salarySumAndTax));
        }

        localStorage.setItem("Годовая зарплата", JSON.stringify(arrSalary));

        formSalary.disabled = true;
        return false;
      }
    });

    clickBtn(formDetailed, itemDetailed, 'show');

  } else {
    alert("Введите корректные данные");
  }
});