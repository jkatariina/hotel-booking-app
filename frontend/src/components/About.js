function About() {
	return (
		<section id="about" className="container section about">
			<div className="about-text">
				<span className="eyebrow">About us</span>
				<h2>A quiet place in the north</h2>
				<p>
					Hotel Auroriel is a small hotel made for slow days and clear winter nights. Every room is
					simple, warm and quiet.
				</p>
				<p>
					In the dark season you can often see the northern lights right outside. In summer, the
					midnight sun takes over.
				</p>
			</div>
			<img
				src="/images/hotell.jpg"
				alt="Hotel Auroriel entrance in the snow at sunset"
				className="about-image"
			/>
		</section>
	);
}

export default About;
