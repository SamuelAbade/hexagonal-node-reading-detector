const fs = require('fs');
const xml2js = require('xml2js');
const Reading = require('../domain/Reading');
const ReadingRepository = require('../domain/ReadingRepository');

class XmlReadingRepository extends ReadingRepository {
  constructor(filePath) {
    super();
    this.file = filePath;
  }

  async fetchAll() {
    const xml = fs.readFileSync(this.file, 'utf8');
    const parsed = await xml2js.parseStringPromise(xml);

    const rootKey = Object.keys(parsed)[0];
    const list = parsed[rootKey]?.reading || [];
    
    return list.map(node => {
      const attrs = node.$ || {};
      const clientId = attrs.clientID;
      const period = attrs.period;
      const value = parseInt(node._ || node, 10);
      return new Reading(clientId, period, value);
    });
  }
}

module.exports = XmlReadingRepository;