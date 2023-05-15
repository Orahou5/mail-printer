import Imap from "imap";
import { printAttachments } from "./fileManipulation.js";
import { conditions, config } from "./getConfig.js";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const imap = new Imap(config.imap)

export function listerBox() {
  imap.once("error", console.error);
  imap.on("ready", () => {
    imap.openBox("INBOX", false, (error, box) => {
      if (error) throw error;
      
      console.log('Connected!')

      searchNewValidMessage();

      imap.on("mail",  () => {
        console.log("New one!")
        searchNewValidMessage();
      })
    });
  });

  imap.connect();
}

function searchNewValidMessage(){
  imap.search(conditions, function(err, results) {
    if (err || !results.length) return console.log("No matching message")
 
    // fetch all resulting messages
    const f = imap.fetch(results, { bodies: '', markSeen: true });
    f.on('message', function(msg) {
      msg.on('body', function(stream) {
        printAttachments(stream);
      });
    });
    f.once('error', function(err) {
      console.log('Fetch error: ' + err);
    });
    f.once('end', function() {
      console.log('Done fetching all messages!');
    })
  })
}

imap.once("close", () => {
  console.log("closed")
  setTimeout(() => {
    imap.connect();
  }, 15 * 60 * 1000)
  
})