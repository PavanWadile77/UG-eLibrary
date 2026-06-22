# Production Deployment Guide

This guide describes compilation commands and deployment pipelines to compile binaries and configure servers for production releases.

---

## 1. Firebase Rules Deployments

To deploy Firestore Security Rules and Storage Rules using the Firebase CLI, follow these steps:

1. Log in to Firebase CLI:
   ```bash
   firebase login
   ```
2. Initialize Firebase configurations inside the root `firebase` directory:
   ```bash
   cd firebase
   firebase init
   ```
   * Select **Firestore: Deploy Rules** and **Storage: Deploy Rules**.
   * Link to your existing project: `ug-elibrary`.
3. Verify that `firestore.rules` and `storage.rules` are configured correctly in `firebase.json`:
```json
{
  "firestore": {
    "rules": "firestore.rules"
  },
  "storage": {
    "rules": "storage.rules"
  }
}
```
4. Deploy the rules:
   ```bash
   firebase deploy --only firestore,storage
   ```

---

## 2. Compiling React Admin Panel for Web Hosting

1. Navigate to the admin panel:
   ```bash
   cd admin_panel
   ```
2. Build the optimized static build:
   ```bash
   npm run build
   ```
   This compiles output code into the `dist/` directory.
3. Deploy to Firebase Hosting:
   ```bash
   firebase deploy --only hosting
   ```

---

## 3. Compiling Flutter Mobile Client App

Make sure that your Android and iOS project files are configured with correct Bundle IDs and Keystore signature profiles before packaging.

### Compile Android APK
Generates a standalone APK for testing and sideloading:
1. Navigate to the mobile app:
   ```bash
   cd mobile_app
   ```
2. Build release bundle:
   ```bash
   flutter build apk --release
   ```
   * Output path: `build/app/outputs/flutter-apk/app-release.apk`.

### Compile Android App Bundle (AAB)
Generates the AAB bundle optimized for submission to the Google Play Store:
1. From the mobile app directory:
   ```bash
   flutter build appbundle --release
   ```
   * Output path: `build/app/outputs/bundle/release/app-release.aab`.

### Compile Web Build
Generates compiled static files for browser hosting:
1. From the mobile app directory:
   ```bash
   flutter build web --release
   ```
   * Output path: `build/web/`.

### Compile iOS Build
Generates the iOS archive (requires Xcode on macOS):
1. Resolve CocoaPods:
   ```bash
   cd ios && pod install && cd ..
   ```
2. Build IPA:
   ```bash
   flutter build ipa --release
   ```
   * Open the output folder in Xcode Organizer to distribute to TestFlight or Apple App Store.

---

## 4. Production Checklist

- [ ] Ensure `approved == false` by default in user creation roles.
- [ ] Enforce HTTPS only in Firebase Hosting.
- [ ] Verify that Google Gemini API key has appropriate rate limits and IP restrictions in the Google Cloud Console.
- [ ] Upgrade Firebase project billing plan (Blaze Plan) to enable FCM V1 endpoints and cross-service security rules lookup.
- [ ] Set up SMS usage caps in Firebase console to avoid unexpected phone authentication bills.
