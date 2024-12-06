import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
import Pipeline from "./Pipeline";

export class PersonalLoanBE implements INodeType {
  description: INodeTypeDescription = {
    displayName: "HelloSafe's Personal Loan BE",
    name: "Personal Loan BE",
    group: ["transform"],
    version: 1,
    description: "Get Price for the Comparator Personal Loan in Belgium",
    defaults: {
      name: "Personal Loan BE",
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
    const rawInputs = this.getInputData()[0]?.json.body as any;
    const outputList = (this.getNodeParameter("output", 0) as string).split(
      ", "
    );

    const pipeline = new Pipeline();
    const outputItems = await pipeline.execute(rawInputs, outputList);

    return this.prepareOutputData(outputItems);
  }
}
