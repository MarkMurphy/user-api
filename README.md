## Description

I took a bit of a risk with this project becasue I wanted to explore 
some new tech I've had my eye on ([Nest](https://github.com/nestjs/nest) and 
[TypeORM](https://typeorm.io/)) and I wanted to showcase my ability to learn 
quickly and hopfully deliver something half decent in a short period of time.

I took this as an oportunity to experiment which I very much enjoy. I have a lot of thoughts about how this project went, where I feel like it came up a bit short and where I'd go with it next. Looking forward to having conversations about that!

## Installation

You can either install node and yarn on your machine locally to run this or you can use Docker. Either way, you'll need docker in order to supply the database.

#### Local

If you already have node (v12+) and yarn installed on your machine:

```bash
yarn install
```

Make sure there's a database to connect to:

```bash
docker-compose up db
```

In a seperate terminal tab or window, start the server:

```bash
yarn start
```

#### Docker

If you'd like to run a build of the app without having to install node or any of
the project dependencies on your machine you can just:

```bash
docker-compose up
```

## Usage

I've included a [Postman](https://www.postman.com/) collection and environment in the `postman` directory at the root of the project that you can [import](https://learning.postman.com/docs/postman/collections/data-formats/#importing-postman-data) to easily get started testing out the different api endpoints.

I've added a bit of documentation to that as well so it should hopefully be pretty easy to find your way around the api endpints.

#### Authentication

All endpoints excepts for `POST /auth/token` and `POST /users` require authentication via a Bearer JWT access token.

After you create the first user, you can obtain an access token by sending a POST request with your credentials to the `POST /auth/token` endpoint.

If you're using Postman, it will automatically store the access token from the response in a variable and attach it to all endpoints requiring it via an Authorization header.

## Test

Tests are a little light at the moment 🙉

```bash
# unit tests
yarn test

# e2e tests
yarn test:e2e

# test coverage
yarn test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
