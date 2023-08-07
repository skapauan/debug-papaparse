import { ChangeEventHandler, FC, useState } from 'react';

import { useDataContext } from '../contexts';
import { loadCsvFile } from '../models/load-csv-file-debug';

export const LoadFile: FC = () => {
  const { resultStatus, setResult, setResultStatus } = useDataContext();
  const isLoading = resultStatus === 'loading';
  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileError, setFileError] = useState('');

  const handleFileInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    const fileList = event.target.files;
    if (fileList) setFile(fileList[0]);
    else setFile(undefined);
  };

  const loadFile = async () => {
    if (!file) {
      alert(
        'File missing. Please choose a CSV file. If problem persists, try refreshing the page.',
      );
      return;
    }
    setResultStatus('loading');
    try {
      const result = await loadCsvFile(file);
      setFileError('');
      setResult(result);
      setResultStatus('ready');
    } catch (e: any) {
      if (e && typeof e.message === 'string') {
        setFileError(e.message);
      } else {
        setFileError(
          'There was an error in loadCsvFile, and the code might need fixing.',
        );
      }
      setResultStatus('none');
    }
  };

  return (
    <>
      {fileError && (
        <p>
          <mark>{fileError}</mark>
        </p>
      )}
      <input
        type="file"
        name="file"
        accept=".csv,.tsv"
        onChange={handleFileInput}
        disabled={isLoading}
      />
      <p>
        <button onClick={loadFile} disabled={!file || isLoading}>
          Load CSV file
        </button>
      </p>
    </>
  );
};
