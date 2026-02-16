# Project Overview

This is a full‑stack app with an Angular frontend, a .NET backend, and a MySQL database for local development.

## Quick Start

1. Start the database with Docker.
2. Run the backend API.
3. Run the frontend app.

## Prerequisites

- Node.js (LTS)
- .NET SDK 9
- Docker (for local MySQL)

## Install

Frontend:

```bash
cd frontend
npm install
```

Backend:

```bash
cd backend
dotnet restore
```

## Run Locally

Start MySQL with Docker:

```bash
cd backend
docker compose up -d
```

Run the backend API:

```bash
cd backend
ASPNETCORE_URLS=http://localhost:5017 dotnet run --project backend.csproj
```

Run the frontend:

```bash
cd frontend
npm run start
```

Frontend runs on `http://localhost:4200`  
Backend runs on `http://localhost:5017`

## Environment Variables

Sensitive configuration (DB credentials, JWT key) is provided via environment variables.

Local example (do not use in production):

```env
MYSQL_ROOT_PASSWORD=change_me_root
MYSQL_DATABASE=bookstore_db
MYSQL_USER=appuser
MYSQL_PASSWORD=change_me_app
JWT_KEY=change_me_long_random_secret
```

## Production URLs

Frontend: `https://bookstore-xr42.onrender.com`  
API: `https://bookstore-production-434a.up.railway.app`

## REST API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/books`
- `GET /api/books/{id}`
- `POST /api/books`
- `PUT /api/books/{id}`
- `DELETE /api/books/{id}`
- `GET /api/quotes`
- `GET /api/quotes/{id}`
- `POST /api/quotes`
- `PUT /api/quotes/{id}`
- `DELETE /api/quotes/{id}`
