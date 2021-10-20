const withImages = require("next-images");
const path = require("path");
module.exports = withImages({
	reactStrictMode: true,
	trailingSlash: true,
	webpackDevMiddleware: (config) => {
		config.watchOptions = {
			poll: 1000,
			aggregateTimeout: 300,
		};
		return config;
	},
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
	},
});
