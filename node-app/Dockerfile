FROM node:15

WORKDIR /usr/src/app

COPY index.js /usr/src/app

RUN npm init -y

RUN npm install express --save

RUN npm install mysql --save

EXPOSE 3000

CMD ["node","index.js"]