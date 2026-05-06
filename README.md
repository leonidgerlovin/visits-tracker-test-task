# Website Visits Tracker

A small full-stack test task application for tracking website visits by country. This task was a real test exercise for a job.
The app detects a visitor's country code on the frontend, sends it to the backend, stores the visit count in Redis, and displays aggregated visit statistics grouped by country.

![Picture]([image-url](https://github.com/leonidgerlovin/visits-tracker-test-task/blob/main/picture.png))

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios

### Backend

- NestJS
- TypeScript
- Redis
- Swagger

### Infrastructure

- Docker
- Docker Compose

## Features

- Detects the visitor's country using IP geolocation
- Tracks visits by country code
- Stores visit counters in Redis
- Retrieves all visit statistics
- Displays country-based visit counts in the UI
- Includes Swagger API documentation
- Runs with Docker Compose

## Project Structure

```bash
.
├── backend
│   ├── src
│   │   ├── redis
│   │   │   ├── redis.module.ts
│   │   │   └── redis.service.ts
│   │   ├── stats
│   │   │   ├── dto
│   │   │   ├── stats.controller.ts
│   │   │   ├── stats.module.ts
│   │   │   └── stats.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── Dockerfile
│   └── package.json
├── frontend
│   ├── src
│   │   ├── services
│   │   │   └── country-stats-api.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── example.env
└── README.md
```

## Requirements

- Docker
- Docker Compose

For local development without Docker:

- Node.js 20+
- npm
- Redis

## Environment Variables

Create a `.env` file in the root directory based on `example.env`.

```env
VITE_BACKEND_URL=http://localhost:3000
REDIS_HOST=redis
REDIS_PORT=6379
```

## Running with Docker

Clone the repository:

```bash
git clone https://github.com/leonidgerlovin/visits-tracker-test-task.git
cd visits-tracker-test-task
```

Create the environment file:

```bash
cp example.env .env
```

Start the application:

```bash
docker compose up --build
```

The services will be available at:

- Frontend: `http://localhost:3001`
- Backend API: `http://localhost:3000`
- Swagger Docs: `http://localhost:3000/docs`
- Redis: `localhost:6379`

## API Endpoints

### Update visit statistics

Increments the visit counter for a country.

```http
POST /stats/update
```

Request body:

```json
{
  "countryCode": "us"
}
```

Example response:

```json
{}
```

### Retrieve visit statistics

Returns all tracked country visit counters.

```http
GET /stats/retrieve
```

Example response:

```json
{
  "stats": {
    "us": 12,
    "it": 5,
    "fr": 8
  }
}
```

## How It Works

1. The frontend loads the page and tries to detect the user's country code using IP geolocation.
2. The country code is shown in the input field.
3. When the user clicks `Update`, the frontend sends the country code to the backend.
4. The backend validates the country code and increments the related Redis key.
5. When the user clicks `Get Stats`, the frontend requests all stored country statistics from the backend.
6. The backend reads Redis keys matching `country:*` and returns the aggregated result.

## Redis Storage Format

Visit counters are stored in Redis using the following key format:

```bash
country:{countryCode}
```

Example:

```bash
country:us -> 12
country:it -> 5
country:fr -> 8
```

## Running Backend Locally

```bash
cd backend
npm install
npm run start:dev
```

Make sure Redis is running and the required environment variables are configured.

## Running Frontend Locally

```bash
cd frontend
npm install
npm run dev
```

The frontend expects the backend URL to be available through:

```env
VITE_BACKEND_URL=http://localhost:3000
```

## Scripts

### Backend

```bash
npm run start
npm run start:dev
npm run build
npm run test
npm run lint
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Notes

- Backend CORS is configured for `http://localhost:3001`.
- Redis is used as the main storage for visit counters.
- Swagger documentation is available at `/docs`.
- The frontend also allows manually editing the detected country code before updating the stats.

## Author

Made by Leonid Gerlovin
