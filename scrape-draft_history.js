import { CheerioCrawler, Dataset } from 'crawlee';

const crawler = new CheerioCrawler({
  async requestHandler({ request, response, body, contentType, $ }) {
      const data = [];
      
      let n = 2023;

      $('#main > table:nth-child(2) > tr').each((index, el) => {
          data.push({ 
            index: index,
            year: +$(el).find('td:nth-child(1)').text(),
            // year2: +$(el).find('td:nth-child(1)').text() == 0 ? n : n -= 1,
            // position: $('#main > table:nth-child(2) > tr:nth-child(1) > td > h1').text(),
            playerName: $(el).find('td:nth-child(6)').text(), 
            positionRank: +$(el).find('td:nth-child(2)').text(),
            round: +$(el).find('td:nth-child(3)').text(),
            pick: +$(el).find('td:nth-child(4)').text(),
            draftRank: +$(el).find('td:nth-child(5)').text(),
            team: $(el).find('td:nth-child(6)').text(),
            college: $(el).find('td:nth-child(7)').text(),
        });
      });

      // Save the data to dataset.
      await Dataset.pushData({
          url: request.url,
          // html: body,
          data,
      })
  },
});

// await crawler.run(['https://www.drafthistory.com/index.php/positions/qb'])
await crawler.run([
  'https://www.drafthistory.com/index.php/positions/qb',
  'https://www.drafthistory.com/index.php/positions/wr',
  'https://www.drafthistory.com/index.php/positions/rb',
  'https://www.drafthistory.com/index.php/positions/te',
  'https://www.drafthistory.com/index.php/positions/t',
  'https://www.drafthistory.com/index.php/positions/g',
  'https://www.drafthistory.com/index.php/positions/c',
  'https://www.drafthistory.com/index.php/positions/lb',
  'https://www.drafthistory.com/index.php/positions/dt',
  'https://www.drafthistory.com/index.php/positions/de',
  'https://www.drafthistory.com/index.php/positions/db',
  'https://www.drafthistory.com/index.php/positions/k',
  'https://www.drafthistory.com/index.php/positions/p',
]);
console.log('========== CRAWL COMPLETE ==========')

// add fs.writeFile to consolidate storage/datasets into data/ 