# TODO Bizcuit

## Requirements

- Node
- npm
- Postgres

## How to run server

- Go into `server` folder
- Make a `.env` file from .env.example and put correct variables

```bash
npm install
npm run build
npm run start
```

## How to run client

- Go into folder `client`

## How to run

```bash
npm install
npm run start
```

## Improvements

### Logger

- Add additional logger that can easily be connected with services like Cloudwatch, Bugsnag...

### Error handling

- Create classes that extends Errors with predefined codes and message

### Cache

- Redis
- Cache user and todos for whole day

## Testing

- Jest

## Seed the DB

- Seed DB with initial data
