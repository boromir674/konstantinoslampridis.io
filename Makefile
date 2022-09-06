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

build_static_files: builder  ## Build the "static" files and copy them into the 'public-container' folder
	rm -rf /data/repos/static-site-generator/public-container/*
	docker run -v /data/repos/static-site-generator/public-container/:/app/public/ -it --rm $(BUILDER_NAME)


# STATIC FILE SERVER
static_file_server:  ## Run a server on localhost that serves the (built) "static" files
	docker build -f Dockerfile.build --target serve_files -t $(FILE_SERVER_NAME) .
	docker run -p 9000:9000 -it --rm $(FILE_SERVER_NAME)


# DEV SERVER
build_dev_server: Dockerfile  ## Build development server image
	docker build --target dev -t $(DEV_SERVER_NAME) .

run_dev_server: build_dev_server  ## Run a development server on localhost, with "hot-reloading"
	docker run -v /data/repos/static-site-generator/src:/app/src -p 8000:8000 -p 929:929 -p 9230:9230 -it --rm $(DEV_SERVER_NAME)

# TYPE CHECK
typecheck:
	docker build --target type_check -t $(TYPE_CHECK_IMAGE_NAME) .
	docker run -it --rm $(TYPE_CHECK_IMAGE_NAME)


copy_lock:  ## Copy the yarn.lock produced after running `yarn install && yarn cache clean`
	docker build -f Dockerfile.build --target install -t $(BUILD_IMAGE_INSTALL_TARGET) .
	docker create -it --name ssg_dummy_container_to_copy_yarn_lock $(BUILD_IMAGE_INSTALL_TARGET) sh
	docker cp ssg_dummy_container_to_copy_yarn_lock:/app/yarn.lock /data/repos/static-site-generator/
	docker rm ssg_dummy_container_to_copy_yarn_lock
	docker rmi $(BUILD_IMAGE_INSTALL_TARGET)


clean:
	docker rmi $(TYPE_CHECK_IMAGE_NAME)