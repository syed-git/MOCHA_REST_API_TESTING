import { env } from '../../environments/environment';
import addContext from 'mochawesome/addContext';
import moment, { Moment } from 'moment';

/*
getApi: this function is designed to get the rest API response using GET method
@param: _this: Mocha reporting context
@param: application: the framework designed to support multiple application, provide the application name to get the environment details
@param: uri: provide the uri, this will be concated with baseUri
@param: environment: environment to run the script
*/
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
    apiReport(_this, startTime, responseTime, '', endpoint, data);
    return data; // Return the fetched data for use in other functions or tests

  } catch (error) {
      // Handle any errors and return a response (or throw an error if you prefer)
      console.error('Error fetching data:', error);
      throw error; // Throw the error to be handled by the calling function
  }
  
}


/*
postApi: this function is designed to post a rest API request and get the response using POST method
@param: _this: Mocha reporting context
@param: application: the framework designed to support multiple application, provide the application name to get the environment details
@param: uri: provide the uri, this will be concated with baseUri
@param: environment: environment to run the script
@param: request: provide the request body including headers if needed
        example request = {
          headers: {
            'content-type': 'application/json
          },
          body: {
            'name': 'test'
          }
        }
*/
export const postApi = async (_this: Mocha.Context, application: string, uri: any, environment: string = 'sit1', request : any) => {
    
  const env1: string = environment;
  const endpoint: string = `${env[env1][application].baseUri}/${uri}`;
  let headers: any;
  let requestBody: any;

  if (request !== undefined) {
    if (request.headers !== undefined) {
      headers = request.headers;
    } else {
      headers = {
        'content-type': 'application/json'
      }
    }
    if (request.body !== undefined) {
      requestBody = request.body; 
    }

  }

  const startTime: Moment = moment();

  const response = await fetch(endpoint, {
    method: 'POST',                    // Specify the HTTP method
    headers: headers,
    body: JSON.stringify(requestBody)          // Convert the data object to a JSON string
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const endTime: Moment = moment();
    
  const responseTime: number = endTime.diff(startTime, 'milliseconds');
    
  // Parse the JSON response
  const responseBody = await response.json();
  apiReport(_this, startTime, responseTime, endpoint, request, responseBody);
  return responseBody;
}


/*
apiReport: this function is designed to report all the necessary details
@param: _this: Mocha reporting context
@param: startTime: this is unecessary to get the information on when the API was hit
@param: responseTime: this will provide the information on how much time API is taking to get the response
@param: endpoint: endpoint of an API
@param: request: provides the detail of request body
@param: response: response of an API
*/
export const apiReport = async (_this: Mocha.Context, startTime: Moment, responseTime: number, endpoint: string, request: any, response: JSON) => {
  
  addContext(_this, {
    title: `${startTime.format('YYYY-MM-DD HH:mm:ss.SSS')}  ==>>  Endpoint: ${endpoint}`,
    value: `Headers: ${JSON.stringify(request.headers, null, 2)}\n\n` +
           `Request body: ${JSON.stringify(request.body, null, 2)}\n\n` +
           `Response: ${JSON.stringify(response, null, 2)} \n\n` +
           `Response Time: ${responseTime} milliseconds`
  });
}
