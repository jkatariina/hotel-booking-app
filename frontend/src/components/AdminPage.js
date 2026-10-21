import { useCallback, useEffect, useState } from "react";
import { fetchData } from "../functions/fetchData";
import BookingForm from "./BookingForm";

function AdminPage() {
	const [bookings, setBookings] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const [editingBooking, setEditingBooking] = useState(null);

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

	const handleDelete = async (booking) => {
		if (!window.confirm(`Delete booking ${booking.id} for ${booking.guest_name}?`)) {
			return;
		}

		try {
			await fetchData(`admin-secret-bookings/${booking.id}`, "DELETE");
			await loadBookings();
		} catch (error) {
			setErrorMessage(error.message);
		}
	};

	const handleSave = async (form) => {
		await fetchData(`admin-secret-bookings/${editingBooking.id}`, "PUT", form);
		setEditingBooking(null);
		await loadBookings();
	};

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
							<th>Actions</th>
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
								<td>
									<div className="row-actions">
										<button
											type="button"
											className="button-edit"
											onClick={() => setEditingBooking(booking)}
										>
											Edit
										</button>
										<button
											type="button"
											className="button-danger"
											onClick={() => handleDelete(booking)}
										>
											Delete
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{editingBooking && (
				<BookingForm
					booking={editingBooking}
					onClose={() => setEditingBooking(null)}
					onSubmit={handleSave}
				/>
			)}
		</main>
	);
}

export default AdminPage;
