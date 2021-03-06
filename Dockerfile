# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:17-slim as builder
# FROM node:17-slim 

# Create and change to the app directory.
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install dependencies.
# If you add a package-lock.json speed your build by switching to 'npm ci'.
# RUN npm ci --only=production
# RUN npm install --production
RUN npm install

# Copy local code to the container image.
COPY . ./

# Run the web service on container startup.
# CMD ["ts-node", "./src/index.ts"]
# CMD ["npm", "start"]
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]    
