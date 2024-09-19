# PhoneBook REST API Project (Node.js)

This project is a Node.js REST API developed as part of the GoIT course. It provides a structured and scalable backend service with essential features for user authentication, contact management, and more.

## Table of Contents

- [Project Features](#project-features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Project Features

- **User Authentication and Authorization**: Secure user registration, login, and authentication using JWT.
- **Contact Management**: CRUD operations for managing contacts.
- **Validation**: Data validation to ensure data integrity and security.
- **Error Handling**: Comprehensive error handling for robust API responses.
- **Environment Configuration**: Configurable environment settings for development and production.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js.
- **Mongoose**: ODM for MongoDB, providing a straightforward schema-based solution to model application data.
- **jsonwebtoken**: For JWT token generation and verification.
- **bcryptjs**: Library to hash passwords for secure storage.
- **dotenv**: Module to load environment variables from a `.env` file.
- **Joi**: Schema description language and validator for JavaScript objects.
- **nodemailer**: Module to send emails from Node.js applications.

## Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/anastasiia-kushch/goit-node-rest-api.git
   ```
2. **Navigate to the project directory**:
   ```sh
   cd goit-node-rest-api
   ```
3. **Install dependencies**:
   ```sh
   npm install
   ```
4. **Set up environment variables**:
   - Create a `.env` file in the root of the project.
   - Add the following environment variables:
     ```env
     PORT=3000
     DB_HOST=<Your MongoDB URI>
     SECRET_KEY=<Your Secret Key>
     ```
5. **Start the server**:
   ```sh
   npm start
   ```

## Usage

- **Development Mode**:
  ```sh
  npm run dev
  ```
- **Production Mode**:
  ```sh
  npm start
  ```

## API Endpoints

### Authentication

- **Register**: `POST /api/users/register`
- **Login**: `POST /api/users/login`
- **Logout**: `POST /api/users/logout`
- **Get Current User**: `GET /api/users/current`
- **Update Subscription**: `PATCH /api/users`
- **Verify Email**: `GET /api/users/verify/:verificationToken`

### Contacts

- **Get All Contacts**: `GET /api/contacts`
- **Get Contact by ID**: `GET /api/contacts/:contactId`
- **Create New Contact**: `POST /api/contacts`
- **Update Contact**: `PUT /api/contacts/:contactId`
- **Delete Contact**: `DELETE /api/contacts/:contactId`

### Error Handling

- Centralized error handling for all API endpoints to ensure consistent API responses.
