import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
import Pipeline from "./Pipeline";

export class MotoInsuranceBE implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Hellosafe Moto Insurance BE",
    name: "motoInsuranceBE",
    icon: "file:hellosafe.svg",
    group: ["transform"],
    version: 1,
    description: "Workflow of Moto Insurance in Belgium ",
    defaults: {
      name: "Moto Insurance BE",
    },
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
