const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require( 'path' );

module.exports = ( env, options ) => {
	return {
		entry: ['./src/index.js'],
		output: {
			path: path.resolve(__dirname, 'build'),
			publicPath: '/',
			filename: 'bundle.js'
		},
		module: {
			rules: [
				{
					test: /\.jsx$|\.es6$|\.js$/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['react'],
						}
					},
					exclude: /(node_modules|bower_components)/
				},
				{
					test: /\.css$/,
					use: [ 
					  'style-loader',
					  'css-loader'
					],
				},
				{
				  test: /\.(png|svg|jpg|jpeg|gif|ico|svg)$/,
				  exclude: /node_modules/,
				  use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
				}
			],
		},
		plugins: [
            new HtmlWebPackPlugin({
                template: "./src/index.html",
                filename: "./index.html"
            })
        ],
		resolve: {
			extensions: ['.js', '.jsx'],
			alias: {
				'@': path.resolve(__dirname, 'src/'),
			}
		},
		devServer: {
			historyApiFallback: true
		},
		externals: {
			// global app config object
			config: JSON.stringify({
				apiUrl: 'http://3.133.223.17:8080/api',
				// apiUrl: 'http://localhost:8080/api',
				// apiUrl: 'http://18.190.90.120:8080/api',
			})
		}
	}
};