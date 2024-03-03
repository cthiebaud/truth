#!/bin/bash

echo "NODE_ENV: $NODE_ENV"

# Check if NODE_ENV is set to "production"
if [ "$NODE_ENV" != "production" ]; then
  echo "NODE_ENV is not set to 'production'. Aborting."
  exit 1
fi

# Check if there are uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
  echo "There are uncommitted changes. Aborting."
  exit 1
fi

# Create and switch to the production branch
git checkout -b production

# Inject the commit hash into the HTML
./inject_commit_hash.sh

# Commit changes to the production branch
git add index.html
git commit -m "Update commit hash in index.html for production"

# Push changes to the remote production branch
git push origin production

# Switch back to the main branch
git checkout main
