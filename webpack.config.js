const path = require('path');
// env configuration
require('dotenv').config();
// dev mode?
const DEV = process.env.NODE_ENV !== 'production';
// configurations
const settings = {
	src: 'src/keylani.interface.js',
	libname: String(process.env.NAME).toLowerCase(),
	libtarget: 'umd',
	outdir: DEV ? 'dev' : 'dist'
};

module.exports = {
	mode: process.env.NODE_ENV,
	entry: path.join(__dirname, settings.src),
	devtool: DEV ? 'source-map' : '',
	output: {
		filename: DEV ? `${settings.libname}.js` : `${settings.libname}.min.js`,
		library: process.env.NAME,
		libraryTarget: settings.libtarget,
		path: path.join(__dirname, settings.outdir)
	},
	plugins: [],
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
};
