export function removeEmptyString(dataList: string[]): string[] {
  return dataList.filter(Boolean);
}
