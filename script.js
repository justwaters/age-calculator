function isValidDate(day, month, year) {
	// Check if the day, month, and year form a valid date
	const date = new Date(year, month - 1, day); // month is 0-indexed
	return (
		date.getDate() === day &&
		date.getMonth() === month - 1 &&
		date.getFullYear() === year
	);
}

function calculateAge(birthDay, birthMonth, birthYear) {
	if (!isValidDate(birthDay, birthMonth, birthYear)) {
		let errorMessage = "Invalid date: ";
		if (birthMonth < 1 || birthMonth > 12) {
			errorMessage += `Month ${birthMonth} is out of range (1-12). `;
		}
		if (birthDay < 1 || birthDay > 31) {
			errorMessage += `Day ${birthDay} is out of range (1-31). `;
		}
		if (birthYear < 1000 || birthYear > new Date().getFullYear()) {
			errorMessage += `Year ${birthYear} is out of range.`;
		}
		return errorMessage;
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

	// If the current day is earlier than the birth day, subtract one month and adjust the days
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
