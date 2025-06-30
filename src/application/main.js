const path = require('path');
const fs = require('fs');
const CsvReadingRepository = require('../infrastructure/CsvReadingRepository');
const XmlReadingRepository = require('../infrastructure/XmlReadingRepository');
const ReadingAnalyzer = require('../domain/ReadingAnalyzer');

(async () => {
  const [,, filePath] = process.argv;
  
  if (!filePath) {
    console.error('Uso: node detectSuspiciousReadings.js <ruta/al/archivo>');
    process.exit(1);
  }

  if (!fs.existsSync(filePath)) {
    console.error(`El archivo "${filePath}" no existe.`);
    process.exit(1);
  }

  const ext = path.extname(filePath).toLowerCase().substring(1);
  let repo;
  if (ext === 'csv') {
    repo = new CsvReadingRepository(filePath);
  } else if (ext === 'xml') {
    repo = new XmlReadingRepository(filePath);
  } else {
    console.error('Formato de archivo no soportado. Usa .csv o .xml');
    process.exit(1);
  }

  try {
    const readings = await repo.fetchAll();
    const analyzer = new ReadingAnalyzer();
    const susp = analyzer.detectSuspicious(readings);

    console.log('| Client ID        | Period   | Value     | Median    |');
    console.log('-------------------------------------------------------');
    susp.forEach(row => {
      console.log(`| ${row.clientId.padEnd(16)} | ${row.period} | ${row.value.toString().padEnd(10)} | ${row.median.toString().padEnd(9)} |`);
    });
  } catch (err) {
    console.error('Error procesando lecturas:', err.message);
    process.exit(1);
  }
})();