import { useCallback, useEffect, useState } from "react";
import { fetchData } from "../functions/fetchData";

function AdminPage() {
	const [bookings, setBookings] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");

	const loadBookings = useCallback(async () => {
		try {
			const data = await fetchData("admin-secret-bookings");
			setBookings(data);
			setErrorMessage("");
		} catch (error) {
			if (error instanceof TypeError) {
				setErrorMessage("Could not reach the server. Please try again later.");
			} else {
				setErrorMessage(error.message);
			}
		}
	}, []);

	useEffect(() => {
		loadBookings();
	}, [loadBookings]);

	return (
		<main className="container section admin">
			<div className="section-heading">
				<span className="eyebrow">Admin</span>
				<h1>Bookings</h1>
				<p>{bookings.length} bookings</p>
			</div>

			{errorMessage && (
				<p className="form-error" role="alert">
					{errorMessage}
				</p>
			)}

			<div className="table-wrapper">
				<table className="admin-table">
					<thead>
						<tr>
							<th>#</th>
							<th>Room</th>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Check-in</th>
							<th>Check-out</th>
						</tr>
					</thead>
					<tbody>
						{bookings.map((booking) => (
							<tr key={booking.id}>
								<td>{booking.id}</td>
								<td>{booking.room_type}</td>
								<td>{booking.guest_name}</td>
								<td>{booking.guest_email}</td>
								<td>{booking.guest_phone}</td>
								<td>{booking.check_in}</td>
								<td>{booking.check_out}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</main>
	);
}

export default AdminPage;
