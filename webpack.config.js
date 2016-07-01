const webpack = require('webpack');

module.exports = {
    entry: './public/js/app.js',
    output: {
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    watch: true,
    devtool: "eval"
};