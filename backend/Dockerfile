FROM --platform=linux/arm64 node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --arch=arm64 --build-from-source

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]