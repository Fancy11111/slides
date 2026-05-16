# =========================
# Build stage
# =========================
FROM node:24-alpine AS builder

WORKDIR /app

# Copy dependency files first for better layer caching
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy source code
COPY . .

# Build the PWA
RUN npm run build-deploy


# =========================
# Runtime stage
# =========================
FROM nginx:stable-alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built app from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
