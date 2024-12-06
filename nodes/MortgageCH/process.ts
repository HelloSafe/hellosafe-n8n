import { loadSpeadsheetInfo } from "../../srcs/utils/accessSpreadsheet";
import IInput from "./interfaces/IInput";
import IProcessedData from "./interfaces/IProcessedData";
import { getMonthly, getRate, getTotal } from "./utils";

/**
 * Processes structured input data to calculate rates/prices/values/settings.
 * 
 * This function takes structured input, retrieves relevant data from an external 
 * spreadsheet, and calculates rate settings based on input parameters. It returns 
 * a processed object containing detailed financial calculations and metadata.
 * 
 * @param input - The structured input data to be processed.
 * @returns A promise that resolves to the processed data object, including rate 
 *          settings and other calculated information.
 */
export default async function process(input: IInput): Promise<IProcessedData> {

  const spreadSheet = await loadSpeadsheetInfo(
    input.spreadsheetId,
    [input.sheetName]
  );

  console.log(spreadSheet[input.sheetName], "matching row");

  const rateSettings = spreadSheet[input.sheetName].map((row: any) => {
    const rate = getRate(row, input.duration.toString());
    const total = getTotal(input.amount, rate ?? 1.0);
    const interest = parseFloat((total - input.amount).toFixed(2));
    const monthly = getMonthly(total, input.duration)
    return {
      name: row["Bank"],
      rate,
      total,
      interest,
      monthly
    }
  });
  console.log(rateSettings);
  return {
    rateSettings,
    language: input.locale,
  };
}