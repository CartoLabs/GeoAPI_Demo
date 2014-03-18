var pg = require('pg');
var express = require('express');
var apiPort = 80;
var app = express();

var connectionString = "postgres://<username>:<password>@<dbaddress>:<dbport>/<dbname>"

//This specifies that all routes will allow CORS (Cross Domain) access
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

//This is your root route, the infrmation here is returned when someone or something pulls up your server without specifying a route
app.get('/', function(req, res){
  res.type('html');
  res.send("<h1>/Crime/id/{id} - Example http://107.170.0.21/Crime/id/19345</h1>" + 
           "<h1>/Crime/Near?myx={longitude}&myy={latitude}&numFeats={# of Features} - Example http://107.170.0.21/Crime/Near?myx=39.271963&myy=-76.609077&numFeats=100</h1>")
});

//Select all buildings within x feet of an input point
app.get('/Crime/id/:id', function(req, res){
  var id = req.params.id;

  if (id != "undefined") {

    pg.connect(connectionString, function(err, client, done) {
      var handleError = function(err) {
        console.log(err)
        if(!err) return false;
        console.log(err)
        done(client);
        next(err);
        return true;
      };
      
      var myquery = "SELECT *, ST_AsGeoJSON(geom) AS geom FROM crime WHERE oid = " + id + ";";

      client.query(myquery, function(err, result) {
        console.log(myquery)
        if(result.rowCount == 0) {
          res.send(500);
        } 
        else {
          var featureCollection = new FeatureCollection();
          for(i=0; i<result.rows.length; i++){
            var feature = new Feature();
            //This array creates the output geojson
            feature.properties = ({
              "crimedate":result.rows[i].crimedate,
              "crimecasenumber":result.rows[i].crimedate,
              "crimecode":result.rows[i].crimecode,
              "crimetime":result.rows[i].crimetime,
              "location":result.rows[i].location,
              "description":result.rows[i].description,
              "weapon":result.rows[i].weapon,
              "post":result.rows[i].post,
              "district":result.rows[i].district,
              "neighborhood":result.rows[i].neighborhood,
              "xval":result.rows[i].xval,
              "yval":result.rows[i].yval
            });
            feature.geometry = JSON.parse(result.rows[i].geom);
            featureCollection.features.push(feature);
          }
          res.type('text/javascript');
          res.jsonp(featureCollection);
          done();
        }
      });
    });
  }
  else{
    res.send("<h2>You need to put a city label in.</h2></br>")
  }
});


//Select Nearest crimes to a lat/lon
app.get('/Crime/Near', function(req, res){
  var myx = req.query.myx;
  var myy = req.query.myy;
  var numFeats = req.query.numFeats;

  console.log(numFeats)
  if (String(numFeats) == "undefined"){
    numFeats = "500"
  }

  console.log(myx)
  console.log(myy)
  if (myy != "undefined" && myy != "undefined") {

    pg.connect(connectionString, function(err, client, done) {
      var handleError = function(err) {
        console.log(err)
        if(!err) return false;
        console.log(err)
        done(client);
        next(err);
        return true;

      };
      
      var myquery = "SELECT *, ST_AsGeoJSON(geom) AS geom FROM crime ORDER BY crime.geom <-> ST_GeomFromText('POINT( " + myy+  " " +myx+" )', 4326) LIMIT " + numFeats + ";"
                  
      console.log(myquery)
      client.query(myquery, function(err, result) {
        console.log(myquery)
        if(result.rowCount == 0) {
          res.send(500);
        } 
        else {
          var featureCollection = new FeatureCollection();
          for(i=0; i<result.rows.length; i++){
            var feature = new Feature();
            feature.properties = ({
              "crimedate":result.rows[i].crimedate,
              "crimecasenumber":result.rows[i].crimedate,
              "crimecode":result.rows[i].crimecode,
              "crimetime":result.rows[i].crimetime,
              "location":result.rows[i].location,
              "description":result.rows[i].description,
              "weapon":result.rows[i].weapon,
              "post":result.rows[i].post,
              "district":result.rows[i].district,
              "neighborhood":result.rows[i].neighborhood,
              "xval":result.rows[i].xval,
              "yval":result.rows[i].yval
            });
            feature.geometry = JSON.parse(result.rows[i].geom);
            featureCollection.features.push(feature);
          }
          res.type('text/javascript');
          res.jsonp(featureCollection);
          done();
        }
      });
    });
  }
  else{
    res.send("<h2>You need to put an x/y value in.</h2></br>")
  }
});

function FeatureCollection(){
    this.type = 'FeatureCollection';
    this.features = new Array();
}

function Feature(){
    this.type = 'Feature';
    this.geometry = new Object;
    this.properties = new Object;
} 
app.listen(apiPort);
console.log('listening on port ' + apiPort);