var initDate = new Date(),
    allMonths = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ],
    currentDayIndex = initDate.getDate(),
    currentMonthIndex = initDate.getMonth(),
    currentMonth = allMonths[currentMonthIndex],
    currentYear = initDate.getUTCFullYear();

function createDaysForMonth(monthIndex, year) {
    var d = new Date(year, monthIndex + 1, 0),
        numberOfDaysInMonth = d.getDate();

    var d = new Date(year, monthIndex, 1),
        firstWeekDayofMonth = d.getDay();

    const $days = document.getElementsByClassName("days")[0];

    if ($days.getElementsByTagName("li").length > 0) {
        for (let i = $days.getElementsByTagName("li").length - 1; i >= 0; i--) {
            $days.getElementsByTagName("li")[i].remove();
        }
    }

    for (let i = 1; i <= firstWeekDayofMonth; i++) {
        let $li = document.createElement("li");

        $li.classList = "numbered-date placeholder-day";
        $li.textContent = "";

        $days.appendChild($li);
    }

    for (let i = 1; i <= numberOfDaysInMonth; i++) {
        let $li = document.createElement("li");

        if (currentDayIndex == i && currentMonthIndex == initDate.getMonth() && currentYear == initDate.getUTCFullYear()) {
            let $span = document.createElement("strong");
            $span.textContent = i;
            $span.classList = "active bg-dark text-white p-2 rounded-pill rounded-4";

            $li.appendChild($span);
        } else {
            $li.textContent = i;
        }

        $li.classList = "numbered-date";

        $days.appendChild($li);
    }
}

function setCalendarMonthYear(month, year) {
    const $monthYear = document.getElementById("month-year");

    if ($monthYear.getElementsByClassName("month-year-text").length > 0) {
        $monthYear.getElementsByClassName("month-year-text")[0].remove();
    }

    const $li = document.createElement("li"),
        $br = document.createElement("br"),
        $span = document.createElement("span");

    $li.classList = "month-year-text";
    $li.textContent = month;

    $span.classList = "fs-6";
    $span.textContent = year;

    $li.appendChild($br);
    $li.appendChild($span);
    $monthYear.appendChild($li);
}

function selectNextCalendarMonth(monthIndex, year, next) {
    var selectedMonth,
        selectedYear;

    if (monthIndex == 11 && !!next) {
        selectedYear = year + 1;
        selectedMonth = 0;
    } else if (monthIndex == 0 && !next) {
        selectedYear = year - 1;
        selectedMonth = 11;
    } else if (!next) {
        selectedYear = year;
        selectedMonth = monthIndex - 1;
    } else {
        selectedYear = year;
        selectedMonth = monthIndex + 1;
    }

    currentMonthIndex = selectedMonth;
    currentMonth = allMonths[currentMonthIndex];
    currentYear = selectedYear;

    setCalendarMonthYear(currentMonth, currentYear);
    createDaysForMonth(currentMonthIndex, currentYear);
}

function bindings() {
    document.getElementById("month-year").getElementsByClassName('prev')[0].addEventListener("click", function () {
        selectNextCalendarMonth(currentMonthIndex, currentYear, false);
        createDaysForMonth(currentMonthIndex, currentYear);
    });
    document.getElementById("month-year").getElementsByClassName('next')[0].addEventListener("click", function () {
        selectNextCalendarMonth(currentMonthIndex, currentYear, true);
        createDaysForMonth(currentMonthIndex, currentYear);
    });
}

(function () {
    document.addEventListener("DOMContentLoaded", function () {
        setCalendarMonthYear(currentMonth, currentYear);
        createDaysForMonth(currentMonthIndex, currentYear);
        bindings();
    });
})()