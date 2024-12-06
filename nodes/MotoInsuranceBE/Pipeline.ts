import { INodeExecutionData } from "n8n-workflow";
import IInput from "./interfaces/IInput";
import IProcessedData from "./interfaces/IProcessedData";
import { parse } from "./parse";
import { prepare } from "./prepare";
import { process } from "./process";
import BasePipeline from "../../srcs/interfaces/BasePipeline";
import validate from "./validate";

export default class Pipeline extends BasePipeline<
  IInput,
  IProcessedData
> {
  validate(input: IInput): boolean | never {
    return validate(input);
  }

  async parse(rawInputs: any): Promise<IInput> {
    return await parse(rawInputs);
  }

  async process(input: IInput): Promise<IProcessedData> {
    return await process(input);
  }

  async prepare(output: IProcessedData, outputList: string[]): Promise<INodeExecutionData[]> {
    return await prepare(output, outputList);
  }
}