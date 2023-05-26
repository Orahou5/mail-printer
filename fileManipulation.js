import { simpleParser } from "mailparser";
import { config } from "./getConfig.js";
import { printer } from "./index.js";
import fs from 'fs';

const idGenerator = idMaker();

export async function printAttachments(stream) {
    const mail = await simpleParser(stream)
  
    if(mail.attachments.length === 0) return;

    mail.attachments.forEach(file => {
        const path = `${config.filePath}/temp${idGenerator.next().value}`;
        if (!fs.existsSync(config.filePath)) {
            fs.mkdirSync(config.filePath);
        }
        fs.writeFileSync(path, file.content, "binary");
        printFile(path);
    })
}

function* idMaker() {
    let index = 0;
    while (true) {
      yield index++;
      if(index >= 60 * 60 * 20) index = 0;
    }
  }

function printFile(path){
    printer.print(path).then(value => {
        console.log("sent")
        deleteFile(path);
    }).catch(error => {
        console.log(`An error has occured when printing the file ${path} \n ${error}`)
    });
}

function deleteFile(path){
    try {
        fs.unlinkSync(path)
    } catch (error) {
        console.log(`An error has occured when deleting the file ${path} \n ${err}`)
    }
}