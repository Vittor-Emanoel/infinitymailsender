import * as fs from 'node:fs'
import * as path from 'node:path'
import csv from 'csv-parser'

// Define an interface for the CSV row structure
interface CsvRow {
  [key: string]: string | number
}

/**
			
Read and parse a CSV file
@param filePath Path to the CSV file
@returns Promise resolving to an array of parsed CSV rows*/
async function readCsvFile(filePath: string): Promise<CsvRow[]> {
  return new Promise((resolve, reject) => {
    const results: CsvRow[] = []

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data: CsvRow) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', error => reject(error))
  })
}

readCsvFile('')

const filePath = path.join(__dirname, 'src', 'assets', 'test_emails.xlsx')

const haha = async () => {
  const csvData = await readCsvFile(filePath)
  console.log(csvData)
}

haha()
