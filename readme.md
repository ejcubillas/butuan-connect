# Welcome to Butuan Connect


# Environment Setup

Please refer to the React Native documentation (React Native CLI)
[React Native - Environment Setup](https://reactnative.dev/docs/environment-setup)

## Installation

    npm instsall
    cd ios
    pod instsall
    cd ..
    npx react-native link

##  Run the App

**Android** - `npx react-native run-android`
**IOS** - `npx react-native run-ios`

**Having issues running the  app?**
Try these steps:
**IOS** - Open XCode, then go to **Product** -> **Clean Build Folder**, then run `npx react-native run-ios`.
**Android** - Go to android/ directory then run `./gradlew clean`, then go back to the root directory and run `npx react-native run-android`.

## Changing App Icons

**IOS** - replace all icons in /ios/bxuct/Images.xcassets/AppIcon.appiconset
**Android** - replace all icons in /android/app/src/main/res/mipmap-*

## App Config

You can find the configuration in **/src/config.js** and update the following:
 - API Endpoint
 - Privacy Policy (URL)
 - Terms and Condition (URL)

## Publishing the App

**App Store** - https://reactnative.dev/docs/publishing-to-app-store
**PlayStore** - https://reactnative.dev/docs/signed-apk-android

Some tutorials on how to upload the app on App Store
- https://www.youtube.com/watch?v=fXeDe9tafG8
- https://www.youtube.com/watch?v=AqkVuWceCJ0
