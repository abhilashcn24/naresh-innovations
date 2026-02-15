import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');
const outputDir = path.join(publicDir, 'portfolio.json');
const portfolioDir = path.join(publicDir, 'portfolio');

// Categories to scan
const categories = ['kitchens', 'bedrooms', 'office space'];

const images = [];
let idCounter = 1;

if (fs.existsSync(portfolioDir)) {
    const dirs = fs.readdirSync(portfolioDir).filter(file =>
        fs.statSync(path.join(portfolioDir, file)).isDirectory()
    );

    dirs.forEach(category => {
        const categoryPath = path.join(portfolioDir, category);
        const files = fs.readdirSync(categoryPath).filter(file =>
            /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
        );

        files.forEach(file => {
            // Create relative URL for frontend
            // path: /portfolio/<category>/<file>
            const categoryEncoded = encodeURIComponent(category);
            const fileEncoded = encodeURIComponent(file);

            images.push({
                id: idCounter++,
                category: category.toLowerCase(),
                src: `/portfolio/${categoryEncoded}/${fileEncoded}`,
                alt: `${category} project ${idCounter}`
            });
        });
    });
}

const jsonContent = JSON.stringify(images, null, 2);
fs.writeFileSync(outputDir, jsonContent);

console.log(`Generated portfolio.json with ${images.length} images.`);
