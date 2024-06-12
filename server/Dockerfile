# Use an official Node runtime as the base image
FROM node:14

ARG APP_NAME=server

# Set the working directory in the Docker image
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application
COPY .env .
COPY src .

# Make the application's port available to the outside world
EXPOSE 5000

# Define the command to run the application
CMD [ "node", "server.js" ]