FROM node:16.15.0
# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./package*.json ./

RUN npm install

COPY . .
COPY dev.env .env

RUN npm run build

ENV NODE_ENV development

EXPOSE 9000

CMD ["node", "dist/index.js"]
