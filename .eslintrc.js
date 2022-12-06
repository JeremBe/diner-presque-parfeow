/* eslint-disable no-undef */
module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'@typescript-eslint'
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single',
			{ 'avoidEscape': true }
		],
		'semi': [
			'error',
			'never'
		],
		'no-multi-spaces': 'error',
		'no-multiple-empty-lines': ['error', { 'max': 1 }],
		'block-spacing': ['error', 'always'],
		'no-trailing-spaces': 'error',
		'space-before-function-paren': ['error', 'never'],
		'space-in-parens': ['error', 'never'],
		'space-infix-ops': 'error',
		'arrow-spacing': 'error',
		'require-yield': 'error',
		'require-await': 'error',
		'no-param-reassign': 'error',
		'no-empty-function': 'error',
		'arrow-body-style': ['error', 'always'],
		'semi-spacing': ['error', {
			'before': false,
			'after': true
		}],
		'comma-style': ['error', 'last'],
		'comma-spacing': ['error', {
			'before': false,
			'after': true
		}],
		'comma-dangle': ['error', {
			'arrays': 'never',
			'objects': 'never',
			'imports': 'never',
			'exports': 'never',
			'functions': 'never'
		}],
		'prefer-const': 'error',
		'key-spacing': ['error', { 'afterColon': true }],
		'object-curly-newline': ['error', { 'minProperties': 2 }],
		'object-property-newline': 'error',
		'object-curly-spacing': ['error', 'always'],
		'brace-style': ['error', '1tbs'],
		'prefer-template': 'error',
		'no-console': 'error'
	}
}
