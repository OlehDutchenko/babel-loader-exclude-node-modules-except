const path = require('path');
const escapeStringRegexp = require('escape-string-regexp');
const ESCAPED_NODE_MODULES = escapeStringRegexp('node_modules');
const ESCAPED_PATH_SEP = escapeStringRegexp(path.sep);

/**
 * Creating a regular expression for excluding node modules
 * from babel transpiling except for individual modules
 * @param {string[]} [exceptionList] - exclude all modules except this list
 * @return {RegExp}
 */
function babelLoaderExcludeNodeModulesExcept(exceptionList) {
	if (Array.isArray(exceptionList) && exceptionList.length) {
		// Module names can contain path separators, e.g. "@types/react".
		// Assume POSIX input and normalize for the current platform.
		const normalizedExceptionList = exceptionList.map(function (moduleName) {
			// We'll handle trailing path separators when we build the
			// negative lookahead, so remove them if present.
			if (moduleName[moduleName.length - 1] === path.posix.sep) {
				moduleName = moduleName.slice(0, -1);
			}
			return moduleName.split(path.posix.sep).join(path.sep);
		});

		const alternationGroup =
			'(' + normalizedExceptionList.map(escapeStringRegexp).join('|') + ')';

		// If the exception list includes e.g. "react", we don't want to
		// accidentally make an exception for "react-dom", so make sure to
		// include a trailing path separator inside the negative lookahead.
		const negativeLookahead = '(?!' + alternationGroup + ESCAPED_PATH_SEP + ')';

		return new RegExp(
			ESCAPED_NODE_MODULES + ESCAPED_PATH_SEP + negativeLookahead,
			'i'
		);
	} else {
		return new RegExp(ESCAPED_NODE_MODULES, 'i');
	}
}

module.exports = babelLoaderExcludeNodeModulesExcept;
