/**
 * Скрипт для сканирования папки с фотографиями товаров
 * и генерации JSON-каталога
 * 
 * Запуск: node scripts/scan-products.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Конфигурация
const PRODUCTS_DIR = path.join(__dirname, '../public/images/products');
const OUTPUT_FILE = path.join(__dirname, '../src/data/products-catalog.json');

// Сопоставление названий папок с человекочитаемыми названиями
const CATEGORY_NAMES = {
  'РУЧКИ': { name: 'Ручки', icon: '🔑', description: '500+ моделей в разных цветах' },
  'ДВЕРНЫЕ МЕХАНИЗМЫ': { name: 'Дверные механизмы', icon: '🔒', description: 'Магнитные, механические, пластиковые' },
  'ДВЕРНЫЕ НАВЕСЫ': { name: 'Дверные навесы', icon: '🚪', description: 'Бабочки, карточные петли' },
  'ЗАДВИЖКИ': { name: 'Задвижки', icon: '🔐', description: 'Дополнительная защита' },
  'ЗАЩЕЛКИ': { name: 'Защёлки', icon: '🔓', description: 'Надёжная фиксация' },
  'НАКЛАДКИ': { name: 'Накладки', icon: '🔘', description: 'Декоративные элементы' },
  'НАВЕСНЫЕ ЗАМКИ': { name: 'Навесные замки', icon: '⛓️', description: 'Все размеры' },
  'ПРУЖИННАЯ ПЕТЛЯ': { name: 'Пружинные петли', icon: '↩️', description: 'Автозакрывание' },
  'РАЗДВИЖНЫЕ СИСТЕМЫ': { name: 'Раздвижные системы', icon: '➡️', description: 'Экономия пространства' },
  'СЕРДЕЦЕВИНЫ': { name: 'Цилиндры', icon: '🗝️', description: 'Сердцевины и цилиндры' },
  'СКОБЫ ДЛЯ ДВЕРНЫХ РУЧЕК': { name: 'Скобы', icon: '🔗', description: 'Для мебельных ручек' },
  'СКРЫТАЯ ПЕТЛЯ': { name: 'Скрытые петли', icon: '👁️', description: 'Невидимый монтаж, 119 фото' },
  'УПОРЫ ДВЕРНЫЕ': { name: 'Упоры дверные', icon: '🛑', description: 'Защита стен и дверей' },
  'ФИКСАТОРЫ': { name: 'Фиксаторы', icon: '✓', description: 'Для раздвижных дверей' },
  'ЭЛЕКТРОННЫЕ ДВЕРНЫЕ ЗАМКИ': { name: 'Электронные замки', icon: '📱', description: 'Smart-замки и аксессуары' },
  'ВРЕЗНЫЕ ПЕТЛИ': { name: 'Врезные петли', icon: '⚙️', description: 'Универсальные петли' },
  'ДОВОДЧИКИ ДВЕРНЫЕ': { name: 'Доводчики', icon: '↪️', description: 'Плавное закрывание' },
  'WC-комплект с ключом': { name: 'WC комплекты', icon: '🚽', description: 'Для санузлов' },
};

// Функция для транслитерации
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
      const subcategoryData = scanDirectory(fullPath, relPath);
      if (subcategoryData.images.length > 0 || Object.keys(subcategoryData.subcategories).length > 0) {
        result.subcategories[item.name] = subcategoryData;
      }
    } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(item.name)) {
      result.images.push({
        filename: item.name,
        path: `/images/products/${relPath.replace(/\\/g, '/')}`,
        size: fs.statSync(fullPath).size
      });
    }
  }

  return result;
}

// Подсчёт количества изображений рекурсивно
function countImages(data) {
  let count = data.images.length;
  for (const sub of Object.values(data.subcategories)) {
    count += countImages(sub);
  }
  return count;
}

// Получение первого изображения для превью
function getFirstImage(data) {
  if (data.images.length > 0) {
    return data.images[0].path;
  }
  for (const sub of Object.values(data.subcategories)) {
    const img = getFirstImage(sub);
    if (img) return img;
  }
  return null;
}

// Получение всех изображений плоским списком
function getAllImages(data, result = []) {
  result.push(...data.images.map(img => img.path));
  for (const sub of Object.values(data.subcategories)) {
    getAllImages(sub, result);
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
      
      const totalImages = countImages(data);
      if (totalImages === 0) return null;

      const config = CATEGORY_NAMES[folderName] || { 
        name: folderName, 
        icon: '📦', 
        description: `${totalImages} фото` 
      };

      // Собираем подкатегории
      const subcategoriesList = Object.entries(data.subcategories).map(([name, subData]) => ({
        id: transliterate(name).toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name,
        displayName: name.replace(/[_-]/g, ' ').trim(),
        images: subData.images.map(img => img.path),
        totalImages: countImages(subData),
        previewImage: getFirstImage(subData)
      }));

      return {
        id: transliterate(folderName).toLowerCase().replace(/[^a-z0-9]/g, '-'),
        folderName,
        name: config.name,
        icon: config.icon,
        description: config.description,
        totalImages,
        previewImage: getFirstImage(data),
        allImages: getAllImages(data),
        subcategories: subcategoriesList,
        hasSubcategories: subcategoriesList.length > 0
      };
    })
    .filter(Boolean)
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
  console.log('\n📋 Категории (по количеству фото):');
  categories.forEach((cat, i) => {
    const subInfo = cat.hasSubcategories ? ` (${cat.subcategories.length} подкатегорий)` : '';
    console.log(`   ${i + 1}. ${cat.icon} ${cat.name} — ${cat.totalImages} фото${subInfo}`);
  });

  return catalog;
}

// Запуск
generateCatalog();
