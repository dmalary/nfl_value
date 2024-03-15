import { gotScraping } from 'got-scraping';
import * as fs from "fs";

const crawl = (url, name) => {
  (async () => {
    try {
      gotScraping
        .get(url)
        .then( ({ body }) => 
          // console.log(body)

          fs.writeFileSync(`./pages/${name}.txt`, body)
          )
    } catch (err) {
      if (err) console.log(err.res.body)
    }
  })();
}
// crawl('https://www.drafttek.com/NFL-Trade-Value-Chart.asp', 'rich-hill_draft-value')


const run = () => {
  // crawl('https://www.drafttek.com/NFL-Trade-Value-Chart.asp', 'rich-hill_draft-value')
  crawl('https://overthecap.com/draft-trade-value-chart', 'fitzgerald-spielberger_draft-value')
  console.log('========== CRAWL COMPLETE ==========')
}
run();