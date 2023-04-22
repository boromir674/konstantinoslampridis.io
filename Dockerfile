# Use Node v18
FROM node:18.16.0-slim as base

# RUN \
#   apk add --no-cache python3 make g++ && \
#   apk add vips-dev fftw-dev --update-cache \
#   --repository http://dl-3.alpinelinux.org/alpine/edge/community \
#   --repository http://dl-3.alpinelinux.org/alpine/edge/main \
#  && rm -fR /var/cache/apk/*

# RUN apk add automake autoconf libtool nasm
# RUN npm install -g gatsby-cli

FROM base as install
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile --production=false && yarn cache clean

# Copy Code/Files
FROM install as COPY_CODE

COPY src src
COPY gatsby-config.ts .
COPY README.md .
COPY tsconfig.json .
COPY .eslintrc.cjs .

FROM COPY_CODE as configure
ENV GATSBY_TELEMETRY_DISABLED=1

# Run development server
FROM configure as dev
# VSCode debug ports: 9929 9230
EXPOSE 8000 9929 9230
CMD [ "yarn", "develop", "-H", "0.0.0.0" ]


FROM configure as type_check
CMD [ "yarn", "typecheck" ]

FROM configure as test
ENV NODE_ENV=test
COPY babel.config.js .
COPY jest.config.ts .
COPY jest-preprocess.js .
COPY loadershim.js .
COPY __mocks__ __mocks__
CMD [ "yarn", "test" ]


FROM configure as eslint
CMD [ "yarn", "eslint", "." ]


# Dev server with hot reloading
# Example
# docker build --target dev -t me/dev-server .
# docker run -it --rm -v /data/repos/static-site-generator/:/app -p 8000:8000 -p 929:929 -p 9230:9230 me/dev-server

