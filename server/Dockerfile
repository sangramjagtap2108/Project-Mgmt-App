# Specify the Base Image
FROM node:14

# Set the Working Directory - This is the directory where your application code will live 
# inside the container
WORKDIR /usr/src/app

# Copy your package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Run npm install to install your project dependencies inside the container
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# If your server listens on a port (e.g., 5000), expose that port - Container Port
EXPOSE 5000

# Define the command to run your app
CMD [ "npm", "run", "dev" ]
