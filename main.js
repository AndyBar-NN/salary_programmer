let form = document.querySelector('form');
let formControl = document.querySelector('.form_control');
let itemHidden = document.querySelector('.hidden');
let formVacation = document.querySelector('.form_vacation');
let formSalary = document.querySelector('.form_salary');
let formDetailed = document.querySelector('.form_detailed');
let itemDetailed = document.querySelector('.detailed');
let betContentSum = document.querySelectorAll('.bet_content-sum');
let salary = document.querySelectorAll('.salary');
let vacation = document.querySelectorAll('.vacation');
let vacationMoney = document.querySelectorAll('.vacation_money');
let vacationDays = document.querySelectorAll('.vacation_days');
let salaryProg = document.querySelectorAll('.salary_prog');
let salaryContent = document.querySelectorAll('.salary_content');
let salaryProgContent = document.querySelectorAll('.salary_prog_content');
let days = document.querySelectorAll('.days');
let daysText = document.querySelectorAll('.days_text');
let hoursProg = document.querySelectorAll('.hours');
let depositSum = document.querySelector('.deposit');

formControl.addEventListener('click', (e) => {
  e.preventDefault();
  let betProg = 325;

  let quantityDays = document.querySelector('.quantity_days').value;
  quantityDays = parseInt(quantityDays);

  let timeProg = document.querySelector('.time_prog').value;
  timeProg = parseInt(timeProg);

  let quantityMoney = document.querySelector('.quantity_money').value;
  quantityMoney = parseInt(quantityMoney);

  let quantityVacation = document.querySelector('.quantity_vacations').value;
  quantityVacation = parseInt(quantityVacation);

  let salarySum;
  let salaryVacationTaxSum;
  let salarySumAndTax;
  let deposit;
  let vacationSum;

  if (quantityDays && timeProg) {
    let betContent = 30000 / (quantityDays * 8);

    let salaryProgSum = betProg * timeProg;

    let salaryContentSum = (quantityDays * 8 - timeProg) * betContent;

    if(quantityMoney && quantityVacation) {
      vacationSum = ((quantityMoney / 12) / 20.5) * quantityVacation;
      salaryVacationTaxSum = (betProg * timeProg) + ((quantityDays * 8 - timeProg) * betContent) + vacationSum + 1047.5;
    } else {
      salarySumAndTax = (betProg * timeProg) + ((quantityDays * 8 - timeProg) * betContent) + 1047.5;
    }

    if(quantityMoney && quantityVacation) {
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

    if(quantityMoney && quantityVacation) {
      foreachData(salary, salaryVacationTaxSum); /* зп */
      foreachData(vacation, vacationSum); /* отпускные */
    } else {
      foreachData(salary, salarySumAndTax); /* зп */
    }
    foreachData(salaryProgContent, salarySum); /* сумма зп программера и контент*/
    foreachData(vacationMoney, quantityMoney); /* сумма за 1 год */
    foreachData(vacationDays, quantityVacation); /* количество отпускных дней */
    foreachData(hoursProg, timeProg); /* часы */
    foreachData(salaryProg, salaryProgSum); /* зп программера */
    foreachData(salaryContent, salaryContentSum); /* зп контента */
    foreachData(days, quantityDays); /* дни */
    foreachData(daysText, daysDeclination); /* склонение дней */
    foreachData(betContentSum, betContent); /* ставка контента */

    let arrSalary = [];
    let sum;
    // arrSalary = [34375, 15582, 48200, 32943, 31206, 32529, 43571, 47005, 44933, 49856, 56704, 46797];
    // localStorage.setItem("array", JSON.stringify(arrSalary));

    // console.log(arrSalary);

    arrSalary = JSON.parse(localStorage.getItem("array"));

    formSalary.addEventListener('click', (e) => {
      e.preventDefault();
      arrSalary = JSON.parse(localStorage.getItem("array"));
      arrSalary.shift();
      arrSalary.push(Math.round(salarySumAndTax));

      localStorage.setItem("array", JSON.stringify(arrSalary));

      formSalary.disabled = true;
    });

    sum = arrSalary.reduce((acc, number) => acc + number);
    console.log(sum);
  } else {
    alert("Введите корректные данные");
  }
});

function clickBtn(item, show, style) {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    show.classList.toggle(style);
    form.classList.toggle('shift');
  });
}

clickBtn(formDetailed, itemDetailed, 'show');
clickBtn(formVacation, itemHidden, 'show-hidden');