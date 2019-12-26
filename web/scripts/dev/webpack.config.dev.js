const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const tsImportPluginFactory = require('ts-import-plugin')

module.exports = {
    entry: {
        // polyfill: ['webpack-hot-middleware/client?noInfo=true&reload=true','babel-polyfill'],
        main: ['webpack-hot-middleware/client?noInfo=true&reload=true', 'babel-polyfill', './src/index.tsx']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // publicPath: '/dist/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", "jsx", ".json"]
    },
    mode: 'development',
    devtool: 'sourcemap',
    module: {
        rules: [
            {
                test: /\.(jsx|js|tsx|ts)$/,
                exclude: /node_modules/, // 不解析node_modules
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [tsImportPluginFactory({
                            libraryName: 'antd',
                            libraryDirectory: 'lib',
                            style: 'css'
                        })]
                    }),
                    compilerOptions: {
                        module: 'es2015'
                    }
                },
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    'style-loader',
                    { 
                        loader: 'css-loader',
                        options: { importLoaders: 1 } 
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(woff|eot|ttf|svg|png|jpg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: '1024'
                        }
                    },
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new ExtractTextPlugin("style.css"),
        new webpack.HotModuleReplacementPlugin()
    ],
}