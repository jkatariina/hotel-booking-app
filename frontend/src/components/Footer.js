function Footer({ onNavigate }) {
	return (
		<footer className="site-footer">
			<div className="container footer-inner">
				<a href="/" className="footer-brand">
					Hotel Auroriel
				</a>
				<nav aria-label="Footer" className="footer-nav">
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
				<span>© 2026 Hotel Auroriel</span>
			</div>
		</footer>
	);
}

export default Footer;
