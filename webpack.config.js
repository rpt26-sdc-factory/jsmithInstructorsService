const path = require('path');
const nodeExternals = require('webpack-node-externals');

const client = {
  mode: 'development',
  entry: path.resolve(__dirname, 'client', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    library: 'instructors',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  watchOptions: {
    poll: true,
    ignored: /node_modules/,
  },
};

const server = {
  target: 'node',
  externals: [nodeExternals()],
  mode: 'development',
  entry: path.resolve(__dirname, 'server', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'server'),
    filename: 'server.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
    ],
  },
  watchOptions: {
    poll: true,
    ignored: /node_modules/,
  },
};

const Instructors = {
  mode: 'development',
  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
  },
  entry: path.resolve(__dirname, 'client', 'components/Instructors.jsx'),
  output: {
    path: path.resolve(__dirname, 'client/components'),
    filename: 'instructors.js',
    library: 'instructors',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
    ],
  },
  watchOptions: {
    poll: true,
    ignored: /node_modules/,
  },
};

module.exports = [client, server, Instructors];
