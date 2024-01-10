self.addEventListener('fetch', function(arg) {
    // https://stackoverflow.com/a/11237259/1070215
    self.console.log("fetching", arg.request.url)
    return;
});
