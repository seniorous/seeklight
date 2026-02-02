/**
 * SVG to PNG 转换脚本
 * 使用 sharp 库进行转换
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
            await sharp(inputPath)
                .png()
                .toFile(outputPath);
            console.log(`Converted: ${file} -> ${file.replace('.svg', '.png')}`);
        } catch (err) {
            console.error(`Error converting ${file}:`, err.message);
        }
    }
    
    console.log('\n转换完成！');
}

convertAll();
