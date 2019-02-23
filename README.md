
> ### Online Shopping Cart Node (Express + Mongoose)

# Getting started

To run the Node application locally in your machine: 

- Clone the repository.
- Install the require dependencies - `npm install` 
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- `npm run dev` to start the local server


# Code Introduction

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [express-jwt](https://github.com/auth0/express-jwt) - Middleware for validating JWTs for authentication
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
- [mongoose-unique-validator](https://github.com/blakehaswell/mongoose-unique-validator) - For handling unique validation errors in Mongoose.
- [passport](https://github.com/jaredhanson/passport) - For handling user authentication
- [stripe](https://stripe.com/docs/stripe-js/) - For handling credit card transaction securely.
- [csurf](https://github.com/expressjs/csurf) - Middleware for validating user session and securely by creating a CSRF token.
## Application skeleton

- `app.js` - The index entry point of the application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `config/` - This folder contains configuration for passport and login authentications.
- `routes/` - This folder contains definition of route functions for different HTTP requests.
- `models/` - These folder contains schema definition for mongodb database.
- `public/` - This folder contains  javascripts and css for the checkout.
- `views/`  - This folder contains all the HTML template handlebar to construct front-end.

## Authentication and security

Express-JWT is the middleware used in the application to validate JsonWebTokens for authorization and access control.
StripeJS library is used to tokenize customer information, collect sensitive card information and data and let user make secured online transaction. 

<br />

