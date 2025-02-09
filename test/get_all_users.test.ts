import { expect } from 'chai';
import { getApi } from '../src/helpers/rest_api_helpers';
import { step } from 'mocha-steps';
import Table from 'cli-table';
import addContext from 'mochawesome/addContext';
import chalk from 'chalk';
import { tableReport } from '../src/helpers/common_helper';

describe('GET AOI REQUEST', async function () {
  
  step('Get the list of all the users', async function () {
    
    const response = await getApi(this, 'regres', 'users?page=2', 'sit1');

    // Define the 2D array
    const data: any[][] = [];
    data.push(['Parameter', 'Actual', 'Expected']);
    data.push([`page`, response.page, 2]);
    data.push([`per_page`, response.per_page, 6])
    data.push([`total_pages`, response.total_pages, 2])
    data.push([`total`, response.total, 12])

    // print the values to report
    await tableReport(this, `GET API Comparison`, data);

    expect(response, `error`).not.to.undefined;
    expect(response.page).to.be.equal(2);
    expect(response.per_page).to.be.equal(6);
    expect(response.total_pages).to.be.equal(2);
    expect(response.total).to.be.equal(12);
    
  });
});