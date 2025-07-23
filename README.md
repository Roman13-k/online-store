# 🛍️ Online Store

Design: [Figma Design](https://www.figma.com/design/r2EfZD0pJNsLm3V4x6KTjp)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## Getting Started Frontend

### 1. Install dependencies

```bash
bun install
```

### 2. Run the frontend

```bash
bun run dev
```

The app will be available at:
http://localhost:3000

### Environment

Create a .env file in the root of the frontend project and add:

```bash
NEXT_PUBLIC_API_URL="http://127.0.0.1:8000"
NEXT_PUBLIC_ADMIN_URL="http://localhost:1337/api"
```

## Getting Started Backend

### 1. Install dependencies

```bash
pip install uv
uv sync
```

### 2. Run the backend

```bash
uvicorn src.main:app --reload
```

The backend will be available at:
http://127.0.0.1:8000

### Environment

Create a .env file in the root of the backend project and add:

```bash
DB_URL="postgresql+asyncpg://postgres:123@localhost:5432/onechapter"
DB_ECHO=True
SECRET_KEY="p0iy3I05KmNOh8Zjk2eTlVcrccX2VSR-Mfh-BMARw-jV1OpU3f7UDNoyZNae2DyWj0446eeuDi1edHyCPF43PQ"
ALGORITHM="HS256"
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is via the  
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

More info in the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).
