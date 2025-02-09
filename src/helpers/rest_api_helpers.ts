import { env } from '../../environments/environment';
import addContext from 'mochawesome/addContext';
import moment, { Moment } from 'moment';


export const getApi = async (_this: Mocha.Context, application: string | number, uri: any, environment: any) => {
  try {
    const env1: string = environment;
    const endpoint: string = `${env[env1][application].baseUri}/${uri}`;
    const startTime: Moment = moment();

    // call the GET API
    const response = await fetch(endpoint);
    
    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const endTime: Moment = moment();
    
    // Parse the response as JSON and return it
    const data = await response.json();
    const responseTime: number = endTime.diff(startTime, 'milliseconds');
    apiReport(_this, startTime, responseTime, endpoint, data);
    return data; // Return the fetched data for use in other functions or tests

  } catch (error) {
      // Handle any errors and return a response (or throw an error if you prefer)
      console.error('Error fetching data:', error);
      throw error; // Throw the error to be handled by the calling function
  }
  
}

export const apiReport = async (_this: Mocha.Context, startTime: Moment, responseTime: number, endpoint: string, response: JSON) => {
  
  addContext(_this, {
    title: `${startTime.format('YYYY-MM-DD HH:mm:ss.SSS')}  ==>>  Endpoint: ${endpoint}`,
    value: `${JSON.stringify(response, null, 2)} \n\n` +
           `Response Time: ${responseTime} milliseconds\n\n` +
           `\x1b[1mThis is bold text\x1b[0m`
  });
}
