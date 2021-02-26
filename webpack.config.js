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