import * as webpack from 'webpack';
import * as webpackDevServer from 'webpack-dev-server';
import path from "path";
const config: webpack.Configuration = {
    entry: "./src/App.tsx",
    cache:false,
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: `${path.resolve(__dirname, "public/build")}`,
        filename: "bundle.js",
        publicPath: '/',
    },
    devServer: {
        open: true,
        static: {
            directory: path.join(__dirname, "public"),
            watch: true,
        },
        historyApiFallback: true,
        hot: true,
        compress: true,
        port: 4000,
    },
};

export default config;