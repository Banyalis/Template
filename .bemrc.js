module.exports = {
	root: true,
	modules: {
		"bem-tools": {
			plugins: {
				create: {
					techs: ["pug", "scss", "js"],
					levels: {
						"app/blocks/modules": {
							default: true
						}
					}
				}
			}
		}
	}
};