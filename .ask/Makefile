ASK_VERSION := "0.0.5"

DOCKER_SWARM_STACK_NAME := $(shell cat .ask/NAME)

MAKEFILE_PATH := ".ask/Makefile"

# TODO: https://ask-ell.atlassian.net/browse/ASK-3
# packageManager := docker run -it --user=node --rm -v $(PWD):/home/node/workspace --workdir /home/node/workspace node:20 npm
packageManager := npm

.PHONY: help
# Show help
help:
	@cat $(MAKEFILE_LIST) | docker run --rm -i xanders/make-help

.PHONY: reload-makefile
# Reload Makefile from latest Ask version
reload-makefile:
	curl -o $(MAKEFILE_PATH) https://raw.githubusercontent.com/ask-ell/ask/refs/heads/release/types/node/Makefile

.PHONY: requirements-get
# Get requirements
requirements-get:
	@echo "Requirements"
	@echo "Make : https://www.gnu.org/software/make/manual/make.html"
	@echo "Node : https://nodejs.org/"
	@echo "NPM : https://www.npmjs.com/"
	@echo "Docker : https://docker.com/"

.ask/secrets.json:
	cp -r .ask/secrets.sample.json .ask/secrets.json

.PHONY: install
# Install dependencies
install:
	$(packageManager) install
	date > node_modules/last_install

node_modules/last_install:
	@make -f $(MAKEFILE_PATH) install

.PHONY: build
# Build project
build: node_modules/last_install
	$(packageManager) run build
	mkdir -p .ask/build
	date > .ask/build/last_build

.ask/build/last_build:
	@make -f $(MAKEFILE_PATH) build

.PHONY: serve
# Run services in development mode
serve: .ask/secrets.json node_modules/last_install
	killall webpack || true
	$(packageManager) run start:dev

.PHONY: format
# Format project
format:
	$(packageManager) run format

.PHONY: lint
# Format project
lint:
	$(packageManager) run lint

.PHONY: test
# Run tests
test: node_modules/last_install
	$(packageManager) run test

.PHONY: test-watch
# Run tests in watch mode
test-watch: node_modules/last_install
	$(packageManager) run test:watch

.PHONY: clean
# Stop and clean services
clean:
	killall webpack || true
	$(packageManager) run nx reset

.PHONY: deploy
deploy:
	docker stack deploy -c .ask/swarm.yml $(DOCKER_SWARM_STACK_NAME)

.PHONY: undeploy
undeploy:
	docker stack rm $(DOCKER_SWARM_STACK_NAME)