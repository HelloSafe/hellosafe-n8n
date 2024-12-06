import Pipeline from "./Pipeline";

describe("MotoInsuranceBe", () => {
  let instance: Pipeline;

  beforeEach(() => {
    // Create a new instance of MyClass before each test.
    instance = new Pipeline();
  });

  test("it should pass with filter settings 1", async () => {
    const input = {
      type: "125 cc",
      local: "fr-BE",
    };
    const outputList = ["dvv_price", "yuzzurc_price"];

    const expectedOutput = {
        dvv_price: "26,35€",
        yuzzurc_price: "30,01€",
    };

    const result = await instance.execute(input, outputList);

    expect(result[0].json).toStrictEqual(expectedOutput);
  });
});
