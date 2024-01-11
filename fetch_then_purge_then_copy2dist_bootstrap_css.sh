#!/bin/zsh
echo "fetching then purging the copying bootstrap.css to dist"
rm -f dist/css/bootstrap.min.css
purgecss --css <(curl -k https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css -o -) --content index.html --output dist/css/bootstrap.min.css