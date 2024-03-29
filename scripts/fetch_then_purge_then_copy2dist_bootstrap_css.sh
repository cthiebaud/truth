#!/bin/zsh
echo "fetching then purging then copying bootstrap.min.css to dist/css"
rm -f dist/css/bootstrap.min.css
rm -f src/css/bootstrap.css
# purgecss --css <(curl -k https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css -o -) --content index.html --config purgecss.config.js --output dist/css/bootstrap.min.css
curl -k https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.css -o src/css/bootstrap.css
# purgecss --css <(curl -k https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.css -o -) --content index.html --config purgecss.config.js --output src/css/bootstrap.css
