
# SpectrumCare React Native Mobile App

The    `SpectrumCare` React Native mobile app is a cross-platform application developed by UC Davis Engineering students as a senior design project. In conjunction with UC Davis Health staff, the students developed this app to serve as a single source of prepartory infomation for families recieving surgical care at the UC Davis Children's Hospital.

## Versions and App Info
- package manager used is `yarn`
- React Native Version 0.71.4

### Development Environment Requirements:
- Node.js > 12 and npm (Recommended: Use nvm)
- Watchman
- React Native CLI
- yarn


iOS Specific Requirements:
- XCode (we develop using version 14.2, issues may arise with later versions)
- Cocoapods 1.12.1
- Ruby Version Manager

Android Specific Requirements:
- JDK
- Android Studio

For additional assistance setting up a React Native development environment, refer to the React Native Docs [here](https://reactnative.dev/docs/environment-setup)


### Dependencies:
- `react-native-vector-icons` [docs](https://github.com/oblador/react-native-vector-icons)
- `react-native-reanimated-carousel` [docs](https://github.com/dohooo/react-native-reanimated-carousel)
- `react-native-gesture-handler` [docs](https://docs.swmansion.com/react-native-gesture-handler/docs/)
- `react-native-dynamic-search-bar` [docs](https://github.com/WrathChaos/react-native-dynamic-search-bar)
- `fuse.js` [docs](https://fusejs.io/getting-started/installation.html)
- `react-native-youtube-iframe` [docs](https://github.com/LonelyCpp/react-native-youtube-iframe)
- `react-native-firebase` [docs](https://rnfirebase.io/)
- `react-native-mmkv` [docs](https://github.com/mrousavy/react-native-mmkv)


## Development Environment
To run and devlop the application, refer to the React Native docs Setting up the development environment [here](https://reactnative.dev/docs/environment-setup)

Follow the instructions for `React Native CLI Quickstart` (NOT Expo Go) for the Development OS and Target OS you will be working on.

## Android Development Environment Steps
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

If you get permissions errors, try:
```
npx react-native run-android
```


## iOS Development Environment Setup Steps

Follow the commands below to clone this repo and set up your local development environment: (iOS only)

```
git clone https://github.com/Alih789/SpectrumCare.git
cd SpectrumCare
yarn
npm_config_yes=true npx pod-install
NO_FLIPPER=1 npx react-native start
```

If you are having issues with npx:
```
npx react-native start --reset-cache
```

Or

```
npx react-native run-ios
```
(Will build the app in the current terminal, then launch a new terminal to install and run the app on the emulator.)

Or

Build and run the app from XCode to see more precisely where the build is failing.


## Testing
todo add details here

## Build App on Device
todo

## Playstore and App Store Updates
todo

## Development Log
- 2-26-23 We are in the process of integrating Firebase functionality into the iOS and Android builds of the app. To successfuly do this we had to begin with a fresh react native app created using [rnfbdemo](https://github.com/mikehardy/rnfbdemo). This also meant switching our dependency manager to `yarn`. `package-lock.json` will be deleted from the repository soon.