import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
import { loadSpeadsheetInfo } from "../../srcs/utils/accessSpreadsheet";
import getRowsMatchingAge from "../../srcs/utils/getRowsMatchingAge";
import formalizeString from "../../srcs/utils/formalizeString";

export class HostpitalInsuranceBE implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Hellosafe Hospital Insurance BE",
    name: "HostpitalInsuranceBE",
    group: ["transform"],
    version: 1,
    description: "The Hellosafe Hospital Insurance BE Node",
    defaults: {
      name: "HostpitalInsuranceBE",
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

    const age = parseInt(inputs.age) ?? 30;
    const province = inputs.province ?? "Wallonie";

    const spreadSheet = await loadSpeadsheetInfo(
      "14GwCuDUNWbNKA2AakqMU-3u5IPxxEtT1vwIOLVxJ1CE",
      ["price_settings"]
    );

    const matchingAgeRows = getRowsMatchingAge(
      spreadSheet["price_settings"],
      age,
      "age"
    );

    const matchingFilterRows = matchingAgeRows.filter(
      (row) => row["province"] === province || row["provinceNL"] === province
    );

    const json: any = {};

    matchingFilterRows.forEach((row: any) => {
      for (let name of outputList) {
        if (
          formalizeString(row["name"] + row["logoSubtitle"]).includes(
            formalizeString(name).replace("newaypartners", "").split("_")[0]
          )
        ) {
          if (name.includes("price") && !name.includes("priceSubtitle")) {
            if (json[name] != undefined) {
              let val1 = parseFloat(json[name].replace(/,/g, ".")).toFixed(2);
              let val2 = parseFloat(row["price"].replace(/,/g, ".")).toFixed(2);
              if (val2 < val1) {
                json[name] =
                  parseFloat(row["price"].replace(/,/g, "."))
                    .toFixed(2)
                    .toString()
                    .replace(/\./g, ",") + " €";
              }
            } else {
              json[name] =
                parseFloat(row["price"].replace(/,/g, "."))
                  .toFixed(2)
                  .toString()
                  .replace(/\./g, ",") + " €";
            }
          } else if (name.includes("priceSubtitle")) {
            if (inputs.locale === "nl-BE") {
              json[name] = row["priceSubtitleNL"];
            } else {
              json[name] = row["priceSubtitle"];
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