#!/bin/bash

#### # Get the commit hash
#### commit_hash=$(git rev-parse HEAD)
#### short_commit_hash=$(git rev-parse --short HEAD)
#### 
#### 
#### # Replace the placeholder with the actual commit hash
#### sed "s/{{commit_hash}}/$commit_hash/g" HOWTO-template.md > HOWTO.md

# Get the commit hash
commit_hash=$(git rev-parse HEAD)
short_commit_hash=$(git rev-parse --short HEAD)

# Replace the placeholders with the actual commit hashes
sed -e "s/{{commit_hash}}/$commit_hash/g" -e "s/{{short_commit_hash}}/$short_commit_hash/g" HOWTO-template.md > HOWTO.md
