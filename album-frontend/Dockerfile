# Use Node
FROM node:20-alpine

WORKDIR /app

# Install deps first (cache optimization)
COPY package.json package-lock.json* ./
RUN npm install

# Copy source
COPY . .

# Dev mode
CMD ["npm", "run", "dev"]