FROM node:16-alpine as builder

WORKDIR /code

COPY package.json /code/package.json 

COPY nodemon.json /code/nodemon.json

COPY .babelrc /code/.babelrc 

COPY webpack.config.js /code/webpack.config.js 

RUN npm install --silent

COPY . /code

COPY .env /code/.env

# RUN npm install react-scripts@3.0.1 -g --silent

EXPOSE 5000

#CMD ["npm", "run", "dev"]
