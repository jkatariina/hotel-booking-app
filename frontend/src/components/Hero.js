function Hero() {
	return (
		<section className="hero">
			<img
				src="/images/header.jpg"
				alt="Lounge with a fireplace and a view of snowy mountains"
				className="hero-image"
			/>
			<div className="container hero-content">
				<span className="hero-eyebrow">Swedish Lapland</span>
				<h1>Sleep under the northern lights</h1>
				<p>A small hotel far up north, with quiet rooms and dark skies. Book your stay directly with us.</p>
				<div className="hero-actions">
					<a href="#rooms" className="button-light">
						See our rooms
					</a>
					<a href="#about" className="button-outline">
						About the hotel
					</a>
				</div>
			</div>
		</section>
	);
}

export default Hero;
