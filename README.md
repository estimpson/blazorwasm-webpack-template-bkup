﻿# blazorwasm-webpack-template

```shell
# create project folder
mkdir blazorwasm-webpack-demo
cd blazorwasm-webpack-demo

# make new Blazor WASM project
dotnet new blazorwasm

# initialize npm
npm init -y

# install webpack and related utilities
npm install --save-dev nodemon webpack webpack-cli css-loader style-loader postcss postcss-loader autoprefixer sass-loader node-sass typescript ts-loader prettier mini-css-extract-plugin

# install bootstrap
npm install bootstrap@next @types/bootstrap jquery @types/jquery popper.js
```

## Webpack config
**webpack.config.js**
```js
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");



module.exports = {
    mode: 'development',
    entry: './src/index.ts',

    output: {
        path: path.resolve(__dirname, '../wwwroot/dist')
    },

    plugins: [new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css",
        })],

    module: {
        rules: [{
            test: /\.(ts|tsx)$/,
            loader: 'ts-loader',
            include: [path.resolve(__dirname, 'src')],
            exclude: [/node_modules/]
        }, {
            test: /\.(sa|sc|c)ss$/,
  
            use: [{
                // inject CSS to page
                //loader: "style-loader"
                loader: MiniCssExtractPlugin.loader,
            }, {
                // translates CSS into CommonJS modules
                loader: "css-loader",

                options: {
                    sourceMap: true
                }
            }, {
                // Run postcss actions
                loader: 'postcss-loader',
                options: {
                    // `postcssOptions` is needed for postcss 8.x;
                    // if you use postcss 7.x skip the key
                    postcssOptions: {
                        // postcss plugins, can be exported to postcss.config.js
                        plugins: function () {
                            return [
                                require('autoprefixer')
                            ];
                        }
                    }
                }
            }, {
                loader: "sass-loader",

                options: {
                    sourceMap: true
                }
            }]
        }]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
}
```


## TypeScript config
**tsconfig.json**
```json
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "allowJs": true,
    "moduleResolution": "Node"
  },
  "files": [
    "src/index.ts"
  ]
}

```

## PostCSS config
**postcss.config.js**
```js
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
};
```

## Client source files
```shell
mkdir src
cd src
```

### Customize bootstrap
**_custom.scss**
```scss
// Required
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";

// Your variable overrides
$body-bg: #000;
$body-color: #111;

// Bootstrap and its default variables

// Optional
@import "../node_modules/bootstrap/scss/root";
@import "../node_modules/bootstrap/scss/reboot";
@import "../node_modules/bootstrap/scss/type";
// etc
```

**main.scss**
```scss
@import "custom";
@import "bootstrap";
```

**index.ts**
```ts
import './main.scss';
import { Tooltip, Toast, Popover } from "bootstrap";
console.log('Hello World from your main file!');
```
