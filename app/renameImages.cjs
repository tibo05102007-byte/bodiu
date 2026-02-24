const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, 'src', 'data', 'products.ts');
const imagesDir = path.join(__dirname, 'public', 'images', 'products', 'auto');

// Read current products data
let productsContent = fs.readFileSync(productsFilePath, 'utf8');

// Use regex to extract the products array content
const productsMatch = productsContent.match(/export const products: Product\[\] = (\[[\s\S]*\]);/);

if (!productsMatch) {
    console.error("Could not find products array in products.ts");
    process.exit(1);
}

const products = eval(productsMatch[1]);
let updatedProductsContent = productsContent;
let renameCounter = 0;

// Helper to sanitize file names
function sanitizeName(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-z0-9]/g, '-') // Replace non-alphanumeric with dashes (supports cyrillic but doing basic a-z0-9)
        .replace(/-+/g, '-') // Remove multiple dashes
        .replace(/^-|-$/g, ''); // Trim dashes
}

function cyrillicToLatin(text) {
    const map = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
        'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
        'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
    };
    return text.toLowerCase().split('').map(char => map[char] || char).join('');
}


products.forEach(product => {
    if (product.image && product.image.includes('/images/products/auto/')) {
        const oldFileName = path.basename(product.image);
        const oldFilePath = path.join(imagesDir, oldFileName);

        if (fs.existsSync(oldFilePath)) {
            // Create a better SEO name: Brand-Category-Name-Color
            const colorText = product.colors && product.colors.length > 0 ? product.colors[0] : '';
            const baseName = cyrillicToLatin(`${product.brand}-${product.name}-${colorText}`);
            const cleanName = sanitizeName(baseName);
            const ext = path.extname(oldFileName).toLowerCase();

            const newFileName = `${cleanName}-${product.id}${ext}`;
            const newFilePath = path.join(imagesDir, newFileName);

            const newImageUrl = `/images/products/auto/${newFileName}`;

            // Rename the file
            try {
                fs.renameSync(oldFilePath, newFilePath);
                console.log(`Renamed: ${oldFileName} -> ${newFileName}`);

                // Replace in content string
                updatedProductsContent = updatedProductsContent.replace(
                    `"image": "${product.image}"`,
                    `"image": "${newImageUrl}"`
                );
                renameCounter++;
            } catch (e) {
                console.error(`Failed to rename ${oldFileName}:`, e);
            }
        } else {
            console.log(`File not found, probably it was a duplicate and was moved: ${oldFileName}`);
            // If file doesn't exist, it might have been a duplicate, we should ideally point it to the generic image 
            // or just leave it for now (it will 404 on the site). For this example, let's keep the old URL if not found.
        }
    }
});

fs.writeFileSync(productsFilePath, updatedProductsContent, 'utf8');
console.log(`\nSuccess! Renamed ${renameCounter} images and updated products.ts.`);
