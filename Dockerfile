# Stage 1: Build the React application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files and build the app
COPY . .
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
