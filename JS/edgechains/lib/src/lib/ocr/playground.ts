import { DocumentOcr } from ".";
import fs from "fs";


const documentOcr = new DocumentOcr({
    standardFontDataUrl: "./node_modules/pdfjs-dist/standard_fonts/" // optional, defaults to "https://unpkg.com/pdfjs-dist@3.5.141/standard_fonts/". You can use the systems fonts or the fonts under ./node_modules/pdfjs-dist/standard_fonts/ as well.
});

function readPdfFileToBuffer(filePath) {
  const pdfBuffer = fs.readFileSync(filePath);
  return pdfBuffer;
}

const pdfFilePath = './markedUp.pdf';
const pdfBuffer = readPdfFileToBuffer(pdfFilePath);

async function processData() {
const documentData = await documentOcr.process({
    document: pdfBuffer, // Base64 String, Base64 URI, or Buffer
    mimeType: 'application/pdf', // mime-type of the document or image
    prompt: 'Multifamily, Retail, Office, Industrial/Warehouse, Land, Special Purpose, Low Rise, Mid Rise, High Rise, Mixed Use, Loft, Condominium, Student Housing, Age Restricted, Low Income, Rent Restricted, Independent Living, Assisted Living, Continuing Care, Nursing Care', // system prompt for data extraction. See examples below.
  });
console.log(documentData);
};

processData();