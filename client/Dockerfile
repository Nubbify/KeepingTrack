FROM node:12.2.0-alpine

MAINTAINER Oscar Bautista "oscar.v.bautista@gmail.com"

# Set the working directoy
WORKDIR /app

# Copy the client files into the working directory 
COPY . .

# Install the necessary packages
RUN npm install --silent
RUN npm install react-scripts -g --silent

# Start the client
CMD npm start
