/**
 * Скрипт для безопасного удаления дубликатов фото
 * Удаляет:
 * 1. Файлы с (1), (2) и т.д. в имени — явные дубликаты Windows
 * 2. Файлы с похожими номерами (IMG_0313, IMG_0314) — одинаковые модели
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_DIR = path.join(__dirname, '../public/images/products');
const BACKUP_FILE = path.join(__dirname, '../removed-files-backup.txt');

// Извлекаем базовое имя (без номера)
function getBaseName(filename) {
  // Убираем расширение
  const name = filename.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '');
  // Убираем номер в конце (_1234 или просто цифры)
  return name.replace(/[_-]?\d+$/, '').toLowerCase().trim();
}

// Группируем файлы по базовому имени
function groupByBaseName(files) {
  const groups = {};
  for (const file of files) {
    const base = getBaseName(file.name);
    if (!groups[base]) groups[base] = [];
    groups[base].push(file);
  }
  return groups;
}

// Рекурсивно находим все файлы
function findAllFiles(dir, relativePath = '') {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    const relPath = path.join(relativePath, item.name);
    
    if (item.isDirectory()) {
      files.push(...findAllFiles(fullPath, relPath));
    } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(item.name)) {
      const stats = fs.statSync(fullPath);
      files.push({
        name: item.name,
        fullPath: fullPath,
        relativePath: relPath,
        size: stats.size,
        mtime: stats.mtime
      });
    }
  }
  
  return files;
}

function main() {
  console.log('🔍 Поиск дубликатов...\n');
  
  const allFiles = findAllFiles(PRODUCTS_DIR);
  console.log(`📊 Всего файлов: ${allFiles.length}`);
  
  const toDelete = [];
  
  // 1. Находим файлы с (1), (2) — явные дубликаты
  for (const file of allFiles) {
    if (/\(\d+\)/.test(file.name)) {
      toDelete.push({
        ...file,
        reason: 'Явный дубликат Windows (1), (2)...'
      });
    }
  }
  
  // 2. Группируем по базовому имени и находим дубликаты
  const groups = groupByBaseName(allFiles.filter(f => !/\(\d+\)/.test(f.name)));
  
  for (const [baseName, files] of Object.entries(groups)) {
    if (files.length > 1) {
      // Сортируем по номеру (IMG_0313 < IMG_0314)
      files.sort((a, b) => a.name.localeCompare(b.name));
      
      // Оставляем первый, остальные — дубликаты
      for (let i = 1; i < files.length; i++) {
        toDelete.push({
          ...files[i],
          reason: `Дубликат модели "${baseName}" (оставлен: ${files[0].name})`
        });
      }
    }
  }
  
  console.log(`\n⚠️  Найдено дубликатов: ${toDelete.length}`);
  
  if (toDelete.length === 0) {
    console.log('\n✅ Дубликатов не найдено!');
    return;
  }
  
  // Показываем что будет удалено
  console.log('\n📋 Список файлов для удаления:');
  console.log('─'.repeat(80));
  
  // Группируем по папкам для наглядности
  const byFolder = {};
  for (const file of toDelete) {
    const folder = path.dirname(file.relativePath);
    if (!byFolder[folder]) byFolder[folder] = [];
    byFolder[folder].push(file);
  }
  
  for (const [folder, files] of Object.entries(byFolder).sort()) {
    console.log(`\n📁 ${folder}/`);
    for (const file of files.sort((a, b) => a.name.localeCompare(b.name))) {
      console.log(`   ❌ ${file.name.padEnd(30)} | ${(file.size / 1024).toFixed(1)} KB | ${file.reason}`);
    }
  }
  
  console.log('\n' + '─'.repeat(80));
  
  // Запрашиваем подтверждение
  console.log('\n⚡ Действия:');
  console.log('1. Удалить все дубликаты (y)');
  console.log('2. Сохранить список в файл и выйти (s)');
  console.log('3. Отмена (n)');
  
  // Для автоматического запуска без prompt — проверяем аргументы
  const args = process.argv.slice(2);
  const autoConfirm = args.includes('--yes') || args.includes('-y');
  
  if (autoConfirm) {
    console.log('\n🚀 Автоматическое удаление (--yes)...\n');
    performDeletion(toDelete);
  } else {
    console.log('\n⏳ Запустите с флагом --yes для автоматического удаления:');
    console.log('   node scripts/remove-duplicates.mjs --yes');
    console.log('\n💾 Сохраняю список в файл...');
    
    // Сохраняем список
    const backup = toDelete.map(f => `${f.fullPath} | ${f.reason}`).join('\n');
    fs.writeFileSync(BACKUP_FILE, `Файлы для удаления (${new Date().toISOString()}):\n\n${backup}`, 'utf-8');
    console.log(`✅ Список сохранен: ${BACKUP_FILE}`);
  }
}

function performDeletion(toDelete) {
  let deletedCount = 0;
  let errorCount = 0;
  const deletedList = [];
  
  for (const file of toDelete) {
    try {
      fs.unlinkSync(file.fullPath);
      deletedList.push(file.fullPath);
      deletedCount++;
      console.log(`✅ Удален: ${file.relativePath}`);
    } catch (err) {
      errorCount++;
      console.log(`❌ Ошибка: ${file.relativePath} — ${err.message}`);
    }
  }
  
  // Сохраняем бэкап-список
  if (deletedList.length > 0) {
    const backup = deletedList.join('\n');
    fs.writeFileSync(BACKUP_FILE, `Удаленные файлы (${new Date().toISOString()}):\n\n${backup}`, 'utf-8');
  }
  
  console.log(`\n📊 Результат:`);
  console.log(`   ✅ Удалено: ${deletedCount}`);
  console.log(`   ❌ Ошибок: ${errorCount}`);
  console.log(`   💾 Бэкап-список: ${BACKUP_FILE}`);
}

main();
