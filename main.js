let days = document.querySelectorAll('.days');
let tax = document.querySelectorAll('.tax');
let taxSum = document.querySelectorAll('.tax_sum');
let vacation = document.querySelectorAll('.vacation');
let salaryWhole = document.querySelectorAll('.salary_whole');
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
let monthlySalary = document.querySelector('.monthly_salary');
let monthlySalarySend = document.querySelector('.monthly_salary-send');
let monthlySalarySave = document.querySelector('.monthly_salary-save');
let salaries = document.querySelector('.salaries');

let sumSalary;
let vacationCount;

let arrSalaryNums = [];
let arrSalary = [];

let arrSalaryDefault = [
  ['Январь', 31206], 
  ['Февраль', 32529], 
  ['Март', 43571], 
  ['Апрель', 47005], 
  ['Май', 44933], 
  ['Июнь', 49856], 
  ['Июль', 56704], 
  ['Август', 46797], 
  ['Сентябрь', 33939],
  ['Октябрь', 47640],
  ['Ноябрь', 42428],
  ['Декабрь', 39476], 
];

let date = new Date();
let day = date.getDate();
let year = date.getFullYear();
let month = date.getMonth();
let arrDate = [day, month + 1, year].join('.');

function clickBtn(item, show, style) {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    show.classList.toggle(style);
    form.classList.toggle('shift');
    return false;
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

salaryElem.forEach((input) => {
  input.addEventListener('input', (e) => {
    e.preventDefault();
  });
});

salaryElem.forEach((item) => arrSalary.push(item.value));
let arrSalaryNestedArr = arrSalary.map((item) => {return item.replace(' ₽', '')});
let arrSalarySplitArr = arrSalaryNestedArr.map((elem) => {return elem.split(': ').map(String)});
arrSalary = arrSalarySplitArr;

monthlySalary.addEventListener('click', (e) => {  
  e.preventDefault();
  arrSalary = JSON.parse(localStorage.getItem("Годовая зарплата"));
  salaryElem.forEach((item, num) => item.value = arrSalary[num].join(': ') + ' ₽');
  return false;
});

monthlySalarySave.addEventListener('click', (e) => {  
  e.preventDefault();
  monthlySalarySave.disabled = true;
  location.reload();
  return false;
});

monthlySalarySend.addEventListener('click', (e) => {  
  e.preventDefault();
  arrSalary ? annualSalary(arrSalary) : '';
  monthlySalarySend.disabled = true;
  return false;
});
 
formSalaryDefault.addEventListener('click', (e) => {
  e.preventDefault();
  arrSalary ? annualSalary(arrSalaryDefault) : '';
  formSalaryDefault.disabled = true;
  return false;
});

inputBtn.addEventListener('click', (e) => { // вывести годовую зп
  e.preventDefault();
  arrSalary = JSON.parse(localStorage.getItem("Годовая зарплата"));

  for(let i in arrSalary) {arrSalaryNums[i] = arrSalary[i][1]}

  sumSalary = arrSalaryNums.reduce((acc, number) => acc + number);
  quantityMoney.value = sumSalary;
  return false;
});

//
if(arrDate == `1.1.${year}`) localStorage.setItem("Количество отпускных", JSON.stringify('28'));

inputVacation(vacationCount);

quantityVacationItem.oninput = function() {
  vacationCount = JSON.parse(localStorage.getItem("Количество отпускных"));
  let quantityVacationElem = parseInt(this.value);
  vacationNum.value = vacationCount - quantityVacationElem;
};

vacationNum.value == '0' || vacationNum.value == '' ? formVacation.disabled = true : formVacation.disabled = false;
//

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

    quantityMoney.value && quantityVacation ? deposit = salaryVacationTaxSum / 10 : deposit = salarySumAndTax / 10;

    salarySum = (betProg * timeProg) + ((quantityDays * 8 - timeProg) * betContent);

    depositSum.innerHTML = Math.round(deposit);
    
    let numDay = quantityVacation % 10;
    let daysDeclination;

    quantityVacation > 4 && quantityVacation < 20 || numDay == 0 ? daysDeclination = "дней" :
    numDay > 1 && numDay < 5 ? daysDeclination = "дня" :
    quantityVacation == 1 ? daysDeclination = "день" : "";

    quantityMoney.value && quantityVacation ? foreachData(salaryWhole, Math.round(salaryVacationTaxSum)) : foreachData(salaryWhole, Math.round(salarySumAndTax));

    let itemDetailedTextTax = `
      <span>Налоги:</span><br>
      <b>${taxMoney}</b> - сумма налогов за квартал<br>
      <b>${taxMoney} / 3) / 2 = ${taxSumHalf}</b> - половина от налогов за месяц<br><br>
    `;

    let itemDetailedTextSalary = `
      ЗП (с контентными работами):<br>
      <b>${quantityDays}</b> - отработанные дни<br><br>
      <b>30000 / (${quantityDays} * 8) = ${betContent}</b> - ставка контента за 1 час<br>
      <b>(${quantityDays} * 8 - ${timeProg}) * ${betContent} = ${salaryContentSum}</b> - зп за контентые работы
      <p><b>${timeProg} * 325 = ${salaryProgSum}</b> - зп за программерские работы </p>
      <p><b>${salaryProgSum} + ${salaryContentSum} = ${salarySum}</b></p>
      <p><b>
    `;

    let ititemDetailedTextVacation = `
      Отпускные:<br>
      <b>((${quantityMoney.value} / 12) / 20,5) * ${quantityVacation} = ${vacationSum}</b> - отпускные за  ${quantityVacation + daysDeclination}<br><br>
      ${itemDetailedTextSalary}
      ${salarySum} + ${vacationSum} + ${taxSumHalf} = ${salaryVacationTaxSum}</b></p>
    `;

    itemDetailed.innerHTML = quantityMoney.value && quantityVacation ? itemDetailedTextTax + ititemDetailedTextVacation :
    itemDetailedTextTax + itemDetailedTextSalary + salarySum + " + " + taxSumHalf + " = " + salarySumAndTax + "</b></p>";

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
        arrSalary ? annualSalary(arrSalary) : annualSalary(arrSalaryDefault);
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
