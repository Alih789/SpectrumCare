## iOS Env Setup Steps (as of 2-14-23)
Follow the commands below to clone this repo and set up your local development environment: (iOS only)

```
git clone https://github.com/Alih789/SpectrumCare.git
cd SpectrumCare
npm install --force
bundle install
cd ios
pod install
cd ..
npx react-native start
```

Sergio's branch updates:
Podfile lock dependency updated for RNGestureHandler. Sergio has to upgrade this to newest
version to run iOS. Did not push to master currently only has this on local branch.

Doc: https://docs.swmansion.com/react-native-gesture-handler/docs/installation
