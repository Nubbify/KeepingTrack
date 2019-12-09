[![pipeline status](http://cmsc435.garrettvanhoy.com/nubbify/keeping-track/badges/master/pipeline.svg)](http://cmsc435.garrettvanhoy.com/nubbify/keeping-track/commits/master)
[![coverage report](http://cmsc435.garrettvanhoy.com/nubbify/keeping-track/badges/master/coverage.svg)](http://cmsc435.garrettvanhoy.com/nubbify/keeping-track/commits/master)

# Keeping Track

Keeping Track is a notetaking app with a focus on nested notes and attachments.

## Documentation

For additional information about architecture or structure, please see the docs folder.

## Installation

To set up the project, clone the git repository and then run 

```docker-compose up```

This will set up two docker services. The server, running on port 5000 by default, and the client, running on port 3000 by default. 

## Usage

Access the client by using [http://localhost:3000](http://localhost:3000) and make API calls to the server on [http://localhost:5000](http://localhost:5000) by using curl. For information on API endpoints, see Documentation.

## Documentation and Tests
The documentation for the backend API is in the docs folder and is in an OpenAPI 3 format. Use any OpenAPI reader to parse the yaml (A good online free editor can be found [here](https://editor.swagger.io)).

To run server tests, run ```python setup.py test``` from the top level directory.

To run client tests, run ```npm test``` from the client directory