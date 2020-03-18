<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
yarn install
```

## Running the app

I've included a [Postman](https://www.postman.com/) collection and environment in the `postman` directory at the root of the project that you can [import](https://learning.postman.com/docs/postman/collections/data-formats/#importing-postman-data) to easily get started testing out the different api endpoints.

Make sure there's a database to connect to:

```bash
docker-compose up --build
```

In a seperate terminal tab or window, start the server:

```bash
yarn start
```

## Test

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
