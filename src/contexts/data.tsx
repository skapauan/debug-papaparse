import { createContext, FC, useContext, useState } from 'react';

import { Result } from '../models/result';

const defaultResults: Result = {
  columns: [],
  rows: [],
  fileName: '',
};

type ResultStatus = 'none' | 'loading' | 'ready';

interface DataContextType {
  result: Result;
  setResult: (result: Result) => void;
  resultStatus: ResultStatus;
  setResultStatus: (status: ResultStatus) => void;
}

const DataContext = createContext<DataContextType>({
  result: { ...defaultResults },
  setResult: () => undefined,
  resultStatus: 'none',
  setResultStatus: () => undefined,
});

export const useDataContext = () => useContext(DataContext);

export const DataProvider: FC = ({ children }) => {
  const [result, setResult] = useState({ ...defaultResults });
  const [resultStatus, setResultStatus] = useState<ResultStatus>('none');

  return (
    <DataContext.Provider
      value={{
        result,
        setResult,
        resultStatus,
        setResultStatus,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
