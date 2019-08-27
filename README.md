# babel-loader-exclude-node-modules-except

[![license](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/WezomAgency/babel-loader-exclude-node-modules-except/blob/master/LICENSE)
[![npm](https://img.shields.io/badge/js--tiny-module-yellow.svg)](https://github.com/topics/js-tiny-module)
[![npm](https://img.shields.io/badge/npm-install-orange.svg)](https://www.npmjs.com/package/babel-loader-exclude-node-modules-except)
[![npm](https://img.shields.io/badge/wezom-agency-red.svg)](https://github.com/WezomAgency)

> Creating a regular expression for excluding node_modules  
> from babel transpiling except for individual modules


### Usage

```js
// webpack.config.js

const babelLoaderExcludeNodeModulesExcept = require('babel-loader-exclude-node-modules-except');

module.exports = {
  // config properties
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: babelLoaderExcludeNodeModulesExcept([
          // es6 modules from node_modules/
          'custom-jquery-methods',
          'swiper',
          'dom7'
        ]),
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};

```

---

#### Contributors 💪

- April Arcus [@AprilArcus](https://github.com/AprilArcus)

---

#### License

[MIT License](https://github.com/WezomAgency/babel-loader-exclude-node-modules-except/blob/master/LICENSE)

---
