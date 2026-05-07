# Warm Order Hub (Campus Dhaba)

> A containerized full-stack web app that lets GIKI students place pickup orders from campus food vendors, and lets vendors manage their menu and incoming orders — wrapped in a complete DevOps pipeline (Docker, GitHub Actions, Docker Hub, AWS EC2, Terraform). Built for **SE202L – Development Operations Lab**.

## What this README is

This is the **top-level README** for the whole monorepo. It is the one file you need to read end-to-end to:

- Understand the project at a glance — what it does, who it's for, and how the pieces fit together.
- Get a development environment running on your laptop in a few commands.
- Build and run the system in Docker.
- Trigger the CI/CD pipeline.
- Deploy the live application to AWS EC2.

For deep-dive details on a single subsystem, jump into its own README:

- [`backend/README.md`](backend/README.md) — Express API, DB schema, every endpoint, scripts.
- [`frontend/README.md`](frontend/README.md) — React/Vite SPA, routes, state store, build output.
- [`terraform/README.md`](terraform/README.md) — Infrastructure-as-Code demo (AWS Security Group via Terraform).

---

## Table of Contents

- [What it does (in plain English)](#what-it-does-in-plain-english)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [First-Time Setup (Local Dev)](#first-time-setup-local-dev)
- [Running the App Locally](#running-the-app-locally)
- [Running with Docker Compose](#running-with-docker-compose)
- [CI/CD Pipeline](#cicd-pipeline)
- [Cloud Deployment (AWS EC2)](#cloud-deployment-aws-ec2)
- [Environment Variables Reference](#environment-variables-reference)
- [Demo Accounts](#demo-accounts)
- [Common Issues & Fixes](#common-issues--fixes)
- [Group Members](#group-members)
- [License](#license)

---

## What it does (in plain English)

Warm Order Hub is a campus food-ordering platform with **two roles**:

- **Customer** — signs up, browses vendors (Ayan Gardens, Sip Spot, Raju Hotel, Juice Spot), adds items to a cart, picks a payment method (EasyPaisa / JazzCash / Cash on Pickup) and a pickup time, and tracks the order through `Pending → Preparing → Ready → Picked up`.
- **Vendor** — logs in, sees incoming orders in real time, advances each order through its lifecycle, edits/adds/removes menu items, and toggles a "currently accepting orders" switch during rush.

All data is real (no mock JSON in production): vendors, menus, users, orders, and order lines live in **Neon PostgreSQL**. The frontend is a single-page **React + Vite** app served by **Nginx** that reverse-proxies `/api/*` to an **Express + TypeScript** backend. Everything is containerized with Docker.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        GitHub Repository                        │
│   (branches, PRs, commits from all group members)               │
└────────────────────────────────┬────────────────────────────────┘
                                 │ git push to main
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GitHub Actions CI/CD                         │
│  ┌──────────┐    ┌────────────────┐    ┌───────────────────┐    │
│  │  Build & │───▶│  Build & Push  │───▶│  Deploy to AWS    │    │
│  │  Lint    │    │  Docker Images │    │  EC2 via SSH      │    │
│  └──────────┘    └───────┬────────┘    └─────────┬─────────┘    │
└──────────────────────────┼───────────────────────┼──────────────┘
                           │ push :latest          │ ssh + scp
                           ▼                       ▼
                   ┌──────────────┐    ┌──────────────────────────┐
                   │  Docker Hub  │◀──▶│   AWS EC2 (Ubuntu 22.04) │
                   │  registry    │    │  ┌────────────┐          │
                   └──────────────┘    │  │  Frontend  │          │
                                       │  │  Nginx :80 │          │
                                       │  └─────┬──────┘          │
                                       │        │ /api/* proxy    │
                                       │        ▼                 │
                                       │  ┌──────────────┐        │
                                       │  │   Backend    │        │
                                       │  │  Express :8080│       │
                                       │  └──────┬───────┘        │
                                       └─────────┼────────────────┘
                                                 │ SQL over TLS
                                                 ▼
                                       ┌──────────────────────┐
                                       │  Neon PostgreSQL     │
                                       │  (cloud, serverless) │
                                       └──────────────────────┘
```

The database deliberately lives **outside** the EC2 host (on Neon) so that container restarts, redeploys, or even rebuilding the EC2 instance never touches user/order data.

---

## Tech Stack

| Layer            | Technology                                                                    |
| ---------------- | ----------------------------------------------------------------------------- |
| **Frontend**     | Vite + React 19 + TypeScript + TanStack Router + Tailwind 4 + Radix UI + Zustand |
| **Backend**      | Node.js 20 + Express 5 + TypeScript + Zod + helmet + bcrypt + JWT             |
| **Database**     | Neon PostgreSQL 16 (cloud-hosted, serverless)                                 |
| **Web Server**   | Nginx (SPA + reverse proxy `/api/*` → backend)                                 |
| **Container**    | Docker (multi-stage) + Docker Compose                                          |
| **CI/CD**        | GitHub Actions (3 jobs: Build & Lint → Docker → Deploy)                       |
| **Registry**     | Docker Hub                                                                     |
| **Cloud**        | AWS EC2 (Ubuntu 22.04 LTS, t2.micro)                                           |
| **IaC**          | Terraform (`hashicorp/aws` provider)                                           |

---

## Repository Structure

```
warm-order-hub/
├── .github/workflows/
│   └── ci-cd.yml             # GitHub Actions pipeline (build → docker → deploy)
├── backend/                  # Express + TypeScript API (see backend/README.md)
│   ├── src/                  #   Express app, routes, auth, DB pool
│   ├── db/schema.sql         #   PostgreSQL schema (idempotent)
│   ├── scripts/              #   apply-schema.ts, seed.ts
│   └── Dockerfile            #   multi-stage backend image
├── frontend/                 # React + Vite SPA (see frontend/README.md)
│   ├── src/routes/           #   File-based TanStack Router routes
│   ├── src/components/       #   Shared UI + Radix primitives
│   ├── nginx.conf            #   SPA routing + /api proxy in production
│   └── Dockerfile            #   multi-stage frontend image
├── terraform/                # IaC demo (see terraform/README.md)
│   └── main.tf               #   AWS Security Group as code
├── docker-compose.yml        # Orchestrates frontend + backend containers
├── package.json              # npm workspaces root
└── README.md                 # ← you are here
```

---

## First-Time Setup (Local Dev)

Do these once after cloning the repo.

### Prerequisites

- **Node.js ≥ 20** and **npm ≥ 10** (`node -v && npm -v`)
- **Git**
- A **Neon PostgreSQL** connection string ([neon.tech](https://neon.tech) — free tier is enough). Anything Postgres-compatible with TLS works, but Neon is the supported default.

### 1. Clone and install

```bash
git clone https://github.com/<your-username>/warm-order-hub.git
cd warm-order-hub
npm install
```

`npm install` at the root installs **both** the `frontend` and `backend` workspaces in one go thanks to npm workspaces.

### 2. Configure environment files

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

Then open `backend/.env` and set at minimum:

```env
PORT=8080
DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require
JWT_SECRET=<a-long-random-string>
CLIENT_ORIGIN=http://localhost:5173,http://localhost:8081
```

And in `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:8080
```

> See [Environment Variables Reference](#environment-variables-reference) for what each one does.

### 3. Create the database schema and seed demo data

```bash
npm run db:apply:schema -w backend
npm run db:seed -w backend
```

- `db:apply:schema` runs `backend/db/schema.sql` against your `DATABASE_URL`. The SQL is idempotent (`IF NOT EXISTS` everywhere) so it's safe to re-run.
- `db:seed` populates the four campus vendors, ~70 menu items, and the demo customer/vendor accounts listed in [Demo Accounts](#demo-accounts). Re-running the seed upserts (`ON CONFLICT DO UPDATE`) — it does **not** duplicate rows.

---

## Running the App Locally

A single command starts both servers with hot reload:

```bash
npm start
```

- **Frontend** → http://localhost:5173 (or the next free port)
- **Backend**  → http://localhost:8080
- **Health check** → http://localhost:8080/api/health  → `{"ok":true}`

Internally, `npm start` runs `concurrently` to start `npm run dev -w backend` (using `tsx watch`) and `npm run dev -w frontend` (using `vite dev`) in parallel, with colour-coded logs (magenta for backend, cyan for frontend).

### Other useful scripts

```bash
npm run build           # Build backend (tsc) + frontend (vite build)
npm run lint            # Lint both workspaces
npm run format          # Prettier across the whole repo

# Workspace-scoped scripts (runs only in that workspace)
npm run dev   -w backend
npm run dev   -w frontend
npm run build -w backend
npm run build -w frontend
```

---

## Running with Docker Compose

This is the production-shaped run: same images that the CI/CD pipeline builds and deploys.

### Prerequisites

- **Docker Engine ≥ 20.10**
- **Docker Compose v2** (`docker compose version`)

### 1. Make sure `backend/.env` exists

The Compose file mounts `backend/.env` into the backend container via `env_file:`. If it's missing, the backend will crash on startup.

### 2. Build and start everything

```bash
docker compose up -d --build
```

The first run builds two multi-stage images:

- `warm-order-hub-backend` (or your DockerHub-prefixed tag) — Node.js 20 alpine, listens on `:8080`.
- `warm-order-hub-frontend` — Nginx serving the built SPA on `:80`, with `/api/*` reverse-proxied to the `backend` service over the private `app-network` bridge.

### 3. Common operations

```bash
docker ps                         # see running containers
docker compose logs -f            # tail logs from both services
docker compose logs -f backend    # only backend
docker compose restart backend    # restart one service
docker compose down               # stop & remove containers
docker compose down -v            # stop & remove containers + named volumes
docker compose pull               # pull updated images from Docker Hub
docker compose up -d              # apply changes / new images
```

### 4. Access the app

- **Frontend** → http://localhost (port 80)
- **Backend**  → http://localhost:8080

### Building a single image manually

```bash
docker build -t warm-order-hub-backend ./backend
docker build --build-arg VITE_API_URL=http://localhost:8080 \
             -t warm-order-hub-frontend ./frontend
```

> The frontend `VITE_API_URL` is **baked in at build time** because Vite inlines `import.meta.env.VITE_*` into the bundle. If you change it, you must rebuild the frontend image.

---

## CI/CD Pipeline

Defined in [`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml). Triggered automatically on:

- Every **push to `main`** → runs **all three jobs** (build → docker → deploy).
- Every **pull request to `main`** → runs **only Job 1 (Build & Lint)** to verify the branch builds cleanly without publishing or deploying.

| Job | Name                       | What it does                                                                                              |
| --- | -------------------------- | --------------------------------------------------------------------------------------------------------- |
| 1   | Build & Lint               | `npm ci` → ESLint frontend → `tsc` backend → `vite build` frontend.                                       |
| 2   | Build & Push Docker Images | `docker login` → builds backend + frontend images → pushes `:latest` to Docker Hub.                       |
| 3   | Deploy to AWS EC2          | Generates `backend/.env` from secrets via heredoc → `scp` repo to host → `ssh` → `docker compose pull && up -d`. |

### Required GitHub Secrets

Set these in **Settings → Secrets and variables → Actions**:

| Secret               | Used in              | What it is                                                            |
| -------------------- | -------------------- | --------------------------------------------------------------------- |
| `DOCKERHUB_USERNAME` | Job 2, Job 3         | Your Docker Hub username (image tag prefix).                          |
| `DOCKERHUB_TOKEN`    | Job 2, Job 3         | A Docker Hub access token (preferred over your password).             |
| `VITE_API_URL`       | Job 2 (frontend)     | Production backend URL baked into the frontend bundle.                |
| `EC2_HOST`           | Job 3                | Public IP or DNS of your EC2 instance.                                |
| `EC2_USER`           | Job 3                | SSH user (`ubuntu` on a stock Ubuntu AMI).                            |
| `EC2_SSH_KEY`        | Job 3                | The full content of your `.pem` private key (multiline OK).           |
| `PORT`               | Job 3 (`.env` write) | Backend port (use `8080`).                                            |
| `DATABASE_URL`       | Job 3 (`.env` write) | Neon connection string (must include `?sslmode=require`).             |
| `JWT_SECRET`         | Job 3 (`.env` write) | Long random string used to sign JWTs.                                 |
| `CLIENT_ORIGIN`      | Job 3 (`.env` write) | Comma-separated CORS allow-list (e.g. `http://<EC2_PUBLIC_IP>`).       |

### Trigger a deploy manually

```bash
git commit --allow-empty -m "ci: trigger deploy"
git push origin main
```

Then watch it run under your repo's **Actions** tab.

---

## Cloud Deployment (AWS EC2)

The first-time deploy is manual; every subsequent deploy is automatic via the pipeline above.

### 1. Launch an EC2 instance

- AMI: **Ubuntu Server 22.04 LTS** (free-tier eligible).
- Instance type: **t2.micro**.
- Key pair: create a new one and download the `.pem` (you'll paste it into `EC2_SSH_KEY`).
- Security group inbound rules:
  - Port **22** (SSH)
  - Port **80** (HTTP, frontend)
  - Port **8080** (Backend API)
- Storage: 8–10 GB gp3 is plenty.

### 2. Install Docker on the instance

```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>

sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose-plugin
sudo systemctl enable docker
sudo usermod -aG docker $USER
exit                       # log out & back in for the group to take effect
ssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>
docker --version
docker compose version
```

### 3. First-time deploy (manual sanity check)

```bash
git clone https://github.com/<your-username>/warm-order-hub.git
cd warm-order-hub
cp backend/.env.example backend/.env
nano backend/.env         # set DATABASE_URL, JWT_SECRET, CLIENT_ORIGIN=http://<EC2_PUBLIC_IP>
docker compose up -d --build
docker ps
```

Open `http://<EC2_PUBLIC_IP>` in a browser — you should see the app.

### 4. Hand control over to GitHub Actions

Once the manual deploy works:

1. Add the [GitHub Secrets](#required-github-secrets) listed above.
2. Push any change to `main`.
3. The pipeline `scp`'s the latest code, regenerates `backend/.env` from the secrets, pulls new images, and brings the stack up — no SSH from you.

---

## Environment Variables Reference

### Backend (`backend/.env`)

| Variable        | Required | Default                       | What it does                                                              |
| --------------- | -------- | ----------------------------- | ------------------------------------------------------------------------- |
| `PORT`          | no       | `8080`                        | TCP port the Express server listens on.                                   |
| `DATABASE_URL`  | **yes**  | —                             | Postgres connection string. TLS auto-enabled if it includes `sslmode=require` or `ssl=true`. |
| `JWT_SECRET`    | **yes**  | —                             | Long random string used to sign and verify JWTs (7-day expiry).           |
| `CLIENT_ORIGIN` | no       | `http://localhost:5173`       | Comma-separated CORS allow-list. Any `http://localhost:<port>` is also auto-allowed for dev  |

### Frontend (`frontend/.env.local` or `--build-arg`)

| Variable        | Required | Default                  | What it does                                                                       |
| --------------- | -------- | ------------------------ | ---------------------------------------------------------------------------------- |
| `VITE_API_URL`  | yes      | `http://localhost:8080`  | The backend base URL the SPA calls. **Baked in at build time** by Vite, so changing it requires a rebuild. |

---

## Demo Accounts

Created by `backend/scripts/seed.ts`. Passwords are bcrypt-hashed at seed time.

### Customers

| Username | Password   |
| -------- | ---------- |
| `ahmed`  | `ahmed123` |
| `ali`    | `ali123`   |
| `demo`   | `demo123`  |

### Vendors

| Username | Password   | Vendor          |
| -------- | ---------- | --------------- |
| `ayan`   | `ayan123`  | Ayan Gardens    |
| `sip`    | `sip123`   | Sip Spot        |
| `raju`   | `raju123`  | Raju Hotel      |
| `juice`  | `juice123` | Juice Spot      |

> These are **demo passwords** — never reuse them in production. Re-running `npm run db:seed -w backend` upserts them, so changing them on the server is safe.

---

## Common Issues & Fixes

### "Failed to fetch" / blank page on the deployed site

The frontend's `VITE_API_URL` is **baked into the JS bundle at build time**. If the production image was built with `http://localhost:8080`, every browser will try to talk to *its own* localhost. **Fix:** set the `VITE_API_URL` GitHub Secret to your production backend URL (e.g. `http://<EC2_PUBLIC_IP>:8080`) and re-trigger Job 2.

### CORS blocked on the deployed site

Backend `CLIENT_ORIGIN` doesn't include the origin the browser is using. **Fix:** set the `CLIENT_ORIGIN` GitHub Secret to your public origin (comma-separated for multiple), e.g. `http://<EC2_PUBLIC_IP>`. The pipeline will rewrite `backend/.env` and Compose will pick it up on the next `up -d`.

### `JWT_SECRET is required` on backend startup

The backend refuses to start without a `JWT_SECRET`. **Fix:** make sure `backend/.env` exists and contains a non-empty `JWT_SECRET`. In production, this is generated by Job 3 from the `JWT_SECRET` GitHub Secret.

### Docker build fails / backend container restarts in a loop

Almost always a database problem.

```bash
docker compose logs backend         # look for "DATABASE_URL is required" or DB errors
```

Confirm:

- `backend/.env` exists and `DATABASE_URL` is set.
- The Neon project is **not** paused (free-tier projects auto-suspend when idle).
- The connection string includes `?sslmode=require`.

### Vendor login works but their dashboard is empty

Make sure the seed script has been run against the same database:

```bash
npm run db:seed -w backend
```

The vendor's `users.vendor_id` must match a row in the `vendors` table — the seed script wires this up correctly, but a hand-edited DB might not.

---

## Group Members

| Name                       | Registration No. | Contributions                                                  |
| -------------------------- | ---------------- | -------------------------------------------------------------- |
| Hasnat Nawaz               | <REG_NO>         | Backend, DevOps pipeline, Terraform, deployment.                |
| Syeda Fatima Tuz Zahra     | <REG_NO>         | Frontend (routes, components), Zustand store, UI/UX.            |
| Rayyan Hasan               | <REG_NO>         | Database schema, seed data, vendor dashboard, integration.     |

> Replace `<REG_NO>` with each member's registration number before submission.

---

## License

This project is developed as part of the **SE202L – Development Operations Lab** course at Ghulam Ishaq Khan Institute (GIKI). It is shared for educational and assessment purposes.
