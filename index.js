import { listerBox } from './getMail.js';
import { getPrinterApi } from './getPrinter.js';

export const printer = getPrinterApi()

listerBox()