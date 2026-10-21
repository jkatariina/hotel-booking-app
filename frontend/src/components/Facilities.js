const FACILITIES = [
	{ title: "Breakfast", text: "Local produce every morning." },
	{ title: "Sauna", text: "Warm up after a cold evening outside." },
	{ title: "Free Wi-Fi", text: "In all rooms and common areas." },
	{ title: "Aurora alert", text: "We let you know when the sky lights up." },
];

function Facilities() {
	return (
		<section aria-label="What we offer" className="facilities">
			<div className="container facilities-list">
				{FACILITIES.map((facility) => (
					<div key={facility.title} className="facility">
						<h3>{facility.title}</h3>
						<p>{facility.text}</p>
					</div>
				))}
			</div>
		</section>
	);
}

export default Facilities;
