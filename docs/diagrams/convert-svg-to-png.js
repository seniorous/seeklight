/**
 * SVG to PNG conversion script
 * Uses sharp library for high-quality conversion
 */
const fs = require('fs');
const path = require('path');

// 尝试使用sharp，如果没有则用resvg-js或提示安装
async function convertSvgToPng() {
    const inputDir = path.join(__dirname, 'images');
    const outputDir = inputDir; // 输出到同一目录
    
    // 获取所有SVG文件
    const svgFiles = fs.readdirSync(inputDir).filter(f => f.endsWith('.svg'));
    
    console.log(`Found ${svgFiles.length} SVG files to convert`);
    
    let sharp;
    try {
        sharp = require('sharp');
    } catch (e) {
        console.log('sharp not installed, trying alternative...');
        // 如果sharp不可用，直接保留SVG，docx-js可以嵌入SVG
        console.log('SVG files will be used directly (docx supports SVG)');
        return;
    }
    
    for (const svgFile of svgFiles) {
        const inputPath = path.join(inputDir, svgFile);
        const outputPath = path.join(outputDir, svgFile.replace('.svg', '.png'));
        
        try {
            const svgBuffer = fs.readFileSync(inputPath);
            await sharp(svgBuffer, { density: 150 })
                .png()
                .toFile(outputPath);
            console.log(`Converted: ${svgFile} -> ${path.basename(outputPath)}`);
        } catch (err) {
            console.error(`Error converting ${svgFile}:`, err.message);
        }
    }
    
    console.log('\nConversion complete!');
}

convertSvgToPng().catch(console.error);
