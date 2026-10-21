function Header({ onNavigate }) {
	return (
		<header className="site-header">
			<div className="container header-inner">
				<a href="/" className="brand">
					Hotel Auroriel
				</a>
				<nav aria-label="Main" className="main-nav">
					<a href="#rooms" onClick={onNavigate}>
						Rooms
					</a>
					<a href="#about" onClick={onNavigate}>
						About
					</a>
					<a href="#contact" onClick={onNavigate}>
						Contact
					</a>
				</nav>
				<a href="#rooms" className="button header-button" onClick={onNavigate}>
					Book now
				</a>
			</div>
		</header>
	);
}

export default Header;
