const babelLoaderExcludeNodeModulesExcept = require('../index');
const path = require('path');
const escapeStringRegexp = require('escape-string-regexp');
const ESCAPED_PATH_SEP = escapeStringRegexp(path.sep);

const X = ESCAPED_PATH_SEP === '\\\\';

describe('Should create a correct regular expression for excluding node_modules', function () {
	/**
	 * @type {TestCase[]}
	 */
	const testCases = [
		{
			params: undefined,
			expected: /node_modules/i
		},
		{
			params: [],
			expected: /node_modules/i
		},
		{
			params: ['xxx'],
			expected: X ? /node_modules\\(?!(xxx)\\)/i : /node_modules\/(?!(xxx)\/)/i
		},
		{
			params: ['xxx/'],
			expected: X ? /node_modules\\(?!(xxx)\\)/i : /node_modules\/(?!(xxx)\/)/i
		},
		{
			params: ['zZz', 'yYy'],
			expected: X
				? /node_modules\\(?!(zZz|yYy)\\)/i
				: /node_modules\/(?!(zZz|yYy)\/)/i
		}
	];

	testCases.forEach(function ({ params, expected }, i) {
		test(`Test case #${i + 1}`, function () {
			const result = babelLoaderExcludeNodeModulesExcept(params);
			expect(result).toEqual(expected);
		});
	});
});

/**
 * @typedef {Object} TestCase
 * @property {string[]} params
 * @property {RegExp} expected
 */
