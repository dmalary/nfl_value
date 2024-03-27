import { CheerioCrawler, Dataset } from 'crawlee';

const crawler = new CheerioCrawler({
  async requestHandler({ request, response, body, contentType, $ }) {
      const data = [];

      $('#drafts > tbody > tr').each((index, el) => {
          data.push({ 
            index: index,
            key: +`${+$('#meta > div:nth-child(2) > h1 > span:nth-child(1)').text()}${+$(el).find('th').text()}${+$(el).find('td:nth-child(2)').text()}`,
            url: $(el).find('td:nth-child(4) > a').attr('href'),
            year: +$('#meta > div:nth-child(2) > h1 > span:nth-child(1)').text(),
            round: +$(el).find('th').text(),
            pick: +$(el).find('td:nth-child(2)').text(),
            team: $(el).find('td:nth-child(3)').text(),
            position: $(el).find('td:nth-child(5)').text(),
            playerName: $(el).find('td:nth-child(4)').text(), 
            age: +$(el).find('td:nth-child(6)').text(), 
            college: $(el).find('td:nth-child(28)').text(),
            yearsPlayed: +$(el).find('td:nth-child(7)').text() - +$('#meta > div:nth-child(2) > h1 > span:nth-child(1)').text(),
            hof: $(el).find('td:nth-child(4) > i').text() == "HOF",
            // retired: ($(el).has('td:nth-child(4) > strong')),
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

await crawler.run(['https://www.pro-football-reference.com/years/2003/draft.htm'])
// await crawler.run([
//   'https://www.pro-football-reference.com/years/2023/draft.htm',
//   'https://www.pro-football-reference.com/years/2022/draft.htm',
//   'https://www.pro-football-reference.com/years/2021/draft.htm',
//   'https://www.pro-football-reference.com/years/2020/draft.htm',
//   'https://www.pro-football-reference.com/years/2019/draft.htm',
//   'https://www.pro-football-reference.com/years/2019/draft.htm',
//   'https://www.pro-football-reference.com/years/2018/draft.htm',
//   'https://www.pro-football-reference.com/years/2017/draft.htm',
//   'https://www.pro-football-reference.com/years/2016/draft.htm',
//   'https://www.pro-football-reference.com/years/2015/draft.htm',
//   'https://www.pro-football-reference.com/years/2014/draft.htm',
//   'https://www.pro-football-reference.com/years/2013/draft.htm',
//   'https://www.pro-football-reference.com/years/2012/draft.htm',
//   'https://www.pro-football-reference.com/years/2011/draft.htm',
//   'https://www.pro-football-reference.com/years/2010/draft.htm',
//   'https://www.pro-football-reference.com/years/2009/draft.htm',
//   'https://www.pro-football-reference.com/years/2008/draft.htm',
//   'https://www.pro-football-reference.com/years/2007/draft.htm',
//   'https://www.pro-football-reference.com/years/2006/draft.htm',
//   'https://www.pro-football-reference.com/years/2005/draft.htm',
//   'https://www.pro-football-reference.com/years/2004/draft.htm',
//   'https://www.pro-football-reference.com/years/2003/draft.htm',
//   'https://www.pro-football-reference.com/years/2002/draft.htm',
//   'https://www.pro-football-reference.com/years/2001/draft.htm',
//   'https://www.pro-football-reference.com/years/2000/draft.htm',
// ]);
console.log('========== CRAWL COMPLETE ==========')