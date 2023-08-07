/**
 * Uses the debug (non-minified) version of papaparse.
 * (JS used here instead of TS since the papaparse debug version is not typed.)
 */
export declare const loadCsvFile: (file: File) => Promise<Result>;
