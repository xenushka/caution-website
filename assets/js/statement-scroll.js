// Statement Section Scroll-Locked Animation
// Continuous scroll effect: texts slide up naturally as user scrolls

(function() {
	'use strict';

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

	function init() {
		const section = document.querySelector('.statement-section');
		const container = section?.querySelector('.container');
		const firstText = section?.querySelector('[data-scroll-text="first"]');
		const secondText = section?.querySelector('[data-scroll-text="second"]');

		if (!section || !container || !firstText || !secondText) return;

		let ticking = false;

		// Easing function for smooth deceleration
		function easeOutCubic(x) {
			return 1 - Math.pow(1 - x, 3);
		}

		function onScroll() {
			if (!ticking) {
				requestAnimationFrame(update);
				ticking = true;
			}
		}

		function update() {
			const rect = section.getBoundingClientRect();
			const sectionHeight = section.offsetHeight;
			const windowHeight = window.innerHeight;

			// Progress through section: 0 at start, 1 at end
			const progress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - windowHeight)));

			// Pin container when section is in view
			if (rect.top <= 0 && rect.bottom > windowHeight) {
				container.classList.add('pinned');
			} else {
				container.classList.remove('pinned');
			}

			// PHASE 1: Initial appearance (0-15% of scroll)
			// First text slides up from below with blur fade
			const phase1Progress = Math.min(progress / 0.15, 1);
			const phase1Eased = easeOutCubic(phase1Progress);

			// PHASE 2: pt1 exits, pt2 enters (20-50% of scroll)
			// CONTROL: Change phase2Start to control when pt2 starts appearing (lower = earlier)
			const phase2Start = 0.20;  // pt2 starts sliding up at 20% scroll progress
			const phase2End = 0.50;    // pt2 reaches center at 50% scroll progress
			const phase2Progress = Math.max(0, Math.min(1, (progress - phase2Start) / (phase2End - phase2Start)));

			// PHASE 3: Pause zone (50-70% of scroll)
			// CONTROL: Adjust these values to control pause duration
			const phase3Start = 0.50;  // pt2 pauses at center at 50% scroll progress
			const phase3End = 0.70;    // pause ends at 70% scroll progress

			// PHASE 4: Final exit (70-100% of scroll)
			const phase4Start = 0.70;
			const phase4Progress = Math.max(0, Math.min(1, (progress - phase4Start) / (1 - phase4Start)));

			// Calculate positions
			// CONTROL: Change slideDistance multiplier to control speed (lower = slower, more overlap)
			const slideDistance = windowHeight * 0.8;  // Reduced from 1.5 for slower movement

			// First text: Initial appearance with blur, then continuous slide up
			if (progress < 0.15) {
				// Still in phase 1 - initial blur fade entrance
				const initialOffset = 100; // Start 100px below
				const yOffset = initialOffset * (1 - phase1Eased);
				const blur = 8 * (1 - phase1Eased); // Blur from 8px to 0
				const opacity = phase1Eased;

				firstText.style.transform = `translateY(${yOffset}px)`;
				firstText.style.filter = `blur(${blur}px)`;
				firstText.style.opacity = opacity;
			} else if (progress < phase3Start) {
				// Phase 2: pt1 slides up and fades out
				const fadeOutStart = 0.3;  // pt1 starts fading at 30% of phase2
				const fadeProgress = Math.max(0, (phase2Progress - fadeOutStart) / (1 - fadeOutStart));
				const firstTextY = -slideDistance * phase2Progress;
				const firstTextOpacity = Math.max(0, 1 - (fadeProgress * 1.2));

				firstText.style.transform = `translateY(${firstTextY}px)`;
				firstText.style.filter = 'blur(0px)';
				firstText.style.opacity = firstTextOpacity;
			} else {
				// Phase 3 & 4: pt1 is fully gone
				firstText.style.opacity = '0';
			}

			// Second text: Slides up from below, pauses at center (same position as pt1), then continues up
			// Note: pt2 has CSS transform: translateY(-50%) for vertical centering, so we account for that
			if (progress < phase2Start) {
				// Before phase 2: hidden below
				secondText.style.transform = `translateY(calc(-50% + ${slideDistance}px))`;
				secondText.style.opacity = '0';
			} else if (progress < phase3Start) {
				// Phase 2: Slide up to center (accounting for the -50% CSS offset)
				const secondTextY = slideDistance - (slideDistance * phase2Progress);
				// CONTROL: Change fadeInDuration to control how quickly pt2 fades in (lower = faster)
				const fadeInDuration = 0.3;  // pt2 fades in over first 30% of phase 2
				const secondTextOpacity = Math.min(1, phase2Progress / fadeInDuration);

				secondText.style.transform = `translateY(calc(-50% + ${secondTextY}px))`;
				secondText.style.opacity = secondTextOpacity;
			} else if (progress < phase4Start) {
				// Phase 3: PAUSE at exact center position (maintaining -50% offset = same position as pt1)
				secondText.style.transform = `translateY(-50%)`;
				secondText.style.opacity = '1';
			} else {
				// Phase 4: Continue scrolling up and exit off the top
				const exitDistance = slideDistance * phase4Progress;
				secondText.style.transform = `translateY(calc(-50% - ${exitDistance}px))`;
				// Fade out during last 40% of exit
				const exitFadeStart = 0.6;
				const exitFadeProgress = Math.max(0, (phase4Progress - exitFadeStart) / (1 - exitFadeStart));
				secondText.style.opacity = Math.max(0, 1 - exitFadeProgress);
			}

			ticking = false;
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		update(); // Initial state
	}
})();
