#!/bin/sh

# This script uploads files/folders to an AWS S3 bucket based on a YAML configuration file.
# Usage: ./s3_upload.sh [--s3 <bucket>] [-n] <config.yml>
#        ./s3_upload.sh -h

set -e
# Define usage function
usage() {
  echo "Usage: ./s3_upload.sh [--s3 <bucket>] [-n] <config.yml>"
  echo "       ./s3_upload.sh -h"
  echo ""
  echo "Options:"
  echo "  --s3 <bucket>  Specify the S3 bucket to upload files to"
  echo "  -n, --dry-run  Dry-run: Do not actually upload files"
  echo "  -h, --help     Show this help message"
  echo ""
  echo "The YAML configuration file must have the following structure:"
  echo ""
  echo "  paths:"
  echo "    - <file/folder path>"
  echo "    - <file/folder path>"
  echo "    ..."
  echo "  acl:"
  echo "    default: <private/public-read/public-read-write>"
  echo "    paths:"
  echo "      <file/folder path>: <private/public-read/public-read-write>"
}

# Parse command-line arguments
s3_bucket="$S3_BUCKET"
dry_run=false
while [ $# -gt 0 ]; do
  case "$1" in
    --s3 )
      s3_bucket="$2"
      shift 2
      ;;
    -n | --dry-run )
      dry_run=true
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
      config_file="$1"
      shift
      ;;
  esac
done

# Check for required argument
if [ -z "$config_file" ]; then
  echo "[ERROR] Configuration file path argument not set" 1>&2
  usage
  exit 1
fi

# Check for required environment variable
if [ -z "$s3_bucket" ]; then
  echo "[ERROR] S3_BUCKET environment variable is not set" 1>&2
  exit 1
fi

# Parse YAML configuration file
paths=$(yq -r '.paths[]' "$config_file")
default_acl=$(yq -r '.acl.default // "private"' "$config_file")

# Upload files/folders to S3 bucket
for path in $paths; do
  echo "[DEBUG] Processing Path: $path"
  acl=$(yq -r ".acl.paths.\"$path\" // \"$default_acl\"" "$config_file")
  # if path is a folder then upload recursively
  if [ -d "$path" ]; then
    # upload files recursively
    if [ "$dry_run" = true ]; then
      echo "[DRY RUN] aws s3 cp \"$path\" \"s3://$s3_bucket\" --recursive --acl $acl"
    else
      aws s3 cp "$path" "s3://$s3_bucket" --recursive --acl "$acl"
    fi
  # if path is a file then upload it directly
  elif [ -f "$path" ]; then
    if [ "$dry_run" = true ]; then
      echo "[DRY RUN] aws s3 cp \"$path\" \"s3://$s3_bucket\" --acl $acl"
    else
      aws s3 cp "$path" "s3://$s3_bucket" --acl $acl
    fi
  # if path is neither a file nor a folder then throw an error
  else
    echo "Invalid path: $path" 1>&2
    exit 1
  fi
done
