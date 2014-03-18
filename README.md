#GeoAPI Demos/Examples

Work in Progress - Documentation will be changed to include more detail

###This repo contains some data from open baltimore that work with the examples - it will take a little while to pull down.###

##Getting Started

####Configure your postgres database.
* Windows, download the postgres installer from http://www.postgresql.org/. One you have it installed, make sure your database has postgis in it.
* Mac you can install if from the postgres site, or download the postgress app from http://postgresapp.com/. Once you run the app, you need to enable postgis on your database. You will need to set the bin location as a path variable to install pg. Before running npm install pg, I had to run: export PATH=//Applications/Postgres.app/Contents/Versions/9.3/bin:$PATH so pg knew where to look.
* If you want to set it up on linux check out the instructions on http://hoganmaps.com/postgres-postgis-ubuntu/

####Import your data into your postgres database. 
This demo includes a Crime csv.  Create a table, import the data, and use ST_GeomFromText to convert the lat/lng to geography. <bold>Detail coming later</bold>

####Update your Database Connection String
Update the db string in the top of the app.js file to connect to your database with your credentials

####Clone this repo to the server you will install node on
clone this repo to the machine you want to run node on, navidate to the /server directory, and as a root user run "npm install" - this looks at the package.json file and installs dependencies (just express and pg for this demo).

####Run the app.js server script
Run the app.js file - "node app.js" - if it is working it will say that it is listening on port 80
