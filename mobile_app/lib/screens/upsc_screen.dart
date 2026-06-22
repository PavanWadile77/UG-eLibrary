import 'package:flutter/material.dart';
import '../models/mock_data.dart';
import '../widgets/course_card.dart';

class UpscScreen extends StatelessWidget {
  const UpscScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('UPSC Preparation'),
      ),
      body: ListView.builder(
        itemCount: MockData.upscMaterials.length,
        itemBuilder: (context, index) {
          return CourseCard(course: MockData.upscMaterials[index]);
        },
      ),
    );
  }
}
