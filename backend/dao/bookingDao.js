const pool = require("../db");

async function getBookings() {
	const [rows] = await pool.query("SELECT * FROM bookings ORDER BY check_in");
	return rows;
}

async function getBookingById(id) {
	const [rows] = await pool.query("SELECT * FROM bookings WHERE id = ?", [id]);
	return rows[0];
}

async function createBooking(booking) {
	const [result] = await pool.query(
		"INSERT INTO bookings (room_type, guest_name, guest_email, guest_phone, check_in, check_out) VALUES (?, ?, ?, ?, ?, ?)",
		[
			booking.room_type,
			booking.guest_name,
			booking.guest_email,
			booking.guest_phone,
			booking.check_in,
			booking.check_out,
		]
	);
	return result.insertId;
}

async function updateBooking(id, booking) {
	const [result] = await pool.query(
		"UPDATE bookings SET room_type = ?, guest_name = ?, guest_email = ?, guest_phone = ?, check_in = ?, check_out = ? WHERE id = ?",
		[
			booking.room_type,
			booking.guest_name,
			booking.guest_email,
			booking.guest_phone,
			booking.check_in,
			booking.check_out,
			id,
		]
	);
	return result.affectedRows;
}

async function deleteBooking(id) {
	const [result] = await pool.query("DELETE FROM bookings WHERE id = ?", [id]);
	return result.affectedRows;
}

module.exports = {
	getBookings,
	getBookingById,
	createBooking,
	updateBooking,
	deleteBooking,
};
