# Use Node v18
FROM node:18.16.0-slim AS node_18

FROM node_18 as runtime_env
# Runtime/Application Environment
WORKDIR /app
ENV GATSBY_TELEMETRY_DISABLED=1

# RUN apt-get update -y && apt-get install -y --no-install-recommends util-linux && rm -rf /var/lib/apt/lists/*

FROM scratch AS dependencies
WORKDIR /workspace
COPY package.json .
COPY yarn.lock .

# Node BUILDER 1
# Static Site Generator / Static File Builder
# we need ONLY PROD dependencies from package.json
FROM node_18 AS prod_install
COPY --from=dependencies /workspace .
RUN yarn install --frozen-lockfile --production=true && yarn cache clean
# we avoid unintented updates to yarn.lock by using --frozen-lockfile
# this is helpful since we force the user's yarn.lock into the image
# and the build process does not know whether the lock was produced in the same env as this on

# Node BUILDER 2
# Test, List, Typecheck
# we need PROD + DEV dependencies from package.json
FROM node_18 AS dev_install
COPY --from=dependencies /workspace .
RUN yarn install --frozen-lockfile --production=false && yarn cache clean


# Code BUILDER
FROM scratch AS source
WORKDIR /app
# Copy Source: Code, Config, Readme
COPY src src
COPY gatsby-config.ts .
COPY gatsby-node.ts .
COPY tsconfig.json .
COPY babel.config.js .
COPY package.json .
COPY README.md .

# Static Files BUILDER
# FROM scratch AS static
# COPY static static


# # Provides Source, Assets, Node Modules
# FROM source AS prod_build
# # Copy PROD dependencies into /app/node_modules
# COPY --from=prod_install /node_modules node_modules
# # Copy GraphQL Build-time required Data Files
# COPY data.yaml .
# COPY data-portfolio.yml .
# # Copy Static: favicons(s), images
# COPY --from=static static static


# Env where Gatsby should (build, develop, serve) run
FROM runtime_env as gatsby_build
COPY --from=prod_install /node_modules node_modules
# Copy Source Code: Code and Assets
COPY --from=source /app .
# Copy GraphQL Build-time required Data Files
COPY data.yaml .
COPY data-portfolio.yml .
# Copy Static: favicons(s), images
COPY static static
# Source is present: Code, Assets, and Static


# PROD CASE 2: Build minified bundle of static html/css/js files and servewith simple file server
FROM gatsby_build AS serve_files
COPY scripts/generate-robots-file.sh .
COPY scripts/build-production-bundle.sh .
RUN sh ./build-production-bundle.sh ./public/robots.txt
EXPOSE 9000
CMD [ "yarn", "serve", "-H", "0.0.0.0" ]
# SERVE the "static" files on localhost
# Example
# docker build -f Dockerfile.build --target serve_files -t me/file-server .
# docker run -it --rm -v /data/repos/static-site-generator/:/app -p 9000:9000 me/file-server


# PROD CASE 3: Run a hot-reload development server, with PROD dependencies

# Run development server
FROM gatsby_build AS dev_server
# VSCode debug ports: 9929 9230
EXPOSE 8000 9929 9230
CMD [ "yarn", "develop", "--host", "0.0.0.0", "--verbose" ]


# BRANCH 2
# Dev Operations, Testing, Type Check, Linting

# Provides Source, Assets, Node Modules
# FROM source AS dev_build
# # Copy PROD + DEV dependencies into /app/node_modules
# COPY --from=dev_install /node_modules node_modules
# # Source (Code, Assets, Config, no Static) and Dev Dependencies


FROM runtime_env AS dev_env
COPY --from=dev_install /node_modules node_modules
# Copy Source Code: Code and Assets
COPY --from=source /app .

# Dev 1: TYPE CHECK
FROM dev_env AS type_check
CMD [ "yarn", "typecheck" ]

# Dev 2: TYPE CHECK LIVE
FROM dev_env AS type_check_live
CMD [ "yarn", "typecheck-live" ]

# Dev 3: UNIT TESTS
FROM runtime_env AS test
COPY --from=dev_install /node_modules node_modules
COPY --from=dev_install /package.json package.json
ENV NODE_ENV=test
# COPY jest.config.ts .
# COPY jest-preprocess.js .
# COPY loadershim.js .
CMD [ "yarn", "test" ]

# Dev 4: LINTING
FROM dev_env AS eslint
COPY .eslintrc.cjs .
CMD [ "yarn", "run", "eslint", "." ]

# Dev 5: STORYBOOK
FROM dev_env AS storybook
COPY .storybook/ .storybook/
ENV STORYBOOK_DISABLE_TELEMETRY=1

# we run 'storybook dev -p 6006'
CMD [ "yarn", "storybook" ]

# Example 1
# docker build -t ssg-storybook -f Dockerfile.build --target storybook .
# docker run -it --rm -p 6006:6006 ssg-storybook




# PROD CASE 1: Build minified bundle of static html/css/js files
# BUILD (bundle) into "static" files ready to serve. Static files include
# minified code (ie webpack html/css/js bundle) built on server (SSR) for the
# content to display, but also site 'metadata' such as sitemap.xml, robots.txt
FROM gatsby_build as build_prod_bundle
COPY scripts/generate-robots-file.sh .
COPY scripts/build-production-bundle.sh .
CMD [ "sh", "/app/build-production-bundle.sh", "/app/public/robots.txt" ]
# ENTRYPOINT [ "sh", "/app/build-production-bundle.sh", "/app/public/robots.txt" ]
