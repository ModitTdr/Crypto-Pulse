export const sanitizeInputDecimal = (input: string) => {
  const value = input.replace(/[^0-9.]/g, "");
  const match = value.match(/^\d*\.?\d{0,8}/);
  return match ? match[0] : "";
}