const BASE_URL = "http://localhost:5001";

export const fetchData = async (endpoint = "", method = "GET", body = null) => {
	try {
		const response = await fetch(`${BASE_URL}/${endpoint}`, {
			method,
			headers: { "Content-Type": "application/json" },
			body: body ? JSON.stringify(body) : null,
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message);
		}

		return data;
	} catch (error) {
		console.error(`${method} /${endpoint} failed:`, error.message);

		if (error instanceof TypeError) {
			throw new Error("Could not reach the server. Please try again later.");
		}

		if (error instanceof SyntaxError) {
			throw new Error("The server sent an invalid response. Please try again later.");
		}

		throw error;
	}
};
