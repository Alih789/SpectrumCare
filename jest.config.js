const path = require('path')

module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    './jest.setup.js',
  ],
  clearMocks: true,
  moduleDirectories: ['node_modules', path.join(__dirname, 'src')],
  transform: {},
  transformIgnorePatterns: [
    "node_modules/(?!(react-native"
    + "|@react-native"
    + "|@react-navigation"
    + "|@react-native-firebase"
     + "|react-native-youtube-iframe"
      + "|react-native-vector-icons"
      + "|react-native-dynamic-search-bar"
      + "|react-native-splash-screen"
      + "|react-native-screens"
      + "|react-native-reanimated"
    + ")/)",
  ],
}