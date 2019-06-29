const path = require("path");

module.exports = {
	entry: {
		app: "./app/scripts/app.js"
	},

	output: {
		filename: "[name].js"
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					query: {
						presets: [
							["@babel/preset-env", { modules: false }]
						]
					}
				}
			}
		]
	},

	resolve: {
		alias: {
			"%modules%": path.resolve(__dirname, "app/blocks/modules"),
			"%components%": path.resolve(__dirname, "app/blocks/components")
		}
	}
};