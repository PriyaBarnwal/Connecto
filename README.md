# devWEavers
>A social networking app.<br/>

## Table of contents
* [General info](#general-info)
* [Demo](#demo)
* [Features](#features)
* [Setup](#setup)

## General info
The project has been built on mern stack and deployed in heroku. It is a SPA with the client side being bootstrapped with [create-react-app](https://github.com/facebookincubator/create-react-app) 
and the backend powered up by [express](https://github.com/expressjs/express) and [node](https://github.com/nodejs/node).<br/>
The web app has been made responsive with the help of [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap).<br/>
Redux has been used for state management, Formik and Yup have been used for form validation and handling.

## Demo
You can see it in action here: https://blooming-beyond-53153.herokuapp.com
	
## Features
* Connect with other developers acoss the globe.
* Create your portfolio.
* Post your project ideas and discuss it with others.
	
## Setup
To run the application locally; clone the repo, install server and client dependencies, add a config file with your mongoUri and run the app.

```
$ git clone https://github.com/PriyaBarnwal/devWEavers.git
$ cd devWEavers
$ npm install
$ cd client
$ npm install
```
Set up the default.json file in config folder with the following<br/>
And you are good to go. Run this command and you will be able to access it at localhost:3000.
```
$ npm run dev
```
