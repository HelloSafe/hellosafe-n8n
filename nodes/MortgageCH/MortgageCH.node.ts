import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
import Pipeline from "./Pipeline";

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
        required: true,
        typeOptions: {
          rows: 5,
        },
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    // We get the inputs and set in the good format
    const rawInputs = this.getInputData()[0]?.json.body as any;
    const outputList = (this.getNodeParameter("output", 0) as string).split(
      ", "
    );

    const pipeline = new Pipeline();
    const outputItems = await pipeline.execute(rawInputs, outputList);

    return this.prepareOutputData(outputItems);
  }
}
