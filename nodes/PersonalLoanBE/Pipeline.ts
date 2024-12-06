import { INodeExecutionData } from "n8n-workflow";
import BasePipeline from "../../srcs/interfaces/BasePipeline";
import IInput from "./interface/IInput";
import IProcessedData from "./interface/IProcessedData";
import { parse } from "./parse";
import { process } from "./process";
import { prepare } from "./prepare";
import validate from "./validate";

export default class Pipeline extends BasePipeline<IInput, IProcessedData> {
  validate(input: IInput): boolean | never {
    return validate(input);
  }

  async parse(rawInputs: any): Promise<IInput> {
    return parse(rawInputs);
  }

  async process(input: IInput): Promise<IProcessedData> {
    return process(input);
  }

  async prepare(
    output: IProcessedData,
    outputList: string[]
  ): Promise<INodeExecutionData[]> {
    return prepare(output, outputList);
  }
}
