import path from "node:path";
import * as XLSX from "xlsx";

export function readExcelWithXLSX(filePath: string) {
  // Lê todo o arquivo
  const workbook = XLSX.readFile(filePath);

  // Pega o primeiro worksheet
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Converte para JSON
  const data = XLSX.utils.sheet_to_json(worksheet);

  console.log("XLSX Method - Data:", data);
  return data;
}

const oi = () => {
  const filePath = path.join(__dirname, "..", "assets", "test_emails.xlsx");

  // Leitura com XLSX
  readExcelWithXLSX(filePath);
};

oi();
