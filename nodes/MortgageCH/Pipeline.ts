import { INodeExecutionData } from "n8n-workflow";
import BasePipeline from "../../srcs/interfaces/BasePipeline";
import validate from "./validate";
import { parse } from "./parse";
import process from "./process";
import IInput from "./interfaces/IInput";
import IProcessedData from "./interfaces/IProcessedData";
import prepare from "./prepare";

export default class Pipeline extends BasePipeline<
  IInput,
  IProcessedData
> {
  validate(input: IInput): boolean | never {
    return validate(input);
  }

  async parse(rawInputs: any): Promise<IInput> {
    return parse(rawInputs);
  }

  async process(input: IInput): Promise<IProcessedData> {
    return process(input);
  }

  async prepare(output: IProcessedData, outputList: string[]): Promise<INodeExecutionData[]> {
    return prepare(output, outputList);
  }
}
