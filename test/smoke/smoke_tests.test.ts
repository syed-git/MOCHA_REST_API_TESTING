import { expect } from 'chai';
import { getApi, postApi } from '../../src/helpers/rest_api_helpers';
import { step } from 'mocha-steps';
import { tableReport } from '../../src/helpers/common_helper';

describe('Smoke tests', async function () {

  step('Get a single user details @smoke', async function () {
    
    const response = await getApi(this, 'regres', 'users/2', 'sit1');

    // Define the 2D array
    const data: any[][] = [];
    data.push(['Parameters', 'Actual', 'Expected']);
    data.push([`email`, response.data.id, 2]);
    data.push([`fisrt_name`, response.data.first_name, 'Janet'])
    data.push([`last_name`, response.data.last_name, 'Weaver'])
    
    // print the values to report
    await tableReport(this, `GET API Comparison`, data);

    expect(response, `error`).not.to.undefined;
    expect(response.data.id).to.be.equal(2);
    expect(response.data.email).to.be.equal('janet.weaver@reqres.in');
    expect(response.data.first_name).to.be.equal('Janet');
    expect(response.data.last_name).to.be.equal('Weaver');
    
  });

  
});