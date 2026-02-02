/**
 * 将层次化记忆架构SVG图表转换为高分辨率PNG
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'v5.0-memory-arch-charts');
const outputDir = inputDir;

async function convertSvgToPng() {
    const svgFiles = fs.readdirSync(inputDir).filter(f => f.endsWith('.svg'));
    
    console.log(`Found ${svgFiles.length} SVG files to convert...`);
    
    for (const svgFile of svgFiles) {
        const inputPath = path.join(inputDir, svgFile);
        const outputPath = path.join(outputDir, svgFile.replace('.svg', '.png'));
        
        try {
            const svgContent = fs.readFileSync(inputPath);
            
            await sharp(svgContent, { density: 300 })
                .png()
                .toFile(outputPath);
            
            console.log(`Converted: ${svgFile} -> ${svgFile.replace('.svg', '.png')}`);
        } catch (err) {
            console.error(`Error converting ${svgFile}:`, err.message);
        }
    }
    
    console.log('\nConversion complete!');
}

convertSvgToPng();
