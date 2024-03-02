import { readFileSync, writeFileSync } from 'fs';

const toProduction = process.env.NODE_ENV === 'production';

// Define the paths for production and development
const productionPaths = [
    "'./dist/js/TimerClass.min.js'",
    "'/dist/css/bootstrap.min.css'",
    "'/dist/css/index.min.css'",
    "'/dist/css/timer.min.css'",
    "/* BEGIN comment for dev */",
    "/* END comment for dev */",
    "<!-- BEGIN Button trigger modal for test - - >",
    "< ! - - END Button trigger modal for test -->",
    "<!-- BEGIN livejs for test - - >",
    "< ! - - END livejs for test -->",
];
const developmentPaths = [
    "'./src/js/TimerClass.js'",
    "'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'",
    "'/src/css/index.css'",
    "'/src/css/timer.css'",
    "/* BEGIN comment for dev * /",
    "/ * END comment for dev */",
    "<!-- BEGIN Button trigger modal for test -->",
    "<!-- END Button trigger modal for test -->",
    "<!-- BEGIN livejs for test -->",
    "<!-- END livejs for test -->",
];

// Check if the arrays have the same length
if (productionPaths.length !== developmentPaths.length) {
    console.error('Error: ProductionPaths and developmentPaths arrays must have the same length.');
    process.exit(1); // Exit with an error code
}

// Read the original HTML content from index.html
let originalHTMLContent = readFileSync('index.html', 'utf8');

for (let i = 0; i < productionPaths.length; i++) {
    const productionPath = productionPaths[i]
    const developmentPath = developmentPaths[i]
    // Replace the development file path with the production file path and vice versa
    if (toProduction) {
        originalHTMLContent = originalHTMLContent.replace(developmentPath, productionPath);
    } else {
        originalHTMLContent = originalHTMLContent.replace(productionPath, developmentPath);
    }
}

// Write the updated HTML content back to index.html
writeFileSync('index.html', originalHTMLContent);

console.log(`My build successful for ${toProduction ? 'production' : 'development'} environment.`);
