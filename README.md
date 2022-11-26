# Loop Not Luck Platform

Node.js version 16

## Clone
The repo [loop-not-luck-platform](https://github.com/ranga27/loop-not-luck-platform) to a local project directory
## Install
Ensure you have node 16 installed
In the cloned local project directory, install dependecies required for the project
### `yarn install`</br></br>
Install the Firebase CLI globally
### `npm i -g firebase-tools`</br></br>
Log into Firebase using your Google account
### `firebase login`
This command connects your local machine to Firebase and grants you access to your Firebase projects.

Test that the CLI is properly installed and accessing your account by listing your Firebase projects. Run the following command
### `firebase projects:list`</br></br>
### `firebase use loop-luck`</br></br>
Next, change into the functions subdirectory and install the dependecies required for cloud functions
### `cd functions`
### `npm i`
Change back into the main directory
### `cd ..`</br></br>
Set up the Emulator Suite. This command starts a configuration wizard. Please make sure Java is installed and on your system PATH. Java JDK version 11 or higher.

### `firebase init emulators`
Select the following emulators to download the corresponding emulator binary files. 
* functions
* firestore
* storage

Select default options so that it will preserve the current emulator configuration as per `firebase.json` file.</br></br>
Start the emulators 
### `npm run dev`</br></br>
Finally, run the app in the development mode
### `npm start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.</br></br>
## TODO

- [ ] replace notification manager with sweetalert2
- [ ] Pagination not working
- [ ] Forgot password route
- [ ] Resend email verification
- [ ] Design same approach for components
- [ ] Add index.js to all folders for better export
- [ ] Use security rules in firestore to restrict operations based on custom claims & test
- [ ] 1st screen for companies is roles tiles & then clicking on it should go to individual role screen
- [ ] Hide screens based on access, test candidates can't view company pages (use firstore auth)
- [ ] flatfile - the elegant import button
- [ ] Do we need cloud function to getCandidate
- [ ] add modal to view candidate as quick view and then forward to detail page & view opps
- [ ] map over data to create input elements - reduce code and improve readability - refactor the form/page elemets into an array to loop over to create HTML elements - e.g. smart forms
- [ ] prevent the app to generate unnecessary routes, rather checking current user role on each route it is great to generate only the routes that user have access
- [x] upgrade to react router 6 - lots of breaking changes
- [x] integrate redux toolkit

