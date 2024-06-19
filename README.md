# URL SHORTENER APPLICATION

Created an URL shortening app where user can input a long URL in return user get an Short URL ,
User need to Register to access the Application
and User can track how many short URL he created in dashboard and user can see how many shorturl he creted in a day,month,year also in the dashboard

### Features

#### 1. User Interface

        * Login and logout implemented with auth token
        * A INput for users to enter their Long URl
        * In return he got Short URL as a link and also count how many time he clicked the link

#### 2. Two step activation:

       * First user Register the account then an Activation link send to the mail through that activate the account

#### 3.Two step Reset Password verification:

       * Once usere enter the MAil  the verificationn code send to the mail
       * once user got the verification code enter that code in to another input once after enter user get another mail with reset password link
       * once open the link the reset password form will appear

#### 4. backend API :

        * Endpoints to handle password reset requests,Verication code generation, and verification.
        * handle the Register and Login
        * Updating the user's password in the database after verification.
        * generate the Short URL , get the Short URL in the dashboard

#### API Documentation :

     POSTMAN : https://documenter.getpostman.com/view/35282596/2sA3XTeLFs

## Demo

Live : https://urlshoretner-app.vercel.app/

API : https://url-shortner-ezi0.onrender.com

## Run Locally

Clone the project

### FrontEnd

```bash
  git clone https://github.com/BalavigneshRajasekar/URL-shortner-application.git
```

Go to the project directory

```bash
  cd Frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

### Backend

Go to the project directory

```bash
  cd Backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node server.js
```

## Tech Stack

**Client:** React,Bootstrap

**Server:** Node, Express ,MongoDB
