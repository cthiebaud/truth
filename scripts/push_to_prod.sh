#!/bin/bash
set -e

# Define cleanup function
cleanup() {
    echo "cleaning up"
}

# Trap any signals to trigger cleanup
trap cleanup EXIT

NODE_ENV=$(cat .node_env)
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
scripts/inject_commit_hash.sh

# Commit changes
git add HOWTO.md
commit_message="Update commit hash to $latest_commit_hash in HOWTO.md for production"
git commit -m "$commit_message"

# Push changes to the remote production branch
git push --force origin main:production

# Reset the main branch to the previous commit
git reset HEAD~1 --hard

