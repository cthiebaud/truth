import { readFileSync, writeFileSync } from 'fs';

const toProduction = process.env.NODE_ENV === 'production';

// Define the paths for production and development
const productionPaths = [
    "<script type=\"module\" src=\"./dist/js/bundle.min.js\">",
    "'/dist/css/bootstrap.min.css'",
    "'/dist/css/index.min.css'",
    "'/dist/css/tables.min.css'",
    "'/dist/css/timer.min.css'",
    "= 'serviceWorker' in navigator // false //",
    "<!-- BEGIN Button trigger modal for test - - >",
    "< ! - - END Button trigger modal for test -->",
    "<!-- BEGIN livejs for test - - >",
    "< ! - - END livejs for test -->",
    "<!-- BEGIN Google tag -->",
    "<!-- END Google tag -->",
];
const developmentPaths = [
    "<script type=\"module\" src=\"./src/js/index.js\">",
    "'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'",
    "'/src/css/index.css'",
    "'/src/css/tables.css'",
    "'/src/css/timer.css'",
    "= false // 'serviceWorker' in navigator //",
    "<!-- BEGIN Button trigger modal for test -->",
    "<!-- END Button trigger modal for test -->",
    "<!-- BEGIN livejs for test -->",
    "<!-- END livejs for test -->",
    "<!-- BEGIN Google tag - - >",
    "< ! - - END Google tag -->",
];

// Check if the arrays have the same length
if (productionPaths.length !== developmentPaths.length) {
    console.error('Error: ProductionPaths and developmentPaths arrays must have the same length.');
    process.exit(1); // Exit with an error code
}

// Function to process HTML content and update paths
function processHTMLContent(filePath, developmentPaths, productionPaths, toProduction) {
    // Read the original HTML content from the file
    let originalHTMLContent = readFileSync(filePath, 'utf8');

    let replaced = 0
    let not_changed = 0
    let not_found = 0

    // Iterate through paths and replace them accordingly
    for (let i = 0; i < productionPaths.length; i++) {
        const productionPath = productionPaths[i];
        const developmentPath = developmentPaths[i];

        const regexDev2Prod = new RegExp(developmentPath, 'g')
        const regexProd2Dev = new RegExp(productionPath, 'g')

        let from
        let reverse
        let to
        if (toProduction) {
            from = regexDev2Prod
            reverse = regexProd2Dev
            to = productionPath
        } else {
            from = regexProd2Dev
            reverse = regexDev2Prod
            to = developmentPath
        }

        // Replace the development file path with the production file path or vice versa
        if (from.test(originalHTMLContent)) {
            originalHTMLContent = originalHTMLContent.replace(from, to);
            replaced++
        } else {
            if (reverse.test(originalHTMLContent)) {
                not_changed++
            } else {
                console.log(from, reverse, "NO MATCH?!");
                not_found++
            }
        }
    }

    console.log(filePath, "#", productionPaths.length, "|", replaced, "replaced |", not_changed, "not changed |", not_found, "not found")

    // Write the updated HTML content back to the file
    writeFileSync(filePath, originalHTMLContent);
}

// Loop through each filename in the array and process it
const fileNames = ['index.html']; // Files to process
for (const fileName of fileNames) {
    const filePath = fileName; // Assuming files are in the same directory
    processHTMLContent(filePath, developmentPaths, productionPaths, toProduction); // Process the file
}

// Write the current environment to a file
writeFileSync('.node_env', process.env.NODE_ENV);

console.log(`My build successful for environment: ${process.env.NODE_ENV}`);
