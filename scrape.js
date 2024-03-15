import { gotScraping } from 'got-scraping';
import * as fs from "fs";

const scrape = (url, name) => {
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
// scrape('https://www.drafttek.com/NFL-Trade-Value-Chart.asp', 'rich-hill_draft-value')


const run = () => {
  scrape('https://www.drafttek.com/NFL-Trade-Value-Chart.asp', 'rich-hill_draft-value')
  console.log('========== SCRAPE COMPLETE ==========')
}
run();