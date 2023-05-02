import fs from 'fs';
import { getPrinterApi } from './getPrinter.js';

const config = JSON.parse(fs.readFileSync('./config.json'));

const printer = getPrinterApi()

printer.print(config.filePath).then(value => {
    console.log("sent")
}).catch(err => {
    console.log(`error : ${err}`)
});