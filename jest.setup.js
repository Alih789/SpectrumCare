// include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');


jest.mock('react-native-gesture-handler', () => {
    const View = require('react-native/Libraries/Components/View/View')
    return {
      Swipeable: View,
      DrawerLayout: View,
      State: {},
      ScrollView: View,
      Slider: View,
      Switch: View,
      TextInput: View,
      ToolbarAndroid: View,
      ViewPagerAndroid: View,
      DrawerLayoutAndroid: View,
      WebView: View,
      NativeViewGestureHandler: View,
      TapGestureHandler: View,
      FlingGestureHandler: View,
      ForceTouchGestureHandler: View,
      LongPressGestureHandler: View,
      PanGestureHandler: View,
      PinchGestureHandler: View,
      RotationGestureHandler: View,
      /* Buttons */
      RawButton: View,
      BaseButton: View,
      RectButton: View,
      BorderlessButton: View,
      /* Other */
      FlatList: View,
      gestureHandlerRootHOC: () => null,
      Directions: {},
    }
  })

  // surpressing warning resulted by useLinking due to usage of NavigationContainer
  jest.mock('@react-navigation/native/lib/commonjs/useLinking.native', () => ({
    default: () => ({getInitialState: {then: () => null}}),
    __esModule: true,
  }))


  jest.mock('react-native-youtube-iframe', () => 'YoutubeIframe');
  jest.mock('react-native-dynamic-search-bar', () => 'SearchBar');
  jest.mock('@react-native-firebase/app', () => {
    let Firebase = {
      analytics: jest.fn().mockReturnValue({ logEvent: jest.fn() }),
      messaging: jest.fn(() => {
        return {
          hasPermission: jest.fn(() => true),
          onTokenRefresh: jest.fn(),
          getToken: jest.fn(() => 'token'),
        }
      }),
      remoteConfig: jest.fn().mockReturnValue({
        fetchAndActivate: jest.fn().mockReturnValue(Promise.resolve()),
        fetch: jest.fn().mockReturnValue(Promise.resolve()),
        getAll: jest.fn().mockReturnValue({
          eva: { value: true },
          eva_hmg: { value: false },
        }),
      }),
      firestore: jest.fn().mockReturnValue({
        collection: jest.fn().mockReturnValue({
          doc: jest.fn().mockReturnValue({
            collection: jest.fn().mockReturnValue({
              doc: jest.fn().mockReturnValue({
                collection: jest.fn().mockReturnValue({
                  doc: jest.fn().mockReturnValue({
                    set: jest.fn(),
                    get: jest.fn(),
                  }),
                }),
              }),
            }),
          }),
        }),
      }),
    }
    return Firebase
  })

  jest.mock('@react-native-firebase/remote-config', () => {})
  jest.mock('@react-native-firebase/analytics', () => {})
  jest.mock('@react-native-firebase/firestore', () => {})

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');