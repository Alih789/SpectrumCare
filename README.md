
# SpectrumCare mobile app development instructions

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