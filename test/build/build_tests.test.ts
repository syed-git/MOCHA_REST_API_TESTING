import { expect } from 'chai';
import { getApi, postApi, putApi } from '../../src/helpers/rest_api_helpers';
import { step } from 'mocha-steps';
import { tableReport } from '../../src/helpers/common_helper';
import moment from 'moment-timezone';

describe('Build tests', async function () {
  
  step('Validate GET request working fine @build', async function () {
    
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

  step('Validate POST request working fine @build', async function () {
    
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

  step('Validate PUT request working fine @build', async function () {
    
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