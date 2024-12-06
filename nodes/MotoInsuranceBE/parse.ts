import IInput from "./interfaces/IInput";

export async function parse(inputsRaw: any): Promise<IInput> {
    const type = inputsRaw.type ?? "50 cc";
    const spreadsheetId = "1Liyd4BNBtOGCDGzXRqTgCtN2DraiU4TzWa8TFsgrSWw";

    let sheetName: string = 'price NL';
    if (inputsRaw.locale === 'fr-BE') {
        sheetName = 'price';
    }

    sheetName = sheetName + "!A:AA";

    return {
        spreadsheetId: spreadsheetId,
        sheetName: sheetName,
        type: type,
    };
}
