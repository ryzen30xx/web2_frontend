# Use a lightweight Node.js image
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching layers)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the Vue app for production
RUN npm run build

# Expose port 8080 (default port for Vite preview or Vue apps)
EXPOSE 8080

# Run the app in preview mode correctly
CMD ["npm", "run", "preview"]
