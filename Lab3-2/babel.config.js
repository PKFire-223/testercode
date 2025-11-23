module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],   // SDK 50+ đã include expo-router preset
    // plugins: [require.resolve('expo-router/babel')] // <- KHÔNG CẦN nữa
  };
};