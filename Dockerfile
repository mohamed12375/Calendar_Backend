# Stage 1: Build the TypeScript project
FROM node:14 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Install TypeScript
RUN npm install -g typescript

# Compile the TypeScript code
RUN npx tsc

# List files for debugging
RUN ls -la /app/dist

# Stage 2: Run the application
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy only the necessary files
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/migrations ./migrations

# Install only production dependencies
RUN npm install --production

# Expose the port the app runs on
EXPOSE 8880

# Command to run the application
CMD ["node", "dist/index.js"]
