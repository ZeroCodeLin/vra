const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const tsImportPluginFactory = require('ts-import-plugin')

module.exports = {
    entry: {
        main: ['babel-polyfill', './src/index.tsx'],
    },
    output: {
        path: path.resolve(__dirname, '../../dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", "jsx", ".json"]
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(jsx|js|tsx|ts)$/,
                exclude: /node_modules/,
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
                use:  ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ["css-loader","sass-loader"]
                })
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
    plugins:[
        new HtmlWebpackPlugin({template:'./src/index.html'}),
        new ExtractTextPlugin("style.css")
    ],
}