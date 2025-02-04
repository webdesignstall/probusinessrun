module.exports = {
	apps: [
		{
			name: 'probusinessrun',
			script: 'node',
			args: 'main.js',
			cwd: '/var/www/meteor.solutionsoft.xyz/bundle',
			env: {
				PORT: 3000,
				ROOT_URL: 'http://meteor.solutionsoft.xyz',
				MONGO_URL: 'mongodb+srv://probusinessrun:bVvg1MGhwVUc5OPl@probusinessrun.qnpoa.mongodb.net/probusinessrun?retryWrites=true&w=majority',
				NODE_ENV: 'production',
			},
		},
	],
};
