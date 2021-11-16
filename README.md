This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run deploy`

To build & deploy to Firebase hosting

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

# loop-not-luck

## TODO

- [ ] sweetalert2
- [ ] uneverified users can sign in
- [ ] Restrict Admin page for Super users only
- [ ] Pagination not working
- [ ] Forgot password route
- [x] Create user route - refactor app.js into public & private routes
- [ ] Design same approach for components
- [ ] Local storage vs realtime storage
- [ ] Add index.js to all folders for better export
- [ ] Use security rules in firestore to restrict webpages & test
- [ ] Cleanup unnecessary files
- [ ] Add machine learning to get candidate and opportunity search
- [ ] local emulator for functions is not working may be due to firestore & auth not running locally
- [ ] 1st screen for companies is roles tiles & then clicking on it should go to individual role screen
- [ ] Hide screens based on access, test candidates can't view company pages (use firstore auth)
- [ ] flatfile - the elegant import button
- [ ] use isAuthed for authenticating both user & role for the respective route - or pass role as a decision variable
- [ ] Do we need cloud function to getCandidate
- [ ] move auth from cloud functions to native functions
- [ ] add modal to view candidate as quick view and then forward to detail page & view opps
- [x] anbody can see anyone's opps, put an auth rule on the pages or on firestore or use https://firebase.google.com/docs/auth/admin/custom-claims
- [ ] marshmallow UI
- [ ] map over data to create input elements - reduce code and improve readability - reafactor the post opps page input elemets into an array to loop over to create HTML elements
- [ ] prevent the app to generate unnecessary routes, rather checking current user role on each route it is great to generate only the routes that user have access
- [ ] upgrade to react router 6 - lots of breaking changes

New Dev instructions

1. uncomment firebase.functions().useEmulator('localhost', 5001); in Firebase.js
2. Start functions: npm run functions:dev
