import { env } from '../../environments/environment.js'


const addContext = (await import('mochawesome/addContext.js')).default;


export const getApi = async (reportContext, application, uri, environment) => {
  try {
    const env1 = environment;
    const baseUri = `${env[env1][application].baseUri}/${uri}`;
    const response = await fetch(baseUri);
    
    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response as JSON and return it
    const data = await response.json();
    addContext(reportContext, JSON.stringify(data, null, 2));

    return data; // Return the fetched data for use in other functions or tests

  } catch (error) {
      // Handle any errors and return a response (or throw an error if you prefer)
      console.error('Error fetching data:', error);
      throw error; // Throw the error to be handled by the calling function
  }
}
