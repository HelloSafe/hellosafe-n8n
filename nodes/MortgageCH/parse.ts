import IInput from "./interfaces/IInput";

export async function parse(rawInputs: any): Promise<IInput> {
  const duration = parseInt(rawInputs.duration) ?? 10;
  const amount = parseInt(rawInputs.amount) ?? 20000;
  const spreadsheetId =
    rawInputs.spreadsheetId ?? "165q46QsJ__i43jBUn0nw3EHN4Ofrr2X-NpeMsfA2fBY";
  const sheetName = rawInputs.sheetName ?? "Rates!A:Z";
  const locale = rawInputs.locale.split("-")[0];

  console.log(locale);
  return {
    duration: duration,
    amount: amount,
    spreadsheetId: spreadsheetId,
    sheetName: sheetName,
    locale: locale,
  };
}
