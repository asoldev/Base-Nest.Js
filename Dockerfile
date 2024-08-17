FROM node:20.16.0-alpine  As development

WORKDIR /usr/src/app

RUN yarn global add @nestjs/cli

COPY package*.json ./

RUN yarn

COPY . .

FROM node:20.16.0-alpine  As production

WORKDIR /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

EXPOSE 5555

CMD ["yarn", "run", "start:prod"]
