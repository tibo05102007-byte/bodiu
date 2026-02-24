import fs from 'fs';
import path from 'path';

const SRC_DIR = path.join(__dirname, '../../products_image');
const DEST_DIR = path.join(__dirname, '../public/images/products/auto');

if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
}

// category map
const CAT_MAP: Record<string, { cat: string, sub: string }> = {
    'РУЧКИ': { cat: 'door_handles', sub: 'rosette_handles' },
    'Ручки скобы': { cat: 'door_handles', sub: 'pull_handles' },
    'СКОБЫ ДЛЯ ДВЕРНЫХ РУЧЕК': { cat: 'door_handles', sub: 'pull_handles' },

    'СКРЫТАЯ ПЕТЛЯ': { cat: 'door_hinges', sub: 'hidden_hinges' },
    'ВРЕЗНЫЕ ПЕТЛИ': { cat: 'door_hinges', sub: 'mortise_hinges' },
    'ПРУЖИННАЯ ПЕТЛЯ': { cat: 'door_hinges', sub: 'spring_hinges' },
    'ДВЕРНЫЕ НАВЕСЫ': { cat: 'door_hinges', sub: 'overlay_hinges' },

    'ЗАМКИ': { cat: 'locks_and_security', sub: 'mortise_locks' },
    'ДВЕРНЫЕ МЕХАНИЗМЫ': { cat: 'locks_and_security', sub: 'mortise_locks' },
    'ЭЛЕКТРОННЫЕ ДВЕРНЫЕ ЗАМКИ': { cat: 'locks_and_security', sub: 'smart_locks' },
    'СЕРДЕЦЕВИНЫ': { cat: 'locks_and_security', sub: 'cylinders' },

    'ЗАЩЕЛКИ': { cat: 'door_fittings', sub: 'latches_and_bolts' },
    'ЗАДВИЖКИ': { cat: 'door_fittings', sub: 'latches_and_bolts' },
    'ФИКСАТОРЫ': { cat: 'door_fittings', sub: 'wc_and_escutcheons' },
    'НАКЛАДКИ': { cat: 'door_fittings', sub: 'wc_and_escutcheons' },
    'WC-комплект с ключом': { cat: 'door_fittings', sub: 'wc_and_escutcheons' },
    'УПОРЫ ДВЕРНЫЕ': { cat: 'door_fittings', sub: 'door_stops' },
    'ДОВОДЧИКИ ДВЕРНЫЕ': { cat: 'door_fittings', sub: 'door_closers' },

    'РАЗДВИЖНЫЕ СИСТЕМЫ': { cat: 'sliding_systems', sub: '' }
};

const BRAND_KEYWORDS = ['APOLLO', 'STATUS', 'NEON', 'СТАТУС'];

let productId = 2000;
const products: any[] = [];

function determineBrandAndColor(folderName: string, parentFolderName: string) {
    let brand = 'Unknown';
    let colors = ['Хром']; // Default
    const upperName = (folderName + ' ' + parentFolderName).toUpperCase();

    if (upperName.includes('APOLLO')) brand = 'Apollo';
    else if (upperName.includes('STATUS') || upperName.includes('СТАТУС')) brand = 'Status';
    else if (upperName.includes('NEON')) brand = 'Neon';
    else brand = 'Apollo'; // Default fallback

    if (upperName.includes('ЧЕРН') || upperName.includes('BLACK')) colors = ['Черный'];
    else if (upperName.includes('БЕЛ')) colors = ['Белый'];
    else if (upperName.includes('ЗОЛОТ') || upperName.includes('GOLD')) colors = ['Золото'];
    else if (upperName.includes('БРОНЗ')) colors = ['Бронза'];
    else if (upperName.includes('НИКЕЛ') || upperName.includes('SN')) colors = ['Никель'];
    else if (upperName.includes('ГРАФИТ')) colors = ['Графит'];

    return { brand, colors };
}

function processDirectory(dirPath: string, parentStr: string = '') {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });

    // Find first image in the directory
    const imageFiles = items.filter(i => !i.isDirectory() && (i.name.toLowerCase().endsWith('.jpg') || i.name.toLowerCase().endsWith('.jpeg') || i.name.toLowerCase().endsWith('.png')));

    if (imageFiles.length > 0 && parentStr) {
        // Pick the first image as representative for this "model" folder
        const img = imageFiles[0];
        const modelName = parentStr.split('/').pop() || 'Item';

        // Determine base category mapping
        const rootFolder = parentStr.split('/')[0];
        const mapping = CAT_MAP[rootFolder];
        if (!mapping) return; // Ignore folders not in our mapping (e.g., ОБЬЯСНЕНИЕ)

        const { brand, colors } = determineBrandAndColor(modelName, parentStr);

        const fileNameStr = `${productId}_${img.name.replace(/\\s/g, '_')}`;
        const destPath = path.join(DEST_DIR, fileNameStr);

        try {
            fs.copyFileSync(path.join(dirPath, img.name), destPath);

            products.push({
                id: productId++,
                name: `${mapping.cat === 'door_handles' ? 'Ручка ' : ''}${modelName.replace(/apollo|status|neon|статус/i, '').trim() || brand + ' Model'}`,
                category: mapping.cat,
                subcategory: mapping.sub,
                brand: brand,
                image: `/images/products/auto/${fileNameStr}`,
                colors: colors,
                inStock: true
            });
        } catch (e) {
            console.error("Error copy", e);
        }
        return; // Stop deepening if we found an image for this leaf folder
    }

    // Traverse subdirectories
    for (const item of items) {
        if (item.isDirectory()) {
            processDirectory(path.join(dirPath, item.name), parentStr ? `${parentStr}/${item.name}` : item.name);
        }
    }
}

console.log("Starting extraction...");
processDirectory(SRC_DIR);

console.log(`Extracted ${products.length} products.`);

fs.writeFileSync(path.join(__dirname, 'products_db.json'), JSON.stringify(products, null, 2));
console.log("Saved to products_db.json");
