import { loadSpeadsheetInfo } from "../../srcs/utils/accessSpreadsheet";
import formalizeString from "../../srcs/utils/formalizeString";
import IInput from "./interfaces/IInput";
import IProcessedData from "./interfaces/IProcessedData";

export async function process(inputs: IInput): Promise<IProcessedData> {
  const spreadSheet = await loadSpeadsheetInfo(inputs.spreadsheetId, [
    inputs.sheetName,
  ]);

  const priceRows = spreadSheet[inputs.sheetName];
  const headersValue = priceRows[0];
  const prices: {
    name: string;
    price: string;
  }[] = [];

  const priceRowsMatch: any = priceRows.filter((row: any, i: number) => {
    return row["type"] == inputs.type;
  });


  Object.entries(headersValue).forEach((offerName: any, index: number) => {
    const item: any = {};
    item.name = formalizeString(offerName[1]);
    item.price = priceRowsMatch[0][offerName[1]];
    prices.push(item);
  });

  return {
    pricesSettings: prices,
  };
}
