/**
 * 转换新生成的SVG为PNG
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgFiles = [
    'diagram_cognitive_leap.svg',
    'diagram_memory_need_mapping.svg',
    'diagram_innovation_reorder.svg'
];

async function convertAll() {
    for (const svgFile of svgFiles) {
        const svgPath = path.join(__dirname, svgFile);
        const pngPath = svgPath.replace('.svg', '.png');
        
        if (fs.existsSync(svgPath)) {
            await sharp(svgPath, { density: 300 })
                .png()
                .toFile(pngPath);
            console.log(`✓ ${svgFile} → ${path.basename(pngPath)}`);
        } else {
            console.log(`✗ ${svgFile} 不存在`);
        }
    }
    console.log('\n转换完成!');
}

convertAll().catch(console.error);
