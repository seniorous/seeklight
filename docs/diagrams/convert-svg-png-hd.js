/**
 * SVG to PNG 高清转换脚本
 * 提高DPI和分辨率，解决字体模糊问题
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'images-v2');
const outputDir = inputDir;

async function convertAll() {
    const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.svg'));
    
    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file.replace('.svg', '.png'));
        
        try {
            // 读取SVG并设置高DPI
            await sharp(inputPath, { density: 300 })  // 300 DPI，提高3倍清晰度
                .png({
                    quality: 100,
                    compressionLevel: 6
                })
                .toFile(outputPath);
            console.log(`Converted (300 DPI): ${file} -> ${file.replace('.svg', '.png')}`);
        } catch (err) {
            console.error(`Error converting ${file}:`, err.message);
        }
    }
    
    console.log('\n高清转换完成！（300 DPI）');
}

convertAll();
