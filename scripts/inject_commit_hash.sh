#!/bin/bash

# Get the commit hash
commit_hash=$(git rev-parse HEAD)

# Replace the placeholder with the actual commit hash
sed "s/{{commit_hash}}/$commit_hash/g" HOWTO-template.md > HOWTO.md
