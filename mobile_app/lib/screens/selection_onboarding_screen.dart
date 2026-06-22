import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/mock_data.dart';

class SelectionOnboardingScreen extends StatefulWidget {
  final bool isAdmin;
  const SelectionOnboardingScreen({Key? key, required this.isAdmin}) : super(key: key);

  @override
  State<SelectionOnboardingScreen> createState() => _SelectionOnboardingScreenState();
}

class _SelectionOnboardingScreenState extends State<SelectionOnboardingScreen> {
  int _currentStep = 0;
  String _selectedGoal = ''; // 'higher_ed' or 'competitive'
  
  // Higher Ed selections
  String? _selectedCollegeDte;
  String? _selectedCollegeName;
  String? _selectedBranch;

  // Competitive selections
  List<String> _selectedCompetitiveExams = [];

  final List<String> _allCompetitiveExams = [
    'UPSC', 'MPSC', 'SSC', 'Banking', 'Railway', 'Defence'
  ];

  final List<String> _allBranches = [
    'Computer Engineering', 'Information Technology', 'AI & DS', 'AI & ML',
    'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering',
    'Electronics Engineering', 'Electronics & Telecommunication', 'Chemical Engineering',
    'Instrumentation', 'Automobile Engineering', 'Pharmacy', 'MBA', 'MCA',
    'Diploma Branches', 'BSc', 'BCom', 'BA', 'MTech', 'Polytechnic Programs', 'Other Courses'
  ];

  String _searchQuery = '';
  List<Map<String, dynamic>> _filteredColleges = [];
  bool _isLoadingColleges = false;

  @override
  void initState() {
    super.initState();
    _fetchColleges('');
  }

  Future<void> _fetchColleges(String query) async {
    setState(() {
      _isLoadingColleges = true;
      _searchQuery = query.toLowerCase();
    });

    try {
      // Attempt to fetch from Firestore
      final snapshot = await FirebaseFirestore.instance.collection('colleges').get();
      final allColleges = snapshot.docs.map((doc) => doc.data()).toList();
      
      setState(() {
        _filteredColleges = allColleges.where((college) {
          final name = (college['name'] ?? '').toString().toLowerCase();
          final dte = (college['dteCode'] ?? '').toString().toLowerCase();
          return name.contains(_searchQuery) || dte.contains(_searchQuery);
        }).toList();
      });
    } catch (e) {
      // Fallback to mock data if Firestore is not seeded or configured
      final mockList = [
        {'dteCode': '3012', 'name': 'Veermata Jijabai Technological Institute (VJTI)', 'district': 'Mumbai'},
        {'dteCode': '3014', 'name': 'Sardar Patel Institute of Technology (SPIT)', 'district': 'Mumbai'},
        {'dteCode': '6006', 'name': 'College of Engineering Pune (COEP)', 'district': 'Pune'},
        {'dteCode': '6007', 'name': 'Walchand College of Engineering', 'district': 'Sangli'},
        {'dteCode': 'DTE123', 'name': 'UG Engineering College', 'district': 'Mock'},
      ];
      setState(() {
        _filteredColleges = mockList.where((college) {
          final name = college['name']!.toLowerCase();
          final dte = college['dteCode']!.toLowerCase();
          return name.contains(_searchQuery) || dte.contains(_searchQuery);
        }).toList();
      });
    } finally {
      setState(() {
        _isLoadingColleges = false;
      });
    }
  }

  Future<void> _saveAndContinue() async {
    final prefs = await SharedPreferences.getInstance();
    
    // In a real app, tie this to user ID. For now, we store globally.
    await prefs.setString('user_role', widget.isAdmin ? 'Admin' : 'Student');
    await prefs.setString('selected_goal', _selectedGoal);

    if (_selectedGoal == 'higher_ed') {
      await prefs.setString('college_dte', _selectedCollegeDte ?? '');
      await prefs.setString('college_name', _selectedCollegeName ?? '');
      await prefs.setString('branch', _selectedBranch ?? '');
      await prefs.setStringList('competitive_interests', []);
    } else {
      await prefs.remove('college_dte');
      await prefs.remove('college_name');
      await prefs.remove('branch');
      await prefs.setStringList('competitive_interests', _selectedCompetitiveExams);
    }

    if (!mounted) return;
    
    if (widget.isAdmin) {
      Navigator.pushReplacementNamed(context, '/admin_dashboard');
    } else {
      Navigator.pushReplacementNamed(context, '/student_dashboard');
    }
  }

  Widget _buildGoalSelection() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Text('Select Your Primary Goal', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
        const SizedBox(height: 32),
        _buildSelectionCard(
          title: 'Higher Education',
          subtitle: 'BE/BTech, Diploma, Pharmacy, etc.',
          icon: Icons.school,
          isSelected: _selectedGoal == 'higher_ed',
          onTap: () => setState(() => _selectedGoal = 'higher_ed'),
        ),
        const SizedBox(height: 16),
        _buildSelectionCard(
          title: 'Competitive Exams',
          subtitle: 'UPSC, MPSC, Banking, SSC, etc.',
          icon: Icons.assignment,
          isSelected: _selectedGoal == 'competitive',
          onTap: () => setState(() => _selectedGoal = 'competitive'),
        ),
      ],
    );
  }

  Widget _buildCollegeSelection() {
    return Column(
      children: [
        const Text('Select Your College', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
        const SizedBox(height: 16),
        TextField(
          decoration: InputDecoration(
            labelText: 'Search by College Name or DTE Code',
            prefixIcon: const Icon(Icons.search),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
          ),
          onChanged: _fetchColleges,
        ),
        const SizedBox(height: 16),
        Expanded(
          child: _isLoadingColleges 
            ? const Center(child: CircularProgressIndicator())
            : ListView.builder(
                itemCount: _filteredColleges.length,
                itemBuilder: (context, index) {
                  final college = _filteredColleges[index];
                  final isSelected = _selectedCollegeDte == college['dteCode'];
                  return Card(
                    color: isSelected ? Theme.of(context).colorScheme.primaryContainer : null,
                    child: ListTile(
                      title: Text(college['name']),
                      subtitle: Text('DTE: ${college['dteCode']} | District: ${college['district'] ?? "N/A"}'),
                      trailing: isSelected ? const Icon(Icons.check_circle, color: Colors.green) : null,
                      onTap: () {
                        setState(() {
                          _selectedCollegeDte = college['dteCode'];
                          _selectedCollegeName = college['name'];
                        });
                      },
                    ),
                  );
                },
              ),
        ),
      ],
    );
  }

  Widget _buildBranchSelection() {
    return Column(
      children: [
        const Text('Select Your Branch', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
        const SizedBox(height: 16),
        Expanded(
          child: ListView.builder(
            itemCount: _allBranches.length,
            itemBuilder: (context, index) {
              final branch = _allBranches[index];
              final isSelected = _selectedBranch == branch;
              return Card(
                color: isSelected ? Theme.of(context).colorScheme.primaryContainer : null,
                child: ListTile(
                  title: Text(branch),
                  trailing: isSelected ? const Icon(Icons.check_circle, color: Colors.green) : null,
                  onTap: () => setState(() => _selectedBranch = branch),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildCompetitiveSelection() {
    return Column(
      children: [
        const Text('Select Target Exams', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
        const Text('You can select multiple options', style: TextStyle(color: Colors.grey)),
        const SizedBox(height: 16),
        Expanded(
          child: ListView.builder(
            itemCount: _allCompetitiveExams.length,
            itemBuilder: (context, index) {
              final exam = _allCompetitiveExams[index];
              final isSelected = _selectedCompetitiveExams.contains(exam);
              return CheckboxListTile(
                title: Text(exam),
                value: isSelected,
                onChanged: (bool? value) {
                  setState(() {
                    if (value == true) {
                      _selectedCompetitiveExams.add(exam);
                    } else {
                      _selectedCompetitiveExams.remove(exam);
                    }
                  });
                },
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildSelectionCard({required String title, required String subtitle, required IconData icon, required bool isSelected, required VoidCallback onTap}) {
    return InkWell(
      onTap: onTap,
      child: Card(
        color: isSelected ? Theme.of(context).colorScheme.primaryContainer : null,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
          side: BorderSide(color: isSelected ? Theme.of(context).colorScheme.primary : Colors.transparent, width: 2),
        ),
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Row(
            children: [
              Icon(icon, size: 40, color: isSelected ? Theme.of(context).colorScheme.primary : Colors.grey),
              const SizedBox(width: 20),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 4),
                    Text(subtitle, style: const TextStyle(color: Colors.grey)),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _nextStep() {
    if (_currentStep == 0) {
      if (_selectedGoal.isEmpty) return;
      setState(() => _currentStep = _selectedGoal == 'higher_ed' ? 1 : 3);
    } else if (_currentStep == 1) {
      if (_selectedCollegeDte == null) return;
      setState(() => _currentStep = 2);
    } else if (_currentStep == 2) {
      if (_selectedBranch == null) return;
      _saveAndContinue();
    } else if (_currentStep == 3) {
      if (_selectedCompetitiveExams.isEmpty) return;
      _saveAndContinue();
    }
  }

  void _previousStep() {
    if (_currentStep == 1 || _currentStep == 3) {
      setState(() => _currentStep = 0);
    } else if (_currentStep == 2) {
      setState(() => _currentStep = 1);
    }
  }

  @override
  Widget build(BuildContext context) {
    Widget currentView;
    if (_currentStep == 0) currentView = _buildGoalSelection();
    else if (_currentStep == 1) currentView = _buildCollegeSelection();
    else if (_currentStep == 2) currentView = _buildBranchSelection();
    else currentView = _buildCompetitiveSelection();

    bool canContinue = false;
    if (_currentStep == 0 && _selectedGoal.isNotEmpty) canContinue = true;
    if (_currentStep == 1 && _selectedCollegeDte != null) canContinue = true;
    if (_currentStep == 2 && _selectedBranch != null) canContinue = true;
    if (_currentStep == 3 && _selectedCompetitiveExams.isNotEmpty) canContinue = true;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Setup Your Profile'),
        leading: _currentStep > 0 ? IconButton(icon: const Icon(Icons.arrow_back), onPressed: _previousStep) : null,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            children: [
              Expanded(child: currentView),
              const SizedBox(height: 20),
              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton(
                  onPressed: canContinue ? _nextStep : null,
                  child: Text((_currentStep == 2 || _currentStep == 3) ? 'Finish & Save' : 'Continue'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
