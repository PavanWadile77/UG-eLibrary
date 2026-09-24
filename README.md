# UG eLibrary 📚

A digital learning ecosystem that helps students and teachers **organize, discover, manage, and access academic study resources**.

## 🌐 Overview

UG eLibrary is designed for college students, teachers, and academic administrators. The platform brings notes, study materials, question papers, syllabus resources, and competitive-exam preparation into a centralized system.

## ✨ Key Features

- Student and teacher workflows
- College, branch, and year-based resource organization
- Digital notes and study-material library
- Teacher resource management
- Admin moderation and management
- Search and resource discovery
- Study history / recently visited resources
- Competitive-exam resources
- Firebase authentication and data services
- Responsive web/admin experience
- PWA-oriented architecture

## 🏗️ Repository Structure

```text
UG-eLibrary/
├── mobile_app/        # Flutter client
├── admin_panel/       # React/Vite admin console
├── firebase/          # Firebase rules/configuration
├── README.md
├── API_DOCUMENTATION.md
├── INSTALLATION_GUIDE.md
└── DEPLOYMENT_GUIDE.md
```

## 🛠 Tech Stack

### Client
- Flutter / Dart
- React
- Vite
- TypeScript

### Backend & Services
- Firebase Authentication
- Cloud Firestore
- Firebase Storage
- Firebase Cloud Messaging

### Supporting Services
- Search integration
- AI-assisted learning features
- PDF/document viewing

## 🔄 Core Flow

```text
Student / Teacher
       ↓
Authentication
       ↓
Select academic context
(College → Branch → Year)
       ↓
Library / Management
       ↓
Notes, papers & resources
       ↓
Search / Study / Download
```

## 🚀 Getting Started

Follow the repository's detailed setup guides:

- `INSTALLATION_GUIDE.md`
- `DEPLOYMENT_GUIDE.md`
- `API_DOCUMENTATION.md`

For the React admin panel:

```bash
cd admin_panel
npm install
npm run build
```

For the Flutter application, install Flutter and run:

```bash
cd mobile_app
flutter pub get
flutter run
```

## 🔐 Security

Configure Firebase and external service credentials through environment/configuration files. Never commit private keys, service-account credentials, or secrets.

## 📁 Repository

https://github.com/PavanWadile77/UG-eLibrary

## 👨‍💻 Author

**Pavan Wadile**

B.Tech Information Technology Student
