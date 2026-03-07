/**
 * Скрипт для сканирования папки с фотографиями товаров
 * и генерации JSON-каталога
 * 
 * Запуск: node scripts/scan-products.js
 */

const fs = require('fs');
const path = require('path');

// Конфигурация
const PRODUCTS_DIR = path.join(__dirname, '../dist/images/products');
const OUTPUT_FILE = path.join(__dirname, '../src/data/products-catalog.json');

// Сопоставление названий папок с человекочитаемыми названиями
const CATEGORY_NAMES = {
  'РУЧКИ': { name: 'Ручки', icon: '🔑', count: '500+ моделей' },
  'ДВЕРНЫЕ МЕХАНИЗМЫ': { name: 'Дверные механизмы', icon: '🔒', count: 'Магнитные, механические' },
  'ДВЕРНЫЕ НАВЕСЫ': { name: 'Дверные навесы', icon: '🚪', count: 'Петли, завесы' },
  'ЗАДВИЖКИ': { name: 'Задвижки', icon: '🔐', count: 'Дополнительная защита' },
  'ЗАЩЕЛКИ': { name: 'Защёлки', icon: '🔓', count: 'Надёжная фиксация' },
  'НАКЛАДКИ': { name: 'Накладки', icon: '🔘', count: 'Декоративные элементы' },
  'НАВЕСНЫЕ ЗАМКИ': { name: 'Навесные замки', icon: '⛓️', count: 'Все размеры' },
  'ПРУЖИННАЯ ПЕТЛЯ': { name: 'Пружинные петли', icon: '↩️', count: 'Автозакрывание' },
  'РАЗДВИЖНЫЕ СИСТЕМЫ': { name: 'Раздвижные системы', icon: '➡️', count: 'Экономия пространства' },
  'СЕРДЕЦЕВИНЫ': { name: 'Цилиндры', icon: '🗝️', count: 'Сердцевины' },
  'СКОБЫ ДЛЯ ДВЕРНЫХ РУЧЕК': { name: 'Скобы', icon: '🔗', count: 'Для ручек' },
  'СКРЫТАЯ ПЕТЛЯ': { name: 'Скрытые петли', icon: '👁️', count: 'Невидимый монтаж' },
  'УПОРЫ ДВЕРНЫЕ': { name: 'Упоры дверные', icon: '🛑', count: 'Защита стен' },
  'ФИКСАТОРЫ': { name: 'Фиксаторы', icon: '✓', count: 'Для дверей' },
  'ЭЛЕКТРОННЫЕ ДВЕРНЫЕ ЗАМКИ': { name: 'Электронные замки', icon: '📱', count: 'Smart-замки' },
  'ВРЕЗНЫЕ ПЕТЛИ': { name: 'Врезные петли', icon: '⚙️', count: 'Универсальные' },
  'ДОВОДЧИКИ ДВЕРНЫЕ': { name: 'Доводчики', icon: '↪️', count: 'Плавное закрывание' },
  'WC-комплект с ключом': { name: 'WC комплекты', icon: '🚽', count: 'Для санузлов' },
};

// Функция для транслитерации (если понадобится URL)
function transliterate(str) {
  const map = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '',
    'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo',
    'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M',
    'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
    'Ф': 'F', 'Х': 'H', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sch', 'Ъ': '',
    'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya', ' ': '-'
  };
  return str.split('').map(char => map[char] || char).join('');
}

// Рекурсивное сканирование папки
function scanDirectory(dirPath, relativePath = '') {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  const result = {
    images: [],
    subcategories: {}
  };

  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);
    const relPath = path.join(relativePath, item.name);

    if (item.isDirectory()) {
      // Рекурсивно сканируем подпапку
      const subcategoryData = scanDirectory(fullPath, relPath);
      if (subcategoryData.images.length > 0 || Object.keys(subcategoryData.subcategories).length > 0) {
        result.subcategories[item.name] = subcategoryData;
      }
    } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(item.name)) {
      // Добавляем изображение
      result.images.push({
        filename: item.name,
        path: `/images/products/${relPath.replace(/\\/g, '/')}`,
        size: fs.statSync(fullPath).size
      });
    }
  }

  return result;
}

// Генерация каталога
function generateCatalog() {
  console.log('🔍 Сканирование папки:', PRODUCTS_DIR);

  if (!fs.existsSync(PRODUCTS_DIR)) {
    console.error('❌ Папка не найдена:', PRODUCTS_DIR);
    process.exit(1);
  }

  const categories = fs.readdirSync(PRODUCTS_DIR, { withFileTypes: true })
    .filter(item => item.isDirectory())
    .map(dir => {
      const folderName = dir.name;
      const fullPath = path.join(PRODUCTS_DIR, folderName);
      const data = scanDirectory(fullPath, folderName);
      
      const config = CATEGORY_NAMES[folderName] || { 
        name: folderName, 
        icon: '📦', 
        count: `${countImages(data)} фото` 
      };

      return {
        id: transliterate(folderName).toLowerCase().replace(/[^a-z0-9]/g, '-'),
        folderName,
        name: config.name,
        icon: config.icon,
        count: config.count,
        totalImages: countImages(data),
        data
      };
    })
    .filter(cat => cat.totalImages > 0)
    .sort((a, b) => b.totalImages - a.totalImages);

  const catalog = {
    generatedAt: new Date().toISOString(),
    totalCategories: categories.length,
    totalImages: categories.reduce((sum, cat) => sum + cat.totalImages, 0),
    categories
  };

  // Создаём папку для данных если её нет
  const dataDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Сохраняем JSON
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(catalog, null, 2), 'utf-8');

  console.log('\n✅ Каталог сгенерирован!');
  console.log('📁 Файл:', OUTPUT_FILE);
  console.log('📊 Категорий:', catalog.totalCategories);
  console.log('🖼️ Всего изображений:', catalog.totalImages);
  console.log('\n📋 Категории:');
  categories.forEach(cat => {
    console.log(`   ${cat.icon} ${cat.name} — ${cat.totalImages} фото`);
  });

  return catalog;
}

// Подсчёт количества изображений рекурсивно
function countImages(data) {
  let count = data.images.length;
  for (const sub of Object.values(data.subcategories)) {
    count += countImages(sub);
  }
  return count;
}

// Запуск
if (require.main === module) {
  generateCatalog();
}

module.exports = { generateCatalog, scanDirectory };
