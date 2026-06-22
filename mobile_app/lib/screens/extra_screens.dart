import 'package:flutter/material.dart';
import '../models/mock_data.dart';

class HistoryScreen extends StatelessWidget {
  const HistoryScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('History')),
      body: ListView.builder(
        itemCount: MockData.recentHistory.length,
        itemBuilder: (context, index) {
          final item = MockData.recentHistory[index];
          return ListTile(
            leading: Icon(item.type == 'video' ? Icons.video_library : Icons.picture_as_pdf),
            title: Text(item.title),
            subtitle: Text('Last accessed: ${item.uploadedAt.toString().split(' ')[0]}'),
          );
        },
      ),
    );
  }
}

class BookmarksScreen extends StatelessWidget {
  const BookmarksScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Bookmarks')),
      body: ListView.builder(
        itemCount: MockData.bookmarks.length,
        itemBuilder: (context, index) {
          final item = MockData.bookmarks[index];
          return ListTile(
            leading: const Icon(Icons.bookmark),
            title: Text(item.title),
            subtitle: Text(item.type.toUpperCase()),
          );
        },
      ),
    );
  }
}

class NotificationsScreen extends StatelessWidget {
  const NotificationsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Notifications')),
      body: ListView.builder(
        itemCount: MockData.notifications.length,
        itemBuilder: (context, index) {
          final item = MockData.notifications[index];
          return ListTile(
            leading: const Icon(Icons.notifications),
            title: Text(item.title),
            subtitle: Text(item.body),
            trailing: Text(item.date.toString().split(' ')[0]),
          );
        },
      ),
    );
  }
}

class SearchScreen extends StatelessWidget {
  const SearchScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const TextField(
          decoration: InputDecoration(
            hintText: 'Global Search...',
            border: InputBorder.none,
            hintStyle: TextStyle(color: Colors.white70),
          ),
          style: TextStyle(color: Colors.white),
        ),
      ),
      body: const Center(
        child: Text('Type to search for subjects, notes, and videos.'),
      ),
    );
  }
}

class DownloadsScreen extends StatelessWidget {
  const DownloadsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Download Center')),
      body: const Center(
        child: Text('No downloaded materials yet.'),
      ),
    );
  }
}
