# Base image
FROM node:22.6.0

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm i 

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/src/app.js"]