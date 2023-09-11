# nabi-simple-note

## system requirements

- Node.js 18.x
- pnpm 6.x
- PostgreSQL 13.x
- recommend deploy with vercel

## How to start development mode

1. You must be install dependencies with pnpm

```bash
$ pnpm install
```

2. Fill the environment variables

```text
# required
DATABASE_URL="postgresql://nabi:password@localhost:5432/simple-note?schema=public"

# required
# make secret value with `openssl rand -base64 32`
NEXTAUTH_SECRET=""
# required
# make equal with service url
NEXTAUTH_URL="http://localhost:3000"

# required
GITHUB_CLIENT_ID=""
# required
GITHUB_CLIENT_SECRET=""

# optional
GOOGLE_CLIENT_ID=""
# optional
GOOGLE_CLIENT_SECRET=""

# required
# make equal with service url
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# optional
NEXT_PUBLIC_CHANNEL_PLUGIN_KEY=""
# optional
CHANNEL_SECRET=""

# optional
NEXT_PUBLIC_GA_TRACKING_ID=""
```

3. Create a database

```bash
$ pnpm prisma db push
```

4. Start development mode

```bash
$ pnpm dev
```


Add Some line...
