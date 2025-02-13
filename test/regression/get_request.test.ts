import { expect } from 'chai';
import { getApi, postApi } from '../../src/helpers/rest_api_helpers';
import { step } from 'mocha-steps';
import { tableReport } from '../../src/helpers/common_helper';

describe('@addition GET API REQUEST', async function () {
  
  step('Get the list of all the users @regression', async function () {
    
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

  step('Get a single user details @regression', async function () {
    
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

  step('Single user not found @regression', async function () {
    
    const response = await getApi(this, 'regres', 'users/23', 'sit1');

    expect(response.status, `error`).to.be.equal(404);
  });

  step('Test to show how to find a json object based on key @regression', async function () {
    
    const response = await getApi(this, 'regres', 'users', 'sit1');

    const obj = response.data.find((ele: { id: number; }) => ele.id === 2);

    // Define the 2D array
    const data: any[][] = [];
    data.push(['Parameters', 'Actual', 'Expected']);
    data.push([`id`, obj.id, 2]);
    data.push([`fisrt_name`, obj.first_name, 'Janet']);
    data.push([`last_name`, obj.last_name, 'Weaver']);
    
    // print the values to report
    await tableReport(this, `GET API Comparison`, data);

    expect(obj, `error`).not.to.undefined;
    expect(obj.id).to.be.equal(2);
    expect(obj.first_name).to.be.equal('Janet');
    expect(obj.last_name).to.be.equal('Weaver');
    
  });

  step('Test to show how to filter the array containing json objects @regression', async function () {
    
    const response = await getApi(this, 'regres', 'users', 'sit1');

    const obj = response.data.filter((ele: { id: number; }) => ele.id === 2);

    // Define the 2D array
    const data: any[][] = [];
    data.push(['Parameters', 'Actual', 'Expected']);
    data.push([`id`, obj[0].id, 2]);
    data.push([`fisrt_name`, obj[0].first_name, 'Janet']);
    data.push([`last_name`, obj[0].last_name, 'Weaver']);
    
    // print the values to report
    await tableReport(this, `GET API Comparison`, data);

    expect(obj.length, `error`).to.be.greaterThan(0);
    expect(obj[0].id).to.be.equal(2);
    expect(obj[0].first_name).to.be.equal('Janet');
    expect(obj[0].last_name).to.be.equal('Weaver');
    
  });

});