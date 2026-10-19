const ROOM_TYPES = ["Single", "Double"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+\-\s]+$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isFilled(value) {
	return typeof value === "string" && value.trim() !== "";
}

function isValidDate(value) {
	if (typeof value !== "string" || !DATE_PATTERN.test(value)) {
		return false;
	}

	const date = new Date(value);
	return !isNaN(date) && date.toISOString().startsWith(value);
}

function validateBooking(booking = {}) {
	const errors = [];

	if (!ROOM_TYPES.includes(booking.room_type)) {
		errors.push("Room type must be Single or Double.");
	}

	if (!isFilled(booking.guest_name)) {
		errors.push("Name is required.");
	} else if (booking.guest_name.length > 100) {
		errors.push("Name can be at most 100 characters.");
	}

	if (!isFilled(booking.guest_email)) {
		errors.push("Email is required.");
	} else if (booking.guest_email.length > 150 || !EMAIL_PATTERN.test(booking.guest_email)) {
		errors.push("Email must be a valid email address.");
	}

	if (!isFilled(booking.guest_phone)) {
		errors.push("Phone number is required.");
	} else if (booking.guest_phone.length > 30 || !PHONE_PATTERN.test(booking.guest_phone)) {
		errors.push("Phone number can only contain digits, spaces, + and -.");
	}

	const checkInIsValid = isValidDate(booking.check_in);
	const checkOutIsValid = isValidDate(booking.check_out);

	if (!checkInIsValid) {
		errors.push("Check-in must be a valid date (YYYY-MM-DD).");
	}

	if (!checkOutIsValid) {
		errors.push("Check-out must be a valid date (YYYY-MM-DD).");
	}

	if (checkInIsValid && checkOutIsValid && booking.check_out <= booking.check_in) {
		errors.push("Check-out must be after check-in.");
	}

	return errors;
}

module.exports = { validateBooking };
