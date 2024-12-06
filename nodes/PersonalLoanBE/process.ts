import axios from "axios";
import IInput from "./interface/IInput";
import IProcessedData from "./interface/IProcessedData";
import { getInterest, getMonthly } from "./utils";

export async function process(input: IInput): Promise<IProcessedData> {
  let url =
    "https://pnbpasamidjpaqxsprtm.supabase.co/rest/v1/data_pret_personel?select=*&amount=lte." +
    input.amount +
    "&limit=1" +
    "&durationSlider=eq." +
    input.duration;

  // We make the request, firstly to get the amount, from the approximation inputed
  let response = await axios.get(url, {
    headers: { apiKey: input.apiKey, Authorization: `Bearer ${input.apiKey}` },
  });

  input.amount = response.data[0].amount;
  input.duration = response.data[0].durationSlider;

  //Then we fetch again, with the exact closest amount value
  url =
    "https://pnbpasamidjpaqxsprtm.supabase.co/rest/v1/data_pret_personel?select=*&amount=eq." +
    input.amount +
    "&durationSlider=eq." +
    input.duration;

  response = await axios.get(url, {
    headers: { apiKey: input.apiKey, Authorization: `Bearer ${input.apiKey}` },
  });

  // Fetch les rows
  const rateSettings = response.data.map((row: any) => {
    const monthly = getMonthly(
      row["rate"],
      row["amount"],
      row["durationSlider"]
    );
    const interest = getInterest(
      monthly,
      parseInt(row["durationSlider"]),
      parseInt(row["amount"])
    );
    return {
      rate: (row["rate"] * 100).toFixed(2) + " %",
      monthly: monthly.toFixed(2) + " €",
      interest: interest.toFixed(2) + " €",
      name: row["name"],
    };
  });

  return {
    rateSettings: rateSettings,
  };
}
