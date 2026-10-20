const BASE_URL = "http://localhost:5001";

export const fetchData = async (endpoint = "", method = "GET", body = null) => {
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
};
