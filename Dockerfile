FROM node:19-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 4000
RUN npm run build
CMD ["npm", "start"]
