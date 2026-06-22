# Database & API Specifications

This document outlines the Firestore Collections, Storage buckets folder schemes, and custom Push Notification payloads for the UG eLibrary project.

---

## 1. Cloud Firestore Database Schemas

### `/users` Collection
Stores user account roles, profile details, and approval states:
* `userId` (String, Primary Key): Firebase Authentication UID.
* `name` (String): Display name.
* `mobile` (String): E.164 phone number.
* `collegeName` (String): College label.
* `dteCode` (String): College DTE code.
* `branch` (String): Educational department/branch.
* `year` (String): Current academic year (Student only).
* `role` (String): `'student'`, `'teacher'`, or `'admin'`.
* `approved` (Boolean): Teacher approval flag.

### `/teacher_requests` Collection
Stores requests for teacher authorization waiting for admin review:
* `userId` (String): Applicant UID.
* `name` (String): Applicant name.
* `mobile` (String): Applicant phone number.
* `dteCode` (String): Selected DTE code.
* `branch` (String): Select branch.
* `status` (String): `'pending'`, `'approved'`, or `'rejected'`.
* `createdAt` (String): ISO timestamp.

### `/colleges` Collection
Registry of valid colleges and lookup codes:
* `dteCode` (String, Primary Key): Selected code (e.g. `'3199'`).
* `name` (String): College name.
* `createdAt` (String): ISO timestamp.

### `/folders` Collection
Hierarchical syllabus folder index (infinite depth system):
* `folderId` (String, Primary Key): Generated ID.
* `name` (String): Folder name.
* `parentId` (String, Optional): ID of parent folder. Null if root subject folder.
* `dteCode` (String): Targeting college code.
* `branch` (String): Target branch.
* `year` (String): Target year.
* `subject` (String, Optional): Associated course subject.
* `createdBy` (String): Creator UID.
* `createdAt` (String): ISO timestamp.

### `/files` Collection
Study material documents metadata:
* `fileId` (String, Primary Key): Generated ID.
* `name` (String): File name.
* `url` (String): Public access/download link.
* `storagePath` (String): Firebase Storage path (`uploads/{fileId}_{name}`).
* `fileType` (String): `'pdf'`, `'video'`, `'audio'`, `'image'`, `'docx'`, `'zip'`, etc.
* `folderId` (String, Optional): ID of containing folder.
* `subject` (String, Optional): Course subject.
* `category` (String, Optional): UPSC category (e.g. `'Polity'`).
* `dteCode` (String): Target college.
* `branch` (String): Target branch.
* `year` (String): Target year.
* `uploadedBy` (String): Uploader UID.
* `uploadedByName` (String): Uploader name.
* `viewsCount` (Integer): View statistics.
* `downloadsCount` (Integer): Download statistics.
* `bookmarksCount` (Integer): Favorites registry count.
* `createdAt` (String): ISO timestamp.

### `/history` Collection
Student activity log:
* `userId` (String): Student UID.
* `fileName` (String): Accessed file name.
* `fileId` (String): File reference ID.
* `folderName` (String): Containing directory.
* `viewedTime` (String): ISO timestamp.
* `downloadedTime` (String): ISO timestamp.
* `lastAccessedDate` (String): ISO timestamp.

### `/bookmarks` Collection
Saves favorites synced across devices:
* `userId` (String): Student UID.
* `fileId` (String): File reference ID.
* `fileName` (String): File name.
* `fileType` (String): File type.
* `bookmarkedAt` (String): ISO timestamp.

---

## 2. Firebase Cloud Storage Structure

Uploaded assets are organized under a single logical folder inside the Storage bucket:

```
gs://{bucket_name}/
└── uploads/
    ├── {fileId_1}_{fileName.pdf}   # Compressed documents or raw files
    ├── {fileId_2}_{video.mp4}      # Lecture videos
    └── {fileId_3}_{audio.mp3}      # Audio lessons
```

---

## 3. Firebase Cloud Messaging (FCM) Payload Formats

Push notification notifications trigger FCM endpoints:

### General Announcements
* **Topic**: `'announcements'`
* **Payload**:
```json
{
  "to": "/topics/announcements",
  "notification": {
    "title": "New Study Circular",
    "body": "Term examinations schedule for all branches released. Check details."
  },
  "data": {
    "type": "general",
    "click_action": "FLUTTER_NOTIFICATION_CLICK"
  }
}
```

### Class-Specific Notes Uploads
* **Topic**: `'college_{dteCode}_{branch_slug}'`
* **Payload**:
```json
{
  "to": "/topics/college_3199_computerengineering",
  "notification": {
    "title": "New Notes Uploaded",
    "body": "Prof. Shinde uploaded Unit-3 Notes in Mathematics-I."
  },
  "data": {
    "type": "folder",
    "folderId": "math_unit3_folder_id",
    "click_action": "FLUTTER_NOTIFICATION_CLICK"
  }
}
```
