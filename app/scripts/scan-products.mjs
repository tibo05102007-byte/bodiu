/**
 * Скрипт для сканирования папки с фотографиями товаров
 * и генерации JSON-каталога с фильтрами по цветам
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Конфигурация
const PRODUCTS_DIR = path.join(__dirname, '../public/images/products');
const OUTPUT_FILE = path.join(__dirname, '../src/data/products-catalog.json');

// Исключаемые папки
const EXCLUDE_FOLDERS = ['auto', 'real', 'duplicates', 'дубликаты', 'копии', 'temp', 'tmp'];

// Цвета для Apollo
const APOLLO_COLORS = {
  'БЕЛЫЕ APOLLO': { name: 'Белый', color: '#FFFFFF', bg: '#F5F5F5' },
  'БРОНЗА APOLLO': { name: 'Бронза', color: '#CD7F32', bg: '#F5E6D3' },
  'ЗОЛОТО apollo': { name: 'Золото', color: '#FFD700', bg: '#FFF8DC' },
  'МАТОВЫЙ ЧЕРНЫЙ НИКЕЛЬ APOLLO': { name: 'Мат. чёрный никель', color: '#4A4A4A', bg: '#E8E8E8' },
  'серебро APOLLO': { name: 'Серебро', color: '#C0C0C0', bg: '#F0F0F0' },
  'Французское золото APOLLO': { name: 'Франц. золото', color: '#D4AF37', bg: '#F9F6E8' },
  'ХРОМ apollo': { name: 'Хром', color: '#E8E8E8', bg: '#F8F8F8' },
  'ЧЕРНЫЕ APOLLO': { name: 'Чёрный', color: '#000000', bg: '#333333' },
};

// Цвета для Status
const STATUS_COLORS = {
  'Slim': { name: 'Slim', color: '#C0C0C0', bg: '#E8E8E8' },
  'графит статус': { name: 'Графит', color: '#555555', bg: '#CCCCCC' },
  'Золото Статус': { name: 'Золото', color: '#FFD700', bg: '#FFF8DC' },
  'серебро статус': { name: 'Серебро', color: '#C0C0C0', bg: '#F0F0F0' },
  'ЧЕРНЫЕ СТАТУС': { name: 'Чёрный', color: '#000000', bg: '#333333' },
};

// Сопоставление названий категорий
const CATEGORY_NAMES = {
  'РУЧКИ': { name: 'Ручки', icon: '', description: '500+ моделей в разных цветах' },
  'ДВЕРНЫЕ МЕХАНИЗМЫ': { name: 'Дверные механизмы', icon: '', description: 'Магнитные, механические, пластиковые' },
  'ДВЕРНЫЕ НАВЕСЫ': { name: 'Дверные навесы', icon: '', description: 'Бабочки, карточные петли' },
  'ЗАДВИЖКИ': { name: 'Задвижки', icon: '', description: 'Дополнительная защита' },
  'ЗАЩЕЛКИ': { name: 'Защёлки', icon: '', description: 'Надёжная фиксация' },
  'НАКЛАДКИ': { name: 'Накладки', icon: '', description: 'Декоративные элементы' },
  'НАВЕСНЫЕ ЗАМКИ': { name: 'Навесные замки', icon: '', description: 'Все размеры' },
  'ПРУЖИННАЯ ПЕТЛЯ': { name: 'Пружинные петли', icon: '', description: 'Автозакрывание' },
  'РАЗДВИЖНЫЕ СИСТЕМЫ': { name: 'Раздвижные системы', icon: '', description: 'Экономия пространства' },
  'СЕРДЕЦЕВИНЫ': { name: 'Цилиндры', icon: '', description: 'Сердцевины и цилиндры' },
  'СКОБЫ ДЛЯ ДВЕРНЫХ РУЧЕК': { name: 'Скобы', icon: '', description: 'Для мебельных ручек' },
  'СКРЫТАЯ ПЕТЛЯ': { name: 'Скрытые петли', icon: '', description: 'Невидимый монтаж, 119 фото' },
  'УПОРЫ ДВЕРНЫЕ': { name: 'Упоры дверные', icon: '', description: 'Защита стен и дверей' },
  'ФИКСАТОРЫ': { name: 'Фиксаторы', icon: '', description: 'Для раздвижных дверей' },
  'ЭЛЕКТРОННЫЕ ДВЕРНЫЕ ЗАМКИ': { name: 'Электронные замки', icon: '', description: 'Smart-замки и аксессуары' },
  'ВРЕЗНЫЕ ПЕТЛИ': { name: 'Врезные петли', icon: '', description: 'Универсальные петли' },
  'ДОВОДЧИКИ ДВЕРНЫЕ': { name: 'Доводчики', icon: '', description: 'Плавное закрывание' },
  'WC-комплект с ключом': { name: 'WC комплекты', icon: '', description: 'Для санузлов' },
};

// Нормализация названий брендов
function normalizeBrandName(name) {
  const upper = name.toUpperCase();
  
  // Apollo варианты
  if (upper.includes('APOLLO') || upper.includes('АПОЛЛО') || upper.includes('АПОЛО')) {
    return 'Apollo';
  }
  
  // Status варианты  
  if (upper.includes('STATUS') || upper.includes('СТАТУС')) {
    return 'Status';
  }
  
  // Diamond
  if (upper.includes('DIAMOND') || upper.includes('ДАЙМОНД') || upper.includes('ДАЙМОНД')) {
    return 'Diamond';
  }
  
  // Для остальных - очищаем и форматируем
  return name
    .replace(/[_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Транслитерация
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

// Проверка, нужно ли исключить папку
function shouldExclude(name) {
  const lower = name.toLowerCase();
  return EXCLUDE_FOLDERS.some(excluded => lower.includes(excluded.toLowerCase()));
}

// Рекурсивное сканирование
function scanDirectory(dirPath, relativePath = '') {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  const result = { images: [], subcategories: {} };

  for (const item of items) {
    if (shouldExclude(item.name)) continue;

    const fullPath = path.join(dirPath, item.name);
    const relPath = path.join(relativePath, item.name);

    if (item.isDirectory()) {
      const subData = scanDirectory(fullPath, relPath);
      if (subData.images.length > 0 || Object.keys(subData.subcategories).length > 0) {
        result.subcategories[item.name] = subData;
      }
    } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(item.name)) {
      result.images.push({
        filename: item.name,
        path: `/images/products/${relPath.replace(/\\/g, '/')}`,
      });
    }
  }

  return result;
}

// Подсчёт изображений
function countImages(data) {
  let count = data.images.length;
  for (const sub of Object.values(data.subcategories)) {
    count += countImages(sub);
  }
  return count;
}

// Получить первое изображение
function getFirstImage(data) {
  if (data.images.length > 0) return data.images[0].path;
  for (const sub of Object.values(data.subcategories)) {
    const img = getFirstImage(sub);
    if (img) return img;
  }
  return null;
}

// Получить все изображения
function getAllImages(data, result = []) {
  result.push(...data.images.map(img => img.path));
  for (const sub of Object.values(data.subcategories)) {
    getAllImages(sub, result);
  }
  return result;
}

// Получить цвета для бренда
function getColorsForBrand(brandName, subcategories) {
  const colors = [];
  const colorMap = brandName.toLowerCase().includes('apollo') ? APOLLO_COLORS : 
                   brandName.toLowerCase().includes('статус') ? STATUS_COLORS : null;
  
  if (!colorMap) return colors;

  for (const [folderName, folderData] of Object.entries(subcategories)) {
    const colorInfo = colorMap[folderName];
    if (colorInfo && folderData.images.length > 0) {
      colors.push({
        id: transliterate(folderName).toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name: colorInfo.name,
        folderName: folderName,
        color: colorInfo.color,
        bg: colorInfo.bg,
        images: folderData.images.map(img => img.path),
        count: folderData.images.length,
        preview: folderData.images[0]?.path || null
      });
    }
  }
  
  return colors;
}

// Генерация каталога
function generateCatalog() {
  console.log('🔍 Сканирование:', PRODUCTS_DIR);

  if (!fs.existsSync(PRODUCTS_DIR)) {
    console.error('❌ Папка не найдена:', PRODUCTS_DIR);
    process.exit(1);
  }

  const categories = [];
  
  const rootItems = fs.readdirSync(PRODUCTS_DIR, { withFileTypes: true })
    .filter(item => item.isDirectory() && !shouldExclude(item.name));

  for (const dir of rootItems) {
    const folderName = dir.name;
    const fullPath = path.join(PRODUCTS_DIR, folderName);
    const data = scanDirectory(fullPath, folderName);
    
    const totalImages = countImages(data);
    if (totalImages === 0) continue;

    const config = CATEGORY_NAMES[folderName] || { 
      name: folderName, 
      icon: '📦', 
      description: `${totalImages} фото` 
    };

    // Обрабатываем подкатегории (бренды)
    const subcategoriesList = [];
    const colorFilters = [];
    
    for (const [subName, subData] of Object.entries(data.subcategories)) {
      if (shouldExclude(subName)) continue;
      
      const subTotal = countImages(subData);
      const subId = transliterate(subName).toLowerCase().replace(/[^a-z0-9]/g, '-');
      
      // Получаем цвета для этого бренда
      const colors = getColorsForBrand(subName, subData.subcategories);
      
      // Нормализуем название для отображения
      const normalizedName = normalizeBrandName(subName);
      const displayName = normalizedName !== subName ? normalizedName : subName.replace(/[_-]/g, ' ').trim();
      
      subcategoriesList.push({
        id: subId,
        name: normalizedName,
        displayName: displayName,
        originalName: subName,
        images: getAllImages(subData),
        totalImages: subTotal,
        previewImage: getFirstImage(subData),
        colors: colors,
        hasColors: colors.length > 0
      });
      
      // Добавляем цвета в общий фильтр
      if (colors.length > 0) {
        colorFilters.push(...colors.map(c => ({...c, brandId: subId, brandName: subName})));
      }
    }

    categories.push({
      id: transliterate(folderName).toLowerCase().replace(/[^a-z0-9]/g, '-'),
      folderName,
      name: config.name,
      icon: config.icon,
      description: config.description,
      totalImages,
      previewImage: getFirstImage(data),
      allImages: getAllImages(data),
      subcategories: subcategoriesList,
      colorFilters: colorFilters,
      hasSubcategories: subcategoriesList.length > 0,
      hasColorFilters: colorFilters.length > 0
    });
  }

  categories.sort((a, b) => b.totalImages - a.totalImages);

  const catalog = {
    generatedAt: new Date().toISOString(),
    totalCategories: categories.length,
    totalImages: categories.reduce((sum, cat) => sum + cat.totalImages, 0),
    categories
  };

  // Сохраняем
  const dataDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(catalog, null, 2), 'utf-8');

  console.log('\n✅ Каталог сгенерирован!');
  console.log('📁 Файл:', OUTPUT_FILE);
  console.log('📊 Категорий:', catalog.totalCategories);
  console.log('🖼️ Всего фото:', catalog.totalImages);
  console.log('\n📋 Категории:');
  categories.forEach((cat, i) => {
    const colorInfo = cat.hasColorFilters ? ` (${cat.colorFilters.length} цветов)` : '';
    console.log(`   ${i + 1}. ${cat.icon} ${cat.name} — ${cat.totalImages} фото${colorInfo}`);
  });

  return catalog;
}

generateCatalog();
