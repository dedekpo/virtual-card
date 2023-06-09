# QR Code Generator Web Application

This is a web application that generates a unique QR code for users who want to easily share their information. The application was developed by André Elias as a test for a job application using React with NextJS framework.

## How It Works

The web application has four main functionalities:

1. List all users that already have created a QR Code ('/')

2. Generates a unique QR Code given the user's data ('/generate')

3. Redirects to user's page - When someone scans the QR code, it redirects them to the user's page. The user's page contains their information and picture. ('scan/{id}')

4. Display the user data ('/user/{id}')

## Deployment and Hosting

The application was deployed on Vercel and hosted a PostgreSQL database on Railway.

## Technologies Used:

-   React
-   NextJS
-   Typescript
-   PostgreSQL
-   AWS (S3 for picture upload)
-   TailwindCSS

## Getting Started

To run this project locally, follow these steps:

Clone this repository

Run npm install or yarn install to install the dependencies

Run npm run dev or yarn dev to start the development server

Open http://localhost:3000 in your browser

## Demo

You can access a live demo of this project at https://virtual-card-nine.vercel.app/.

## Author

This web application was developed by André Elias. You can find me on [LinkedIn](https://www.linkedin.com/in/andr%C3%A9-elias/) or [GitHub](https://github.com/dedekpo).
