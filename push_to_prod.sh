#!/bin/bash
set -e

# Define cleanup function
cleanup() {
    # Switch back to the main branch
    git checkout main
    git reset --hard
}

# Trap any signals to trigger cleanup
trap cleanup EXIT

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

# Get the latest commit hash on the main branch
latest_commit_hash=$(git rev-parse --short main)

# Inject the commit hash into the HOWTO
./inject_commit_hash.sh

# Commit changes to the production branch
git add HOWTO.md
commit_message="Update commit hash to $latest_commit_hash in HOWTO.md for production"
git commit -m "$commit_message"

# Push changes to the remote production branch
git push origin production --force

# Reset the main branch 
git reset HEAD~1 --hard

