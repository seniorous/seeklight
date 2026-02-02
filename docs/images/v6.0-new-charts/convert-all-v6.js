/**
 * 批量转换v6图表SVG到PNG
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const files = [
    'chart_market_tam_sam_som.svg',
    'chart_core_value.svg',
    'chart_future_roadmap.svg',
    'chart_inference_mode.svg',
    'chart_highlights.svg'
];

files.forEach(svg => {
    const png = svg.replace('.svg', '.png');
    try {
        console.log(`Converting ${svg}...`);
        execSync(`npx sharp-cli --input "${svg}" --output "${png}"`, { stdio: 'inherit' });
        console.log(`✓ Created ${png}`);
    } catch (err) {
        console.error(`✗ Failed: ${svg}`, err.message);
    }
});

console.log('\nDone!');
