describe('Unix paths (path.sep = "/")', () => {
	let babelLoaderExcludeNodeModulesExcept;

	beforeAll(() => {
		jest.resetModules();
		jest.doMock('path', () => ({
			...jest.requireActual('path'),
			sep: '/',
			posix: { sep: '/' }
		}));
		babelLoaderExcludeNodeModulesExcept = require('../index');
	});

	afterAll(() => {
		jest.resetModules();
	});

	describe('Should create a correct regular expression for excluding node_modules', () => {
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
				expected: /node_modules\/(?!(xxx)\/)/i
			},
			{
				params: ['xxx/'],
				expected: /node_modules\/(?!(xxx)\/)/i
			},
			{
				params: ['zZz', 'yYy'],
				expected: /node_modules\/(?!(zZz|yYy)\/)/i
			}
		];

		testCases.forEach(({ params, expected }, i) => {
			test(`Test case #${i + 1}`, () => {
				const result = babelLoaderExcludeNodeModulesExcept(params);
				expect(result).toEqual(expected);
			});
		});
	});

	describe('Should be able to convert wildcards in parameters to matching pattern in the regular expression', () => {
		const testCases = [
			{
				description: 'Wildcard occurs in the only argument',
				params: ['react-*'],
				expected: /node_modules\/(?!(react\-(?:.*))\/)/i
			},
			{
				description: 'Wildcard occurs in the second argument out of three',
				params: ['abc', 'mno*', 'xvz'],
				expected: /node_modules\/(?!(abc|mno(?:.*)|xvz)\/)/i
			},
			{
				description: 'Wildcard used for scoped packages',
				params: ['@awesomecorp/*'],
				expected: /node_modules\/(?!(@awesomecorp\/(?:.*))\/)/i
			}
		];

		testCases.forEach(({ params, expected, description }, i) => {
			test(`Test case #${i + 1}: ${description}`, () => {
				const result = babelLoaderExcludeNodeModulesExcept(params);
				expect(result).toEqual(expected);
			});
		});
	});
});

describe('Windows paths (path.sep = "\\\\")', () => {
	let babelLoaderExcludeNodeModulesExcept;

	beforeAll(() => {
		jest.resetModules();
		jest.doMock('path', () => ({
			...jest.requireActual('path'),
			sep: '\\',
			posix: { sep: '/' }
		}));
		babelLoaderExcludeNodeModulesExcept = require('../index');
	});

	afterAll(() => {
		jest.resetModules();
	});

	describe('Should create a correct regular expression for excluding node_modules', () => {
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
				expected: /node_modules\\(?!(xxx)\\)/i
			},
			{
				params: ['xxx/'],
				expected: /node_modules\\(?!(xxx)\\)/i
			},
			{
				params: ['zZz', 'yYy'],
				expected: /node_modules\\(?!(zZz|yYy)\\)/i
			}
		];

		testCases.forEach(({ params, expected }, i) => {
			test(`Test case #${i + 1}`, () => {
				const result = babelLoaderExcludeNodeModulesExcept(params);
				expect(result).toEqual(expected);
			});
		});
	});

	describe('Should be able to convert wildcards in parameters to matching pattern in the regular expression', () => {
		const testCases = [
			{
				description: 'Wildcard occurs in the only argument',
				params: ['react-*'],
				expected: /node_modules\\(?!(react\-(?:.*))\\)/i
			},
			{
				description: 'Wildcard occurs in the second argument out of three',
				params: ['abc', 'mno*', 'xvz'],
				expected: /node_modules\\(?!(abc|mno(?:.*)|xvz)\\)/i
			},
			{
				description: 'Wildcard used for scoped packages',
				params: ['@awesomecorp/*'],
				expected: /node_modules\\(?!(@awesomecorp\\(?:.*))\\)/i
			}
		];

		testCases.forEach(({ params, expected, description }, i) => {
			test(`Test case #${i + 1}: ${description}`, () => {
				const result = babelLoaderExcludeNodeModulesExcept(params);
				expect(result).toEqual(expected);
			});
		});
	});
});
