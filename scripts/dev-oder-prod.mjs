import { readFileSync, writeFileSync } from 'fs';

const toProduction = process.env.NODE_ENV === 'production';

// Define the paths for production and development
const productionPaths = [
    "'./dist/js/UtilsClass.min.js'",
    "'./dist/js/ColorsClass.min.js'",
    "'./dist/js/SwipeClass.min.js'",
    "'./dist/js/TimerClass.min.js'",
    "'./dist/js/SoundMachineClass.min.js'",
    "'./dist/js/GameClass.min.js'",
    "'/dist/css/bootstrap.min.css'",
    "'/dist/css/index.min.css'",
    "'/dist/css/tables.min.css'",
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
    "'./src/js/UtilsClass.js'",
    "'./src/js/ColorsClass.js'",
    "'./src/js/SwipeClass.js'",
    "'./src/js/TimerClass.js'",
    "'./src/js/SoundMachineClass.js'",
    "'./src/js/GameClass.js'",
    "'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'",
    "'/src/css/index.css'",
    "'/src/css/tables.css'",
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

// Function to process HTML content and update paths
function processHTMLContent(filePath, developmentPaths, productionPaths, toProduction) {
    // Read the original HTML content from the file
    let originalHTMLContent = readFileSync(filePath, 'utf8');

    // Iterate through paths and replace them accordingly
    for (let i = 0; i < productionPaths.length; i++) {
        const productionPath = productionPaths[i];
        const developmentPath = developmentPaths[i];
        
        // Replace the development file path with the production file path and vice versa
        if (toProduction) {
            originalHTMLContent = originalHTMLContent.replace(new RegExp(developmentPath, 'g'), productionPath);
        } else {
            originalHTMLContent = originalHTMLContent.replace(new RegExp(productionPath, 'g'), developmentPath);
        }
    }

    // Write the updated HTML content back to the file
    writeFileSync(filePath, originalHTMLContent);
}

// Loop through each filename in the array and process it
const fileNames = ['index.html', 'showdown.html']; // Files to process
for (const fileName of fileNames) {
    const filePath = fileName; // Assuming files are in the same directory
    processHTMLContent(filePath, developmentPaths, productionPaths, toProduction); // Process the file
}

// Write the current environment to a file
writeFileSync('.node_env', process.env.NODE_ENV);

console.log(`My build successful for environment: ${process.env.NODE_ENV}`);
