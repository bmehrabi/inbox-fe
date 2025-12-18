# Simple Inbox Client Application

This is the client part of the simple inbox application.

For the backend part, please check out the [api-inbox](https://github.com/bmehrabi/api-inbox) repository.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### Generating API client

To generate the API client, run the following command: (You need to have the api-inbox project running)

```
  openapi-generator-cli generate \
  -i http://localhost:8080/v3/api-docs \
  -g typescript-fetch \
  -o src/api  
```

This will generate teh `api` folder inside the `src` folder.
