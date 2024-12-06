import Pipeline from "./Pipeline";

describe("Persona Loan BE", () => {
  let instance: Pipeline;

  beforeEach(() => {
    // Create a new instance of MyClass before each test.
    instance = new Pipeline();
  });

  test("Basic test NL", async () => {
    const input = {
      duration: "24 maanden",
      amount: "5000",
      apiKey: process.env.SUPABASE_CLIENT_ANON_KEY ?? "",
    };
    const outputList = [
      "cofidis_feature1",
      "cofidis_feature2",
      "cofidis_feature3",
      "cofidisMyline_feature1",
      "cofidisMyline_feature2",
      "cofidisMyline_feature3",
    ];

    const expectedOutput = {
      cofidis_feature1: "8.99 %",
      cofidis_feature2: "228.40 €",
      cofidis_feature3: "481.62 €",
      cofidisMyline_feature1: "8.99 %",
      cofidisMyline_feature2: "228.40 €",
      cofidisMyline_feature3: "481.62 €",
    };

    const result = await instance.execute(input, outputList);

    expect(result[0].json).toStrictEqual(expectedOutput);
  });

  test("Basic test FR", async () => {
    const input = {
      duration: "24 mois",
      amount: "5000",
      apiKey: process.env.SUPABASE_CLIENT_ANON_KEY ?? "",
    };

    const outputList = [
      "cofidis_feature1",
      "cofidis_feature2",
      "cofidis_feature3",
      "cofidisMyline_feature1",
      "cofidisMyline_feature2",
      "cofidisMyline_feature3",
    ];

    const expectedOutput = {
      cofidis_feature1: "8.99 %",
      cofidis_feature2: "228.40 €",
      cofidis_feature3: "481.62 €",
      cofidisMyline_feature1: "8.99 %",
      cofidisMyline_feature2: "228.40 €",
      cofidisMyline_feature3: "481.62 €",
    };

    const result = await instance.execute(input, outputList);

    expect(result[0].json).toStrictEqual(expectedOutput);
  });

});
