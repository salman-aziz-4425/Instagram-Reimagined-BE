module.exports = {
	'env': {
		'es2021': true,
		'node': true
	},
	'extends': 'eslint:recommended',
	'overrides': [
		{
			'env': {
				'node': true
			},
			'files': [
				'.eslintrc.{js,cjs}'
			],
			'parserOptions': {
				'sourceType': 'script'
			}
		}
	],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'ignores': [
		"!node_modules/",
		"node_modules/*",
		"!node_modules/mylibrary/"
	],
	'rules': {
		'indent': [
			'error', 'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'double'
		],
		'semi': [
			'error',
			'never'
		],


	},
}
