const fs = require('fs');

const toProduction = process.env.NODE_ENV === 'production';

// Define the paths for production and development
const productionPaths = [
    "'./dist/js/TimerClass.min.js'",
    "'/dist/css/bootstrap.min.css'",
    "'/dist/css/index.min.css'"
];
const developmentPaths = [
    "'./src/js/TimerClass.js'",
    "'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'",
    "'/src/css/index.css'",
];

// Read the original HTML content from index.html
let originalHTMLContent = fs.readFileSync('index.html', 'utf8');

for (let i = 0; i < productionPaths.length; i++) {
    const productionPath = productionPaths[i]
    const developmentPath = developmentPaths[i]
    if (toProduction) {
        // Replace the development file path with the production file path and vice versa
        originalHTMLContent = originalHTMLContent.replace(developmentPath, productionPath);
    } else {
        // Replace the development file path with the production file path and vice versa
        originalHTMLContent = originalHTMLContent.replace(productionPath, developmentPath);
    }
}

// Write the updated HTML content back to index.html
fs.writeFileSync('index.html', originalHTMLContent);

console.log(`Build successful for ${toProduction ? 'production' : 'development'} environment.`);
