import fs from 'fs';

export const config = JSON.parse(fs.readFileSync('./config.json'));

export const conditions = []

conditions.push("UNSEEN");

if(!!config.printingKeyword){
    conditions.push(["SUBJECT", config.printingKeyword])
}