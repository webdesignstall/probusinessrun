module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'airbnb-base',
		'prettier',
		'plugin:react-hooks/recommended'
	],
	parserOptions: {
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true
		},
		sourceType: 'module'
	},
	plugins: ['react'],
	rules: {
		'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
		indent: ['error', 4],
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always']
	}
};
