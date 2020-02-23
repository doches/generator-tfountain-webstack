const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.(c|le)ss$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {   
                        loader: "css-loader",
                    },
                    {
                        loader: "less-loader",
                    },
                ],
            },
            {
                test: /\.(png|svg|eot|ttf|jpg)$/,
                use: "file-loader"
            },
            {
                test: /\.woff(2)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            }
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, "src"),
        hot: true,
        open: true,
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app-[hash].js",
    },
    plugins: [
        new HtmlWebpackPlugin(),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.tsx', '.ts', '.less', '.css'],
    },
}