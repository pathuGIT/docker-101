#base image
FROM node:25-alpine

#working directory
WORKDIR /app

#copy package.json
COPY package.json .

#installing dependencies
RUN npm install

#copying files
COPY . .

#installing dependencies
CMD ["npm", "start"]