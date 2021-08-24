# Booksify

Booksify is an online book store where you can buy your favorite books. It is built using MERN stack and Redux with paypal payment gateway.

## Here are some screenshot of the website

![homepage](https://github.com/niteshseram/booksify/blob/main/uploads/homepage.JPG)
![productpage](https://github.com/niteshseram/booksify/blob/main/uploads/productpage.JPG)
![cartpage](https://github.com/niteshseram/booksify/blob/main/uploads/cartpage.JPG)

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- Credit card integration with Paypal
- Database seeder (products & users)

## Technology used

- ReactJS
- NodeJS
- Express
- MongoDB
- Redux

## To run locally on your machine

### Clone the repo to your machine

```
git clone https://github.com/niteshseram/Booksify.git
cd Booksify
```

### Env variables setup

Create an .env file in the Booksify root directory and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = jwt secret
MERCHANT_ID = braintree merchant id
PUBLIC_KEY = braintree public key
PRIVATE_KEY = braintree private key
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

# Running the application

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```
