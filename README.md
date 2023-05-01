
# SpectrumCare React Native Mobile App

The    `SpectrumCare` React Native mobile app is a cross-platform application developed by UC Davis Engineering students as a senior design project. In conjunction with UC Davis Health staff, the students developed this app to serve as a single source of prepartory infomation for families recieving surgical care at the UC Davis Children's Hospital.

## Development Environment
To run and devlop the application, refer to the React Native docs Setting up the development environment [here](https://reactnative.dev/docs/environment-setup)

Follow the instructions for `React Native CLI Quickstart` (NOT Expo Go) for the Development OS and Target OS you will be working on.

## Android
```
git clone https://github.com/Alih789/SpectrumCare.git
cd SpectrumCare
yarn
```

Start your device emulator in Android Studio (hit the play button for the device in the device manager)

Once device is open, run:
```
npx react-native start
```

## iOS Env Setup Steps

Follow the commands below to clone this repo and set up your local development environment: (iOS only)

```
git clone https://github.com/Alih789/SpectrumCare.git
cd SpectrumCare
yarn
npm_config_yes=true npx pod-install
NO_FLIPPER=1 npx react-native start
```


If you are having issue with npx:
```
npx react-native start --reset-cache
```

## Dependencies:
- `react-native-vector-icons` [docs](https://github.com/oblador/react-native-vector-icons)
- `react-native-reanimated-carousel` [docs](https://github.com/dohooo/react-native-reanimated-carousel)
- `react-native-gesture-handler` [docs](https://docs.swmansion.com/react-native-gesture-handler/docs/)
- `react-native-dynamic-search-bar` [docs](https://github.com/WrathChaos/react-native-dynamic-search-bar)
- `fuse.js` [docs](https://fusejs.io/getting-started/installation.html)
- `react-native-youtube-iframe` [docs](https://github.com/LonelyCpp/react-native-youtube-iframe)
- `react-native-firebase` [docs](https://rnfirebase.io/)
- `react-native-mmkv` [docs](https://github.com/mrousavy/react-native-mmkv)

## Development Log
- 2-26-23 We are in the process of integrating Firebase functionality into the iOS and Android builds of the app. To successfuly do this we had to begin with a fresh react native app created using [rnfbdemo](https://github.com/mikehardy/rnfbdemo). This also meant switching our dependency manager to `yarn`. `package-lock.json` will be deleted from the repository soon.