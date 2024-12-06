import { INodeExecutionData } from "n8n-workflow";
import formalizeString from "../../srcs/utils/formalizeString";
import IProcessedData from "./interfaces/IProcessedData";
import { formatNumber } from "../../srcs/utils/formatNumber";

export default async function prepare(
  data: IProcessedData,
  outputList: string[]
): Promise<INodeExecutionData[]> {
  const json: any = {};

  for (let outputName of outputList) {
    const outputNameFirstPart = formalizeString(outputName).split("_")[0];
    const rateSetting = data.rateSettings.find((rateSetting) =>
      outputNameFirstPart.includes(formalizeString(rateSetting.name))
    );
    if (rateSetting) {
      if (
        outputName.includes("price") &&
        !outputName.includes("priceSubtitle")
      ) {
        json[outputName] = formatNumber(
          rateSetting.monthly,
          data.language,
          "",
          " CHF",
          "NC",
          2
        );
      } else if (outputName.includes("feature1")) {
        json[outputName] = formatNumber(
          rateSetting.interest,
          data.language,
          "",
          " CHF",
          "NC",
          null
        );
      } else if (outputName.includes("feature2")) {
        json[outputName] = formatNumber(
          rateSetting.total,
          data.language,
          "",
          " CHF",
          "NC",
          null
        );
      } else if (outputName.includes("feature3")) {
        json[outputName] = formatNumber(
          rateSetting.rate,
          data.language,
          "",
          " %",
          "NC",
          null
        );
      }
    }
  }

  const outputItems: INodeExecutionData[] = [];
  outputItems.push({
    json,
  });
  return outputItems;
}
