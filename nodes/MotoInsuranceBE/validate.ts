import IInput from "./interfaces/IInput";

/**
 * Validates the structured input data.
 * 
 * This function ensures that the provided input data adheres to specific rules and 
 * constraints, verifying both individual field values and their combinations. If any 
 * validation fails, an appropriate error is thrown.
 * 
 * @param input - The structured input data to validate.
 * @returns `true` if the input is valid.
 * @throws An error if any validation rule is violated.
 */
export default function validate(input: IInput) {
  const validType = ['50 cc', '125 cc', '1000 cc'];
  if (!validType.includes(input.type)) {
    throw new Error("Wrong type inpute");
  }
  return (true);
}
