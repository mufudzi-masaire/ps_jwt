#JWT Example Setup

###Working Locally 

To get setup the project locally, you will need MongoDB installed and running.

You will also need to install nodemon: 

sudo npm install -g nodemon

The dev db is called psjwt if you are debugging inside the MongoDB console 


####API SETUP

	cd pw_jwt/api && npm install
	nodemon
	
Server runs on port 3000 in dev env.

API end point - localhost:3000/api/

You can use Chrome's postman app's RESTFUL interface to debug the api


####FRONTEND SETUP
(in a new/seperate terminal)

	cd pw_jwt/frontend && npm install && bower install
	grunt serve

Frontend Server runs on port 9000 in dev env.

Fronent url in dev is http://0.0.0.0:9000/