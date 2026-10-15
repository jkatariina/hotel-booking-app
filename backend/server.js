const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5001;

// Allow requests from the React app, which runs on another port (3000)
app.use(cors());

// Read JSON bodies so that req.body works in POST and PUT
app.use(express.json());

app.get("/", (req, res) => {
	res.json({ message: "Hotel Auroriel API is running" });
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
