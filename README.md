# Set up NodeJS/Express Server with TypeScript and Prisma ORM

## 1. Initialize a new Node Js app

```bash
npm init -y
```

This created a bare minimum package.json file:

```json
{
  "name": "express-ts-prisma",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs"
}
```

## 2. Install Dependencies

```bash
npm install @prisma/adapter-pg @prisma/client cors dotenv express pg
```

Also install dev dependencies

```bash
npm install @types/cors @types/express @types/node, @types/pg nodemon prisma ts-node tsx typescript
```

## 3. Create `tsconfig` files

Create the config file for typescript

create the base tsconfig `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2023",
    "strict": true,
    "esModuleInterop": true,
    "moduleResolution": "node"
  }
}
```

create application's tsconfig `tsconfig.node.json`

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "sourceMap": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

Create tsconfig for prisma (optional) `tsconfig.prisma.json`:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "ESNext"
  }
}
```

## 4. Create `nodemon.json` for dev server

```json
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node --project tsconfig.node.json src/server.ts",
  "env": {
    "NODE_ENV": "development"
  }
}
```

**NOTE**: make sure your nodemon.jso uses the application's tsconfig file

## 5. Create the `src` directory and the source files

Create the src directory with the source file most especially `src/server.ts`

```typescript
import express from 'express'

const app = express()

app.get('/', (_, res) => {
  res.status(200).json('Home')
})

app.listen(3000, () => {
  console.log('App is listening on port 3000...')
})
```

Edit the script section of package.json

```json
"main": "dist/server.js",
"scripts": {
    "dev": "nodemon",
    "build": "tsc",
    "start": "node dist/server.js"
}
```

At this point, you can start the server to test it. You should see the server started in the terminal

```bash
App is listening on port 3000...
```

## 6. Initialize the Prisma ORM

Invoke the prisma CLI:

```bash
npx prisma
```

## 7. Setup Prisma ORM

Next, set up your Prisma ORM project by creating your Prisma Schema file with the following command:

```bash
npx prisma init --output ../generated/prisma
```

You should see this output

```bash
Initialized Prisma in your project

  prisma/
    schema.prisma
  prisma.config.ts
  .env
  .gitignore

Next, choose how you want to set up your database:

CONNECT EXISTING DATABASE:
  1. Configure your DATABASE_URL in prisma.config.ts
  2. Run prisma db pull to introspect your database.

CREATE NEW DATABASE:
  Local: npx prisma dev (runs Postgres locally in your terminal)
  Cloud: npx create-db (creates a free Prisma Postgres database)

Then, define your models in prisma/schema.prisma and run prisma migrate dev to apply your schema.

Learn more: https://pris.ly/getting-started
```

This command does the following:

1. Creates a `prisma/` directory with a `schema.prisma` file containing your database connection and schema models
1. Creates a `.env` file in the root directory for environment variables
1. Creates a `prisma.config.ts` file for Prisma configuration
1. If you added a `--db` flag to the above command, it creates a new Prisma Postgres database. That is. if you run the command:
   ```bash
   npx prisma init --db --output ../generated/prisma
   ```

The generated `prisma.config.ts` file looks like this:

```typescript
import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
})
```

and the generated `prisma/schema.prisma` file looks like this:

```typescript
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```

To make sure that your Prisma Schema generates JavaScript output (instead of TypeScript), change the generator client section of the `prisma/schema.prisma` file to:

```diff
generator client {
- provider = "prisma-client"
+ provider = "prisma-client-js"
- output   = "../generated/prisma",
+ output   = "../generated/prisma/client"
}
```

## 8. Define Your Data Model

Define your models in `prisma/schema.prisma`:

```diff
    generator client {
        provider = "prisma-client"
        output   = "../generated/prisma/client"
    }

    datasource db {
        provider = "postgresql"
    }

+   model User {
+       id    Int     @id @default(autoincrement())
+       email String  @unique
+       name  String?
+       posts Post[]
+   }
+
+   model Post {
+       id        Int     @id @default(autoincrement())
+       title     String
+       content   String?
+       published Boolean @default(false)
+       author    User    @relation(fields: [authorId], references: [id])
+       authorId  Int
+   }
```

## 9. Create and Apply Your First Migrations

Create your first migration to set up the database tables:

```bash
npx prisma migrate dev --name init
```

This command creates the database tables based on your schema.

Now run the following command to generate the Prisma Client:

```bash
npx prisma generate
```

## 10. Instantiate Prisma Client

```typescript
import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export { prisma }
```
