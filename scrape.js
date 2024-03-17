import fs from 'fs';
// import crawlee from 'crawlee';
// import { BasicCrawler, Dataset } from 'crawlee';
import { CheerioCrawler, Dataset } from 'crawlee';


// const crawler = new BasicCrawler({
//     async requestHandler({ sendRequest, log }) {
//         const url = './pages/rich-hill_draft-value.txt';
//         // const url = 'https://www.drafttek.com/NFL-Trade-Value-Chart.asp';

//         // const res = await sendRequest({ url: });
//         // log.info('received body', res.body);
//         const { body } = await sendRequest({ url: url});
//         log.info('received body', body);

//         await Dataset.pushData({
//           url,
//           html: body,
//         });
//     },
// });
// await crawler.run();
// console.log('========== CRAWL COMPLETE ==========')

// const crawler = new CheerioCrawler({
//   async requestHandler({ request, response, body, contentType, $ }) {
//       const data = [];

//       // Do some data extraction from the page with Cheerio.
//       $('#content > table > tbody > tr').each((index, el) => {
//           // data.push({ title: $(el).find('.some-title').text() });
//           // data.push({ tradeValueDataA: $(el).find('.TradeValueDataA').html() });
//           data.push({ test: index });
//       });

//       // Save the data to dataset.
//       await Dataset.pushData({
//           url: request.url,
//           // html: body,
//           data,
//       })
//   },
// });

// await crawler.run(['https://www.drafttek.com/NFL-Trade-Value-Chart.asp']);

const crawler = new CheerioCrawler({
  async requestHandler({ request, response, body, contentType, $ }) {
      const data = [];

      // Do some data extraction from the page with Cheerio.
      $('#mw-content-text > div.mw-content-ltr.mw-parser-output > table > tbody > tr').each((index, el) => {
          data.push({ name: $(el).find('td:nth-child(2)').text() });
      });

      // Save the data to dataset.
      await Dataset.pushData({
          url: request.url,
          // html: body,
          data,
      })
  },
});

await crawler.run(['https://en.wikipedia.org/wiki/List_of_yokozuna']);


console.log('========== CRAWL COMPLETE ==========')