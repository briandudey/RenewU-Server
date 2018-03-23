# RenewU
Meditation and Wellness App

### The Problem
Meditation is practiced my millions of people accross the globe yet the web applications available for this rewarding action are far too scarce. Those that do exist are overrun with ads or are so cluttered or confusing to use that they defeat the purpose and are counter to the objective of meditation: to calm your mind and center yourself, to come out of the meditation a new you.

### The Solution
RenewU is different than any of the current meditation applications available because it is truly centered around a calm and relaxing experience. The user interface is clean and very easy to follow, the options are robust but not overwhelming, and the technologies used are cutting-edge. RenewU provides a space for meditation pros and absolute beginners to come and enjoy the benefits of meditation. Their meditations are tracked as is their journey through a video experience this way each time the user logs in, they are able to start right where they left off. Everything is designed around ease of use and intuitive design. RenewU is the meditation app for meditating with (just enough) extra.

#### Technologies ####

The front-end was developed with React, Redux, Redux Form
Styling was done with CSS using CSS Grid for layout

The back-end was developed with NodeJS, MongoDB, Mongoose, and Express.

Testing was done with Mocha, Chai, and Jest

For production, Heroku and Netlify were used.

#### Visual Representation of Full Stack Technologies Used
![Alt text](https://github.com/thinkful-ei18/RenewU/blob/master/resources.png?raw=true "Visual representation of technologies and resources used to create RenewU")

#### The App
The production-ready version of the application is at: https://upbeat-wright-74e6b5.netlify.com

#### Login Page
![Alt text](https://github.com/thinkful-ei18/RenewU/blob/master/LoginPage.png?raw=true "RenewU Login Page")

#### Landing Page
![Alt text](https://github.com/thinkful-ei18/RenewU/blob/master/landingpage.png?raw=true "RenewU Landing Page")

#### Watch Page
![Alt text](https://github.com/thinkful-ei18/RenewU/blob/master/watchpage.png?raw=true "RenewU Watch Page")

#### Meditate Page
![Alt text](https://github.com/thinkful-ei18/RenewU/blob/master/listenpage.png?raw=true "RenewU Meditate Page")

#### Data Persistence ####
Creating an app that used persistent data without the user actually entering in information proved to be a unique challenge. One of the main features of the app is to explore meditation through six currated videos. Once the user completes a video, they receive a "badge" and can then move on to the next video or chose to exit the "Watch" portion of the app. Using React, Redux, MongoDB and Mongoose, a userSchema was created with a UserWatchID defaulted to "0" (all users who are either new or have not yet watched a video start at 0). Once a video is watched, the UserWatchID is changed to the video index (videos are stored in the backend as an array). So, when a user returns to the video page they will automatically start on the video they left on.

This feature was built with the following logic


#### The Action And Async API Call
![Alt text](https://github.com/thinkful-ei18/RenewU/blob/c478affdae3e4f9b2d8e825fa2c64c05d4421fe5/UserWatchIDAction.png?raw=true "UserWatchID Logic Redux Action")

#### The Reducer
![Alt text](https://github.com/thinkful-ei18/RenewU/blob/master/UserWatchIDReducer.png?raw=true "UserWatchID Logic Redux Reducer")

#### The Component
![Alt text](https://github.com/thinkful-ei18/RenewU/blob/master/Screenshot%20from%202018-03-22%2021-54-35.png?raw=true "UserWatchID Logic React Component")

#### The Back-End Router
![Alt text](https://github.com/thinkful-ei18/RenewU/blob/master/BackendUserWatchID.png?raw=true "UserWatchID Logic Back-End")

#### The Back-End Mongoose User Schema
![Alt text](https://github.com/thinkful-ei18/RenewU/blob/master/MongooseSchema.png?raw=true "UserWatchID Logic Back-End Mongoose User Schema")







