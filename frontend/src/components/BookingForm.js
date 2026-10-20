import { useState } from "react";
import { fetchData } from "../functions/fetchData";

const getToday = () => new Date().toLocaleDateString("sv-SE");

const getNextDay = (dateString) => {
	const date = new Date(dateString);
	date.setUTCDate(date.getUTCDate() + 1);
	return date.toISOString().slice(0, 10);
};

function BookingForm({ roomType, onClose, onBooked }) {
	const [form, setForm] = useState({
		room_type: roomType,
		guest_name: "",
		guest_email: "",
		guest_phone: "",
		check_in: "",
		check_out: "",
	});

	const [errorMessage, setErrorMessage] = useState("");
	const [isSending, setIsSending] = useState(false);

	const today = getToday();
	const minCheckOut = getNextDay(form.check_in || today);

	const handleChange = (e) => {
		const { name, value } = e.target;
		const updatedForm = { ...form, [name]: value };

		if (name === "check_in" && updatedForm.check_out && updatedForm.check_out <= value) {
			updatedForm.check_out = "";
		}

		setForm(updatedForm);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage("");
		setIsSending(true);

		try {
			const booking = await fetchData("bookings", "POST", form);
			onBooked(booking);
		} catch (error) {
			if (error instanceof TypeError) {
				setErrorMessage("Could not reach the server. Please try again later.");
			} else {
				setErrorMessage(error.message);
			}
		} finally {
			setIsSending(false);
		}
	};

	return (
		<div className="booking-overlay">
			<div className="booking-dialog" role="dialog" aria-modal="true" aria-labelledby="booking-title">
				<div className="booking-header">
					<h2 id="booking-title">Book a room</h2>
					<button type="button" className="close-button" aria-label="Close" onClick={onClose}>
						<span aria-hidden="true">×</span>
					</button>
				</div>

				<form className="booking-form" onSubmit={handleSubmit}>
					<div className="field">
						<label htmlFor="room_type">Room type</label>
						<select id="room_type" name="room_type" value={form.room_type} onChange={handleChange}>
							<option value="Single">Single</option>
							<option value="Double">Double</option>
						</select>
					</div>

					<div className="field">
						<label htmlFor="guest_name">Name</label>
						<input
							id="guest_name"
							name="guest_name"
							type="text"
							placeholder="First and last name"
							value={form.guest_name}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="field-row">
						<div className="field">
							<label htmlFor="guest_email">Email</label>
							<input
								id="guest_email"
								name="guest_email"
								type="email"
								placeholder="name@example.com"
								value={form.guest_email}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="field">
							<label htmlFor="guest_phone">Phone number</label>
							<input
								id="guest_phone"
								name="guest_phone"
								type="tel"
								pattern="[0-9+\-\s]+"
								title="Digits, spaces, + and -"
								placeholder="070-123 45 67"
								value={form.guest_phone}
								onChange={handleChange}
								required
							/>
						</div>
					</div>

					<div className="field-row">
						<div className="field">
							<label htmlFor="check_in">Check-in</label>
							<input
								id="check_in"
								name="check_in"
								type="date"
								min={today}
								value={form.check_in}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="field">
							<label htmlFor="check_out">Check-out</label>
							<input
								id="check_out"
								name="check_out"
								type="date"
								min={minCheckOut}
								value={form.check_out}
								onChange={handleChange}
								required
							/>
						</div>
					</div>

					{errorMessage && (
						<p className="form-error" role="alert">
							{errorMessage}
						</p>
					)}

					<div className="form-actions">
						<button type="button" className="button-secondary" onClick={onClose}>
							Cancel
						</button>
						<button type="submit" className="button" disabled={isSending}>
							{isSending ? "Sending..." : "Send booking"}
						</button>
					</div>
					<p className="form-note">All fields are required.</p>
				</form>
			</div>
		</div>
	);
}

export default BookingForm;
