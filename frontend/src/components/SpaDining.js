function SpaDining() {
	return (
		<section id="spa-dining" className="container section spa-dining">
			<div className="section-heading">
				<span className="eyebrow">Spa &amp; restaurant</span>
				<h2>Relax and dine</h2>
			</div>
			<div className="feature-cards">
				<article className="feature-card">
					<img src="/images/spa.jpg" alt="Indoor pool and loungers by large windows with a snowy view" />
					<div className="feature-card-body">
						<h3>Spa</h3>
						<p>Indoor pool, sauna and loungers with a view of the snowy forest.</p>
					</div>
				</article>
				<article className="feature-card">
					<img src="/images/restaurang2.jpg" alt="Candlelit restaurant with a view of mountains at sunset" />
					<div className="feature-card-body">
						<h3>Restaurant</h3>
						<p>Seasonal food from the north, served by candlelight.</p>
					</div>
				</article>
			</div>
		</section>
	);
}

export default SpaDining;
