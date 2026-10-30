require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");
const {
	getBookings,
	createBooking,
	getBookingById,
	updateBooking,
	deleteBooking,
} = require("./dao/bookingDao");
const { validateBooking } = require("./functions/validation");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.json({ message: "Hotel Auroriel API is running" });
});

app.post("/bookings", async (req, res) => {
	const errors = validateBooking(req.body);

	if (errors.length > 0) {
		return res.status(400).json({ message: errors.join(" "), errors });
	}

	try {
		const id = await createBooking(req.body);
		const booking = await getBookingById(id);
		res.status(201).json(booking);
	} catch (error) {
		console.error("Could not create booking:", error.message);
		res.status(500).json({ message: "Something went wrong. Please try again." });
	}
});

app.get("/bookings/:id", async (req, res) => {
	const id = Number(req.params.id);

	if (!Number.isInteger(id) || id < 1) {
		return res.status(400).json({ message: "Booking id must be a positive whole number." });
	}

	try {
		const booking = await getBookingById(id);

		if (!booking) {
			return res.status(404).json({ message: `Booking ${id} was not found.` });
		}

		res.json(booking);
	} catch (error) {
		console.error("Could not get booking:", error.message);
		res.status(500).json({ message: "Something went wrong. Please try again." });
	}
});

app.get("/admin-secret-bookings", async (req, res) => {
	try {
		const bookings = await getBookings();
		res.json(bookings);
	} catch (error) {
		console.error("Could not get bookings:", error.message);
		res.status(500).json({ message: "Something went wrong. Please try again." });
	}
});

app.put("/admin-secret-bookings/:id", async (req, res) => {
	const id = Number(req.params.id);

	if (!Number.isInteger(id) || id < 1) {
		return res.status(400).json({ message: "Booking id must be a positive whole number." });
	}

	const errors = validateBooking(req.body);

	if (errors.length > 0) {
		return res.status(400).json({ message: errors.join(" "), errors });
	}

	try {
		const updatedRows = await updateBooking(id, req.body);

		if (updatedRows === 0) {
			return res.status(404).json({ message: `Booking ${id} was not found.` });
		}

		const booking = await getBookingById(id);
		res.json(booking);
	} catch (error) {
		console.error("Could not update booking:", error.message);
		res.status(500).json({ message: "Something went wrong. Please try again." });
	}
});

app.delete("/admin-secret-bookings/:id", async (req, res) => {
	const id = Number(req.params.id);

	if (!Number.isInteger(id) || id < 1) {
		return res.status(400).json({ message: "Booking id must be a positive whole number." });
	}

	try {
		const deletedRows = await deleteBooking(id);

		if (deletedRows === 0) {
			return res.status(404).json({ message: `Booking ${id} was not found.` });
		}

		res.json({ message: `Booking ${id} was deleted.` });
	} catch (error) {
		console.error("Could not delete booking:", error.message);
		res.status(500).json({ message: "Something went wrong. Please try again." });
	}
});

app.listen(PORT, async () => {
	console.log(`Server running on http://localhost:${PORT}`);

	try {
		const connection = await pool.getConnection();
		connection.release();
		console.log("Connected to MySQL");
	} catch (error) {
		console.error("Could not connect to MySQL:", error.message);
	}
});
