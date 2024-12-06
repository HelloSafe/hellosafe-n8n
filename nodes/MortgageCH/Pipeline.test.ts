import Pipeline from "./Pipeline";

describe("MortgageCH", () => {
  let instance: Pipeline;

  beforeEach(() => {
    // Create a new instance of MyClass before each test.
    instance = new Pipeline();
  });

  test("it should pass with filter settings 1", async () => {
    const input = {
      duration: "10",
      amount: "100000",
      locale: "fr-CH",
    };
    const outputList = [
      "hypo21PostFinance1_price",
      "hypo21PostFinance1_feature1",
      "hypo21PostFinance1_feature2",
      "hypo21PostFinance1_feature3",
      "hypo21Swisslife1_price",
      "hypo21Swisslife1_feature1",
      "hypo21Swisslife1_feature2",
      "hypo21Swisslife1_feature3",
    ];

    const expectedOutput = {
        hypo21PostFinance1_price: "843.42 CHF",
        hypo21PostFinance1_feature1: "1 210 CHF",
        hypo21PostFinance1_feature2: "101 210 CHF",
        hypo21PostFinance1_feature3: "1,21 %",
      
        hypo21Swisslife1_price: "845.08 CHF",
        hypo21Swisslife1_feature1: "1 410 CHF",
        hypo21Swisslife1_feature2: "101 410 CHF",
        hypo21Swisslife1_feature3: "1,41 %",
      };
      

    const result = await instance.execute(input, outputList);

    expect(result[0].json).toStrictEqual(expectedOutput);
  });
});
