FROM node:20-alpine
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm" , "start"]

FROM nginx:alpine

COPY --from=0 /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-d" , "daemon off;"]

