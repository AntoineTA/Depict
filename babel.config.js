module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./",
          },
        },
      ],
      "react-native-reanimated/plugin", // has to be listed last
    ],
  };
};
