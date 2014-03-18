All data downloaded from open baltimore.
https://data.baltimorecity.gov/
Accessed March 15, 2014.

##To get started, import this data into your postgres database, create a geom field with field type geometry, and use the ST_GeomFromText function to convert your x/y values to geometry (srid 4326). http://postgis.org/docs/ST_GeomFromText.html
