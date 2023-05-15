import { simpleParser } from "mailparser";
import { config } from "./getConfig.js";
import { printer } from "./index.js";
import fs from 'fs';

export async function printAttachments(stream) {
    const mail = await simpleParser(stream)
  
    if(mail.attachments.length === 0) return;
    
    mail.attachments.forEach((file) => {
        const path = `${config.filePath}/${file?.filename}`;
        if (!fs.existsSync(config.filePath)) {
            fs.mkdirSync(config.filePath);
        }
        fs.writeFileSync(path, file.content, "binary");
        printFile(path);
    })
}

function printFile(path){
    printer.print(path).then(value => {
        console.log("sent")
        deleteFile(path);
    }).catch(err => {
        console.log(`error : ${err}`)
    });
}

function deleteFile(path){
    fs.unlinkSync(path)
}