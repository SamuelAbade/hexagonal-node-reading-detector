const fs = require('fs');
const { parse } = require('csv-parse/sync');
const Reading = require('../domain/Reading');
const ReadingRepository = require('../domain/ReadingRepository');

class CsvReadingRepository extends ReadingRepository {
  constructor(filePath) {
    super();
    this.file = filePath;
  }

  async fetchAll() {
    const content = fs.readFileSync(this.file, 'utf8');
    const rows = parse(content, { columns: false });
    return rows.map(([client, period, val]) => new Reading(client, period, parseInt(val, 10)));
  }
}

module.exports = CsvReadingRepository;