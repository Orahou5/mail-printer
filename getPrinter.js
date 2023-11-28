import Os from 'os'
import windowsPrint from "pdf-to-printer";
import unixPrint from "unix-print";

const isWindows = Os.platform() === "win32"

const isMac = Os.platform() === "darwin"

const isUnix = ["aix", "freebsd", "linux", "openbsd", "sunos", "android"].includes(Os.platform());


console.log(isWindows);

console.log(isMac);

console.log(isUnix);

export function getPrinterApi(){
    if(isWindows) return windowsPrint
    else if(isUnix || isMac) return unixPrint
}