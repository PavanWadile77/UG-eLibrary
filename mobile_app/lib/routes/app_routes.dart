import 'package:flutter/material.dart';
import '../screens/splash_screen.dart';
import '../screens/login_screen.dart';
import '../screens/student_dashboard.dart';
import '../screens/admin_dashboard.dart';
import '../screens/btech_screen.dart';
import '../screens/upsc_screen.dart';
import '../screens/profile_screen.dart';

import '../screens/extra_screens.dart';
import '../screens/selection_onboarding_screen.dart';

class AppRoutes {
  static Route<dynamic> onGenerateRoute(RouteSettings settings) {
    switch (settings.name) {
      case '/':
        return MaterialPageRoute(builder: (_) => const SplashScreen());
      case '/login':
        return MaterialPageRoute(builder: (_) => const LoginScreen());
      case '/select_college':
        final isAdmin = settings.arguments as bool? ?? false;
        return MaterialPageRoute(builder: (_) => SelectionOnboardingScreen(isAdmin: isAdmin));
      case '/student_dashboard':
        return MaterialPageRoute(builder: (_) => const StudentDashboard());
      case '/admin_dashboard':
        return MaterialPageRoute(builder: (_) => const AdminDashboard());
      case '/btech':
        return MaterialPageRoute(builder: (_) => const BtechScreen());
      case '/upsc':
        return MaterialPageRoute(builder: (_) => const UpscScreen());
      case '/profile':
        return MaterialPageRoute(builder: (_) => const ProfileScreen());
      case '/history':
        return MaterialPageRoute(builder: (_) => const HistoryScreen());
      case '/bookmarks':
        return MaterialPageRoute(builder: (_) => const BookmarksScreen());
      case '/notifications':
        return MaterialPageRoute(builder: (_) => const NotificationsScreen());
      case '/search':
        return MaterialPageRoute(builder: (_) => const SearchScreen());
      case '/downloads':
        return MaterialPageRoute(builder: (_) => const DownloadsScreen());
      default:
        return MaterialPageRoute(          builder: (_) => Scaffold(
            body: Center(
              child: Text('No route defined for ${settings.name}'),
            ),
          ),
        );
    }
  }
}
