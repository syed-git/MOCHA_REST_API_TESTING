import { expect } from 'chai';
import { getApi, postApi, putApi } from '../../src/helpers/rest_api_helpers';
import { step } from 'mocha-steps';
import { tableReport } from '../../src/helpers/common_helper';
import moment from 'moment-timezone';

describe('PUT API CALL', async function () {

  step('Update a user @demo', async function () {
    
    const reqBody: any = {
      body: {
        'name': 'morpheus', 
        'job': 'zion resident'
      }
    };

    const response = await putApi(this, 'regres', 'users/2', 'sit1', reqBody);

    // Define the 2D array
    const data: any[][] = [];
    data.push(['Parameters', 'Actual', 'Expected']);
    data.push([`name`, response.name, 'morpheus']);
    data.push([`job`, response.job, 'zion resident']);
    data.push([`updatedAt`, response.updatedAt, `${moment.tz("Asia/Kolkata").format('YYYY-MM-DD')}`]);
    
    // print the values to report
    await tableReport(this, `POST API Comparison`, data);

    expect(response, `error`).not.to.undefined;
    expect(response.name).to.be.equal('morpheus');
    expect(response.job).to.be.equal('zion resident');
    expect(response.updatedAt).to.include(`${moment.tz("Asia/Kolkata").format('YYYY-MM-DD')}`);
    
  });
});