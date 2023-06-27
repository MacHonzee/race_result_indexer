import Exceljs from "exceljs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

class ExcelCreator {
  /**
   * Creates instance of ExcelCreator.
   *
   * @param {string} filename Name of output file that will be created in ./outputs folder.
   * @param {Object.<string, {value: string, width: number}>} headers Object where each key will be used as data key and value.value as a header row.
   */
  constructor(filename, headers) {
    this.filename = filename;
    this.headers = headers;
  }

  /**
   * Generate Excel file.
   *
   * @param {Array<object>} data Array of data objects. Structure of object should match headers.
   */
  async generate(data) {
    const workbook = new Exceljs.Workbook();
    const worksheet = workbook.addWorksheet("Data");

    // Convert headers object to array and add headers to the worksheet
    worksheet.columns = Object.keys(this.headers).map((key) => {
      const headerInfo = this.headers[key];
      return {
        header: headerInfo.value,
        key: key,
        width: headerInfo.width, // Use the width from the headers map
      };
    });

    // Add data to the worksheet
    data.forEach((item) => {
      worksheet.addRow(item);
    });

    // Calculate __dirname equivalent for ESM
    const __dirname = dirname(fileURLToPath(import.meta.url));

    // Write workbook to file
    const outputPath = resolve(__dirname, `../../outputs/${this.filename}`);
    await workbook.xlsx.writeFile(outputPath);
    console.log(`File is saved under: ${outputPath}`);
  }
}

export default ExcelCreator;
