# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Playwright Browsers
RUN npx playwright install

# Copy the rest of the application code to the container
COPY . .

# Set the default command to run the tests
CMD ["npm", "run", "test"]
