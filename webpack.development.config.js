var path = require('path');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var buildPath = path.resolve(__dirname, 'build/public/');
var mainPath = path.resolve(__dirname, 'dev/index');
var node_modules_dir = path.join(__dirname, 'node_modules');
var deps = [
  'react/dist/react.min.js',
  'react-router/umd/ReactRouter.min.js',
];
var config = {
  devtool: 'inline-source-map',

  entry: {
    a:'webpack-dev-server/client?http://localhost:1337',
    b:'webpack/hot/only-dev-server',
		app: mainPath,
		vendors: ['react','react-router'] // And other vendors
	},
 // target: 'node',
  output: {
    path: buildPath,
    filename: '[name].js', // Notice we use a variable
		publicPath: '/public/'
  },
  //externals: nodeModules,
  plugins: [
  /*  new webpack.ResolverPlugin(
          new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    ),*/
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
			'process.env': {
				// This has effect on the react lib size
				'NODE_ENV': JSON.stringify('production'),
			},
		}),
		new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ],
  resolve: {
    alias: {},
   // root: [path.join(__dirname, "bower_components")],
    extensions: ['', '.js', '.jsx', '.json','.ico'],
    exclude: /node_modules/,   
  },
  module: {
    noParse: [],
    loaders: [
      {
        test: path.resolve(node_modules_dir, deps[0]),
        loader: "expose?React"
      },
			{
				test: /\.jsx?$/,
				loaders: ['react-hot', 'babel'],
				include: path.join(__dirname, 'dev')
    	},
			{
        test: /\.json$/,
        loader: 'json-loader'
      },
      { 
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
     // {test: /\.(png|jpg|ico)$/, loader: 'url-loader?limit=8192'},
     /* { 
        test: /\.jpe?g$|\.gif$|\.png$|\.ico$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/, 
        loader: "file" 
      },*/
      { test: /\.(png|jpg|ico)$/,
        loader: 'file-loader?name=images/[name].[ext]',
       // include: path.join(__dirname, 'dev')
      },
   /*   {
        test: /\.ico$/,
        loader: "url-loader",
        //loader: 'file-loader?name=images/[name].[ext]' 
       // query: { mimetype: "image/x-icon", limit: 0 }
      }*/

		]
  }
};
deps.forEach(function (dep) {
  var depPath = path.resolve(node_modules_dir, dep);
  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
  config.module.noParse.push(depPath);
});
module.exports = config;