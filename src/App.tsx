import { FC } from 'react';

import { DisplayData, LoadFile } from './components';
import { Providers } from './contexts';

const App: FC = () => {
  return (
    <Providers>
      <h1>Debug Papaparse</h1>
      <LoadFile />
      <DisplayData />
    </Providers>
  );
};

export default App;
