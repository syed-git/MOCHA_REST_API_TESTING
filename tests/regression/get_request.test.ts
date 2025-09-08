import { expect } from 'chai';
import { getApi } from '../../src/helpers/rest_api_helpers';
import { step } from 'mocha-steps';
import { tableReport } from '../../src/helpers/common_helper';

describe('@addition GET API REQUEST', async function () {
  
  step('Get the user based on id @getRequests', async function () {
    
    const response = await getApi(this, 'regres', 'objects/7', 'sit1');

    // Define the 2D array
    const data: any[][] = [];
    data.push(['Parameter', 'Actual', 'Expected']);
    data.push(['id', response.id, 7]);
    data.push(['year', response.name, 'Apple MacBook Pro 16']);
    data.push(['price', response.data.price, 1849.99]);
    data.push(['CPU model', response.data['CPU model'], 'Intel Core i9']);
    data.push(['Hard disk size', response.data['Hard disk size'], '1 TB']);

    // print the values to report
    await tableReport(this, 'GET API Comparison', data);

    expect(response, 'error').not.to.undefined;
    expect(response.id).to.be.equal('7');
    expect(response.name).to.be.equal('Apple MacBook Pro 16');
    expect(response.data.price).to.be.equal(1849.99);
    expect(response.data['CPU model']).to.be.equal('Intel Core i9');
    expect(response.data['Hard disk size']).to.be.equal('1 TB');
    
  });

  step('Single user not found @getRequests', async function () {
    
    const response = await getApi(this, 'regres', 'objects/23', 'sit1');

    expect(response.status, 'error').to.be.equal(404);
  });

  step('Test to show how to find a json object based on key @getRequests', async function () {
    
    const response = await getApi(this, 'regres', 'objects', 'sit1');

    const obj = response.find((ele: { id: string; }) => ele.id === '4');

    // Define the 2D array
    const data: any[][] = [];
    data.push(['Parameters', 'Actual', 'Expected']);
    data.push(['name', obj.name, 'Apple iPhone 11, 64GB']);
    data.push(['color', obj.data['color'], 'Purple']);
    
    // print the values to report
    await tableReport(this, 'GET API Comparison', data);

    expect(obj, 'error').not.to.undefined;
    expect(obj.name).to.be.equal('Apple iPhone 11, 64GB');
    expect(obj.data['color']).to.be.equal('Purple');
    
  });

  step('Test to show how to filter the array containing json objects @getRequests', async function () {
    
    const response = await getApi(this, 'regres', 'objects', 'sit1');

    const obj = response.filter((ele: { name: any }) => ele.name.includes('Apple iPhone 12'));

    // Define the 2D array
    const data: any[][] = [];
    data.push(['Parameters', 'Actual', 'Expected']);
    data.push(['name', obj[1].name, 'Apple iPhone 12 Pro Max']);
    data.push(['capacity GB', obj[1].data['capacity GB'], '512']);

    // print the values to report
    await tableReport(this, 'GET API Comparison', data);

    expect(obj.length, 'error').to.be.greaterThan(0);
    expect(obj[0].data).to.be.null;
    expect(obj[0].name).to.be.equal('Apple iPhone 12 Mini, 256GB, Blue');
    
  });

});