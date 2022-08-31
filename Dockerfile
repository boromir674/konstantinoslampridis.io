FROM node:16-alpine as S1


FROM S1 as S2
# RUN \
#   apk add --no-cache python3 make g++ && \
#   apk add vips-dev fftw-dev --update-cache \
#   --repository http://dl-3.alpinelinux.org/alpine/edge/community \
#   --repository http://dl-3.alpinelinux.org/alpine/edge/main \
#  && rm -fR /var/cache/apk/*

FROM S2 as S3
# RUN apk add automake autoconf libtool nasm

# RUN npm install -g gatsby-cli

FROM S3 as S4
WORKDIR /app
COPY package.json .
RUN yarn install && yarn cache clean

# Copy Code/Files
# COPY . .
FROM S4 as S5
COPY public public
COPY src src
# COPY .env .
COPY gatsby-config.ts .
COPY README.md .
COPY tsconfig.json .

ENV GATSBY_TELEMETRY_DISABLED=1

# VSCode debug ports: 9929 9230
EXPOSE 8000 9929 9230

CMD [ "develop", "-H", "0.0.0.0" ]

ENTRYPOINT [ "yarn" ]

# Dev server with hot reloading

# docker build -t me/my_app:my_tag .

# docker run -it --rm -v /data/repos/static-site-generator/:/app -p 8000:8000 -p 929:929 -p 9230:9230 --name my_container_name me/gatsby-ssg-s5

# docker run -it --rm -v .:/app -p 8000:8000 -p 929:929 -p 9230:9230 --name my_container_name me/my_app:my_tag
