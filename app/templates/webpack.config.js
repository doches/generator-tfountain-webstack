const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require("path");

function buildConfig(args) {
    var rootConfig = {
        entry: './src/index.tsx',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'app.[hash].js'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json']
        },
        devtool: (args && args.production ? false : "inline-cheap-source-map"),
        devServer: {
            contentBase: "./dist",
            hot: true,
            historyApiFallback: true,
        },
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.(c|le)ss$/,
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' },
                        { loader: 'less-loader' },
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
                    use: [
                        { loader: "file-loader" },
                    ]
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                inject: false,
                template: require("html-webpack-template"),
                devServer: (args && args.production) ? undefined : "http://localhost:8080",
                meta: [
                    {
                        name: "og:title",
                        content: "<%= name %>"
                    },
                    {
                        name: "og:description",
                        content: "<%= description %>"
                    },
                ],
                mobile: true,
                lang: "en-GB",
                title: "<%= name %>",
                scripts: [
                ],
            }),
            new CopyPlugin([
                { from: "static_assets/", to: "" },
            ]),
        ],
    };

    if (args && args.production) {
        rootConfig = {
            ...rootConfig,
            optimization: {
                minimize: true,
                minimizer: [new TerserPlugin({
                    extractComments: "all",
                })],
            },
        };
    }

    return rootConfig;
}

module.exports = buildConfig;
