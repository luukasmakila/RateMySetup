FROM node:latest

WORKDIR /backend

COPY package*.json /backend/

RUN npm install

ENV PORT
ENV MONGO_URI
ENV JWT_SECRET

COPY . /backend

EXPOSE 3001

CMD ["npm", "run", "dev"]