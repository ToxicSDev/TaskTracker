# Use Node.js 19.9.0 as the base image
FROM node:19.9.0

# Set the working directory in the container
WORKDIR /tasktracker

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install --force

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Define a healthcheck that pings the app's endpoint to check if it's running
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
    CMD curl -f http://localhost:3000/ || exit 1

# Start the app
CMD ["npm run", "start"]
