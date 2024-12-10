/*function isValidDate(day, month, year) {
	day = Number(day);
	month = Number(month);
	year = Number(year);

	const date = new Date(year, month - 1, day); // month is 0-indexed
	return (
		date.getDate() == day &&
		date.getMonth() == month - 1 &&
		date.getFullYear() == year
	);
}

function test_int(data1, data2, data3) {
	birthDay = Number(data1);
	birthMonth = Number(data2);
	birthYear = Number(data3);
	if (isNaN(data1)) {
		return 0;
	} else if (isNaN(data2)) {
		return 0;
	} else if (isNaN(data3)) {
		return 0;
	} else {
		console.log("Check test_int passed!");
		return birthDay && birthMonth && birthYear;
	}
}

function calculateAge(birthDay, birthMonth, birthYear) {
	console.log(
		"calculateAge - " + birthDay + " " + birthMonth + " " + birthYear
	);
	if (!isValidDate(birthDay, birthMonth, birthYear)) {
		test_int(birthDay, birthMonth, birthYear);
		console.log("error");

		let errorMessage = "Invalid date: ";

		if (result.days < 1 || result.days > 31) {
			errorMessage += `Day is out of range (1-31).`;
			console.log(errorMessage);
			document.getElementById("dayError").textContent = "Day out of range";
			document.getElementById("dayError").style.display = "block";
			document.getElementById("day").required = true;
			return null;
		}
		if (result.months < 1 || result.months > 12) {
			errorMessage += `Month is out of range (1-12).`;
			console.log(errorMessage);
			document.getElementById("monthError").textContent = "Month out of range";
			document.getElementById("monthError").style.display = "block";
			document.getElementById("month").required = true;
			return null;
		}
	}

	const today = new Date();
	const birthDate = new Date(birthYear, birthMonth - 1, birthDay); // Month is 0-indexed

	let years = today.getFullYear() - birthDate.getFullYear();
	let months = today.getMonth() - birthDate.getMonth();
	let days = today.getDate() - birthDate.getDate();

	// If the months < 0, subtract a year and add 12 months
	if (months < 0) {
		years--;
		months += 12;
	}

	// If the day < 0, subtract a month and add the appropriate number of days
	if (days < 0) {
		months--;
		const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0); // Last day of the previous month
		days += prevMonth.getDate(); // Adjust the days
	}

	// Return the results
	return {
		years: years,
		months: months,
		days: days,
	};
}

function startCalc() {
	console.log("Calculation started!");

	let birthDay = document.getElementById("day").value;
	let birthMonth = document.getElementById("month").value;
	let birthYear = document.getElementById("year").value;

	if (birthDay == "") {
		document.getElementById("dayError").textContent = "Required";
		document.getElementById("dayError").style.display = "block";
		document.getElementById("day").required = true;
		return;
	} else {
		document.getElementById("dayError").textContent = "";
		document.getElementById("dayError").style.display = "none";
		document.getElementById("day").required = false;
	}
	if (birthMonth == "") {
		document.getElementById("monthError").textContent = "Required";
		document.getElementById("monthError").style.display = "block";
		document.getElementById("month").required = true;
		return;
	} else {
		document.getElementById("monthError").textContent = "";
		document.getElementById("monthError").style.display = "none";
		document.getElementById("month").required = false;
	}
	if (birthYear == "") {
		document.getElementById("yearError").textContent = "Required";
		document.getElementById("yearError").style.display = "block";
		document.getElementById("year").required = true;
		return;
	} else {
		document.getElementById("yearError").textContent = "";
		document.getElementById("yearError").style.display = "none";
		document.getElementById("year").required = false;
	}

	let result = calculateAge(birthDay, birthMonth, birthYear);

	let errorMessage = "Invalid date: ";
	if (result.days < 0 || result.days > 31) {
		errorMessage += `End Day is out of range (1-31).`;
		console.log(errorMessage);
		document.getElementById("dayError").textContent = "Day out of range";
		document.getElementById("dayError").style.display = "block";
		document.getElementById("day").required = true;
		return null;
	}
	if (result.months < 0 || result.months > 12) {
		errorMessage += result.months + `End Month is out of range (1-12).`;
		console.log(errorMessage);
		document.getElementById("monthError").textContent = "Month out of range";
		document.getElementById("monthError").style.display = "block";
		document.getElementById("month").required = true;
		return null;
	}
	if (result.years < 0 || result.years > 120) {
		console.log(result.years);
		errorMessage += `End Year is out of range.`;
		console.log(errorMessage);
		document.getElementById("yearError").textContent = "Year out of range";
		document.getElementById("yearError").style.display = "block";
		document.getElementById("year").required = true;
		return null;
	}

	document.getElementById("dayResult").textContent = result.days;
	document.getElementById("monthResult").textContent = result.months;
	document.getElementById("yearResult").textContent = result.years;
}*/

// ---------------------------------------------

function calculate() {
	const DateTime = luxon.DateTime;

	let inputDate = getInput();

	let isValidDate = validateDate(
		testInt(inputDate.birthYear),
		testInt(inputDate.birthMonth),
		testInt(inputDate.birthDay)
	);

	console.log("isValidDate: ", isValidDate);
	const dt = DateTime.now();

	if (isValidDate == true) {
		let date1 = luxon.DateTime.fromISO(dt.toUTC().toISO());
		let myISO =
			inputDate.birthYear +
			"-" +
			padZeros(inputDate.birthMonth) +
			"-" +
			padZeros(inputDate.birthDay) +
			"T12:00";
		let date2 = luxon.DateTime.fromISO(myISO);

		console.log("date1 ", date1);
		console.log("date2 ", date2);

		let diff = date1
			.diff(date2, ["years", "months", "days", "hours"])
			.toObject();
		console.log("diff ", diff);

		display(diff, true);
	} else {
		document.getElementById("inputError").textContent = isValidDate;
		document.getElementById("inputError").style.display = "block";
		document.getElementsByName("input").required = true;

		display(false, false);
	}
}

function getInput() {
	let birthDay = document.getElementById("day").value;
	let birthMonth = document.getElementById("month").value;
	let birthYear = document.getElementById("year").value;
	return {
		birthDay: birthDay,
		birthMonth: birthMonth,
		birthYear: birthYear,
	};
}

function testInt(data) {
	result = Number(data);
	console.log(typeof result + " / " + result);
	if (isNaN(result)) {
		console.log("Check testInt failed!");
		return 0;
	} else {
		console.log("Check testInt passed!");
		return result;
	}
}

function validateDate(year, month, day) {
	let DateTime = luxon.DateTime;
	const dt = DateTime.fromObject({ year, month, day });

	if (day < 1 || day > getDaysInMonth(year, month)) {
		return "Please input a valid day";
	}
	if (month < 1 || month > 12) {
		return "Please input a valid month";
	}
	if (year < 1900 || year > DateTime.local().year) {
		return "Please input a valid year";
	}

	return dt.isValid;
}

function getDaysInMonth(year, month) {
	return new Date(year, month, 0).getDate();
}

function padZeros(data) {
	result = Number(data);
	if (result < 10) {
		return "0" + result;
	} else {
		return result;
	}
}

function display(data, shouldDisplay) {
	if (shouldDisplay) {
		document.getElementById("yearResult").textContent = data.years;
		document.getElementById("monthResult").textContent = data.months;
		document.getElementById("dayResult").textContent = data.days;
	} else {
		document.getElementById("yearResult").textContent = "--";
		document.getElementById("monthResult").textContent = "--";
		document.getElementById("dayResult").textContent = "--";
	}
}

const submit = document.getElementById("submit");
submit.addEventListener("click", calculate);
/*
const date1 = luxon.DateTime.fromISO("2020-09-06T12:00");
const date2 = luxon.DateTime.fromISO("2019-06-10T14:00");

const diff = date1.diff(date2, ["years", "months", "days", "hours"]);

console.log(diff.toObject());

console.log(validateDate(2023, 12, 31)); // true
console.log(validateDate(2023, 13, 1)); // false (invalid month)
console.log(validateDate(2023, 2, 29)); // false (not a leap year)
*/
