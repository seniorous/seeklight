const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'v3.0-expansion-charts');
const outputDir = inputDir;

async function convertSvgToPng() {
    const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.svg'));
    
    console.log(`找到 ${files.length} 个SVG文件待转换...\\n`);
    
    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file.replace('.svg', '.png'));
        
        try {
            await sharp(inputPath, { density: 300 })  // 300 DPI高清输出
                .png({ quality: 100, compressionLevel: 6 })
                .toFile(outputPath);
            
            console.log(`✓ 转换成功: ${file} -> ${file.replace('.svg', '.png')}`);
        } catch (err) {
            console.error(`✗ 转换失败: ${file} - ${err.message}`);
        }
    }
    
    console.log('\\n所有图表转换完成！');
}

convertSvgToPng();
