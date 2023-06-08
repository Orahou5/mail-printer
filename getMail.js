import { MailListener } from "mail-listener5";
import { printFile, writeAttachment } from './fileManipulation.js';
import { conditions, config } from "./getConfig.js";

var mailListener = new MailListener({
    ...config.mail,
    connTimeout: 10000, // Default by node-imap
    authTimeout: 5000, // Default by node-imap,
    debug: console.log, // Or your custom function with only one incoming argument. Default: null
    autotls: 'never', // default by node-imap
    tlsOptions: { rejectUnauthorized: false },
    mailbox: "INBOX", // mailbox to monitor
    searchFilter: conditions, // the search filter being used after an IDLE notification has been retrieved
    markSeen: true, // all fetched email will be marked as seen and not fetched next time
    fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
    attachments: false, // download attachments as they are encountered to the project directory
    attachmentOptions: { directory: "temp/" } // specify a download directory for attachments
});

mailListener.start();

mailListener.on("server:connected", function(){
    console.log("imapConnected");
});

mailListener.on("error", function(err){
    console.log(err);
});

mailListener.on("attachment", function(attachment, path, seqno){
    const filePath = writeAttachment(attachment);
    printFile(filePath)
});