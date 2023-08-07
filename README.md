# debug-papaparse

An app for debugging Papaparse issues. After loading a CSV file, the parsed data is displayed in a table.

After making changes to non-minified file `node_modules/papaparse/papaparse.js` (for example adding `console.log` messages), run command `yarn dev --force` to force re-bundling dependencies.
