import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
import { loadSpeadsheetInfo } from "../../srcs/utils/accessSpreadsheet";
import formalizeString from "../../srcs/utils/formalizeString";
import { getMonthly, getRate, getTotal, roundToNearest05 } from "./utils";

export class MortgageCH implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Hellosafe Mortgage CH",
    name: "MortgageCH",
    group: ["transform"],
    version: 1,
    description: "The Hellosafe Mortgage CH Node",
    defaults: {
      name: "MortgageCH",
    },
    icon: "file:hellosafe.svg",
    inputs: ["main"],
    outputs: ["main"],
    properties: [
      {
        displayName: "OutputList",
        name: "output",
        type: "string",
        default: "",
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const inputs = items[0]?.json.body as any;
    const outputList = (this.getNodeParameter("output", 0) as string).split(
      ", "
    );
    const duration = inputs.duration ?? "10";
    const amount = parseInt(inputs.amount) ?? 20000;

    const spreadSheet = await loadSpeadsheetInfo(
      "165q46QsJ__i43jBUn0nw3EHN4Ofrr2X-NpeMsfA2fBY",
      ["data"]
    );

    const matchingRows = spreadSheet["data"].filter(
      (row: any) => row["Duration"] === duration
    );

    const json: any = {};

    console.log(matchingRows);
    matchingRows.forEach((row: any) => {
      for (let name of outputList) {
        if (
          formalizeString(name)
            .split("_")[0]
            .includes(formalizeString(row["Bank"]))
        ) {
          const rate = getRate(row);
          const total = getTotal(amount, rate ?? 1.0);
          const interest = parseFloat((total - amount).toFixed(2));
          // Price
          if (name.includes("price") && !name.includes("priceSubtitle")) {
            if (!rate) {
              json[name] = "NC";
            } else {
              console.log(total, duration, "ICIII");
              json[name] =
                getMonthly(total, parseInt(duration)) + " CHF";
            }
          } else if (name.includes("feature1")) {
            if (!rate) {
              json[name] = "NC";
            } else {
              // Interest
              json[name] = roundToNearest05(interest) +  " CHF";
            }
          } else if (name.includes("feature2")) {
            if (!rate) {
              json[name] = "NC";
            } else {
              // Total
              json[name] = roundToNearest05(total) + " CHF";
            }
          } else if (name.includes("feature3")) {
            if (!rate) {
              json[name] = "NC";
            } else {
              // Rate
              json[name] = rate.toString().replace(".", ",") + " %";
            }
          }
        }
      }
    });

    const outputItems: INodeExecutionData[] = [];
    outputItems.push({
      json,
    });

    return this.prepareOutputData(outputItems);
  }
}