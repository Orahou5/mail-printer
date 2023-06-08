import fs from 'fs';
import { config } from "./getConfig.js";
import { printer } from "./index.js";

const idGenerator = idMaker();

export function writeAttachment(attachment) {
    const path = `${config.filePath}/temp${idGenerator.next().value}.${attachment?.filename?.split(".").at(-1)}`;
    try {
        if (!fs.existsSync(config.filePath)) {
            fs.mkdirSync(config.filePath);
        }
        fs.writeFileSync(path, attachment?.content, "binary");
    } catch (error) {
        console.log(`Writing error for file ${path} : ${error}`)
    }
    
    return path;
}

function* idMaker() {
    let index = 0;
    while (true) {
        yield index++;
        if(index >= 60 * 60 * 20) index = 0;
    }
}

export function printFile(path){
    printer.print(path).then(value => {
        console.log(`Sent file : ${path}`)
        deleteFile(path);
    }).catch(error => {
        console.log(`An error has occured when printing the file ${path} \n ${error}`)
        deleteFile(path);
    });
}

function deleteFile(path){
    try {
        fs.unlinkSync(path)
    } catch (error) {
        console.log(`An error has occured when deleting the file ${path} \n ${err}`)
    }
}