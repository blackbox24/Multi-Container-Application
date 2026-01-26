FROM node:25-alpine3.23


WORKDIR /app

COPY ./package.json .

RUN npm i

copy . .

EXPOSE 3000

CMD ["node","index.js"]