import { FC } from 'react';

import { useDataContext } from '../contexts';
import { GenericRow } from '../models/result';

export const DisplayData: FC = () => {
  const { result, resultStatus } = useDataContext();
  const { columns, rows } = result;

  if (resultStatus !== 'ready') return null;

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th scope="col" key={`col_${index}`}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rIndex) => (
          <tr key={`row_${rIndex}`}>
            {columns.map((column, cIndex) => (
              <td key={`cell_${rIndex}_${cIndex}`}>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
