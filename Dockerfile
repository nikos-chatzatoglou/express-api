# Start with a base image containing Node.js 20
FROM node:20

# Create a temp directory and copy the package.json and yarn.lock files
ADD package.json /tmp/package.json
ADD yarn.lock /tmp/yarn.lock

# Delete the "build directory" if it exists
RUN rm -rf build

# Install the dependencies
RUN cd /tmp && yarn install

# Create a new directory to run the app
ADD ./ /src

# Copy the prisma directory
ADD ./prisma /src/prisma

# Copy the node_modules from the temp directory to the src directory
RUN rm -rf src/node_modules && cp -a /tmp/node_modules /src/

# Set the working directory
WORKDIR /src

# Generate the Prisma client
RUN npx prisma generate

# Build the app
RUN yarn build

# Expose the port the app runs on
EXPOSE 3000

# Serve the app
CMD ["node", "./build/src/app.js"] 