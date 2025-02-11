import { expect } from 'chai';
import { getApi, postApi } from '../src/helpers/rest_api_helpers';
import { step } from 'mocha-steps';
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

  step('Get a single user details', async function () {
    
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

  step('Get a single user details', async function () {
    
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