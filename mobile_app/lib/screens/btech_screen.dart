import 'package:flutter/material.dart';
import '../models/mock_data.dart';

class BtechScreen extends StatelessWidget {
  const BtechScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final college = MockData.defaultCollege;
    return Scaffold(
      appBar: AppBar(
        title: Text(college.name),
      ),
      body: ListView.builder(
        itemCount: college.branches.length,
        itemBuilder: (context, index) {
          final branch = college.branches[index];
          return ExpansionTile(
            title: Text(branch.name, style: const TextStyle(fontWeight: FontWeight.bold)),
            children: branch.years.map((year) {
              return ExpansionTile(
                title: Text(year.year),
                children: year.subjects.map((subject) {
                  return ListTile(
                    leading: const Icon(Icons.book),
                    title: Text(subject.name),
                    trailing: const Icon(Icons.arrow_forward_ios, size: 16),
                    onTap: () {
                      // Navigate to subject folders
                    },
                  );
                }).toList(),
              );
            }).toList(),
          );
        },
      ),
    );
  }
}
