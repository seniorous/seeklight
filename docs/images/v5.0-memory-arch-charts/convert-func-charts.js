const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgFiles = [
    'diagram_semantic_search_flow.svg',
    'diagram_privacy_vault.svg',
    'diagram_implicit_pref_learning.svg'
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
        }
    }
    console.log('\n转换完成!');
}

convertAll().catch(console.error);
