**This is a README.md**

[![Build Status](https://travis-ci.com/Crispy-rw/-Task-Force-Challenge-Backend.svg?branch=main)](https://travis-ci.com/Crispy-rw/-Task-Force-Challenge-Backend)

[![Coverage Status](https://coveralls.io/repos/github/Crispy-rw/-Task-Force-Challenge-Backend/badge.svg?branch=main)](https://coveralls.io/github/Crispy-rw/-Task-Force-Challenge-Backend?branch=main)

TO-DO api is a simple api that lets you create unlimited tasks which can you to plan, track and get more tasks done.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Here are the environment prerequisites for the web app

```
- NodeJS
- Postgress
- Docker
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

-   Clone the repository
-   Copy .env.example to .env then correct change the corresponding variables
-   Run `npm install` to install node packages
-   Run `npm run migrate` to setup models in Database
-   Run `npm run dev` to start the web app

## Running the tests

### Endpoints

Using Postman to access these endpoints

| Endpoint                  | Methods | Functionalities      | Authentication required |
| ------------------------- | ------- | -------------------- | ----------------------- |
| /api/v1/auth/login        | POST    | Register a new User  | No                      |
| /api/v1/auth/signup       | POST    | Login for a User     | NO                      |
| /api/v1/todos/            | GET     | Fetch all Todo Items | YES                     |
| /api/v1/todos/            | POST    | Add new Todo item    | Yes                     |
| /api/v1/todos/`<todo_id>` | GET     | Fetch One todo Item  | YES                     |
| /api/v1/todos/`<todo_id>` | PUT     | update user info     | YES                     |
| /api/v1/todos/`<todo_id>` | DELETE  | Delete a Todo Item   | YES                     |

## Built With

-   Javascript as a language
-   NodeJS / Express backend Framework
-   Postgress as Database Engine
-   Mocha and Chai for testing
-   Travis CI for continuos integration
-   nyc for test coverage

### Server

The server runs on Node.js with Express.js as its main framework. Compared to the front end, the server contains various folders that are explained as follow:

-   `/server/configs` for system configuration files. In most of cases you will not need to work with that folder as all configs are stored in the `/server/.env` file.
-   `/server/controllers` holds all business logic. It is coupled to the API through `/server/router` folder.
-   `/server/helpers` contains reusable code such as functions, constants, formatters, and email templates.
-   `/server/models` contains System models.
-   `/server/routers` contains API endpoints.
-   `/tests` contains both unit test and integration tests. It is composed of two packages that are "unit" for unit test integration for "integration" test.

### Database

The database package contains migrations and seeds. Refer to [Sequelize official documentation (v5)](https://sequelize.org) to learn more about it.

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

-   **Nshimyumukiza Christian**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
