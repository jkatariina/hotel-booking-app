function RoomCard({ room, onSelect }) {
	return (
		<article className="room-card">
			<button
				type="button"
				className="room-card-image"
				aria-label={`Choose ${room.type} room`}
				onClick={() => onSelect(room.type)}
			>
				<img src={room.image} alt="" />
			</button>
			<div className="room-card-body">
				<h3>{room.type}</h3>
				<p>{room.description}</p>
				<span className="room-card-guests">{room.guests}</span>
				<button type="button" className="button" onClick={() => onSelect(room.type)}>
					Select
				</button>
			</div>
		</article>
	);
}

export default RoomCard;
