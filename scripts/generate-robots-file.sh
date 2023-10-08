# Provides the generate_robots_file() function that generates the robots.txt file

# Usage: generate_robots_file <output_file>
#        generate_robots_file -h

# Define usage function
usage() {
  echo "Usage: generate_robots_file <output_file>"
  echo "       generate_robots_file -h"
  echo ""
  echo "Options:"
  echo "  -h, --help  Show this help message"
}

# Parse command-line arguments
while [ $# -gt 0 ]; do
  case "$1" in
    -h | --help )
      usage
      exit 0
      ;;
    -* )
      echo "Invalid option: $1" 1>&2
      exit 1
      ;;
    * )
      output_file="$1"
      shift 1
      ;;
  esac
done

# Check for required argument
if [ -z "$output_file" ]; then
  echo "[ERROR] Output file path argument not set" 1>&2
  usage
  exit 1
fi

# Generate robots.txt file
echo "Generating robots.txt file..."
cat > "$output_file" << EOF
User-agent: *
Crawl-delay: 120
Disallow: /*?
Sitemap: https://konstantinoslampridis.io/sitemap.xml
EOF

echo "Done!"
