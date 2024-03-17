import { CheerioCrawler, Dataset } from 'crawlee';

const crawler = new CheerioCrawler({
  async requestHandler({ request, response, body, contentType, $ }) {
      const data = [];

      // Do some data extraction from the page with Cheerio.
      $('#main > div > table > tbody > tr').each((index, el) => {
          data.push({ 
            year: '2024',
            team: $(el).find('td:nth-child(1)').text(),
            totalPlayers: $(el).find('td:nth-child(2)').text(),
            totalPlayers: $(el).find('td:nth-child(2)').text(),
            qb: $(el).find('td:nth-child(3) > a > span:nth-child(1)').text(),
            rb: $(el).find('td:nth-child(4) > a > span:nth-child(1)').text(),
            wr: $(el).find('td:nth-child(5) > a > span:nth-child(1)').text(),
            te: $(el).find('td:nth-child(6) > a > span:nth-child(1)').text(),
            ol: $(el).find('td:nth-child(7) > a > span:nth-child(1)').text(),
            dl: $(el).find('td:nth-child(8) > a > span:nth-child(1)').text(),
            lb: $(el).find('td:nth-child(9) > a > span:nth-child(1)').text(),
            db: $(el).find('td:nth-child(10) > a > span:nth-child(1)').text(),
            kpls: $(el).find('td:nth-child(11) > a > span:nth-child(1)').text(),
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

// const run = async () => {
//     for (let i = 10; i < 25; i++) {
//         await crawler.run([`https://www.spotrac.com/nfl/positional/breakdown/20${i}/`]);
//     }
// console.log('========== CRAWL COMPLETE ==========')
// }
// run()
await crawler.run(['https://www.spotrac.com/nfl/positional/breakdown/2024/']);
console.log('========== CRAWL COMPLETE ==========')