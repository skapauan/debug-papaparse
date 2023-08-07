export interface GenericRow {
  [key: string]: string;
}

export interface Result {
  columns: string[];
  rows: GenericRow[];
  fileName: string;
}
