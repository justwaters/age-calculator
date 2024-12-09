function isValidDate(day, month, year) {
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
	result1 = Number(data1);
	result2 = Number(data2);
	result3 = Number(data3);
	if (isNaN(data1)) {
		return 0;
	} else if (isNaN(data2)) {
		return 0;
	} else if (isNaN(data3)) {
		return 0;
	} else {
		return result1 && result2 && result3;
	}
}

function calculateAge(birthDay, birthMonth, birthYear) {
	if (isValidDate(birthDay, birthMonth, birthYear)) {
		console.log(typeof birthDay);
		test_int(birthDay, birthMonth, birthYear);

		console.log("error");

		let errorMessage = "Invalid date: ";
		if (birthDay < 1 || birthDay > 31) {
			errorMessage += `Day ${birthDay} is out of range (1-31).`;
			console.log(errorMessage);
			return null;
		}
		if (birthMonth < 1 || birthMonth > 12) {
			errorMessage += `Month ${birthMonth} is out of range (1-12).`;
			console.log(errorMessage);
			return null;
		}
		if (birthYear < 1900 || birthYear > new Date().getFullYear()) {
			errorMessage += `Year ${birthYear} is out of range.`;
			console.log(errorMessage);
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

	document.getElementById("dayResult").textContent = result.days;
	document.getElementById("monthResult").textContent = result.months;
	document.getElementById("yearResult").textContent = result.years;
}

const submit = document
	.getElementById("submit")
	.addEventListener("click", startCalc);
