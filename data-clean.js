import * as fs from "fs";
import * as path from "path";

const dir = './storage/datasets/default';

const data = [];

const clean = () => {
  const filenames = fs.readdirSync(dir); 
  
  filenames.forEach(file => { 
    // console.log(file); 

    fs.readFile(`./storage/datasets/default/${file}`, 'utf8', (err, file) => {
      try {
        const datum = JSON.parse(file)
        // console.log(datum.data.length)

        data.push(datum.data)
        // data.length === 24 && console.log('first', data.flatMap(d => d))
        data.length === 24 && fs.writeFileSync('data.json', JSON.stringify(data.flatMap(d => d), null, 4), err)

      } catch (err) {
        console.error('Error while parsing JSON data:', err)
      }
    })
  })
}
clean()