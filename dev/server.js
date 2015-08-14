require('node-jsx').install();
import express from "express";
import path from "path";
import httpProxy from "http-proxy";
import React from "react";
import Router from "react-router";
import renderer from "react-engine";
import async from 'async';
import lodash from 'lodash';
import bodyParser from 'body-parser';
import Redis from 'redis';

//import test1 from './eroutes';
//var test1 = requireDir('./eroutes');

import Routes from "./routes";
const client = Redis.createClient();


  client.hmset('frameworks', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express');
  client.hgetall('frameworks', function(err, object) {
    console.log(object);
});
 const clientAnimals = [
    { name : 'Button', species: 'Canis familiaris', lastVisit: 1430456400000 },
    { name : 'Wilberforce', species: 'Felis catus', lastVisit: 1413694800000 },
    { name : 'Spot', species: 'Canis familiaris', lastVisit: 1394686800000 },
    { name : 'TardarSauce', species: 'Felis catus', lastVisit: 1424844000000 },
    { name : 'Muffin', species: 'Capra hircus', lastVisit: 1359266400000 }
  ]
const empleados = [  
  { id: 1, username: "laya", fullName: "Laya Dueñas", title: "CEO", department: "Business", pic: "empleado01.png" },
  { id: 2, username: "astrid", fullName: "Astryd Vallés", title: "CMO", department: "Marketing", pic: "empleado02.png" },
  { id: 3, username: "shantell", fullName: "Shantell Meza", title: "CFO", department: "Business", pic: "empleado03.png" },
  { id: 4, username: "sergio", fullName: "Sergio Ocampo", title: "CTO", department: "Engineering", pic: "empleado04.png" },
  { id: 5, username: "ares", fullName: "Ares Jiménez", title: "Art Director", department: "Marketing", pic: "empleado05.png" },
  { id: 6, username: "marta", fullName: "Marta Pérez", title: "Frontend Dev", department: "Engineering", pic: "empleado06.png" },
  { id: 7, username: "ellen", fullName: "Ellen Balderas", title: "Digital Strategist", department: "Marketing", pic: "empleado07.png" },
  { id: 8, username: "cynbthia", fullName: "Cynthia Valentín", title: "Backend Dev", department: "Engineering", pic: "empleado08.png" },
  { id: 9, username: "bernards", fullName: "Bernard Jung", title: "DevOps Engineer", department: "Engineering", pic: "empleado09.png" },
];
/*
function rk() {
  return Array.prototype.slice.call(arguments).join(':')
}*/
//const importMulti = client.multi();

empleados.forEach(function(empleado){
  client.sadd('empleados:set:usernames', empleado.username, function(err,reply) {
    console.log('added: ? ' + err + reply)
     if (reply === 1 ) {
      console.log('user being added...')  
      const multi = client.multi();   
      multi.hmset('empleados:hash:'+empleado.id,empleado)
        .hset('empleados:ids', empleado.username, empleado.id)
        .lpush('empleados:list:ids', empleado.id)        
        .sadd('empleados:set:ids', empleado.id)
        .incrby('empleados:seq', 1)
        .exec();
      } 
  });
});
/*
importMulti.exec(function(err,results){
  if (err) { throw err; } else {
 
    //this will log the results of the all hmsets:
    //[ 'OK', 'OK', 'OK', 'OK', 'OK' ]
    //Not very useful… yet!
    console.log(results);
 
 
    //client.quit();
   }
});*/
let todos = [];
  client.hgetall('empleados', function(err, object) {
    console.log(object); 
    for(let k in object) {
      //console.log(object[k]);  
      const newTodo ={
        text: object[k]
      }
      console.log(newTodo)
      todos.push(newTodo);
    }
    
});

/*
const atest = {}

const multi = client.multi();
for (let i=0; i<empleados.length; i++) {
  multi.hmset('empleados', empleados[i]);
}
multi.exec(function(err,results){
  if (err) { throw err; } else {
 
    //this will log the results of the all hmsets:
    //[ 'OK', 'OK', 'OK', 'OK', 'OK' ]
    //Not very useful… yet!
    console.log(results);
 
 
    client.quit();
   }
});*/
const proxy = httpProxy.createProxyServer();
const app = express();

// create the view engine with `react-engine`
var engine = renderer.server.create({
  reactRoutes: path.join(__dirname + '/routes')
});

/// set the engine
app.engine('.jsx', engine);

// set the view directory
app.set('views', __dirname + '/public/views');

// set jsx as the view engine
app.set('view engine', 'jsx');

// finally, set the custom view
app.set('view', renderer.expressView);

// support json encoded bodies
app.use(bodyParser.json());
// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Expose public folder as static assets
// Prevent static files to rerouted thorugh react-router
app.use('/public',express.static(__dirname + '/public'));
app.get('/favicon.ico', function (req,res) {
  var options = {
    root: __dirname + '/public/images/',
    //dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  var fileName = 'favicon.ico';
  res.sendFile(fileName, options, function (err) {
  /*  if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }*/
  });
});

app.use('/api/v1', require('./controllers'))

app.use('/listed', (req, res) => {

  client.lrange('empleados:list', 0 , -1, (err, ids) => {
    console.log(ids);
  })
});

function getList(req, res) {
  client.lrange('empleados', 0 , -1, (err, ids) => {
    res.json(ids)
  })
}

app.get('/empleados/list', getPosts);

function getPosts(req, res) {
   if (!req.query.limit) {
      req.query.limit = 9;
   } else {
      req.query.limit = parseInt(req.query.limit,10)-1;
   }
   if (!req.query.offset) {
    req.query.offset = 0;
   } else {
    req.query.limit = parseInt(req.query.offset, 10) + parseInt(req.query.limit, 10);
   }
   getPostsFeed(req, res);
}

function getPostsFeed(req, res) {
   client.lrange('empleados:list:ids',
         req.query.offset, req.query.limit, (err, ids) => {
      sendPosts(res, err, ids);
   });
}

function sendPosts(res, err, ids) {
   if (err) {
      res.status(500).send(err);
   } else {
      retrievePosts(ids, (err, posts) => {
         if (err) {
            res.status(500).send(err.toString());
         } else {
            res.json(posts);
         }
      });
   }
}

function retrievePosts(ids, callback) {
   async.map(ids, (id, asyncCallback) => {
      client.hgetall('empleados:hash:' + id, asyncCallback);
   }, (err, posts) => {
      if (err) {
         callback(err);
      } else {
         callback(null, lodash.map(posts, (post, index) => {
            return {
               id: ids[index],
               title: post.title,
               department: post.department
            }
         }));
      }
   });
}

/*app.get("/empleados", function  (req, res) {
  getPostsFeed(req, res);
});*/


app.get("/counts", function  (req, res) {
    client.hgetall("frameworks", function (error, awesomeCount) {
  if (error !== null) {
            // handle error here                                                                                                                       
            console.log("ERROR: " + error);
        } else {
            var jsonObject = {
    "empleados":awesomeCount
            };
            // use res.json to return JSON objects instead of strings
            res.jsonp(jsonObject);
        }
    });
});






// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//Check and set variable if app is on production or development
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? 5000 : 3000;

if (!isProduction) {

  // We require the bundler inside the if block because
  // it is only needed in a development environment. Later
  // you will see why this is a good idea
  var webpack = require('./webpack.js'); 
  webpack();

  // Here we redirect the public folder to our webpack server
  app.get('/public/*', function (req, res) {
      proxy.web(req, res, {
          target: 'http://localhost:1337'
      });
    });

  // Redirect all requests so react-router handles them. 
  app.get('/*', function (req, res) {
    res.render(req.url,{isProduction});
  });


  // It is important to catch any errors from the proxy or the
  // server will crash. An example of this is connecting to the
  // server when webpack is bundling
  proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again...');
  });

  // We need to use basic HTTP service to proxy
  // websocket requests from webpack
  //var server = http.createServer(app);  

  app.listen(port, function () {
    console.log('Development Server running on port ' + port);
  }); 

} else {

  app.get('/*', function (req, res) {
    res.render(req.url,{isProduction});
  });

  app.listen(port, function () {
    console.log('Production Server running on port ' + port);
  }); 

}
