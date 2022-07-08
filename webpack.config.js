"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var config = {
    mode: 'production',
    entry: {
        app: './src/ts/main.ts',
    },
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
};
exports.default = config;
