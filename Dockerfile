FROM node
WORKDIR /src
ADD . .
RUN npm install
CMD ["node", "server.js"]