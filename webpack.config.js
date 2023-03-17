const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { webpack } = require('webpack');


module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_models/,
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './template/index.html'),
            filename: 'index.html',
            title: "Demo"
        }),
        // new CleanWebpackPlugin(),
        // new webpack.ProvidePlugin({
        //     process: 'process/browser'
        // })
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 8080,
        open: true,
        hot: true
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    }
}