module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          /**
           * Regular expression is used to match all files inside `./src` directory and map each `.src/folder/[..]` to `~folder/[..]` path
           */
          '^~(.+)': './src/\\1',
        }
      },
    ],
    ['react-native-reanimated/plugin']
  
  ]
};
