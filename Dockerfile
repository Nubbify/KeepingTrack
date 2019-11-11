FROM ubuntu:latest

MAINTAINER Oscar Bautista "oscar.v.bautista@gmail.com"

# Set up python (and remove cached materials from apt-get)
RUN apt-get update -y && \
    # rm -rf /var/lib/apt/lists/* && \
    apt-get install -y python3-pip python3-dev python3-setuptools --no-install-recommends

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /server/requirements.txt

WORKDIR /server

RUN python3 -m pip install -r requirements.txt


# Copy the server files (exclude react client) into the server folder
COPY . /server

# Set the environment variables necessary for flask to run after getting all requirements
ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8

# Initialize the db and run flask automatically if no command is specified
RUN flask init-db 
CMD flask run --host=0.0.0.0