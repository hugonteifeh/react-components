/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  styleguideDir: './public',
  moduleAliases: {
    '@/hooks': path.resolve(__dirname, 'src/hooks/index.ts'),
  },
  components: ['src/components/expansion-panel/expansion-panel.tsx'],
  // eslint-disable-next-line global-require
  propsParser: require('react-docgen-typescript').withCustomConfig(
    './tsconfig.json'
  ).parse,

  require: ['babel-polyfill', path.join(__dirname, 'src/styles/main.css')],

  webpackConfig: {
    devServer: {
      transportMode: 'ws',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: { url: false },
            },
          ],
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
  },
  assetsDir: 'public/',
}
