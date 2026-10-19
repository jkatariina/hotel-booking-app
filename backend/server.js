require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");
const { createBooking, getBookingById } = require("./dao/bookingDao");
const { validateBooking } = require("./validation");

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

app.listen(PORT, async () => {
	console.log(`Server running on http://localhost:${PORT}`);

	try {
		await pool.query("SELECT 1");
		console.log("Connected to MySQL");
	} catch (error) {
		console.error("Could not connect to MySQL:", error.message);
	}
});
