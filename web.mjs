// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getGreeting } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

const calender = document.querySelector('#calender');
const nextBtn = document.getElementById('nextBtn');
const backBtn = document.getElementById('backBtn');
const displayMonth = document.getElementById('show-month');
const monthSelect = document.getElementById('select-month');
const yearSelect = document.getElementById('select-year');

let increaser = 0;

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const monthsOfTheYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const showCalender = () => {
    const date = new Date();
    const selectedMonth = monthSelect.selectedIndex;
    const selectedYear = parseInt(yearSelect.value) || date.getFullYear();

    date.setFullYear(selectedYear, selectedMonth);

    if (increaser !== 0) {
        date.setMonth(new Date().getMonth() + increaser)
    }

    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const monthInWords = date.toLocaleDateString('en-us', { month: 'long' });

    const formattedDate = firstDayOfMonth.toLocaleString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });

    const gapToLeave = weekdays.indexOf(formattedDate.split(', ')[0]);
    displayMonth.innerText = `${monthInWords} ${date.getFullYear()}`;

    calender.innerHTML = '';

    for(let i = 1; i <= gapToLeave + lastDayOfMonth; i++) {
        const eachDay = document.createElement('div');
        eachDay.classList.add('day');

        if(i > gapToLeave) {
            eachDay.innerText = i - gapToLeave;
        }
        else {
            eachDay.classList.add('padding')
        }

        calender.appendChild(eachDay);
    }
}

const populateMonth = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); 

    for (let i = 0; i < monthsOfTheYear.length; i++) {
        const monthOpt = document.createElement('option');
        monthOpt.textContent = monthsOfTheYear[i];

        monthSelect.append(monthOpt);
    }
    monthSelect.selectedIndex = currentMonth;

    for ( let j = 1900; j < 2100; j++) {
        const yearOpt = document.createElement('option');
        yearOpt.textContent = j;
        yearSelect.appendChild(yearOpt)
    }
    yearSelect.value = currentYear;
}

nextBtn.addEventListener('click', () => {
    increaser++;
    showCalender();
});

backBtn.addEventListener('click', () => {
    increaser--;
    showCalender();
});

monthSelect.addEventListener('change', () => {
    increaser = 0;
    showCalender();
});

yearSelect.addEventListener('change', () => {
    increaser = 0;
    showCalender();
})

window.onload = function() {
    showCalender();
    populateMonth();
}
