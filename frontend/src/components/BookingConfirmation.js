function BookingConfirmation({ booking, onBack }) {
	const firstName = booking.guest_name.split(" ")[0];

	return (
		<section className="confirmation">
			<div className="confirmation-heading">
				<h2>Thank you, {firstName}! Your booking has been received.</h2>
				<p>Save your booking number in case you need to contact us.</p>
			</div>

			<dl className="confirmation-details">
				<div className="confirmation-number">
					<dt>Booking number</dt>
					<dd>#{booking.id}</dd>
				</div>
				<div>
					<dt>Room type</dt>
					<dd>{booking.room_type}</dd>
				</div>
				<div>
					<dt>Check-in</dt>
					<dd>{booking.check_in}</dd>
				</div>
				<div>
					<dt>Check-out</dt>
					<dd>{booking.check_out}</dd>
				</div>
				<div>
					<dt>Email</dt>
					<dd>{booking.guest_email}</dd>
				</div>
			</dl>

			<button type="button" className="button-secondary" onClick={onBack}>
				Back to home page
			</button>
		</section>
	);
}

export default BookingConfirmation;
