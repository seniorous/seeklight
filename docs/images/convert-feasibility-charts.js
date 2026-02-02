/**
 * 将功能可行性分析图表从SVG转换为高清PNG
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'v4.0-feasibility-charts');
const outputDir = inputDir;

async function convertSvgToPng() {
    const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.svg'));
    
    console.log(`Found ${files.length} SVG files to convert...`);
    
    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file.replace('.svg', '.png'));
        
        try {
            await sharp(inputPath, { density: 300 })
                .png({ quality: 100, compressionLevel: 6 })
                .toFile(outputPath);
            console.log(`✓ Converted: ${file} -> ${file.replace('.svg', '.png')}`);
        } catch (err) {
            console.error(`✗ Failed: ${file} - ${err.message}`);
        }
    }
    
    console.log('\nConversion complete!');
}

convertSvgToPng();
