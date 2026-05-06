# Warm Order Hub (Campus Dhaba)

Full-stack PERN app:

- **Frontend**: Vite + React + TypeScript
- **Backend**: Node.js + Express
- **Database**: Neon PostgreSQL

## Repository structure

```
project-root/
├── frontend/   (React + Vite + TS)
├── backend/    (Node + Express)
└── README.md
```

## Quick start (local dev)

### Prerequisites

- Node.js \(>= 20\) and npm
- A Neon Postgres connection string (`DATABASE_URL`)

### 1) Install

This installs **both** frontend and backend dependencies:

```bash
npm install
```

### 2) Configure environment

Create backend env:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` and set at minimum:

- `DATABASE_URL`
- `JWT_SECRET`
- `CLIENT_ORIGIN` (usually `http://localhost:5173` — or your actual Vite origin)

Create frontend env:

```bash
cp frontend/.env.example frontend/.env.local
```

Ensure `VITE_API_URL` points to the backend:

- Example: `VITE_API_URL=http://localhost:8080`

### 3) Create tables + seed demo data

```bash
npm run db:apply:schema -w backend
npm run db:seed -w backend
```

### 4) Run (auto-reload)

One command starts **both** servers with hot reload/watch:

```bash
npm start
```

- Frontend: `http://localhost:5173` (or next available port)
- Backend: `http://localhost:8080`

## Demo accounts

Seeded into Neon by `backend/scripts/seed.ts`.

### Customers

- **ahmed** / **ahmed123**
- **ali** / **ali123**
- **demo** / **demo123**

### Vendors

- **ayan** / **ayan123** (Ayan Gardens)
- **sip** / **sip123** (Sip Spot)
- **raju** / **raju123** (Raju Hotel)
- **juice** / **juice123** (Juice Spot)

## Common issues

### CORS blocked / blank content

If pages render but API calls fail, your backend CORS allow-list may not include your frontend origin.

Fix by setting `CLIENT_ORIGIN` in `backend/.env` to your actual origin(s), comma-separated, for example:

```bash
CLIENT_ORIGIN=http://localhost:5173,http://localhost:8081
```

Restart backend after changing env.
