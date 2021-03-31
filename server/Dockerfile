# FROM node:14.14.0-alpine
# WORKDIR "/app"
# COPY ./package.json ./
# RUN npm install
# COPY . .

# CMD ["npm", "run", "start"]

FROM node:14.14.0-alpine

WORKDIR "/app"
COPY ./package.json ./
RUN npm install
COPY . .

RUN npm install pm2 -g

CMD ["pm2-runtime", "ecosystem.config.js --env production"]
