/**
 * Animated Background with Interactive Blobs
 * Features:
 * - Mouse-reactive blob movement
 * - Animation timing randomization every 230 seconds
 * - Smooth CSS animations with JavaScript enhancements
 */

(function () {
	'use strict';

	// Configuration
	const CONFIG = {
		mouseInfluence: 0.25, // How much mouse affects blobs (0-1)
		randomizeInterval: 230000, // 230 seconds in milliseconds
		smoothing: 0.1, // Animation smoothing factor
	};

	// State
	let mouseX = 0;
	let mouseY = 0;
	let blobs = [];

	/**
	 * Initialize the animated background
	 */
	function init() {
		// Get all blob elements
		blobs = Array.from(document.querySelectorAll('.blob'));

		if (blobs.length === 0) {
			console.warn('No blob elements found');
			return;
		}

		// Set up mouse tracking
		setupMouseTracking();

		// Start animation loop
		requestAnimationFrame(animate);

		// Set up randomization interval
		setInterval(randomizeAnimations, CONFIG.randomizeInterval);

		// Initial randomization
		randomizeAnimations();
	}

	/**
	 * Set up mouse movement tracking
	 */
	function setupMouseTracking() {
		document.addEventListener('mousemove', (e) => {
			// Normalize mouse position to -1 to 1 range
			mouseX = (e.clientX / window.innerWidth) * 2 - 1;
			mouseY = (e.clientY / window.innerHeight) * 2 - 1;
		});
	}

	/**
	 * Animation loop for smooth mouse interaction
	 */
	function animate() {
		blobs.forEach((blob, index) => {
			// Calculate mouse influence based on blob position
			const rect = blob.getBoundingClientRect();
			const blobCenterX = rect.left + rect.width / 2;
			const blobCenterY = rect.top + rect.height / 2;

			// Distance from mouse to blob center (normalized)
			const distX = (mouseX * window.innerWidth - blobCenterX) / window.innerWidth;
			const distY = (mouseY * window.innerHeight - blobCenterY) / window.innerHeight;

			// Apply subtle movement based on mouse position
			const offsetX = distX * CONFIG.mouseInfluence * 100;
			const offsetY = distY * CONFIG.mouseInfluence * 100;

			// Get current transform or initialize
			const currentTransform = blob.style.transform || '';
			const baseTransform = currentTransform.replace(
				/translate\([^)]+\)/,
				''
			);

			// Apply smooth mouse-reactive transform
			blob.style.transform = `translate(${offsetX}px, ${offsetY}px) ${baseTransform}`;
		});

		requestAnimationFrame(animate);
	}

	/**
	 * Randomize animation timings and properties
	 */
	function randomizeAnimations() {
		blobs.forEach((blob, index) => {
			// Generate random duration (between 18-32 seconds)
			const duration = 18 + Math.random() * 14;

			// Generate random delay (0-5 seconds)
			const delay = Math.random() * 5;

			// Get the animation name from the current style
			const animationName = getComputedStyle(blob).animationName;

			// Apply new timing
			blob.style.animation = `${animationName} ${duration}s ease-in-out ${delay}s infinite`;

			// Optionally adjust blur and opacity slightly for variety
			const blur = 60 + Math.random() * 40; // 60-100px blur
			const opacity = 0.5 + Math.random() * 0.2; // 0.5-0.7 opacity

			blob.style.filter = `blur(${blur}px)`;
			blob.style.opacity = opacity;
		});

		console.log('Blob animations randomized');
	}

	/**
	 * Initialize when DOM is ready
	 */
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
