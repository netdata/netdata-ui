FROM node:12

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 6006

CMD "npm" "start"
