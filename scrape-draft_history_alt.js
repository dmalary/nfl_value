import { CheerioCrawler, Dataset } from 'crawlee';

const crawler = new CheerioCrawler({
  async requestHandler({ request, response, body, contentType, $ }) {
      const data = [];

      $('#drafts > tbody > tr').each((index, el) => {
          data.push({ 
            index: index,
            year: +$(el).find('td:nth-child(7)').text(),
            round: +$(el).find('th').text(),
            pick: +$(el).find('td:nth-child(2)').text(),
            team: $(el).find('td:nth-child(3)').text(),
            position: $(el).find('td:nth-child(5)').text(),
            playerName: $(el).find('td:nth-child(4)').text(), 
            age: +$(el).find('td:nth-child(6)').text(), 
            college: $(el).find('td:nth-child(28)').text(),
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

// await crawler.run(['https://www.pro-football-reference.com/years/2023/draft.htm'])
await crawler.run([
  'https://www.pro-football-reference.com/years/2023/draft.htm',
  'https://www.pro-football-reference.com/years/2022/draft.htm',
  'https://www.pro-football-reference.com/years/2021/draft.htm',
  'https://www.pro-football-reference.com/years/2020/draft.htm',
  'https://www.pro-football-reference.com/years/2019/draft.htm',
  'https://www.pro-football-reference.com/years/2019/draft.htm',
  'https://www.pro-football-reference.com/years/2018/draft.htm',
  'https://www.pro-football-reference.com/years/2017/draft.htm',
  'https://www.pro-football-reference.com/years/2016/draft.htm',
  'https://www.pro-football-reference.com/years/2015/draft.htm',
  'https://www.pro-football-reference.com/years/2014/draft.htm',
  'https://www.pro-football-reference.com/years/2013/draft.htm',
]);
console.log('========== CRAWL COMPLETE ==========')

// add fs.writeFile to consolidate storage/datasets into data/ 