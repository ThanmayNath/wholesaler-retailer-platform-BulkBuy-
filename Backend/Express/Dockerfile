# Use a base Node.js image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all files to the working directory
COPY . .

# Start the Node.js application
CMD ["npm", "start"]


