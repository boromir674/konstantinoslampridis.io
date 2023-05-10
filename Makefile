# Designed to facilitate 3 common operations
# 1. build_static_files
# 2. static_file_server
# 3. run_dev_server

# import config file named 'config.env'
# You can change the default config with `make cnf="deploy_special.env" <target>`
dpl ?= config.env
include $(dpl)
export $(shell sed 's/=.*//' $(dpl))


# HELP
# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help


# STATIC FILE GENERATOR/BUNDLER/BUILDER
builder: Dockerfile.build  ## Build an image to prepare for building/bundling the html/js/css "static" files
	docker build -f Dockerfile.build --target build -t $(BUILDER_NAME) .

# BUILD STATIC WEBSITE
build_static_files: builder  ## Build the "static" files and copy them into the 'public-container' folder
	rm -rf /data/repos/static-site-generator/public-auto/*
	docker run -v /data/repos/static-site-generator/public-auto/:/app/public/ -it --rm $(BUILDER_NAME)
	du -sh /data/repos/static-site-generator/public-auto


# INTERACTIVE SHELL
shell_in_builder:  ## Run an interactive shell into the ssg (builder) container environment
	docker build -f Dockerfile.build --target COPY_CODE -t $(BUILD_IMAGE_INSTALL_TARGET) .
	docker run -it --rm --name ssg_dummy_container_to_run_shell \
		-v /data/repos/static-site-generator/package.json:/app/package.json \
		-v /data/repos/static-site-generator/yarn.lock:/app/yarn.lock \
		$(BUILD_IMAGE_INSTALL_TARGET) bash

# COPY LOCK
copy_shell_lock:
	docker cp ssg_dummy_container_to_run_shell:/app/package.json ./package.json
	docker cp ssg_dummy_container_to_run_shell:/app/yarn.lock ./yarn.lock


# STATIC FILE SERVER
static_file_server:  ## Run a server on localhost that serves the (built) "static" files
	docker build -f Dockerfile.build --target serve_files -t $(FILE_SERVER_NAME) .
	docker run -p 9000:9000 -it --rm $(FILE_SERVER_NAME)


build_dev_server: Dockerfile.build  ## Build development server image
	docker build -f Dockerfile.build --target dev -t $(DEV_SERVER_NAME) .

# DEV SERVER
run_dev_server: build_dev_server  ## Run a development server on localhost, with "hot-reloading"
	docker run -p 8000:8000 -p 9929:9929 -p 9230:9230 -it --rm \
		-v /data/repos/static-site-generator/src:/app/src \
		-v /data/repos/static-site-generator/data.yaml:/app/data.yaml \
		$(DEV_SERVER_NAME)

# DEV ACTIVITIES
## update caniuse-lite with browsers DB from Browserslist config.
update_browserslist: build_dev_server
	docker run -v /data/repos/static-site-generator/package.json:/app/package.json -it --rm $(DEV_SERVER_NAME) sh
# update-browserslist-db@latest

## DEV SHELL
dev_shell:  ## Run an interactive shell into the ssg (builder) container environment
	docker build -f Dockerfile.build --target COPY_CODE -t ssg-dev-im .
	docker run -it --rm --name ssg-dev-container \
		-v /data/repos/static-site-generator/package.json:/app/package.json \
		ssg-dev-im sh
# -v /data/repos/static-site-generator/yarn.lock:/app/yarn.lock \


# TEST
test:  ## Run Test Suite
	docker build -f Dockerfile.build --target test -t $(TEST_IMAGE_NAME) .
	docker run -it --rm \
		-v /data/repos/static-site-generator/__tests__:/app/__tests__ \
		-v /data/repos/static-site-generator/src:/app/src \
		$(TEST_IMAGE_NAME) sh
# yarn test --verbose


# TYPE CHECK
typecheck:  ## Type Checking in Typescript
	docker build -f Dockerfile.build --target type_check -t $(TYPE_CHECK_IMAGE_NAME) .
	docker run -it --rm $(TYPE_CHECK_IMAGE_NAME)


# ESLINT
eslint:  ## Code Linting, using ESLint (Typescript)
	docker build -f Dockerfile.build --target eslint -t $(ESLINT_IMAGE_NAME) .
	docker run -it --rm $(ESLINT_IMAGE_NAME)


clean:
	docker rmi $(TYPE_CHECK_IMAGE_NAME)
	docker rmi $(ESLINT_IMAGE_NAME)
	docker rmi $(DEV_SERVER_NAME)
