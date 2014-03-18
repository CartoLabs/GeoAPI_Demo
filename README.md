#GeoAPI Demos/Examples

###This repo contains some data from open baltimore that work with the examples - it will take a little while to pull down.###

##Getting Started

####Configure your postgres database.
1a - Windows, download the postgres installer from http://www.postgresql.org/. One you have it installed, make sure your database has postgis in it. 1b - Mac you can install if from the postgres site, or download the postgress app from http://postgresapp.com/. Once you run the app, you need to enable postgis on your database. You will need to set the bin location as a path variable to install pg. Before running npm install pg, I had to run: export PATH=//Applications/Postgres.app/Contents/Versions/9.3/bin:$PATH so pg knew where to look.
1c - If you want to set it up on linux check out the instructions on http://hoganmaps.com/postgres-postgis-ubuntu/

####Import your data into your postgres database. 
I like using the OpenGeo Suite's pgShapeLoader tool because it allows easy multi-feature import. Instructions on loading data can be found here: http://suite.opengeo.org/opengeo-docs/dataadmin/pgGettingStarted/pgshapeloader.html
