const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convert() {
    const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.svg'));
    for (const file of files) {
        const svg = fs.readFileSync(path.join(__dirname, file));
        const png = file.replace('.svg', '.png');
        await sharp(svg, { density: 300 }).png().toFile(path.join(__dirname, png));
        console.log(`Converted: ${file} -> ${png}`);
    }
    console.log('Done!');
}
convert();
