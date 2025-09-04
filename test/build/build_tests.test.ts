import { expect } from 'chai';
import { getApi, postApi, putApi } from '../../src/helpers/rest_api_helpers';
import { step } from 'mocha-steps';
import { tableReport } from '../../src/helpers/common_helper';
import moment from 'moment-timezone';

describe('Build tests', async function () {
  
  step('Validate GET request working fine @build', async function () {
    
    const response: any = await getApi(this, 'regres', 'objects', 'sit1');

    expect(response, `error`).not.to.undefined;
    expect(response.length).to.be.equal(13);
    
    // validate the name and data for id=8
    const filteredResponse = response.filter((ele: any) => {
      return ele.id === "8"
    });

    expect(filteredResponse, `error`).not.to.undefined;
    expect(filteredResponse.length).to.be.equal(1);
    expect(filteredResponse[0].name).to.be.equal(`Apple Watch Series 8`);
    expect(filteredResponse[0].data['Strap Colour']).to.be.equal(`Elderberry`);
    expect(filteredResponse[0].data['Case Size']).to.be.equal(`41mm`);
    
  });

  step('Validate POST request working fine @build', async function () {
    
    const reqBody: any = {
        body: {
          name: "Apple MacBook Pro 16",
          data: {
              year: 2019,
              price: 1849.99,
              "CPU model": "Intel Core i9",
              "Hard disk size": "1 TB"
          }
        }
      };
  
      const response = await postApi(this, 'regres', 'objects', 'sit1', reqBody);
      console.log(response)
      expect(response, `error`).not.to.undefined;
      expect(response.id).not.to.undefined;
      expect(response.name).to.be.equal('Apple MacBook Pro 16');
      expect(response.data['Hard disk size']).to.be.equal('1 TB');
  });

  step('Validate PUT request working fine @build', async function () {
    
    const reqBody: any = {
      body: {
        name: "Apple MacBook Pro 16",
        data: {
            "year": 2019,
            "price": 2049.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB",
            "color": "silver"
        }
      }
    };

    const response = await putApi(this, 'regres', 'objects/7', 'sit1', reqBody);

    expect(response, `error`).not.to.undefined;
    expect(response.name).to.be.equal('Apple MacBook Pro 16');
    expect(response.data['CPU model']).to.be.equal('Intel Core i9');    
  });
});