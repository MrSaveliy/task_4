FROM node

WORKDIR /tusk_4

COPY package*.json ./

RUN npm install

COPY . . 

COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]