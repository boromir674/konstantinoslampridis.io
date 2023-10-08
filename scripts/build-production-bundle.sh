#!/usr/local/bin/env bash

set -e

robots_file_destination_file_path=$1

yarn build

rm public/sitemap-index.xml
mv public/sitemap-0.xml public/sitemap.xml

./generate-robots-file.sh ${robots_file_destination_file_path}
