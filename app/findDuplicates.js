const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Directory containing the images
const imagesDir = path.join(__dirname, 'public', 'images', 'products', 'auto');
const duplicatesDir = path.join(__dirname, 'public', 'images', 'products', 'duplicates');

// Create duplicates directory if it doesn't exist
if (!fs.existsSync(duplicatesDir)) {
    fs.mkdirSync(duplicatesDir, { recursive: true });
}

// Function to calculate file hash
function calculateHash(filePath) {
    const fileBuffer = fs.readFileSync(filePath);
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    return hashSum.digest('hex');
}

// Map to store hashes and their corresponding file paths
const hashMap = new Map();
let duplicateCount = 0;

console.log(`Scanning for duplicates in: ${imagesDir}`);

// Read all files in the directory
fs.readdir(imagesDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    // Filter out non-image files if needed (optional)
    const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });

    console.log(`Found ${imageFiles.length} image files. Hashing...`);

    imageFiles.forEach(file => {
        const filePath = path.join(imagesDir, file);

        // Only process files, not directories
        if (fs.statSync(filePath).isFile()) {
            try {
                const hash = calculateHash(filePath);

                if (hashMap.has(hash)) {
                    duplicateCount++;
                    const originalFile = hashMap.get(hash);
                    const duplicatePath = path.join(duplicatesDir, file);

                    console.log(`Duplicate found: ${file} (matches ${originalFile})`);

                    // Move the duplicate to the duplicates folder
                    fs.renameSync(filePath, duplicatePath);
                } else {
                    // Store the hash and the original file name
                    hashMap.set(hash, file);
                }
            } catch (e) {
                console.error(`Error processing file ${file}:`, e);
            }
        }
    });

    console.log(`\nScan complete! Found and moved ${duplicateCount} duplicate files.`);
    console.log(`Original files kept: ${hashMap.size}`);
});
