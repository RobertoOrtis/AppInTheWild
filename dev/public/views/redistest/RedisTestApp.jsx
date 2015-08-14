import React, { Component, PropTypes } from 'react/addons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import http from 'http';
import lodash from 'lodash';
//import 'favicon.ico';
/*import DoubleCounter1 from '../../../components/doublecounter/Contador';
import DoubleCounter2 from '../../../components/doublecounter/Contador2';

import * as Counter1Actions from '../../../actions/doublecounter/ContadorActions';
import * as Counter2Actions from '../../../actions/doublecounter/Contador2Actions';

@connect(state => ({
  contador2: state.contador2,
  contador: state.contador
}))
*/

const API_PREFIX = '/api/v1';

export const da666ta = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];



export default class ControlledInput extends Component {

constructor() {
    super();
			this.state = {
				newUserFields: {},
				updateUserFields: {id: '39'},
				list: [],
				message:{}
			}							
  }

	readData = () => {
		var options = {
			host: 'localhost',
			path: '/empleados/list?limit=6&offset=0',
			port: 3000,
			method: 'GET'
		}

		var callback = response => {
			var str = '';

			response.on('data', chunk => {
				str += chunk;
			});
			response.on('end', () => {
				var data = JSON.parse(str)
				//console.log(str);
				console.log('response: ', data);
				this.setState({
					list: data
				});
			});
		}

		http.request(options, callback).on('error', (e) => {
	  	console.log("Got error: " + e.message);
		}).end();
  }

	getUserData = () => {

		var id = this.state.updateUserFields.id;
		var options = {
			host: 'localhost',
			path: API_PREFIX+'/user/'+id,
			port: 3000,
			method: 'GET',
		}

		var callback = response => {
			var str = '';

			response.on('data', chunk => {
				str += chunk;
				//console.log(str)
			});
			response.on('end', () => {
				var data = JSON.parse(str)
				if (data.status == '200') {
					console.log('user state updated!')
					this.setState({
						updateUserFields: data.user
					});
				} else {
					console.log('user state not updated.')
				}
			});
		}

		http.request(options, callback).on('error', (e) => {
	  	console.log("Got error: " + e.message);
		}).end();
  }  

	authenticate = (array) => {
/*
		var bodyString = JSON.stringify({
	    username: 'juan88844444444444444',
	   // department: 'depa',
	    title: 'title'
		});*/

		var bodyString = JSON.stringify(array);

		var headers = {
	    'Content-Type': 'application/json',
	    'Content-Length': bodyString.length
		};

		var options = {
			host: 'localhost',
			path: API_PREFIX+'/authenticate',
			port: 3000,
			method: 'POST',
			headers: headers
		}

		var callback = response => {
			var str = '';
			console.log('sent!');
			response.on('data', chunk => {
				str += chunk;
				console.log('string: ' + str);
			});
			/*response.on('end', () => {
				var data = JSON.parse(str)
				//console.log(str);
				console.log('response: ', data);
				this.setState({
					message: data
				});
			});*/
		}


		http.request(options, callback).on('error', (e) => {
	  	console.log("Got error: " + e.message);
		}).end(bodyString);
  }

	logout = () => {
/*
		var bodyString = JSON.stringify({
	    username: 'juan88844444444444444',
	   // department: 'depa',
	    title: 'title'
		});*/

		//var bodyString = JSON.stringify(array);
/*
		var headers = {
	    'Content-Type': 'application/json',
	    'Content-Length': bodyString.length
		};
*/
		var options = {
			host: 'localhost',
			path: API_PREFIX+'/user/logout',
			port: 3000,
			method: 'POST',
			//headers: headers
		}

		var callback = response => {
			var str = '';
			console.log('sent!');
			response.on('data', chunk => {
				str += chunk;
				console.log('string: ' + str);
			});
			/*response.on('end', () => {
				var data = JSON.parse(str)
				//console.log(str);
				console.log('response: ', data);
				this.setState({
					message: data
				});
			});*/
		}


		http.request(options, callback).on('error', (e) => {
	  	console.log("Got error: " + e.message);
		}).end();
  }

	writeData = (array) => {
/*
		var bodyString = JSON.stringify({
	    username: 'juan88844444444444444',
	   // department: 'depa',
	    title: 'title'
		});*/

		var bodyString = JSON.stringify(array);

		var headers = {
	    'Content-Type': 'application/json',
	    'Content-Length': bodyString.length
		};

		var options = {
			host: 'localhost',
			path: API_PREFIX+'/users/new',
			port: 3000,
			method: 'POST',
			headers: headers
		}

		var callback = response => {
			var str = '';
			console.log('sent!');
			response.on('data', chunk => {
				str += chunk;
				console.log('string: ' + str);
			});
			/*response.on('end', () => {
				var data = JSON.parse(str)
				//console.log(str);
				console.log('response: ', data);
				this.setState({
					message: data
				});
			});*/
		}


		http.request(options, callback).on('error', (e) => {
	  	console.log("Got error: " + e.message);
		}).end(bodyString);
  }

  updateUser = (array) => {
/*
		var bodyString = JSON.stringify({
	    username: 'juan88844444444444444',
	   // department: 'depa',
	    title: 'title'
		});*/

		var bodyString = JSON.stringify(array);

		var headers = {
	    'Content-Type': 'application/json',
	    'Content-Length': bodyString.length
		};

		var options = {
			host: 'localhost',
			path: API_PREFIX+'/users/update',
			port: 3000,
			method: 'POST',
			headers: headers
		}

		var callback = response => {
			var str = '';
			console.log('sent!');
			response.on('data', chunk => {
				str += chunk;
				console.log('string: ' + str);
			});
		/*	response.on('end', () => {
				var data = JSON.parse(str)
				//console.log(str);
				console.log('response: ', data);
				this.setState({
					message: data
				});
			});*/
		}

		http.request(options, callback).on('error', (e) => {
	  	console.log("Got error: " + e.message);
		}).end(bodyString);
  }


  componentDidMount() {
    //this.writeData();

    this.getUserData();

    setInterval(this.readData.bind(this), 1000);
  }


  handleChangeNew(e) {

		var newState = React.addons.update(this.state, {
		   newUserFields: {[e.target.name]: {$set: e.target.value}}
		});
		this.setState(newState);

  }
  handleChangeUpdate(e) {

		var newState = React.addons.update(this.state, {
		   updateUserFields: {[e.target.name]: {$set: e.target.value}},
		});
		this.setState(newState);

  }  

  updateItem(e) {
		var array = {};
		const allowedItems = ['email','username','password','role'];
		for (let item in this.state.updateUserFields) {
			if (lodash.indexOf(allowedItems, item, 1)) {
			  array[item] = this.state.updateUserFields[item];
			}
		}
		
		console.log( 'before update: ' + JSON.stringify(array) );
		this.updateUser(array);
  }

  createUser(e) {
		var array = {};
		const allowedInputs = ['email','password'];
		for (let item in this.state.newUserFields) {
			if (lodash.indexOf(allowedInputs, item, 1)) {
				console.log('array item is: ' + item)
			  array[item] = this.state.newUserFields[item];
			}
		}
		//array["username"] = "juan";
		console.log('before writing: ' + JSON.stringify(array) );
		this.writeData(array);
  }

    loginUser(e) {
		var array = {};
		const allowedInputs = ['email','password'];
		for (let item in this.state.newUserFields) {
			if (lodash.indexOf(allowedInputs, item, 1)) {
				console.log('array item is: ' + item)
			  array[item] = this.state.newUserFields[item];
			}
		}
		//array["username"] = "juan";
		console.log('before authenticating: ' + JSON.stringify(array) );
		this.authenticate(array);
  }
 /* 
  reset() {
    this.setState({
      text: {say:"Hello!"},
    });
  }
  */
  alertValue() {
    alert(this.state.updateUserFields.title);
  }
  
  render() {
    return (
      <div>
      ADD USER:
			  <div className="updateUserForm">
	        <input value={this.state.newUserFields.email} name='email' placeholder='email' onChange={::this.handleChangeNew} />
					<input value={this.state.newUserFields.password} name='password' type='password' placeholder='password' onChange={::this.handleChangeNew} />


	        <button name='createUser' onClick={::this.createUser}>Add new user</button>
	        <button name='loginUser' onClick={::this.loginUser}>Login user</button>
	        <button name='logout' onClick={::this.logout}>Logout user</button>


			  </div>
			  UPDATE USER:
	      <div className="updateUserForm">
	        <input value={this.state.updateUserFields.email} name='email' placeholder='email' type='email' onChange={::this.handleChangeUpdate} />
	        <input value={this.state.updateUserFields.id} name='id' onChange={::this.handleChangeUpdate} />
	        <input value={this.state.updateUserFields.role} name='role' onChange={::this.handleChangeUpdate} />
	        <input value={this.state.updateUserFields.password} name='password' placeholder='password' type='password' onChange={::this.handleChangeUpdate} />
	        <button name='updateItem' onClick={::this.updateItem}>Update User data</button>
					<button name='getUserData' onClick={::this.getUserData}>Get user data</button>
	        <button onClick={::this.alertValue}>Alert!</button>

	      </div>


        <ul className="media-list">
        {
          this.state.list.map((item) => {
            return item.id + " say " + item.title
    
          })
        }
      	</ul>
      	dsf
        {this.state.message}

      </div>
    );
  }
}