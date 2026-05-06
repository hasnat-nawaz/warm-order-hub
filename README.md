# Warm Order Hub (Campus Dhaba)

A containerized full-stack web application with a complete DevOps pipeline for campus food ordering. Built as part of the **SE202L – Development Operations Lab** semester project.

---

## Table of Contents

- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Quick Start (Local Dev)](#quick-start-local-dev)
- [Docker Setup](#docker-setup)
- [CI/CD Pipeline](#cicd-pipeline)
- [Cloud Deployment (AWS EC2)](#cloud-deployment-aws-ec2)
- [Demo Accounts](#demo-accounts)
- [Common Issues](#common-issues)

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        GitHub Repository                        │
│   (Branching, Merging, PRs, Commits from all group members)     │
└────────────────────────────────┬────────────────────────────────┘
                                 │ Push to main
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GitHub Actions CI/CD                          │
│  ┌──────────┐    ┌────────────────┐    ┌───────────────────┐    │
│  │  Lint &   │───▶│  Build Docker  │───▶│  Deploy to AWS   │    │
│  │  Build    │    │  Images        │    │  EC2 via SSH     │    │
│  └──────────┘    └────────────────┘    └───────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AWS EC2 Instance                           │
│  ┌──────────────────────┐    ┌──────────────────────┐           │
│  │   Frontend Container │    │   Backend Container  │           │
│  │   (Nginx :80)        │◀──▶│   (Node.js :8080)    │           │
│  └──────────────────────┘    └──────────┬───────────┘           │
│                                         │                       │
│                                         ▼                       │
│                              ┌────────────────────┐             │
│                              │  Neon PostgreSQL    │             │
│                              │  (Cloud Database)   │             │
│                              └────────────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer          | Technology                          |
| -------------- | ----------------------------------- |
| **Frontend**   | Vite + React + TypeScript           |
| **Backend**    | Node.js + Express + TypeScript      |
| **Database**   | Neon PostgreSQL (cloud-hosted)       |
| **Container**  | Docker + Docker Compose             |
| **CI/CD**      | GitHub Actions                      |
| **Cloud**      | AWS EC2                             |
| **IaC**        | Terraform (optional)                |

---

## Repository Structure

```
warm-order-hub/
├── .github/
│   └── workflows/
│       └── ci-cd.yml           # GitHub Actions CI/CD pipeline
├── backend/
│   ├── db/
│   │   └── schema.sql          # PostgreSQL schema
│   ├── scripts/
│   │   ├── apply-schema.ts     # DB schema migration
│   │   └── seed.ts             # Demo data seeder
│   ├── src/
│   │   ├── index.ts            # Express entry point
│   │   ├── db.ts               # DB connection pool
│   │   ├── http.ts             # HTTP helpers
│   │   ├── auth.ts             # JWT utilities
│   │   └── middleware/         # Auth middleware
│   ├── Dockerfile              # Backend Docker image
│   ├── .dockerignore
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/                    # React components, routes, hooks, etc.
│   ├── Dockerfile              # Frontend Docker image (nginx)
│   ├── .dockerignore
│   ├── nginx.conf              # Nginx SPA config
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml          # Multi-service orchestration
├── package.json                # Root workspace config
└── README.md
```

---

## Quick Start (Local Dev)

### Prerequisites

- Node.js (>= 20) and npm
- A Neon Postgres connection string (`DATABASE_URL`)

### 1) Install

This installs **both** frontend and backend dependencies:

```bash
npm install
```

### 2) Configure Environment

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

### 3) Create Tables + Seed Demo Data

```bash
npm run db:apply:schema -w backend
npm run db:seed -w backend
```

### 4) Run (Auto-reload)

One command starts **both** servers with hot reload/watch:

```bash
npm start
```

- Frontend: `http://localhost:5173` (or next available port)
- Backend: `http://localhost:8080`

---

## Docker Setup

### Prerequisites

- Docker Engine (>= 20.10)
- Docker Compose (V2)

### Build & Run with Docker Compose

```bash
# Build and start all services
docker compose up -d --build

# Check running containers
docker ps

# View logs
docker compose logs -f

# Stop all services
docker compose down
```

### Individual Docker Images

```bash
# Build backend image
docker build -t warm-order-hub-backend ./backend

# Build frontend image
docker build -t warm-order-hub-frontend ./frontend

# Run backend container
docker run -d -p 8080:8080 --env-file backend/.env warm-order-hub-backend

# Run frontend container
docker run -d -p 80:80 warm-order-hub-frontend
```

### Access the Application

- **Frontend**: `http://localhost` (port 80)
- **Backend API**: `http://localhost:8080`

---

## CI/CD Pipeline

The project uses **GitHub Actions** for automated CI/CD. The pipeline is defined in `.github/workflows/ci-cd.yml`.

### Pipeline Stages

| Stage            | Trigger                    | Description                                              |
| ---------------- | -------------------------- | -------------------------------------------------------- |
| **Build & Lint** | Push/PR to `main`          | Installs deps, lints frontend, builds backend & frontend |
| **Docker Build** | After successful build     | Builds Docker images for both services                   |
| **Deploy**       | Push to `main` (only)      | Deploys to AWS EC2 via SSH                               |

### Pipeline Flow

```
Code Push to main
       │
       ▼
  ┌─────────┐     ┌──────────────┐     ┌──────────────┐
  │  Lint & ─┼────▶│ Build Docker ─┼────▶│  Deploy to   │
  │  Build   │     │ Images       │     │  AWS EC2     │
  └─────────┘     └──────────────┘     └──────────────┘
```

### Required GitHub Secrets

Configure these in your repository's **Settings → Secrets and variables → Actions**:

| Secret          | Description                                    |
| --------------- | ---------------------------------------------- |
| `EC2_HOST`      | Public IP or DNS of your EC2 instance          |
| `EC2_USER`      | SSH username (e.g., `ubuntu` or `ec2-user`)    |
| `EC2_SSH_KEY`   | Private SSH key for EC2 access                 |

---

## Cloud Deployment (AWS EC2)

### EC2 Instance Setup

1. Launch an EC2 instance (Ubuntu 22.04 LTS recommended)
2. Configure security group:
   - Inbound: Port 22 (SSH), Port 80 (HTTP), Port 8080 (API)
3. SSH into the instance and install Docker:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose-plugin
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

4. Set up the backend `.env` file on the server with production values.

### Manual Deployment (Alternative)

```bash
# SSH into EC2
ssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>

# Clone the repository
git clone https://github.com/<your-username>/warm-order-hub.git
cd warm-order-hub

# Create backend .env with production values
cp backend/.env.example backend/.env
nano backend/.env

# Build and run
docker compose up -d --build
```

---

## Demo Accounts

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

---

## Common Issues

### CORS Blocked / Blank Content

If pages render but API calls fail, your backend CORS allow-list may not include your frontend origin.

Fix by setting `CLIENT_ORIGIN` in `backend/.env` to your actual origin(s), comma-separated, for example:

```bash
CLIENT_ORIGIN=http://localhost:5173,http://localhost:8081
```

Restart backend after changing env.

### Docker Build Fails

- Ensure `backend/.env` exists before running `docker compose up`
- Check that `DATABASE_URL` is set and the Neon database is accessible from the container

---

## Group Members

| Name | Registration No. | Contributions |
| ---- | ----------------- | ------------- |
|      |                   |               |
|      |                   |               |
|      |                   |               |

> Fill in group member details before submission.

---

## License

This project is developed as part of the SE202L course at GIKI..
