function Header() {
	return (
		<header className="site-header">
			<div className="container header-inner">
				<a href="/" className="brand">
					Hotel Auroriel
				</a>
				<nav aria-label="Main" className="main-nav">
					<a href="#rooms">Rooms</a>
					<a href="#about">About</a>
					<a href="#contact">Contact</a>
				</nav>
				<a href="#rooms" className="button header-button">
					Book now
				</a>
			</div>
		</header>
	);
}

export default Header;
