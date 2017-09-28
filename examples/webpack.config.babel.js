const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function () {
    return {
        entry: {
            index: path.join(__dirname, './index.js'),
        },

        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        },

        module: {
            rules: [
                {
                    test: /.jsx?$/,
                    exclude: /node_modules/,

                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ]
                }
            ]
        },

        plugins: [
            // Clean dist folder
            new CleanWebpackPlugin(['./dist/build.js']),
        ]
    };
};