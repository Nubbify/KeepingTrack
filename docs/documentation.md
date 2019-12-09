
# Keeping Track

URL: https://keeping-track.nubbify.com/
 ---
 
This note-taking app is built using a client-server architecture. At the
upper level, we have the flask application that makes up our server back-end. 
Within these files is a folder called client, where our front-end files live. 
This decision was made early on to attempt to ensure the back-end hs easy access
to the files that the front-end serves. 

The application currently deploys directly to a DigitalOcean droplet upon the successful completion of its pipeline 
on a merge to master. This redeployment takes about 5 minutes to complete so please be patient when waiting for changes
to upload. 

## The Server
   
   The core of the server is built using a factory provided in ```app.py```. The factory model 
   was chosen for our application specifically to make testing easier. By creating instances of our application,
   we can isolate databases and application states between tests ensuring that each test only covers what it does.
   
   The server is a RESTful API built with Flask, Flask-RESTful, Flask_jwt_extended, and SQLAlchemy. Flask and 
   Flask-RESTful manage routing for the API, Flask_jwt_extended maintains security for the API
   through a Bearer token based authentication, and SQLAlchemy allows us to work with the models in our SQLLite 
   database, along with creating and managing said database.  
   
   The folders of the server are as follows:
   
   ###data
   
   The data folder holds the modules used for our models. ```models.py``` contains the initialization for 
   SQLAlchemy along with all relevant models used with this ORM framework. Please see this file for the latest models
   used for this server. 
   
   The data folder also contains a class called a serializer that is attached to every model. This serializer takes the
   SQLAlchemy objects and returns a json friendly formatting of the items in a SQLAlchemy object.
   
   ###database
   
   This folder will be created the first time that you start the docker container meant for this application. If you 
   want to start the application using ```flask init-db; flask run```, please make sure you create this folder so the
   database.db file can be created. This folder is only for holding the database state. If you would like to reset the 
   database, either delete the file that ends up in here or run ```flask reset-db```.
   
   ###docs
   
   The docs folder is the one where our documentation (this file included) lives. The ```openapi.yaml``` file provides
   an openAPI file that you can insert into an openAPI reader to see all of the API endpoints. The endpoint categories
   in the openAPI file also denote what file within resources you can find said endpoint and it's implementation.
   
   ###resources
   
   The resources folder is the core of our API and its routing. To see what each file is meant to work on and do, please
   see the openAPI documentation mentioned previously. That will tell you which endpoints are implemented in which
   files. 
   
   ###tests
   
   The test folder is organized similarly to the resources file, in that they are directly related. ```test_user.py```
   in tests directly tests ```user.py``` in resources. The conftest file provides all of the fixtures necessary to run
   the tests. It provides you with a client, application, and a user for tests. 
   
## The Client

   The client is a React Single Page Application that interfaces with the flask server above. It implements material-ui
   elements to create a responsive and aesthetically pleasing front-end. The core of the client folder holds all the npm
   package information while src holds the source code for the client. In src, we have app.js and index.js which are the
   launching points of the React Application.
   
   The folders of the client are as follows:
   
   ###actions
   
   The actions folder contains all actions made by components that directly interface with the flask back-end. They are
   broken down into categories based on the nature of the action being requested (i.e: authActions deal with the 
   registration and continuous authentication of users).
   
   ###Components, Containers, and Pages
   
   Components make up the small elements of our interface. Buttons to create notes or for navigation. Components are 
   used within Containers which make up the bulk of what's displayed on screen. Containers include the navigation bar,
   list of notes, login screen, and any element that takes a significant portion of screen real estate. These Containers 
   are then used to build Pages, which are the different pages you can navigate to on the front-end. 
   
   ##reducers
   
   Reducers are related to actions. While actions describe what happens and interface with the back-end, reducers
   interact with the result of those actions to make changes on the front-end. They handle the actions made by actions
   in the actions folder and change the state of the different components and containers and pages according to the 
   result of those actions. 
   
   ##utils
   
   Miscellaneous utilities to make life easier. The items relating to attaching the bearer token used for authentication
   to requests by actions are here, for example.