'use strict'

var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	context: path.resolve(__dirname, '..'),
	devtool: 'cheap-module-source-map',
	entry: [
		// require.resolve('webpack-dev-server/client') + '?/',
		// require.resolve('webpack/hot/dev-server'),
		'./src/index.tsx',
	],
	output: {
		path: path.join(__dirname, '../build'),
		pathinfo: true,
		filename: 'static/js/bundle.js',
		publicPath: '/',
	},
	resolve: {
    	extensions: ['.js', '.json', '.jsx', '.tsx', '.ts'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../public/index.html'),
			inject : 'body',
			hash : true,
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [
					require('postcss-cssnext')
				]
			}
		}),
	],
	module: {
		loaders: [
			{
				exclude: [
					/\.html$/,
					/\.(js|jsx)(\?.*)?$/,
					/\.(ts|tsx)(\?.*)?$/,
					/\.css$/,
					/\.json$/,
					/\.svg$/
				],
				loader: 'url',
				query: {
					limit: 10000,
					name: 'static/media/[name].[hash:8].[ext]'
				}
			},
			{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
			{ test: /\.css?$/, loader: 'style-loader!css-loader?importLoaders=1!postcss-loader' },
		]
	},

}
