import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/mock_data.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  String? _goal;
  String? _collegeName;
  String? _collegeDte;
  String? _branch;
  List<String> _competitiveInterests = [];

  @override
  void initState() {
    super.initState();
    _loadProfileData();
  }

  Future<void> _loadProfileData() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _goal = prefs.getString('selected_goal');
      _collegeName = prefs.getString('college_name');
      _collegeDte = prefs.getString('college_dte');
      _branch = prefs.getString('branch');
      _competitiveInterests = prefs.getStringList('competitive_interests') ?? [];
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile'),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const CircleAvatar(
                radius: 60,
                child: Icon(Icons.person, size: 60),
              ),
              const SizedBox(height: 24),
              Text(
                MockData.studentUser.name,
                style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              Text(
                MockData.studentUser.email,
                style: const TextStyle(fontSize: 16, color: Colors.grey),
              ),
              const SizedBox(height: 24),
              
              if (_goal == 'higher_ed' && _collegeName != null)
                Card(
                  child: ListTile(
                    leading: const Icon(Icons.school),
                    title: Text(_collegeName!),
                    subtitle: Text(
                      'DTE Code: $_collegeDte\nBranch: $_branch',
                    ),
                    isThreeLine: true,
                  ),
                ),

              if (_competitiveInterests.isNotEmpty)
                Card(
                  child: ListTile(
                    leading: const Icon(Icons.assignment),
                    title: const Text('Competitive Exams'),
                    subtitle: Text(_competitiveInterests.join(', ')),
                  ),
                ),
              
              const SizedBox(height: 16),
              
              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton.icon(
                  onPressed: () {
                    // Navigate back to selection screen to change settings
                    Navigator.pushNamed(context, '/select_college', arguments: false).then((_) {
                      _loadProfileData(); // Reload data when returning
                    });
                  },
                  icon: const Icon(Icons.edit),
                  label: const Text('Change College / Settings'),
                ),
              ),

              const SizedBox(height: 16),

              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton.icon(
                  onPressed: () async {
                    try {
                      final googleSignIn = GoogleSignIn();
                      await googleSignIn.signOut();
                      await googleSignIn.disconnect();
                    } catch (_) {}
                    
                    if (!mounted) return;
                    Navigator.pushNamedAndRemoveUntil(context, '/login', (route) => false);
                  },
                  icon: const Icon(Icons.logout),
                  label: const Text('Logout'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.redAccent,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
