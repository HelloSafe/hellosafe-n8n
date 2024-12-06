import IInput from "./interface/IInput";

export async function parse(rawInputs: any): Promise<IInput> {
  const apiKey = process.env.SUPABASE_CLIENT_ANON_KEY ?? "";

  // We get the inputs and format it
  let amount = rawInputs.amount ? parseInt(rawInputs.amount) : 5000;
  let duration = rawInputs?.duration ? parseInt(rawInputs.duration.match(/\d+/)) : 24;

  return {
    duration: duration,
    amount: amount,
    apiKey: apiKey,
  };
}
