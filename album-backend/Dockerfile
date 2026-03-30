FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the code
COPY prisma ./prisma
COPY .env .env
COPY src ./src

# Generate Prisma client
RUN npx prisma generate

# Run migrations and start backend
CMD npx prisma migrate deploy && npx ts-node src/index.ts