import { INodeExecutionData } from "n8n-workflow";
import formalizeString from "../../srcs/utils/formalizeString";
import IProcessedData from "./interfaces/IProcessedData";

export async function prepare(
  data: IProcessedData,
  outputList: string[]
): Promise<INodeExecutionData[]> {
  const json: any = {};

  for (let outputName of outputList) {
    const outputNameFirstPart = formalizeString(outputName).split("_")[0];
    const priceSetting = data.pricesSettings.find((pricesSetting) =>
      outputNameFirstPart.includes(formalizeString(pricesSetting.name))
    );
    if (priceSetting) {
      if (
        outputName.includes("price") &&
        !outputName.includes("priceSubtitle") &&
        formalizeString(outputName).includes(priceSetting.name)
      ) {
        json[outputName] = priceSetting.price;
      }
    }
  }

  const outputItems: INodeExecutionData[] = [];
  outputItems.push({
    json,
  });
  return outputItems;
}
