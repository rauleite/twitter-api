const path = require('path');

const configDefault = () => ({
  target: "webworker",
  mode: "production",
  entry: './src/index.ts',
  externals: [
    { 'cross-fetch': 'fetch' }
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

})

const configDev = (config) => ({
  ...config,
  mode: "development",
  devtool: 'inline-source-map',
  output: {
    // Merging
    ...config.output,
    filename: 'bundle_dev.js',
  },
})

module.exports = (() => {
  const config = configDefault()
  if (process.env.ENVIRONMENT === 'staging') {
    return configDev(config)
  }
  return config
})()

// module.exports = main()
// devServer: {
//   port: 4321,
//   // open: true,
//   hot: true
// },
// plugins: [
//   // Enable the plugin
//   new webpack.HotModuleReplacementPlugin(),
// ],
