const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');
// env configuration
require('dotenv').config();
// dev mode?
const DEV = process.env.NODE_ENV !== 'production';
const MINIMAL_BUILD = process.env.BUILD === 'nano';
// configurations
const settings = {
	src: 'src/keylani.interface.js',
	libname: process.env.NAME.toLowerCase(),
	libtarget: 'umd',
	outdir: DEV ? 'dev' : 'dist',
	versionSuffix: process.env.ALPHA ? '-alpha' : process.env.BETA ? '-beta' : ''
};
// setup config
const webpackConfig = () => ({
	mode: DEV ? 'none' : 'production',
	entry: path.join(__dirname, settings.src),
	devtool: DEV ? 'source-map' : '',
	output: {
		filename: DEV ? `${settings.libname}.js` : `${settings.libname}.min.js`,
		library: process.env.NAME,
		libraryTarget: settings.libtarget,
		path: path.join(__dirname, settings.outdir, pkg.version + settings.versionSuffix, process.env.BUILD)
	},
	plugins: [
		new webpack.DefinePlugin({
			MINIMAL_BUILD,
			DEV
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader?cacheDirectory=true',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	}
});

module.exports = webpackConfig();
