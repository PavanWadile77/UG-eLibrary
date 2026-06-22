import 'package:flutter/material.dart';
import 'theme/app_theme.dart';
import 'routes/app_routes.dart';

void main() {
  runApp(const UGeLibraryApp());
}

class UGeLibraryApp extends StatelessWidget {
  const UGeLibraryApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'UG eLibrary',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      initialRoute: '/',
      onGenerateRoute: AppRoutes.onGenerateRoute,
    );
  }
}
