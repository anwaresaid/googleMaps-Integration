# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

do not forget to include your google API Key before running the project.
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## `How it works`

### `show counties on table`

on the main page google map will be shown, under the map you will see a table of all cities in turkey, when you choose city and click on it, the counties of the correspond city will show on the counties table.

### `show counties on map`

after choosing a city, on the counties table click on the county that you want it to be shown on the map, then go back to googleMap and you will see that the map center location changed to the correspounding county with a marker on it.

### `show mark places`

on google map you can mark as many places as you want, the coordinates of the marks will all be saved in an array.
