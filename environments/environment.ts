export const env: any = {
    sit1: {
      jsonPlaceHolder: {
        baseUri: 'https://jsonplaceholder.typicode.com',
      },
      regres: {
        baseUri: 'https://reqres.in/api',
      },
    },
    production: {
      regres: {
        baseUri: 'https://reqres.in/api/users?page=2',
      },
    },
  };