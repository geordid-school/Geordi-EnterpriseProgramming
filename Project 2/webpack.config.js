const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
      common: './src/index.js',
      home: './src/scripts/home.js',
      portfolio: './src/scripts/portfolio.js',
      resume: './src/scripts/resume.js',
      contact: './src/scripts/contact.js'
  },
  mode: 'development',
  output: {
    filename: 'static/[name].bundle.js',
    path: path.resolve(__dirname, 'wwwroot')
  },
  module: {
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: 'static/[name].[ext]',
                    },
                },
            ],
        },  
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};
