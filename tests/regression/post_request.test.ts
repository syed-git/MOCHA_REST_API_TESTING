import { expect } from 'chai';
import { postApi } from '../../src/helpers/rest_api_helpers';
import { step } from 'mocha-steps';

describe('POST API CALL', async function () {

  step('Adding a user @postRequests', async function () {
    
    const reqBody: any = {
        body: {
          name: 'Apple MacBook Pro 16',
          data: {
              year: 2019,
              price: 1849.99,
              'CPU model': 'Intel Core i9',
              'Hard disk size': '1 TB'
          }
        }
      };
  
      const response = await postApi(this, 'regres', 'objects', 'sit1', reqBody);
      expect(response, 'error').not.to.undefined;
      expect(response.id).not.to.undefined;
      expect(response.name).to.be.equal('Apple MacBook Pro 16');
      expect(response.data['Hard disk size']).to.be.equal('1 TB');
  });
});