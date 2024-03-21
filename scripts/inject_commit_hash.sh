#!/bin/bash
# usage:
# ./inject_commit_hash.sh -c $your_commit_hash -s $your_short_commit_hash -t "QUICK-GUIDE-template.md" -o "QUICK-GUIDE.md"

# Default values
template_file="QUICK-GUIDE-template.md"
output_file="QUICK-GUIDE.md"

# Parse arguments
while getopts ":t:o:c:s:" opt; do
  case $opt in
    t | --template)
      template_file="$OPTARG"
      ;;
    o | --output)
      output_file="$OPTARG"
      ;;
    c | --commit_hash)
      commit_hash="$OPTARG"
      ;;
    s | --short_commit_hash)
      short_commit_hash="$OPTARG"
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      exit 1
      ;;
  esac
done

# If commit hash and short commit hash are not provided, get them from git
if [[ -z "$commit_hash" ]]; then
  commit_hash=$(git rev-parse HEAD)
fi
if [[ -z "$short_commit_hash" ]]; then
  short_commit_hash=$(git rev-parse --short HEAD)
fi

# Replace the placeholders with the actual commit hashes
sed -e "s/{{commit_hash}}/$commit_hash/g" -e "s/{{short_commit_hash}}/$short_commit_hash/g" "$template_file" > "$output_file"
