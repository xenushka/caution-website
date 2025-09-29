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
	// TODO: useful for news article carousel
	// fetch('../assets/js/carousel-items.json')
	// .then(response => response.json())
	// .then(data => {
	// 	createCarouselItems(data);
	// 	initializeCarousel();
	// })
	// .catch(error => console.error('Error loading JSON:', error));
});

function createCarouselItems(items) {
	const carousel = document.querySelector("#carousel");
	items.forEach((item) => {
		const itemDiv = document.createElement("div");
		itemDiv.className = "carousel-item";

		const link = document.createElement("a");
		link.className = "carousel-link";
		link.href = item.link;
		link.target = "_blank";
		link.rel = "noopener noreferrer";
		const linkText = document.createTextNode(item.description);

		link.appendChild(linkText);
		itemDiv.appendChild(link);
		carousel.appendChild(itemDiv);
	});
}

function initializeCarousel() {
	const carousel = document.querySelector("#carousel");
	const items = Array.from(carousel.children);
	const totalItems = items.length;
	const middleIndex = Math.floor(totalItems / 2);
	let currentIndex = -middleIndex;

	function cycleItems() {
		currentIndex = (currentIndex - 1 + totalItems) % totalItems;
		updateCarouselItems();
	}

	function updateCarouselItems() {
		items.forEach((item, index) => {
			let positionIndex = (currentIndex + index + totalItems) % totalItems;
			let offset = positionIndex - middleIndex;
			item.style.transform = `translateY(${offset * 100}%)`;
			item.classList.toggle("active", positionIndex === middleIndex);
			item.style.visibility = "visible";
		});
	}

	updateCarouselItems();
	setInterval(cycleItems, 7000);
}

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
