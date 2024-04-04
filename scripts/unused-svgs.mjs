import fs from 'fs';
import path from 'path';

// Function to recursively scan a directory for SVG files
const scanDirectory = (directory, fileList = []) => {
    const files = fs.readdirSync(directory);
    files.forEach(file => {
        const filePath = path.join(directory, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (!/node_modules|packages|material|firebase|favicons|dist/.test(filePath)) { // Ignore specified directories
                scanDirectory(filePath, fileList);
            }
        } else if (filePath.endsWith('.svg')) {
            fileList.push(filePath);
        }
    });
    return fileList;
};

// Function to parse JavaScript content and look for SVG references
const parseJavaScriptContent = (content) => {
    content = content.replace(/\)/g, '(');
    const referencedSVGFiles = [];
    // const regex = /(['"`(])(.*?\.svg)\1/g;
    const regex = /(['"`\(])([^'"`\(\n)]*\.svg)\1?/g
    let match;
    while ((match = regex.exec(content)) !== null) {
        const reference = match[2];
        console.log("\tfound", reference)
        if (reference.endsWith('.svg')) {
            referencedSVGFiles.push(reference.startsWith('/') ? reference.substring(1) : reference);
        }
    }
    return referencedSVGFiles;
};

// Function to scan JavaScript files for SVG references
const scanContainerFiles = (directory) => {
    const files = fs.readdirSync(directory);
    const referencedSVGFiles = [];
    files.forEach(file => {
        const filePath = path.join(directory, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (!/node_modules|packages|material|firebase|favicons|dist/.test(filePath)) { // Ignore specified directories
                referencedSVGFiles.push(...scanContainerFiles(filePath));
            }            
        } else if (file !== 'service-worker.js' && (filePath.endsWith('.html') || filePath.endsWith('.js') || filePath.endsWith('.md'))) {
            console.log(`reading ${filePath}`)
            const content = fs.readFileSync(filePath, 'utf8');
            const svgReferences = parseJavaScriptContent(content);
            referencedSVGFiles.push(...svgReferences);
        }
    });
    return referencedSVGFiles;
};

// Function to find unused SVG files
const findUnusedSVGFiles = (directory) => {
    const svgFiles = scanDirectory(directory);
    const referencedSVGFiles = scanContainerFiles(directory);
    const unusedSVGFiles = svgFiles.filter(file => !referencedSVGFiles.includes(file));
    const usedSVGFiles = svgFiles.filter(file => referencedSVGFiles.includes(file));
    console.log('Used SVG files:', usedSVGFiles);
    return unusedSVGFiles;
};

// Usage example
const unusedSVGFiles = findUnusedSVGFiles('./');
console.log('Unused SVG files:', unusedSVGFiles);
