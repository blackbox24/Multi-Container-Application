# MULTI-CONTAINER PROJECT

A minimal, unauthenticated REST API for managing a todo list, built with Node.js, Express, Mongoose and MongoDB.

This project demonstrates:

- Basic CRUD API
- MongoDB persistence
- Containerization with Docker & docker-compose
- Infrastructure as Code (Terraform + Ansible)
- CI/CD deployment (GitHub Actions)
- (Bonus) Nginx reverse proxy setup

## Features / Endpoints

| Method | Endpoint          | Description                     | Request Body (JSON)              |
|--------|-------------------|----------------------------------|----------------------------------|
| GET    | `/todos`          | List all todos                  | —                                |
| POST   | `/todos`          | Create a new todo               | `{ "title": "Buy milk", "completed": false }` |
| GET    | `/todos/:id`      | Get one todo by ID              | —                                |
| PUT    | `/todos/:id`      | Update todo (full or partial)   | `{ "title": "...", "completed": true }` |
| DELETE | `/todos/:id`      | Delete a todo                   | —                                |

**Note:** No authentication / authorization is implemented.

## Tech Stack

- **Runtime**       Node.js
- **Framework**     Express
- **Database**      MongoDB
- **ODM**           Mongoose
- **Dev tooling**   nodemon
- **Container**     Docker + docker-compose
- **IaC**           Terraform (server), Ansible (configuration)
- **CI/CD**         GitHub Actions
- **Bonus**         Nginx (reverse proxy)

## Project Structure (typical layout)

```
todo-api/
├── src/
│   ├── models/
│   │   └── Todo.js
│   ├── routes/
│   │   └── todos.js
│   ├── app.js              # or index.js
│   └── server.js
├── tests/                  (optional)
├── .dockerignore
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   └── ...
├── ansible/
│   ├── playbook.yml
│   └── roles/
├── .github/
│   └── workflows/
│       └── deploy.yml
└── README.md
```

## Quick Start (Local Development)

```bash
# 1. Start MongoDB + API
docker compose up -d

# 2. With hot-reload (recommended for development)
docker compose -f docker-compose.yml -f docker-compose.dev.yml up
```

API will be available at: http://localhost:3000

## Local Requirements

- Docker 20.10+
- Docker Compose v2
- (optional) Node.js 18+ & npm/yarn/pnpm — for local non-docker development

## Docker Compose Services

| Service       | Port mapping       | Purpose                           | Persisted? |
|---------------|--------------------|-----------------------------------|------------|
| api           | 3000 → 3000        | Node.js / Express application     | —          |
| mongo         | —                  | MongoDB database                  | Yes        |
| mongo-express | 8081 → 8081 (opt.) | Web UI for browsing MongoDB       | —          |
| nginx         | 80 → 80 (bonus)    | Reverse proxy (bonus)             | —          |

## Deployment Architecture

```
+-------------------+       +---------------------+       +-----------------+
|  GitHub           |       |  Remote VM          |       |  Docker Host    |
|  (main branch)    | →     |  (DigitalOcean /    | →     |  • api          |
|  → GitHub Actions |       |   AWS / ...)        |       |  • mongo        |
+-------------------+       |  • Docker + Compose |       |  • nginx (bonus)|
                            +---------------------+       +-----------------+
                                       ↑
                               Terraform (create VM)
                                       ↑
                                 Ansible (setup)
```

## Deployment Steps (One-time setup)

1. **Create infrastructure**

   ```bash
   cd terraform
   terraform init
   terraform apply
   ```

2. **Configure server & deploy first version**

   ```bash
   cd ansible
   ansible-playbook -i inventory.yml playbook.yml
   ```

3. **Future changes** → just push to `main` → GitHub Actions handles build & deploy

## CI/CD (GitHub Actions)

Typical workflow triggers on:

- push to `main`
- pull request to `main`

Steps usually include:

- lint & test (if you added tests)
- build & push Docker image to Docker Hub / GHCR
- SSH into server
- `docker compose pull && docker compose up -d`

Secrets needed in repo settings:

- `SSH_PRIVATE_KEY`
- `SERVER_IP` or `HOST`
- `DOCKERHUB_USERNAME` / `DOCKERHUB_TOKEN` (if using Docker Hub)

## Bonus – Domain + HTTPS (manual / optional steps)

1. Point domain A record → server public IP
2. Install certbot inside nginx container or on host
3. Obtain Let's Encrypt certificate
4. Update nginx config to use SSL

Or use a managed solution (Cloudflare, Traefik, Caddy, etc.)

## Todo (Project Improvement Ideas)

- Add input validation (Joi / Zod / express-validator)
- Add basic tests (Jest + supertest)
- Implement health-check endpoint `/health`
- Add API documentation (Swagger / Redoc)
- Add rate limiting
- Add simple authentication (JWT / API key)
- Use MongoDB transactions (if needed)
- Add logging (winston / pino)
- Add environment-based configuration (dotenv / convict)

## License

MIT
