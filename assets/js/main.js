// === Navbar dropdown toggle ===

document.addEventListener("DOMContentLoaded", function () {
	const dropdown = document.querySelector(".nav-dropdown");
	if (!dropdown) return;

	const toggle = dropdown.querySelector(".nav-dropdown-toggle");
	const menu = dropdown.querySelector(".nav-dropdown-menu");

	toggle.addEventListener("click", function (e) {
		e.stopPropagation();
		dropdown.classList.toggle("open");
		menu.style.display = dropdown.classList.contains("open") ? "block" : "none";
	});

	document.addEventListener("click", function () {
		dropdown.classList.remove("open");
		menu.style.display = "none";
	});
});

// === Navbar dropdown toggle ENDS === //

// === NAVBAR SCROLL STARTS === //

window.addEventListener("scroll", function () {
	const header = document.querySelector(".header-navbar");
	if (this.window.scrollY > 20) {
		header.classList.add("scrolled");
	} else {
		header.classList.remove("scrolled");
	}
});

// === NAVBAR SCROLL ENDS === //

document.addEventListener("DOMContentLoaded", function () {
	const collapsibleButton = document.querySelector(".hamburger-menu");
	const menuContent = document.querySelector(".menu-content");
	collapsibleButton.addEventListener("click", function () {
		menuContent.classList.toggle("active");
		if (menuContent.style.display === "block") {
			menuContent.style.display = "none";
		} else {
			menuContent.style.display = "block";
		}
	});

	initializeCompaniesCarousel();
});

function initializeCompaniesCarousel() {
	const slider = document.getElementById("logoSlider");

	slider.innerHTML += slider.innerHTML;

	let offset = 0;
	const speed = 0.5;

	function animate() {
		offset -= speed;
		slider.style.transform = `translateX(${offset}px)`;

		if (Math.abs(offset) >= slider.scrollWidth / 2) {
			offset = 0;
		}
		requestAnimationFrame(animate);
	}

	requestAnimationFrame(animate);
}

document.addEventListener("DOMContentLoaded", function () {
	const footer = document.querySelector("footer");
	const path = window.location.pathname;

	if (!footer) return;

	// Set hover color
	const hoverColors = {
		"/software.html": "var(--light-teal)",
		"/blog.html": "var(--pink)",
	};

	if (hoverColors[path]) {
		const style = document.createElement("style");
		style.innerHTML = `
			.footer-links a:hover {
				color: ${hoverColors[path]};
			}
		`;
		document.head.appendChild(style);
	}
});
