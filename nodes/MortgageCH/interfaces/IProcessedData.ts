export default interface IProcessedData {
    rateSettings: {
        name: string,
        rate: number,
        total: number,
        interest: number,
        monthly: number,
    }[];
    language: string;
}