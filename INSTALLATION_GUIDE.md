# Local Installation & Setup Guide

This guide details steps to set up and run the UG eLibrary mobile app and React admin console locally.

---

## Prerequisites

Before starting, install the following software packages:
1. **Flutter SDK** (Latest Stable Version): [Installation Guide](https://docs.flutter.dev/get-started/install).
2. **Node.js** (v18 or higher) & **npm**: [Installation Guide](https://nodejs.org/).
3. **Android Studio** (for Android emulator) or **Xcode** (for iOS emulator - macOS only).
4. **Firebase CLI**: [Installation Guide](https://firebase.google.com/docs/cli).

---

## 1. Firebase Project Setup

1. Open the [Firebase Console](https://console.firebase.google.com/) and click **Add Project**. Name it `ug-elibrary`.
2. Enable the following services inside your project:
   * **Authentication**: Go to Build > Authentication. Enable the **Phone** Sign-in provider.
   * **Firestore Database**: Go to Build > Firestore. Create a database. Start in Test Mode or Production.
   * **Storage**: Go to Build > Storage. Enable default bucket.
   * **Firebase Hosting** (Optional): Used to deploy the admin panel.
3. Obtain client credentials:
   * Create a **Web App** in the Firebase settings to get credentials for the React admin panel.
   * Create an **Android App** and **iOS App** (or use the Firebase CLI command `flutterfire configure` to generate files).

---

## 2. Environment Variables Setup

Create a `.env` file in the root workspace directory by copying the example:

```bash
cp .env.example .env
```

Also, copy this `.env` file to the Flutter root directory:

```bash
cp .env mobile_app/.env
```

Populate the values inside `.env` with your Firebase credentials, Algolia keys, and Gemini API keys.

---

## 3. Running React Admin Panel Console

1. Navigate to the admin panel directory:
   ```bash
   cd admin_panel
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. Create a `.env` configuration template for Vite by creating `admin_panel/.env`:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_key
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_ADMIN_PANEL_SECRET=admin123
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000` in your web browser. Click **Setup first Administrator account**, enter the email/password, and input the VITE_ADMIN_PANEL_SECRET passcode.
6. Once logged in, go to the **Colleges & DTE** tab and click **Seed Database** to automatically populate Firestore with Maharashtra Engineering Colleges, Branches, and default Study Years.

---

## 4. Running Flutter Mobile Client

1. Open a terminal and navigate to the mobile app directory:
   ```bash
   cd mobile_app
   ```
2. Retrieve packages:
   ```bash
   flutter pub get
   ```
3. Run target code generators (if needed for Hive adapter setups):
   ```bash
   flutter pub run build_runner build --delete-conflicting-outputs
   ```
4. Verify connections to emulator/device:
   ```bash
   flutter devices
   ```
5. Start the application on your target emulator/device:
   ```bash
   flutter run
   ```
   
---

## 5. Setting up Algolia Indices

To enable global search, set up an Index named `files` in your Algolia Dashboard:
1. Log in to the [Algolia Console](https://www.algolia.com/).
2. Create a new index named `files`.
3. In the index settings, add the following fields to **Searchable attributes**:
   * `name` (Ordered)
   * `subject` (Ordered)
   * `category` (Ordered)
   * `branch` (Ordered)
   * `dteCode` (Ordered)
