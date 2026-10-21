import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import Facilities from "./components/Facilities";
import SpaDining from "./components/SpaDining";
import RoomCard from "./components/RoomCard";
import BookingForm from "./components/BookingForm";
import BookingConfirmation from "./components/BookingConfirmation";

const ROOMS = [
	{
		type: "Single",
		description: "Room for one guest with a single bed.",
		guests: "1 guest",
		image: "/images/enkelrum.jpg",
	},
	{
		type: "Double",
		description: "Room for two guests with a double bed.",
		guests: "2 guests",
		image: "/images/dubbelrum.jpg",
	},
];

function App() {
	const [selectedRoom, setSelectedRoom] = useState(null);
	const [confirmedBooking, setConfirmedBooking] = useState(null);

	const handleBooked = (booking) => {
		setSelectedRoom(null);
		setConfirmedBooking(booking);
		window.scrollTo(0, 0);
	};

	return (
		<>
			<Header />
			<main>
				{confirmedBooking ? (
					<div className="container section">
						<BookingConfirmation booking={confirmedBooking} onBack={() => setConfirmedBooking(null)} />
					</div>
				) : (
					<>
						<Hero />
						<About />
						<Facilities />
						<SpaDining />
						<section id="rooms" className="container section rooms">
							<div className="section-heading">
								<span className="eyebrow">Rooms</span>
								<h2>Choose your room</h2>
								<p>Two room types. Tap a room to book it.</p>
							</div>
							<div className="room-list">
								{ROOMS.map((room) => (
									<RoomCard key={room.type} room={room} onSelect={setSelectedRoom} />
								))}
							</div>
						</section>
					</>
				)}
				{selectedRoom && (
					<BookingForm
						roomType={selectedRoom}
						onClose={() => setSelectedRoom(null)}
						onBooked={handleBooked}
					/>
				)}
			</main>
			<Footer />
		</>
	);
}

export default App;
