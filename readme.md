
# When i will work api

When i will work api is a nodejs library for dealing with shifts operation.

## Installation

Use the package manager [npm](https://pip.pypa.io/en/stable/) to install and run this project.

```bash
npm install 
```

## Usage

```
npm run dev

you can either using post man to test or use api documentation

filled in the postman with # localhost:3000/v1/shifts #
```

## Stacks 
Express.js / Json/ Jest / Moment / Jsonwebtoken / nodemon

## api/v1

```
version 1 dont require any authenetication to do with the shifts 
Just copy the postman collection into the postmen to start with
```
## api/v2

```
version 2 do require the jwt to authenticated
the demo account as payload to start with 
api:http://localhost:3000/login
{
"userName":"di",
"password": "z4tS/DtiH+0Gb4J6QN1K3w==$al6sGxKBKqxRQkDmhnhQpEB6+DQgDRH2qr47BZcqLm4/fphZ7+a9U+HhxsNaSnGB2l05Oem/BLIOkbtOuw1tXA=="
}

once you get the jwt, you will need this jwt to call every v2 version of api
```

## test data

```
to generate a new set of test data, do following :
npm run fake
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)