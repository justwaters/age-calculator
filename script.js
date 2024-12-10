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
		display(isValidDate, false);
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
		return "day";
	}
	if (month < 1 || month > 12) {
		return "month";
	}
	if (year < 1900 || year > DateTime.local().year) {
		return "year";
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

		document.getElementById("inputError").style.display = "none";

		document.getElementById("day").required = false;
		document.getElementById("month").required = false;
		document.getElementById("year").required = false;
	} else {
		document.getElementById("yearResult").textContent = "--";
		document.getElementById("monthResult").textContent = "--";
		document.getElementById("dayResult").textContent = "--";

		if (data == "day") {
			document.getElementById("inputError").textContent =
				"Please input a valid day";
			document.getElementById("inputError").style.display = "block";

			document.getElementById("day").required = true;
		} else {
			document.getElementById("day").required = false;
		}

		if (data == "month") {
			document.getElementById("inputError").textContent =
				"Please input a valid month";
			document.getElementById("inputError").style.display = "block";

			document.getElementById("month").required = true;
		} else {
			document.getElementById("month").required = false;
		}

		if (data == "year") {
			document.getElementById("inputError").textContent =
				"Please input a valid year";
			document.getElementById("inputError").style.display = "block";

			document.getElementById("year").required = true;
		} else {
			document.getElementById("year").required = false;
		}
	}
}

const submit = document.getElementById("submit");
submit.addEventListener("click", calculate);
