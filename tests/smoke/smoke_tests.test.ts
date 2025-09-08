import { expect } from 'chai';
import { getApi } from '../../src/helpers/rest_api_helpers';
import { step } from 'mocha-steps';


describe('Smoke tests', async function () {

  step('Single user not found @smoke', async function () {
    
    const response = await getApi(this, 'regres', 'objects/23', 'sit1');

    expect(response.status, 'error').to.be.equal(404);
  });
});