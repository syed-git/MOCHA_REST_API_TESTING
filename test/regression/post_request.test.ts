import { expect } from 'chai';
import { getApi, postApi } from '../../src/helpers/rest_api_helpers';
import { step } from 'mocha-steps';
import { tableReport } from '../../src/helpers/common_helper';

describe('POST API CALL', async function () {

  step('Create a user using POST request', async function () {
    
    const reqBody: any = {
      body: {
        'name': 'syed', 
        'job': 'lead'
      }
    };

    const response = await postApi(this, 'regres', 'users', 'sit1', reqBody);

    // Define the 2D array
    const data: any[][] = [];
    data.push(['Parameters', 'Actual', 'Expected']);
    data.push([`name`, response.name, 'syed']);
    data.push([`job`, response.job, 'lead'])
    
    // print the values to report
    await tableReport(this, `POST API Comparison`, data);

    expect(response, `error`).not.to.undefined;
    expect(response.name).to.be.equal('syed');
    expect(response.job).to.be.equal('lead');
    
  });
});