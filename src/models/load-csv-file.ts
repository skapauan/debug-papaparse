import Papa from 'papaparse'; // minified file for production

import { GenericRow, Result } from './result';

export const loadCsvFile = (file: File) => {
  return new Promise<Result>((resolve, reject) => {
    const result: Result = {
      columns: [],
      rows: [],
      fileName: file.name,
    };

    Papa.parse<GenericRow>(file, {
      worker: true,
      header: true,
      chunkSize: 3000, // in bytes

      chunk: (chunk: Papa.ParseResult<GenericRow>) => {
        console.log('CHUNK', chunk);
        // Get columns from first row of data
        if (result.columns.length === 0) {
          const row = chunk.data[0];
          for (const col in row) {
            result.columns.push(col);
          }
        }
        // Load rows into result
        chunk.data.forEach((row: GenericRow) => {
          result.rows.push(row);
        });
      },

      complete: () => {
        if (result.rows.length > 0) {
          resolve(result);
        } else {
          reject(new Error('This CSV file has no valid rows of data.'));
        }
      },
    });
  });
};
