# Stage 1: Build the Vite site
FROM node:20-alpine AS builder

# Build arguments for deployment info
ARG DEPLOY_BRANCH=unknown
ARG DEPLOY_COMMIT=unknown
ARG DEPLOY_TIME=unknown

# Set environment variables for Vite build
ENV VITE_DEPLOY_BRANCH=$DEPLOY_BRANCH
ENV VITE_DEPLOY_COMMIT=$DEPLOY_COMMIT
ENV VITE_DEPLOY_TIME=$DEPLOY_TIME

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the site
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
