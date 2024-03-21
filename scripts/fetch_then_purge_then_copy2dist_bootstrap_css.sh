#!/bin/zsh
echo "fetching then purging then copying bootstrap.css to dist"
rm -f dist/css/bootstrap.min.css
purgecss --css <(curl -k https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css -o -) --content index.html --config purgecss.config.js --output dist/css/bootstrap.min.css
# curl -k https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.css -o src/css/bootstrap.css