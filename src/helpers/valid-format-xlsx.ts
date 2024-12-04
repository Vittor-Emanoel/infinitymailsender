export const isXlsxFile = (mimetypeFile: string) => {
  const allowedMimeTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/xlsx",
  ];

  return allowedMimeTypes.includes(mimetypeFile);
};
