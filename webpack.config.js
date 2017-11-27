const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const packageJson = require('./package.json');

module.exports = function () {
    return {
        target: 'node',
        entry: {
            index: path.join(__dirname, 'src/ElementResizer.js'),
        },

        output: {
            path: path.join(__dirname, 'dist'),
                filename: '[name].js',
                library: packageJson.name,
                libraryTarget: 'commonjs2',
        },

        module: {
            rules: [
                {
                    test: /.jsx?$/,
                    exclude: /node_modules/,
                    include: path.join(__dirname, 'src'),
                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ]
                },
            ]
        },

        plugins: [
            // Clean dist folder
            new CleanWebpackPlugin(['dist/*.*'])
        ]
    };
};