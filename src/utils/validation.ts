export function isNumeric(v: any) {
  return v !== "" && !isNaN(Number(v));
}
