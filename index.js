'use strict';

/**
 * @module
 * @author Oleg Dutchenko <dutchenko.o.dev@gmail.com>
 * @version 1.0.0
 */

// ----------------------------------------
// Public
// ----------------------------------------

/**
 * Creating a regular expression for excluding node modules
 * from babel transpiling except for individual modules
 * @param {string[]} [exceptionList] - exclude all modules except this list
 * @return {RegExp}
 */
function babelLoaderExcludeNodeModulesExcept (exceptionList) {
	if (Array.isArray(exceptionList) && exceptionList.length) {
		return new RegExp(`node_modules[\\/|\\\\](?!(${exceptionList.join('|')})).*`, 'i');
	}
	return /node_modules/i;
}

// ----------------------------------------
// Exports
// ----------------------------------------

module.exports = babelLoaderExcludeNodeModulesExcept;
