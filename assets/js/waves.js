// Perlin Noise Implementation
class Noise {
	constructor(seed) {
		this.seed = seed || Math.random();
		this.grad3 = [
			[1, 1, 0],
			[-1, 1, 0],
			[1, -1, 0],
			[-1, -1, 0],
			[1, 0, 1],
			[-1, 0, 1],
			[1, 0, -1],
			[-1, 0, -1],
			[0, 1, 1],
			[0, -1, 1],
			[0, 1, -1],
			[0, -1, -1],
		];
		this.p = [];
		for (let i = 0; i < 256; i++) {
			this.p[i] = Math.floor(this.seededRandom() * 256);
		}
		this.perm = [];
		for (let i = 0; i < 512; i++) {
			this.perm[i] = this.p[i & 255];
		}
	}

	seededRandom() {
		const x = Math.sin(this.seed++) * 10000;
		return x - Math.floor(x);
	}

	dot(g, x, y) {
		return g[0] * x + g[1] * y;
	}

	mix(a, b, t) {
		return (1 - t) * a + t * b;
	}

	fade(t) {
		return t * t * t * (t * (t * 6 - 15) + 10);
	}

	perlin2(x, y) {
		const X = Math.floor(x) & 255;
		const Y = Math.floor(y) & 255;
		x -= Math.floor(x);
		y -= Math.floor(y);
		const u = this.fade(x);
		const v = this.fade(y);
		const A = this.perm[X] + Y;
		const AA = this.perm[A];
		const AB = this.perm[A + 1];
		const B = this.perm[X + 1] + Y;
		const BA = this.perm[B];
		const BB = this.perm[B + 1];

		return this.mix(
			this.mix(
				this.dot(this.grad3[AA % 12], x, y),
				this.dot(this.grad3[BA % 12], x - 1, y),
				u
			),
			this.mix(
				this.dot(this.grad3[AB % 12], x, y - 1),
				this.dot(this.grad3[BB % 12], x - 1, y - 1),
				u
			),
			v
		);
	}
}

// Wave Component
class AWaves extends HTMLElement {
	connectedCallback() {
		this.svg = this.querySelector(".js-svg");

		this.mouse = {
			x: -10,
			y: 0,
			lx: 0,
			ly: 0,
			sx: 0,
			sy: 0,
			v: 0,
			vs: 0,
			a: 0,
			set: false,
		};

		this.lines = [];
		this.paths = [];
		this.noise = new Noise(Math.random());

		this.setSize();
		this.setLines();
		this.bindEvents();

		requestAnimationFrame(this.tick.bind(this));
	}

	bindEvents() {
		window.addEventListener("resize", this.onResize.bind(this));
		window.addEventListener("mousemove", this.onMouseMove.bind(this));
		this.addEventListener("touchmove", this.onTouchMove.bind(this));
	}

	onResize() {
		this.setSize();
		this.setLines();
	}

	onMouseMove(e) {
		this.updateMousePosition(e.pageX, e.pageY);
	}

	onTouchMove(e) {
		e.preventDefault();
		const touch = e.touches[0];
		this.updateMousePosition(touch.clientX, touch.clientY);
	}

	updateMousePosition(x, y) {
		const { mouse } = this;

		mouse.x = x - this.bounding.left;
		mouse.y = y - this.bounding.top + window.scrollY;

		if (!mouse.set) {
			mouse.sx = mouse.x;
			mouse.sy = mouse.y;
			mouse.lx = mouse.x;
			mouse.ly = mouse.y;
			mouse.set = true;
		}
	}

	setSize() {
		this.bounding = this.getBoundingClientRect();
		this.svg.style.width = `${this.bounding.width}px`;
		this.svg.style.height = `${this.bounding.height}px`;
	}

	setLines() {
		const { width, height } = this.bounding;

		this.lines = [];

		this.paths.forEach((path) => {
			path.remove();
		});
		this.paths = [];

		const xGap = 8;
		const yGap = 10;

		const oWidth = width + 100;
		const oHeight = height + 100;

		const totalLines = Math.ceil(oWidth / xGap);
		const totalPoints = Math.ceil(oHeight / yGap);

		const xStart = (width - xGap * totalLines) / 2;
		const yStart = (height - yGap * totalPoints) / 2;

		for (let i = 0; i <= totalLines; i++) {
			const points = [];

			for (let j = 0; j <= totalPoints; j++) {
				const point = {
					x: xStart + xGap * i,
					y: yStart + yGap * j,
					wave: { x: 0, y: 0 },
					cursor: { x: 0, y: 0, vx: 0, vy: 0 },
				};

				points.push(point);
			}

			const path = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"path"
			);
			path.classList.add("a__line");
			path.classList.add("js-line");

			this.svg.appendChild(path);
			this.paths.push(path);

			this.lines.push(points);
		}
	}

	movePoints(time) {
		const { lines, mouse, noise } = this;

		lines.forEach((points) => {
			points.forEach((p) => {
				const move =
					noise.perlin2(
						(p.x + time * 0.008) * 0.003,
						(p.y + time * 0.004) * 0.002
					) * 8;
				p.wave.x = Math.cos(move) * 20;
				p.wave.y = Math.sin(move) * 8;

				const dx = p.x - mouse.sx;
				const dy = p.y - mouse.sy;
				const d = Math.hypot(dx, dy);
				const l = Math.max(200, mouse.vs);

				if (d < l) {
					const s = 1 - d / l;
					const f = Math.cos(d * 0.002) * s;

					p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.0008;
					p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.0008;
				}

				p.cursor.vx += (0 - p.cursor.x) * 0.008;
				p.cursor.vy += (0 - p.cursor.y) * 0.008;

				p.cursor.vx *= 0.92;
				p.cursor.vy *= 0.92;

				p.cursor.x += p.cursor.vx * 1.5;
				p.cursor.y += p.cursor.vy * 1.5;

				p.cursor.x = Math.min(80, Math.max(-80, p.cursor.x));
				p.cursor.y = Math.min(80, Math.max(-80, p.cursor.y));
			});
		});
	}

	moved(point, withCursorForce = true) {
		const coords = {
			x: point.x + point.wave.x + (withCursorForce ? point.cursor.x : 0),
			y: point.y + point.wave.y + (withCursorForce ? point.cursor.y : 0),
		};

		coords.x = Math.round(coords.x * 10) / 10;
		coords.y = Math.round(coords.y * 10) / 10;

		return coords;
	}

	drawLines() {
		const { lines, moved, paths } = this;

		lines.forEach((points, lIndex) => {
			let p1 = moved(points[0], false);

			let d = `M ${p1.x} ${p1.y}`;

			points.forEach((p1, pIndex) => {
				const isLast = pIndex === points.length - 1;

				p1 = moved(p1, !isLast);

				const p2 = moved(
					points[pIndex + 1] || points[points.length - 1],
					!isLast
				);

				d += `L ${p1.x} ${p1.y}`;
			});

			paths[lIndex].setAttribute("d", d);
		});
	}

	tick(time) {
		const { mouse } = this;

		mouse.sx += (mouse.x - mouse.sx) * 0.1;
		mouse.sy += (mouse.y - mouse.sy) * 0.1;

		const dx = mouse.x - mouse.lx;
		const dy = mouse.y - mouse.ly;
		const d = Math.hypot(dx, dy);

		mouse.v = d;
		mouse.vs += (d - mouse.vs) * 0.1;
		mouse.vs = Math.min(100, mouse.vs);

		mouse.lx = mouse.x;
		mouse.ly = mouse.y;

		mouse.a = Math.atan2(dy, dx);

		this.style.setProperty("--x", `${mouse.sx}px`);
		this.style.setProperty("--y", `${mouse.sy}px`);

		this.movePoints(time);
		this.drawLines();

		requestAnimationFrame(this.tick.bind(this));
	}
}

customElements.define("a-waves", AWaves);
