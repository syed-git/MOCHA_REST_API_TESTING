import { env } from '../../environments/environment';
import addContext from 'mochawesome/addContext';
import Table from 'cli-table';

export const tableReport = async (_this: Mocha.Context, title: string, tableValues: any[][]) => {

    // Create a table instance
    const table = new Table({
      head: tableValues[0], // Use the first row as the header
      //colWidths: [30, 30, 30], // Optional: Set column widths
      style: {
        head: [], // Disable colors in header
        border: [], // Disable colors in border
      },
    });

    // Add the remaining rows to the table
    for (let i = 1; i < tableValues.length; i++) {
      table.push(tableValues[i]);
    }
    addContext(_this, {
      title: `${title}`,
      value: table.toString()
    });
}
