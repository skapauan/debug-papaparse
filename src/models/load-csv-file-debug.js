import Papa from 'papaparse/papaparse'; // non-minified file for debugging

export const loadCsvFile = (file) => {
  return new Promise((resolve, reject) => {
    const result = {
      columns: [],
      rows: [],
      fileName: file.name,
    };

    Papa.parse(file, {
      worker: true,
      header: true,
      chunkSize: 3000, // in bytes

      chunk: (chunk) => {
        console.log('CHUNK', chunk);
        // Get columns from first row of data
        if (result.columns.length === 0) {
          const row = chunk.data[0];
          for (const col in row) {
            result.columns.push(col);
          }
        }
        // Load rows into result
        chunk.data.forEach((row) => {
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
