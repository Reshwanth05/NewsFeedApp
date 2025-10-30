import React, { useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

const Header = () => {
	useEffect(() => {
		document.title = 'NewsHub — Live';
	}, []);

	const scrollToFeed = () => {
		const el = document.querySelector('.main-content');
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	return (
		<header className="header">
			<div className="header-bleed" />
			<div className="header-content">
				<div className="logo-container">
					<div className="logo-icon" aria-hidden>
						<TrendingUp className="logo-svg" size={54} />
					</div>
					<div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
						<h1 className="logo-text">NewsHub</h1>
						<span className="live-badge" aria-hidden>LIVE</span>
					</div>
					<p className="logo-subtitle">Top stories, trending now</p>
					<button className="hero-cta" onClick={scrollToFeed} aria-label="Explore latest news">
						Explore Latest News
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;