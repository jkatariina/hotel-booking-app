import { useState } from "react";
import RoomCard from "./components/RoomCard";

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

	return (
		<main>
			<h1>Hotel Auroriel</h1>
			<section id="rooms">
				<h2>Choose your room</h2>
				<p>Two room types. Tap a room to book it.</p>
				{ROOMS.map((room) => (
					<RoomCard key={room.type} room={room} onSelect={setSelectedRoom} />
				))}
			</section>
			{selectedRoom && <p>Selected room: {selectedRoom}</p>}
		</main>
	);
}

export default App;
