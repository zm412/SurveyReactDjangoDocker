const path = require('path');
const ROOT_DIR = path.resolve(__dirname, '..');

module.exports = {
  
  entry: {
    main: [
      './src/index.js',
      //'src/styles.css',
      //'bootstrap/dist/css/bootstrap.min.css',
    ],
    //bundle: ['jquery', 'popper.js', 'bootstrap'],
  },
  mode: 'development',
  output: {
    //path: ROOT_DIR + '/static/djangoapp/',
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@src': path.resolve(__dirname, '../'),
      '@static': path.resolve(__dirname, '../static/djangoapp'),
      '@templates': path.resolve(__dirname, '../templates/djangoapp'),
    }
  },
  module: {
    rules: [
       {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
       }],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
       //   'sass-loader',
      //  'postcss-loader'
        ],
 
      },
 
    ]
  }
};
