import 'package:flutter/material.dart';

class AdminDashboard extends StatelessWidget {
  const AdminDashboard({Key? key}) : super(key: key);

  Widget _buildAdminAction(BuildContext context, String title, IconData icon) {
    return ListTile(
      leading: Icon(icon, color: Theme.of(context).colorScheme.primary),
      title: Text(title),
      trailing: const Icon(Icons.arrow_forward_ios, size: 16),
      onTap: () {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('$title (Mock Implementation)')),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Admin Console'),
        actions: [
          IconButton(
            icon: const Icon(Icons.person),
            onPressed: () {
              Navigator.pushNamed(context, '/profile');
            },
          ),
        ],
      ),
      body: ListView(
        children: [
          const Padding(
            padding: EdgeInsets.all(16.0),
            child: Text('Content Management', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          ),
          _buildAdminAction(context, 'Manage Colleges & DTE Codes', Icons.business),
          _buildAdminAction(context, 'Manage Branches', Icons.account_tree),
          _buildAdminAction(context, 'Manage Subjects', Icons.book),
          const Divider(),
          const Padding(
            padding: EdgeInsets.all(16.0),
            child: Text('Folder & Material Uploads', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          ),
          _buildAdminAction(context, 'Create Nested Folders', Icons.folder),
          _buildAdminAction(context, 'Upload Notes', Icons.description),
          _buildAdminAction(context, 'Upload PDFs', Icons.picture_as_pdf),
          _buildAdminAction(context, 'Upload Videos', Icons.video_library),
          const Divider(),
          const Padding(
            padding: EdgeInsets.all(16.0),
            child: Text('File Operations', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          ),
          _buildAdminAction(context, 'Edit Files', Icons.edit),
          _buildAdminAction(context, 'Delete Files', Icons.delete),
        ],
      ),
    );
  }
}
