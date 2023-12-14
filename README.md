# User Management API using Node, Mongo, and Express

This project provides API endpoints for user creation, updating user details, deleting users, and fetching user information from a MongoDB database. The APIs are secured using bcrypt for password encryption and validation.

## API Endpoints

### Create User

- **POST:** `/user/create`
  - Create a new user with full name, email, and password.
  - Enforces strong password rules and validates the email and full name.
  - Returns a meaningful message if the user email or password is invalid.

### Edit User Details

- **PUT:** `/user/edit`
  - Update the user's full name and password (email remains unchanged).
  - Performs validations for full name and password.
  - Throws proper error messages if the user is not found in the database.

### Delete User

- **DELETE:** `/user/delete`
  - Delete a user by providing the user's email.
  - Removes the user from the database.

### Get All Users' Information

- **GET:** `/user/getAll`
  - Retrieve full names, email addresses, and encrypted passwords of all users stored in the database.
  - No sensitive information is exposed; passwords are encrypted using bcrypt.

## Instructions

1. Install dependencies: `npm install`
2. Set up a MongoDB database and configure the connection in `config.js`.
3. Run the server: `node server.js` or using any preferred method.
4. Access the endpoints using an API testing tool like Postman.

## Security Note

- Ensure sensitive user information like passwords is appropriately encrypted before storing in the database.
- Handle validation errors and input sanitization to prevent security vulnerabilities.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- bcrypt for password security

