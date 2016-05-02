var autoprefixer = require('autoprefixer')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/main.js',
	output: {
		path: './build',
		filename: '[name].js',
		publicPath: '/'
	},

	devServer: { historyApiFallback: true },

	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					presets: ['es2015']
				}
			},
			{
				test: /\.scss$/,
				loader: 'style!css?sourceMap!postcss?sourceMap!sass?sourceMap'
			},
			{ test: /\.(svg|jpg|png)$/, loader: 'url'},
			{ test: /\.json$/, loader: 'json' }
		]
	},

	externals: {
		jquery: 'jQuery'
	},

	postcss: function() {
		return [autoprefixer]
	},

	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/html/index.html',
			inject: true
		})
	],

	resolve: {
		extensions: ['', '.js', '.json', '.scss']
	}
}
