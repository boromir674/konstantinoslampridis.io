

# [Choice] Node.js version (use -bookworm, or -bullseye variants on local arm64/Apple Silicon): 20, 18, 16, 20-bookworm, 18-bookworm, 16-bookworm, 20-bullseye, 18-bullseye, 16-bullseye, 20-buster, 18-buster, 16-buster
# mcr.microsoft.com/devcontainers/typescript-node:0.205.2-16-bullseye

ARG VARIANT=18
FROM mcr.microsoft.com/devcontainers/javascript-node:1-${VARIANT}

# See https://github.com/devcontainers/images/blob/main/src/typescript-node/history/0.205.2.md#variant-16-bullseye
# for the architecture of the image and a catalog of tools installed

# RUN useradd -ms /bin/bash vscode
# USER vscode

# Install tslint, typescript. eslint is installed by javascript image
ARG NODE_MODULES="tslint-to-eslint-config typescript"
RUN su node -c "umask 0002 && npm install -g ${NODE_MODULES}" \
    && npm cache clean --force > /dev/null 2>&1

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node packages
# RUN su node -c "npm install -g <your-package-list -here>"
