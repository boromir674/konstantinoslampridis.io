FROM node:16-alpine as base

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
RUN yarn install && yarn cache clean

# Copy Code/Files
# COPY . .
FROM install as COPY_CODE
# COPY public public
COPY src src
# COPY .env .
COPY gatsby-config.ts .
COPY README.md .
COPY tsconfig.json .

FROM COPY_CODE as configure
ENV GATSBY_TELEMETRY_DISABLED=1


FROM configure as dev

# VSCode debug ports: 9929 9230
EXPOSE 8000 9929 9230
CMD [ "yarn", "develop", "-H", "0.0.0.0" ]


FROM configure as type_check

CMD [ "yarn", "typecheck" ]


# Dev server with hot reloading
# Example
# docker build --target dev -t me/dev-server .
# docker run -it --rm -v /data/repos/static-site-generator/:/app -p 8000:8000 -p 929:929 -p 9230:9230 me/dev-server

