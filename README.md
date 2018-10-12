# babel-loader-exclude-node-modules-except

> Creating a regular expression for excluding node_modules  
> from babel transpiling except for individual modules


### Usage

```js
// webpack.config.js

import babelLoaderExcludeNodeModulesExcept from 'babel-loader-exclude-node-modules-except';

export default {
  // webpack config
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
