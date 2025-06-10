.PHONY: build
build:
	# Build Docker image
	docker build -t caution-co .

.PHONY: fullclean
fullclean: clean
	docker rmi caution-co || true
	docker image prune -f --filter label=stage=caution-co-builder || true

.PHONY: clean
clean:
	rm -r _site || true

_site: build
	mkdir -p _site
	docker run caution-co tar c -C /usr/share/nginx/html . | tar x -C _site

.PHONY: serve
serve: build
	# Run Docker container with listener for current dir and port mapping
	docker run --rm -p 0.0.0.0:4000:80 -it caution-co
