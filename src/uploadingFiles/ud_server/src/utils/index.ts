export function createFile(
  fileContent: string = "I am just a dummy file",
  fileName: string = "dummy_file.txt",
  fileType: string = "text/plain",
): File {
  const blob = new Blob([fileContent], {
    type: fileType,
  });
  const file = new File([blob], fileName, {
    type: fileType,
  });
  return file;
}

export function getPercentage(part: number, total: number): number {
  return (part * 100) / total;
}
