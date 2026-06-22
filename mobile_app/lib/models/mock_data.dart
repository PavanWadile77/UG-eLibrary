class UserProfile {
  final String name;
  final String email;
  final String role;
  final String? dteCode;
  final String? branch;
  final String? academicYear;

  const UserProfile({
    required this.name,
    required this.email,
    required this.role,
    this.dteCode,
    this.branch,
    this.academicYear,
  });
}

class CourseItem {
  final String title;
  final String description;
  final String author;

  const CourseItem({
    required this.title,
    required this.description,
    required this.author,
  });
}

class MaterialItem {
  final String id;
  final String title;
  final String type; // 'pdf', 'video', 'notes'
  final String url;
  final DateTime uploadedAt;

  const MaterialItem({
    required this.id,
    required this.title,
    required this.type,
    required this.url,
    required this.uploadedAt,
  });
}

class FolderNode {
  final String id;
  final String name;
  final List<FolderNode> subFolders;
  final List<MaterialItem> materials;

  const FolderNode({
    required this.id,
    required this.name,
    this.subFolders = const [],
    this.materials = const [],
  });
}

class Subject {
  final String id;
  final String name;
  final List<FolderNode> folders;

  const Subject({required this.id, required this.name, this.folders = const []});
}

class AcademicYear {
  final String year;
  final List<Subject> subjects;

  const AcademicYear({required this.year, this.subjects = const []});
}

class Branch {
  final String name;
  final List<AcademicYear> years;

  const Branch({required this.name, this.years = const []});
}

class College {
  final String dteCode;
  final String name;
  final List<Branch> branches;

  const College({required this.dteCode, required this.name, this.branches = const []});
}

class NotificationItem {
  final String title;
  final String body;
  final DateTime date;

  const NotificationItem({required this.title, required this.body, required this.date});
}

class MockData {
  static const UserProfile studentUser = UserProfile(
    name: 'Jane Student',
    email: 'student@ug.edu',
    role: 'Student',
    dteCode: 'DTE123',
    branch: 'Computer Science',
    academicYear: '3rd Year',
  );

  static const UserProfile adminUser = UserProfile(
    name: 'Admin System',
    email: 'admin@ug.edu',
    role: 'Admin',
  );

  static const List<CourseItem> upscMaterials = [
    CourseItem(title: 'UPSC Polity', description: 'Complete notes for Indian Polity.', author: 'Laxmikanth'),
    CourseItem(title: 'History of Modern India', description: 'Comprehensive guide to Modern Indian history.', author: 'Bipan Chandra'),
  ];

  static final List<MaterialItem> recentHistory = [
    MaterialItem(id: '1', title: 'Data Structures PDF', type: 'pdf', url: 'mock_url', uploadedAt: DateTime.now().subtract(const Duration(days: 1))),
    MaterialItem(id: '2', title: 'OS Lecture Video', type: 'video', url: 'mock_url', uploadedAt: DateTime.now().subtract(const Duration(days: 2))),
  ];

  static final List<MaterialItem> bookmarks = [
    MaterialItem(id: '3', title: 'Thermodynamics Notes', type: 'notes', url: 'mock_url', uploadedAt: DateTime.now()),
  ];

  static final List<NotificationItem> notifications = [
    NotificationItem(title: 'New Material Uploaded', body: 'Prof. Smith uploaded Data Structures notes.', date: DateTime.now()),
    NotificationItem(title: 'System Maintenance', body: 'Server will be down at 12 AM.', date: DateTime.now().subtract(const Duration(days: 1))),
  ];

  static final College defaultCollege = College(
    dteCode: 'DTE123',
    name: 'UG Engineering College',
    branches: [
      Branch(
        name: 'Computer Science',
        years: [
          AcademicYear(
            year: '3rd Year',
            subjects: [
              Subject(
                id: 'sub1',
                name: 'Data Structures',
                folders: [
                  FolderNode(
                    id: 'f1',
                    name: 'Unit 1: Trees',
                    subFolders: [
                      FolderNode(
                        id: 'f1_sub1',
                        name: 'Binary Trees',
                        materials: [
                          MaterialItem(id: 'mat1', title: 'Binary Search Tree Notes', type: 'pdf', url: 'mock', uploadedAt: DateTime.now()),
                          MaterialItem(id: 'mat2', title: 'BST Video Lecture', type: 'video', url: 'mock', uploadedAt: DateTime.now()),
                        ],
                      )
                    ],
                  )
                ],
              )
            ],
          )
        ],
      )
    ],
  );
}
