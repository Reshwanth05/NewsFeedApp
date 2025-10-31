import React, { useEffect } from 'react';

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
						<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiX0u9f7o2glECNymiWjrny6FToAZOnXXruD1FoYX7jNCgK-_O8h5uYZNk4wJNxQ7VKgMobvzc4or5QkW71kVOXG8jdrjheQHUZkG7EUvEWjUGDDHdp7HVz3NvpOVfr2AviF_Jn7wwoAnfQ/s1600/ok...png" alt="NewsHub Logo" className="logo-svg" style={{ width: '54px', height: '54px' }} />
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