var express = require('express')
  , router = express.Router()
  , lodash = require('lodash')
  , async = require('async')
  , jwt = require('jsonwebtoken')
  , bcrypt = require('bcrypt')
 	, Redis = require('redis')
	, client = Redis.createClient()
	, config = require('../config')
	, Cookies = require( 'cookies' );

var app = express();

router.post('/authenticate', userAuth);
//authentication secret
app.set('superSecret', 'ilovescotchyscotch');
function userAuth(req, res) {
	const email = req.body.email;
  const password = req.body.password;
console.log('ON AUTH req.body.email: ' + email)
console.log('ON AUTH req.body.password: ' + password)
   async.waterfall([
    function(callback) {
      client.sismember('empleados:set:emails', email, callback);
    },
    function(ismember, callback) {
      if (!ismember) {
       return callback({message: ' email not found'});
      } 
      client.hget('empleados:ids',email, function (err, id) {
        client.hgetall('empleados:hash:'+id, callback);
      });      
    },
    function(user, callback) {   
    	//console.log('user id is: ' + user.id);
    	console.log('user pass is: ' + password);
    	console.log('is true: ' + bcrypt.compareSync(password, user.password))
  		if (!bcrypt.compareSync(password, user.password)) {
  			return callback({success: false, message: 'Authentication failed. Wrong Password.'})
  		} 
  		//console.log('user id is: ' + user.id)
  		delete user['password'];
  		delete user['token'];
  		delete user['email'];
  		var token = jwt.sign(user, app.get('superSecret'), {
  			expiresInMinutes: 1440 // expires in 24 hours
  		})
  		// user["token"] = token;
  		console.log('new token is: ' + token)
  		client.hset('empleados:hash:'+user.id, 'token', token);
  		var userid = user.id;
  		new Cookies(req,res).set('access_token',token,{
			  httpOnly: true,
			  secure: false      // for your production environment
			});
  		callback({message: ' password matches!', token: 'toekn is: ' + token, id: 'userid: ' + userid}); 
    }
    ], function (err) {
        var jsonMsg = JSON.stringify({message: 'user ('+email+') ' + err.message + ' token: ' + err.token + ' id: '+ err.id });
      res.send(jsonMsg)
    }
  )
}
/*
router.all('/api/v1', requireAuthentication, function(req, res, next) {
	next();
});*/

router.use(requireAuthentication, function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});
function requireAuthentication(req, res, next) {
	//var token = req.body.token || req.query.token || req.headers['x-access-token'];
	var tokenOnCookie = new Cookies(req,res).get('access_token');


	if (tokenOnCookie) {
		jwt.verify(tokenOnCookie, app.get('superSecret'), function(err, decoded) {
			if (err) {
				return res.json({ success: false, message: 'Falied to authenticate token.'});				
			} else {
				req.decoded = decoded;	

				client.hget('empleados:hash:'+decoded.id,'token', function(err,tokenOnUser) {
					console.log('what is token on user: ' + tokenOnUser);
					if (tokenOnUser == tokenOnCookie) {
						next();
					} else {
						return res.json({ success: false, message: 'User has no token.'});				
					}
				})
			}
		});
	} else {
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});
	}
}

router.post('/user/logout', logoutUser);

function logoutUser(req,res) {
	var userid = req.decoded.id;

	//first set user token to 0
	client.hset('empleados:hash:'+userid, 'token', 0);
/*
	//remove user cookie on client side
	Cookies.set('access_token');
*/
	console.log('User session has been closed!')
	res.json({message: 'User session has been closed!'})

}
router.post('/users/update', updateUser);

function updateUser(req, res) {	
  const allowedItems = ['email','password','role'];
  const id = req.body.id;
  if (req.decoded.role == 'admin' || req.decoded.id == id) {
	  console.log('is there an id: ' + id);
	  //const username = req.body.username;
	  const email = req.body.email;
	  const password = req.body.password;
	  async.waterfall([
	    function(callback) {
	      client.sismember('empleados:set:ids', id, callback);
	    },
	    function(ismember, callback) {
	      if (!ismember) {
	       return callback({message: ' not found'});
	      } 
	      //client.hget('empleados:ids',email, function (err, id) {
	        
	      //});      
	      client.sismember('empleados:set:emails', email, callback);


	    },
	    function(ismember, callback) {
				client.hgetall('empleados:hash:'+id, function(err,empleado) {
					if (ismember && email != empleado.email) {
						return callback({message: 'Cannot update account, email already exists.'})
					} else {
						callback(null, empleado);
					}
				});
	    },
	    function(empleado, callback) {   
	    	console.log("empleado id is: " + empleado.id)
	      for (let item in req.body) {
	        if (lodash.indexOf(allowedItems, item, 1)) {
	        	console.log('item: ' + item)
	        	console.log('body item: ' + req.body[item])
	        	console.log('empleado item: ' + empleado[item])
	        	if (empleado[item] != req.body[item]) {
	        		console.log('same? empleado: ' + empleado[item] + ' body ' + req.body[item])
				      if (item == 'password' && password != '') {
				      	console.log('password is not empty and different so we encrypt it')
								var salt = bcrypt.genSaltSync(10);
								var hash = bcrypt.hashSync(password, salt);
								empleado['password'] = hash;
							} else if (item == 'email' && empleado.email != email) {
								if (empleado.empleado) {
									client.srem('empleados:set:emails', empleado.email);
									client.hdel('empleados:ids', empleado.email);
								}
								client.sadd('empleados:set:emails', email);
								//client.hset('empleados:hash:'+empleado.id, 'email', email)								
								client.hset('empleados:ids', email, id);
								empleado['email'] = email;
								console.log('email: ' + email + ' set!')
				      } else {
				      	console.log('password is same or empty')
				      	//console.log('same or empty? empleado: ' + empleado['password'] + ' body ' + password)
				      	empleado[item] = req.body[item];
				      }
						}
	          
	        }
	      }

	       client.hmset('empleados:hash:'+empleado.id, empleado);
	       callback({message: ' found and updated!'});    
	    }
	    ], function (err) {
	        var jsonMsg = JSON.stringify({message: 'message: user ('+email+') ' + err.message});
	      res.send(jsonMsg)
	    }
	  )
	} else {
		return res.json({message: 'Access denied!'});
	}
}


router.post('/users/new', storeEmployee);

function storeEmployee(req, res) {
 // const id = req.query.id;
 var user = {}
 //const inputItems = ['email','password']
 if (req.decoded.role != 'admin')
 	return res.send('Access denied!');
const userEmail = req.body.email;
const userPassword = req.body.password;
req.body['role'] = 'basic';
req.body['scope'] = 'post,edit';
req.body['confirmed'] = false;

  if (!userEmail) {
  	return console.log('Please enter an email.')  	
  } 
	if (!userPassword) {
  	return console.log('Please enter a password.')  	
  }
  for (let item in req.body) {
       // if (lodash.indexOf(inputItems, item, true)) {
          user[item] = req.body[item];
       // }
       }
/*
  if (username.length == 0) {
 	return res.send('Please enter a username.')
 } else if (password.length == 0)  {
 	return res.send('Please enter a password.')
 }*/
  /*const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const title = req.body.title;*/
  
  client.sadd('empleados:set:emails', userEmail, function(err, reply) {
    if (reply === 0) {
      res.send('user already exists ' + err + ' ' + reply);    
    } else {

      client.incr('empleados:seq', function(err, id) {
       // const empleado = { id: id, username: username, fullName: firstname + ' ' + lastname, title: title, department: "Business", pic: "empleado01.png" }
        if (err) {
          res.send('user cound not be inserted');
        } else {
					var salt = bcrypt.genSaltSync(10);
					var hash = bcrypt.hashSync(userPassword, salt);
					user['password'] = hash;
          console.info('storeEmployee', id);
          const multi = client.multi();
          multi.hset('empleados:hash:'+id, 'id', id)
	          .hmset('empleados:hash:'+id, user)
	          .hset('empleados:ids', userEmail, id)
	          .lpush('empleados:list:ids',id)
	          .sadd('empleados:set:ids',id)
	          .exec(function(err, results) {
		          if (!err) {
		            res.send('user with id: ' + id + ' added!');
		          } else {
		            res.send('user cound not be inserted');
		          }
          	})
        }
      })
    }
  })
}


// Get single user data
router.get('/user/:id', getUser);


function getUser(req, res) {
	//const userid = req.body.id || req.query.id;
	console.log(req.decoded);
	console.log(req.decoded.id);
	var id = req.params.id;

	async.waterfall([
		function(callback) {
	      client.sismember('empleados:set:ids', id, callback);
	  },
	  function(ismember, callback) {
      if (!ismember) {
       return callback({status: 404, user: ' not found'});
      } 
      //client.hget('empleados:ids',email, function (err, id) {
        
      //});      
      client.hgetall('empleados:hash:'+id, callback);
    },
    function(user, callback) {   
		  callback({ status: 200, user: {
       id: user.id,
       email: user.email,
       username: user.username,       
	    }});      
    }
    ], function (results) {
        var jsonMsg = JSON.stringify( results);
        console.log('status is: ' + results.status)
        console.log('user is: ' + results.user)
        console.log('jsonMsg is: ' + jsonMsg)
      res.json(results)
    }
	)
}
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
      sendUsers(res, err, ids);
   });
}

function sendUsers(res, err, ids) {
   if (err) {
      res.status(500).send(err);
   } else {
      retrieveUsers(ids, (err, posts) => {
         if (err) {
            res.status(500).send(err.toString());
         } else {
            res.json(posts);
         }
      });
   }
}

function retrieveUsers(ids, callback) {
   async.map(ids, (id, asyncCallback) => {
      client.hgetall('empleados:hash:' + id, asyncCallback);
   }, (err, posts) => {
      if (err) {
         callback(err);
      } else {
         callback(null, lodash.map(posts, (post, index) => {
            return {
               id: ids[index],
               username: post.username,
               title: post.title,
               department: post.department,
               password: post.password
            }
         }));
      }
   });
}
app.use(clientErrorHandler);
app.use(errorHandler);
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(404).send({ error: 'Something blew up!' });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(404);
  res.render('error', { error: err });
}

module.exports = router