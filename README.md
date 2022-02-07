# loop-not-luck

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn deploy`

To build & deploy to Firebase hosting

## TODO

- [ ] replace notification manager with sweetalert2
- [ ] Pagination not working
- [ ] Forgot password route
- [ ] Resend email verification
- [ ] Design same approach for components
- [ ] Add index.js to all folders for better export
- [ ] Use security rules in firestore to restrict operations based on custom claims & test
- [ ] Cleanup unnecessary files
- [ ] Add machine learning to get candidate and opportunity search
- [ ] 1st screen for companies is roles tiles & then clicking on it should go to individual role screen
- [ ] Hide screens based on access, test candidates can't view company pages (use firstore auth)
- [ ] flatfile - the elegant import button
- [ ] Do we need cloud function to getCandidate
- [ ] add modal to view candidate as quick view and then forward to detail page & view opps
- [ ] marshmallow UI
- [ ] map over data to create input elements - reduce code and improve readability - refactor the form/page elemets into an array to loop over to create HTML elements - e.g. smart forms
- [ ] prevent the app to generate unnecessary routes, rather checking current user role on each route it is great to generate only the routes that user have access
- [ ] upgrade to react router 6 - lots of breaking changes
- [ ] integrate redux toolkit

## New Dev instructions

1. clone dir
2. install deps: npm i --legacy-peer-deps
3. install firebase tools: npm i -g firebase-tools
4. setup firebase: firebase login
5. firebase projects:list
6. cd functions && npm i 
7. cd ..
8. firebase init emulators
9. Start functions emulator: npm dev
10. Start app: npm start
11. test functions using postman
