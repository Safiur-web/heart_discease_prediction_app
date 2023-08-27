# FROM node:alpine3.16 AS builder

# WORKDIR /app

# COPY ./package.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# FROM nginx:1.23-alpine

# WORKDIR /usr/share/nginx/html/

# RUN rm -rf ./*

# COPY --from=builder /app/build .

# CMD ["nginx", "-g", "daemon off;"]


# Fetching the latest node image on apline linux
FROM node:alpine AS builder

# Declaring env
ENV NODE_ENV production

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY ./package.json ./
RUN npm install

# Copying all the files in our project
COPY . .

# Building our application
RUN npm run build

# Fetching the latest nginx image
FROM nginx

# Copying built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Copying our nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf