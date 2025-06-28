FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy source code
COPY . .

# Build the TypeScript project
RUN npm run build

# Expose port 3001
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
