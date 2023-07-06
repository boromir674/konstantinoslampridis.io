#!/bin/sh

# This script invalidates a CDN's cache
# Usage: ./invalidate-cache.sh <cloudfront_distribution_id> <space-separated-paths>
#        ./invalidate-cache.sh -h

set -e

# Define usage function
usage() {
  echo "Usage: ./invalidate-cache.sh <cloudfront_distribution_id> <space-separated-paths>"
  echo "       ./invalidate-cache.sh -h"
  echo ""
  echo "Options:"
  echo "  -h, --help     Show this help message"
  echo "  -n, --dry-run  Do a dry run without invalidating the cache"
  echo ""
  echo " Example: ./invalidate-cache.sh <cloudfront_distribution_id> /index.html"
}

# Parse command-line arguments
dry_run=false
paths=""
while [ $# -gt 0 ]; do
  case "$1" in
    -h | --help )
      usage
      exit 0
      ;;
    -n | --dry-run )
      dry_run=true
      shift
      ;;
    -* )
      echo "Invalid option: $1" 1>&2
      exit 1
      ;;
    * )
      if [ -z "$cloudfront_distribution_id" ]; then
        cloudfront_distribution_id="$1"
      else
        paths="$paths $1"
      fi
      shift
      ;;
  esac
done

# Check for required argument
if [ -z "$cloudfront_distribution_id" ]; then
  echo "[ERROR] Missing required argument: cloudfront_distribution_id" 1>&2
  usage
  exit 1
fi

# check that we have at least one path, or else exit with usage message
if [ -z "$paths" ]; then
  echo "[ERROR] Missing required argument: paths" 1>&2
  usage
  exit 1
fi

# Invalidate CDN cache
if [ "$dry_run" = true ]; then
  echo "Dry run mode: not invalidating the cache"
  for path in $paths; do
    echo "  $path"
  done
else
  echo "Invalidating CDN cache"
  aws cloudfront create-invalidation \
    --distribution-id "$cloudfront_distribution_id" \
    --paths $paths
fi

echo
echo "Done :)"
