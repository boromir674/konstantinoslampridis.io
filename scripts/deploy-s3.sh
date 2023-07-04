#!/bin/sh

# This script uploads one or more file/folder paths to an AWS S3 bucket.
# Usage: ./s3_upload.sh [-d <destination>] <file/folder path(s)> [<S3 bucket>]
#        ./s3_upload.sh -h

# Set default values for options
dest=""
bucket="${SSG_S3_BUCKET}"

# Define usage function
usage() {
  echo "Usage: ./s3_upload.sh [-d <destination>] <file/folder path(s)> [<S3 bucket>]"
  echo "       ./s3_upload.sh -h"
  echo ""
  echo "Options:"
  echo "  -d <destination>   Destination path in S3 bucket"
  echo "  -h, --help         Show this help message"
  echo ""
  echo "If <S3 bucket> is not provided, the SSG_S3_BUCKET environment variable will be used as a fallback."
}

# Parse command-line arguments
while [ $# -gt 0 ]; do
  case "$1" in
    -d )
      dest="$2"
      shift
      shift
      ;;
    -h | --help )
      usage
      exit 0
      ;;
    -* )
      echo "Invalid option: $1" 1>&2
      exit 1
      ;;
    * )
      if [ -z "$bucket" ]; then
        bucket="$1"
      else
        paths="$paths $1"
      fi
      shift
      ;;
  esac
done

# Check for required arguments
if [ -z "$paths" ] || [ -z "$bucket" ]; then
  usage
  exit 1
fi

# Upload files/folders to S3 bucket
for path in $paths; do
  if [ "$path" != "$dest" ]; then
    aws s3 cp --recursive "$path" "s3://$bucket${dest:+/$dest/}"
  fi
done
