import ItraExcelCreator from "../tools/excel-creators/itra-excel-creator.js";
import UtmbExcelCreator from "../tools/excel-creators/utmb-excel-creator.js";
import LhutResultParser from "../tools/result-parsers/lhut-result-parser.js";

async function main() {
  const data = await new LhutResultParser("2023", "ultra").getData();

  await new ItraExcelCreator("lhut-2023-ultra-itra.xlsx").generate(data);
  await new UtmbExcelCreator("lhut-2023-ultra-utmb.xlsx").generate(data);
}

await main();
