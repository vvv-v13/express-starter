FROM node:8.1-alpine

ADD package.json package.json

RUN npm install -g nodemon
RUN npm install -g babel-cli
RUN npm install

ADD . .

EXPOSE 8500

ENV PORT 8500
ENV JWT_SECRET super_mega_secret
ENV JWT_EXPIRE 12h


CMD [ "npm", "run", "server" ]
