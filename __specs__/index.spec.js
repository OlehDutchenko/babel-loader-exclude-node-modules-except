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

describe('Should be able to convert wildcards in parameters to matching pattern in the regular expression', () => {
	/**
	 * @type {TestCase[]}
	 */
	const testCases = [
		{
			description: 'Wildcard occurs in the only argument',
			params: ['react-*'],
			expected: X
				? /node_modules\\(?!(react\-(?:.*))\\)/i
				: /node_modules\/(?!(react\-(?:.*))\/)/i
		},
		{
			description: 'Wildcard occurs in the second argument out of three',
			params: ['abc', 'mno*', 'xvz'],
			expected: X
				? /node_modules\\(?!(abc|mno(?:.*)|xvz)\\)/i
				: /node_modules\/(?!(abc|mno(?:.*)|xvz)\/)/i
		},
		{
			description: 'Wildcard used for scoped packages',
			params: ['@awesomecorp/*'],
			expected: X
				? /node_modules\\(?!(@awesomecorp\\(?:.*))\\)/i
				: /node_modules\/(?!(@awesomecorp\/(?:.*))\/)/i
		}
	];

	testCases.forEach(function ({ params, expected, description }, i) {
		test(`Test case #${i + 1}: ${description}`, function () {
			const result = babelLoaderExcludeNodeModulesExcept(params);
			expect(result).toEqual(expected);
		});
	});
});

/**
 * @typedef {Object} TestCase
 * @property {string[]} params
 * @property {RegExp} expected
 * @property {string} [description]
 */
