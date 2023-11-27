# Use the official Node.js image as the base image
FROM node:14
# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install -g @angular/cli

# Copy the rest of the application code
COPY . .

# Expose the port your app will run on
EXPOSE 4200

# Command to run your application
CMD ["npm", "start"]
