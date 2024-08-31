FROM node:20.16.0-alpine  As development

WORKDIR /usr/src/app

RUN yarn global add @nestjs/cli

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 5555

CMD ["yarn", "run", "start:prod"]
