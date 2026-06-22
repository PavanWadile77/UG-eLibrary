import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../widgets/custom_button.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final GoogleSignIn _googleSignIn = GoogleSignIn(scopes: ['email']);

  Future<void> _handleGoogleSignIn(bool isAdmin) async {
    try {
      // Force account selection every time by clearing previous sessions
      try {
        await _googleSignIn.signOut();
        await _googleSignIn.disconnect();
      } catch (_) {}

      // Prompt the user with the Google account selection screen
      await _googleSignIn.signIn();
      
      if (!mounted) return;

      // Check if user has already selected a college/exam path
      final prefs = await SharedPreferences.getInstance();
      final hasSelectedGoal = prefs.getString('selected_goal') != null;

      if (!hasSelectedGoal) {
        Navigator.pushReplacementNamed(context, '/select_college', arguments: isAdmin);
        return;
      }

      if (isAdmin) {
        Navigator.pushReplacementNamed(context, '/admin_dashboard');
      } else {
        Navigator.pushReplacementNamed(context, '/student_dashboard');
      }
    } catch (error) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Sign in failed: $error')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Icon(Icons.school, size: 80, color: Color(0xFF1E88E5)),
              const SizedBox(height: 16),
              const Text(
                'Welcome to UG eLibrary',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 48),
              CustomButton(
                text: 'Sign in as Student with Google',
                onPressed: () => _handleGoogleSignIn(false),
              ),
              const SizedBox(height: 16),
              CustomButton(
                text: 'Sign in as Admin with Google',
                onPressed: () => _handleGoogleSignIn(true),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
