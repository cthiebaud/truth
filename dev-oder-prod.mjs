import { readFileSync, writeFileSync } from 'fs';

const toProduction = process.env.NODE_ENV === 'production';

// Define the paths for production and development
const productionPaths = [
    "'./dist/js/ColorsClass.min.js'",
    "'./dist/js/TimerClass.min.js'",
    "'./dist/js/SoundMachineClass.min.js'",
    "'/dist/css/bootstrap.min.css'",
    "'/dist/css/index.min.css'",
    "'/dist/css/timer.min.css'",
    "/* BEGIN comment for dev */",
    "/* END comment for dev */",
    "<!-- BEGIN Button trigger modal for test - - >",
    "< ! - - END Button trigger modal for test -->",
    "<!-- BEGIN livejs for test - - >",
    "< ! - - END livejs for test -->",
    "<!-- BEGIN Google tag (gtag.js) -->",
    "<!-- END Google tag (gtag.js) -->",
];
const developmentPaths = [
    "'./src/js/ColorsClass.js'",
    "'./src/js/TimerClass.js'",
    "'./src/js/SoundMachineClass.js'",
    "'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'",
    "'/src/css/index.css'",
    "'/src/css/timer.css'",
    "/* BEGIN comment for dev * /",
    "/ * END comment for dev */",
    "<!-- BEGIN Button trigger modal for test -->",
    "<!-- END Button trigger modal for test -->",
    "<!-- BEGIN livejs for test -->",
    "<!-- END livejs for test -->",
    "<!-- BEGIN Google tag (gtag.js) - - >",
    "< ! - - END Google tag (gtag.js) -->",
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
writeFileSync('.node_env', process.env.NODE_ENV);

console.log(`My build successful for environment: ${process.env.NODE_ENV}`);
