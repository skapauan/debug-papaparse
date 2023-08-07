import { FC } from 'react';

import { DataProvider } from './data';

export const Providers: FC = ({ children }) => <DataProvider>{children}</DataProvider>;

export * from './data';
