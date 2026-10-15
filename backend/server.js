require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.json({ message: "Hotel Auroriel API is running" });
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
