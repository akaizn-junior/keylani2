class StripCode {
	constructor(fileRegex, stripRegex) {
		this.fileRegex = fileRegex;
		this.stripRegex = stripRegex;
	}

	apply(compiler) {
		// Specify the event hook to attach to
		compiler.hooks.emit.tapAsync(
			'StripCode',
			(compilation, callback = () => {}) => {
				// Manipulate the build using the plugin API provided by webpack
				// compilation.addModule(/* ... */);

				// console.log(compilation.fileDependencies.values());

				for(let val of compilation.fileDependencies.values()) {
					if(val && val.match(this.fileRegex)) {
						console.log(val);
					}
				}

				callback();
			}
		);
	}
}

module.exports = StripCode;
