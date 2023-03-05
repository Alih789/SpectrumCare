
# SpectrumCare mobile app development instructions

## Android Env Setup Steps (as of 2-24-23)

Follow the commands below to clone this repo and set up your local development environment: (for android only)

```
git clone https://github.com/Alih789/SpectrumCare.git
cd SpectrumCare
npm install --force
```

Start your device emulator in Android Studio (hit the play button for the device in the device manager)

Once device is open, run:
```
npx react-native start
```

## iOS Env Setup Steps (as of 2-24-23)

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

## Important: WFImages (3-3-23)
Right now, the images for the wayfinding component are in the team google drive. Download `wfImages` and move to /assets/images before running app.

## External Packages Used in Project:

- react native gesture handler
  -  Doc: https://docs.swmansion.com/react-native-gesture-handler/docs/installation
