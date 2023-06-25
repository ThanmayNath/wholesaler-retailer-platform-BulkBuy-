# Use a base Node.js image
FROM node:19-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the db directory to the working directory
COPY db ./db

# Copy the routes directory to the working directory
COPY routes ./routes

# Copy index.js file to the working directory
COPY index.js ./

# Start the Node.js application
CMD ["npm", "start"]
