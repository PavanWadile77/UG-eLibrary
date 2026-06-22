class DemoData {
  // ─── Student Profile ───────────────────────────────────────────────────────
  static const String studentName = 'Rahul Patil';
  static const String studentEmail = 'rahul.patil@coep.ac.in';
  static const String studentCollege = 'College of Engineering, Pune (COEP)';
  static const String studentBranch = 'Computer Engineering';
  static const String studentYear = 'Second Year';
  static const String studentDteCode = '6006';
  static const String adminName = 'Dr. Sunita Joshi';
  static const String adminEmail = 'admin@ugelibrary.edu.in';

  // ─── BTech Structure ───────────────────────────────────────────────────────
  static const List<Map<String, dynamic>> bTechBranches = [
    {
      'branch': 'Computer Engineering',
      'emoji': '💻',
      'colorHex': 0xFF1E3A8A,
      'years': [
        {
          'year': 'First Year',
          'subjects': [
            {
              'name': 'Mathematics-I',
              'code': 'BS 101',
              'folders': [
                {
                  'name': 'Unit 1 – Matrices & Linear Algebra',
                  'files': [
                    {'name': 'Lecture Notes.pdf', 'type': 'pdf', 'size': '1.2 MB', 'pages': 45},
                    {'name': 'Practice Problems.pdf', 'type': 'pdf', 'size': '0.8 MB', 'pages': 20},
                    {'name': 'Previous Year Questions.pdf', 'type': 'pdf', 'size': '0.5 MB', 'pages': 12},
                  ]
                },
                {
                  'name': 'Unit 2 – Differential Calculus',
                  'files': [
                    {'name': 'Handwritten Notes.pdf', 'type': 'pdf', 'size': '2.1 MB', 'pages': 68},
                    {'name': 'Video Lecture 1.mp4', 'type': 'video', 'size': '128 MB', 'pages': 0},
                  ]
                },
                {
                  'name': 'Unit 3 – Integral Calculus',
                  'files': [
                    {'name': 'Summary Notes.pdf', 'type': 'pdf', 'size': '1.5 MB', 'pages': 38},
                    {'name': 'Formula Sheet.pdf', 'type': 'pdf', 'size': '0.3 MB', 'pages': 4},
                  ]
                }
              ]
            },
            {
              'name': 'Physics',
              'code': 'BS 102',
              'folders': [
                {
                  'name': 'Unit 1 – Mechanics',
                  'files': [
                    {'name': 'Mechanics Notes.pdf', 'type': 'pdf', 'size': '1.8 MB', 'pages': 55},
                    {'name': 'Lab Manual.pdf', 'type': 'pdf', 'size': '0.9 MB', 'pages': 28},
                  ]
                },
                {
                  'name': 'Unit 2 – Optics & Waves',
                  'files': [
                    {'name': 'Optics Lecture.pdf', 'type': 'pdf', 'size': '1.4 MB', 'pages': 42},
                    {'name': 'Experiment Reports.pdf', 'type': 'pdf', 'size': '0.6 MB', 'pages': 18},
                  ]
                }
              ]
            },
            {
              'name': 'Programming in C',
              'code': 'CS 101',
              'folders': [
                {
                  'name': 'Unit 1 – Fundamentals',
                  'files': [
                    {'name': 'C Programming Basics.pdf', 'type': 'pdf', 'size': '2.5 MB', 'pages': 78},
                    {'name': 'Lab Programs.pdf', 'type': 'pdf', 'size': '1.1 MB', 'pages': 35},
                  ]
                },
                {
                  'name': 'Unit 2 – Arrays & Strings',
                  'files': [
                    {'name': 'Arrays Notes.pdf', 'type': 'pdf', 'size': '1.6 MB', 'pages': 48},
                  ]
                }
              ]
            },
          ]
        },
        {
          'year': 'Second Year',
          'subjects': [
            {
              'name': 'Data Structures',
              'code': 'CS 201',
              'folders': [
                {
                  'name': 'Unit 1 – Arrays & Strings',
                  'files': [
                    {'name': 'DS Unit 1 Notes.pdf', 'type': 'pdf', 'size': '2.2 MB', 'pages': 62},
                    {'name': 'Array Programs.pdf', 'type': 'pdf', 'size': '0.7 MB', 'pages': 22},
                  ]
                },
                {
                  'name': 'Unit 2 – Linked Lists',
                  'files': [
                    {'name': 'Linked List Notes.pdf', 'type': 'pdf', 'size': '1.9 MB', 'pages': 58},
                    {'name': 'Linked List Video.mp4', 'type': 'video', 'size': '95 MB', 'pages': 0},
                  ]
                },
                {
                  'name': 'Unit 3 – Trees & Graphs',
                  'files': [
                    {'name': 'Trees Notes.pdf', 'type': 'pdf', 'size': '3.1 MB', 'pages': 92},
                    {'name': 'Graph Algorithms.pdf', 'type': 'pdf', 'size': '2.4 MB', 'pages': 72},
                  ]
                }
              ]
            },
            {
              'name': 'Digital Electronics',
              'code': 'EC 201',
              'folders': [
                {
                  'name': 'Unit 1 – Logic Gates',
                  'files': [
                    {'name': 'Logic Gates Notes.pdf', 'type': 'pdf', 'size': '1.6 MB', 'pages': 48},
                    {'name': 'Gate Circuit Problems.pdf', 'type': 'pdf', 'size': '0.9 MB', 'pages': 27},
                  ]
                },
                {
                  'name': 'Unit 2 – Flip Flops & Counters',
                  'files': [
                    {'name': 'Flip Flop Notes.pdf', 'type': 'pdf', 'size': '2.0 MB', 'pages': 60},
                  ]
                }
              ]
            },
          ]
        },
        {
          'year': 'Third Year',
          'subjects': [
            {
              'name': 'Computer Networks',
              'code': 'CS 301',
              'folders': [
                {
                  'name': 'Unit 1 – OSI Model & Layers',
                  'files': [
                    {'name': 'OSI Model Notes.pdf', 'type': 'pdf', 'size': '2.0 MB', 'pages': 60},
                    {'name': 'TCP IP Protocols.pdf', 'type': 'pdf', 'size': '1.7 MB', 'pages': 51},
                  ]
                },
                {
                  'name': 'Unit 2 – Routing Algorithms',
                  'files': [
                    {'name': 'Routing Notes.pdf', 'type': 'pdf', 'size': '1.5 MB', 'pages': 45},
                  ]
                }
              ]
            },
            {
              'name': 'Database Management',
              'code': 'CS 302',
              'folders': [
                {
                  'name': 'Unit 1 – ER Diagram & SQL',
                  'files': [
                    {'name': 'DBMS Notes.pdf', 'type': 'pdf', 'size': '2.8 MB', 'pages': 84},
                    {'name': 'SQL Practice.pdf', 'type': 'pdf', 'size': '1.2 MB', 'pages': 36},
                  ]
                }
              ]
            }
          ]
        },
        {
          'year': 'Final Year',
          'subjects': [
            {
              'name': 'Machine Learning',
              'code': 'CS 401',
              'folders': [
                {
                  'name': 'Unit 1 – Supervised Learning',
                  'files': [
                    {'name': 'ML Lecture Notes.pdf', 'type': 'pdf', 'size': '4.2 MB', 'pages': 126},
                    {'name': 'Python ML Notebooks.pdf', 'type': 'pdf', 'size': '1.3 MB', 'pages': 40},
                  ]
                },
                {
                  'name': 'Unit 2 – Neural Networks',
                  'files': [
                    {'name': 'Deep Learning Notes.pdf', 'type': 'pdf', 'size': '5.1 MB', 'pages': 153},
                  ]
                }
              ]
            },
            {
              'name': 'Cloud Computing',
              'code': 'CS 402',
              'folders': [
                {
                  'name': 'Unit 1 – Cloud Architecture',
                  'files': [
                    {'name': 'Cloud Concepts.pdf', 'type': 'pdf', 'size': '2.6 MB', 'pages': 78},
                    {'name': 'AWS Lab Guide.pdf', 'type': 'pdf', 'size': '1.9 MB', 'pages': 57},
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      'branch': 'Mechanical Engineering',
      'emoji': '⚙️',
      'colorHex': 0xFF7C3AED,
      'years': [
        {
          'year': 'First Year',
          'subjects': [
            {
              'name': 'Engineering Drawing',
              'code': 'ME 101',
              'folders': [
                {
                  'name': 'Unit 1 – Orthographic Projections',
                  'files': [
                    {'name': 'Drawing Manual.pdf', 'type': 'pdf', 'size': '3.5 MB', 'pages': 105},
                    {'name': 'Practice Sheets.pdf', 'type': 'pdf', 'size': '2.0 MB', 'pages': 60},
                  ]
                }
              ]
            },
            {
              'name': 'Thermodynamics',
              'code': 'ME 102',
              'folders': [
                {
                  'name': 'Unit 1 – Laws of Thermodynamics',
                  'files': [
                    {'name': 'Thermo Notes.pdf', 'type': 'pdf', 'size': '2.3 MB', 'pages': 70},
                  ]
                }
              ]
            }
          ]
        },
        {
          'year': 'Second Year',
          'subjects': [
            {
              'name': 'Fluid Mechanics',
              'code': 'ME 201',
              'folders': [
                {
                  'name': 'Unit 1 – Fluid Properties',
                  'files': [
                    {'name': 'Fluid Mechanics Notes.pdf', 'type': 'pdf', 'size': '2.7 MB', 'pages': 81},
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      'branch': 'Civil Engineering',
      'emoji': '🏗️',
      'colorHex': 0xFF0D9488,
      'years': [
        {
          'year': 'First Year',
          'subjects': [
            {
              'name': 'Surveying',
              'code': 'CE 101',
              'folders': [
                {
                  'name': 'Unit 1 – Chain Surveying',
                  'files': [
                    {'name': 'Surveying Notes.pdf', 'type': 'pdf', 'size': '1.9 MB', 'pages': 58},
                    {'name': 'Lab Manual.pdf', 'type': 'pdf', 'size': '1.1 MB', 'pages': 33},
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      'branch': 'Electronics & Telecom',
      'emoji': '📡',
      'colorHex': 0xFFDC2626,
      'years': [
        {
          'year': 'First Year',
          'subjects': [
            {
              'name': 'Basic Electronics',
              'code': 'ET 101',
              'folders': [
                {
                  'name': 'Unit 1 – Semiconductor Devices',
                  'files': [
                    {'name': 'Electronics Notes.pdf', 'type': 'pdf', 'size': '2.1 MB', 'pages': 63},
                    {'name': 'Diode Circuits.pdf', 'type': 'pdf', 'size': '1.4 MB', 'pages': 42},
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      'branch': 'AI & Data Science',
      'emoji': '🤖',
      'colorHex': 0xFF0891B2,
      'years': [
        {
          'year': 'First Year',
          'subjects': [
            {
              'name': 'Python Programming',
              'code': 'AI 101',
              'folders': [
                {
                  'name': 'Unit 1 – Python Basics',
                  'files': [
                    {'name': 'Python Notes.pdf', 'type': 'pdf', 'size': '2.8 MB', 'pages': 84},
                    {'name': 'Jupyter Notebooks Guide.pdf', 'type': 'pdf', 'size': '1.5 MB', 'pages': 45},
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  // ─── UPSC Categories ───────────────────────────────────────────────────────
  static const List<Map<String, dynamic>> upscCategories = [
    {
      'name': 'History',
      'emoji': '🏛️',
      'colorHex': 0xFFB45309,
      'desc': 'Ancient, Medieval, Modern & World History',
      'files': [
        {'name': 'Ancient India – Indus Valley Civilization.pdf', 'size': '3.2 MB', 'pages': 96},
        {'name': 'Mughal Empire & Delhi Sultanate.pdf', 'size': '2.8 MB', 'pages': 84},
        {'name': 'Indian Independence Movement.pdf', 'size': '4.1 MB', 'pages': 123},
        {'name': 'World War I & II Summary.pdf', 'size': '2.5 MB', 'pages': 75},
        {'name': 'Modern Indian History Notes.pdf', 'size': '3.5 MB', 'pages': 105},
      ]
    },
    {
      'name': 'Geography',
      'emoji': '🌍',
      'colorHex': 0xFF059669,
      'desc': 'Physical, Indian, World & Economic Geography',
      'files': [
        {'name': 'Physical Geography Complete Notes.pdf', 'size': '4.5 MB', 'pages': 135},
        {'name': 'Indian Rivers, Mountains & Passes.pdf', 'size': '2.1 MB', 'pages': 63},
        {'name': 'Climate, Monsoon & Seasons.pdf', 'size': '1.8 MB', 'pages': 54},
        {'name': 'Economic Geography of India.pdf', 'size': '3.0 MB', 'pages': 90},
        {'name': 'World Geography Atlas Notes.pdf', 'size': '2.7 MB', 'pages': 81},
      ]
    },
    {
      'name': 'Polity',
      'emoji': '🏛️',
      'colorHex': 0xFF1D4ED8,
      'desc': 'Constitution, Parliament, Judiciary & Governance',
      'files': [
        {'name': 'Indian Constitution – Complete Notes.pdf', 'size': '5.2 MB', 'pages': 156},
        {'name': 'Parliament – Structure & Functions.pdf', 'size': '1.9 MB', 'pages': 57},
        {'name': 'Fundamental Rights & DPSP.pdf', 'size': '2.4 MB', 'pages': 72},
        {'name': 'Supreme Court & High Courts.pdf', 'size': '1.6 MB', 'pages': 48},
        {'name': 'Local Self Governance – 73rd & 74th Amendment.pdf', 'size': '1.3 MB', 'pages': 39},
      ]
    },
    {
      'name': 'Economy',
      'emoji': '📈',
      'colorHex': 0xFF7C3AED,
      'desc': 'Micro, Macro, Indian Economy & Trade',
      'files': [
        {'name': 'Indian Economy – Complete Overview.pdf', 'size': '4.8 MB', 'pages': 144},
        {'name': 'Five Year Plans & NITI Aayog.pdf', 'size': '2.2 MB', 'pages': 66},
        {'name': 'Monetary Policy & RBI Functions.pdf', 'size': '1.7 MB', 'pages': 51},
        {'name': 'International Trade & WTO.pdf', 'size': '2.9 MB', 'pages': 87},
        {'name': 'Budget, Taxation & Fiscal Policy.pdf', 'size': '2.1 MB', 'pages': 63},
      ]
    },
    {
      'name': 'Environment',
      'emoji': '🌿',
      'colorHex': 0xFF16A34A,
      'desc': 'Ecology, Climate Change & Biodiversity',
      'files': [
        {'name': 'Ecology & Ecosystems Basics.pdf', 'size': '3.1 MB', 'pages': 93},
        {'name': 'Climate Change & Global Warming.pdf', 'size': '2.6 MB', 'pages': 78},
        {'name': 'Biodiversity & Conservation.pdf', 'size': '1.9 MB', 'pages': 57},
        {'name': 'Environmental Laws & Acts.pdf', 'size': '1.4 MB', 'pages': 42},
      ]
    },
    {
      'name': 'Science & Tech',
      'emoji': '🔬',
      'colorHex': 0xFF0284C7,
      'desc': 'Physics, Biology, Space & Technology',
      'files': [
        {'name': 'Nuclear Technology & Energy.pdf', 'size': '2.3 MB', 'pages': 69},
        {'name': 'ISRO Space Research Missions.pdf', 'size': '1.8 MB', 'pages': 54},
        {'name': 'Biotechnology & Genetic Engineering.pdf', 'size': '2.7 MB', 'pages': 81},
        {'name': 'Defence Technology of India.pdf', 'size': '1.5 MB', 'pages': 45},
      ]
    },
    {
      'name': 'Ethics (GS4)',
      'emoji': '⚖️',
      'colorHex': 0xFFD97706,
      'desc': 'Integrity, Aptitude & Case Studies',
      'files': [
        {'name': 'Ethics, Integrity & Aptitude Notes.pdf', 'size': '3.4 MB', 'pages': 102},
        {'name': 'Case Studies for GS Paper 4.pdf', 'size': '2.1 MB', 'pages': 63},
        {'name': 'Emotional Intelligence Notes.pdf', 'size': '1.2 MB', 'pages': 36},
      ]
    },
    {
      'name': 'CSAT',
      'emoji': '🧮',
      'colorHex': 0xFFE11D48,
      'desc': 'Maths, Reasoning, English & Decision Making',
      'files': [
        {'name': 'CSAT Maths – Practice Sets.pdf', 'size': '4.0 MB', 'pages': 120},
        {'name': 'Logical Reasoning – Complete Guide.pdf', 'size': '2.8 MB', 'pages': 84},
        {'name': 'English Comprehension Passages.pdf', 'size': '1.5 MB', 'pages': 45},
        {'name': 'Mock Test Paper 1 with Solutions.pdf', 'size': '0.8 MB', 'pages': 24},
        {'name': 'Mock Test Paper 2 with Solutions.pdf', 'size': '0.8 MB', 'pages': 24},
      ]
    }
  ];

  // ─── History (Recently Viewed) ─────────────────────────────────────────────
  static final List<Map<String, dynamic>> historyItems = [
    {
      'title': 'DS Unit 1 Notes.pdf',
      'subtitle': 'Data Structures › Unit 1 – Arrays & Strings',
      'type': 'pdf',
      'size': '2.2 MB',
      'viewedAgo': '2 hours ago',
    },
    {
      'title': 'Ancient India – Indus Valley Civilization.pdf',
      'subtitle': 'UPSC › History › Ancient India',
      'type': 'pdf',
      'size': '3.2 MB',
      'viewedAgo': '5 hours ago',
    },
    {
      'title': 'Indian Constitution – Complete Notes.pdf',
      'subtitle': 'UPSC › Polity › Constitution',
      'type': 'pdf',
      'size': '5.2 MB',
      'viewedAgo': '1 day ago',
    },
    {
      'title': 'Linked List Video.mp4',
      'subtitle': 'Data Structures › Unit 2 – Linked Lists',
      'type': 'video',
      'size': '95 MB',
      'viewedAgo': '1 day ago',
    },
    {
      'title': 'C Programming Basics.pdf',
      'subtitle': 'Programming in C › Unit 1 – Fundamentals',
      'type': 'pdf',
      'size': '2.5 MB',
      'viewedAgo': '2 days ago',
    },
    {
      'title': 'OSI Model Notes.pdf',
      'subtitle': 'Computer Networks › Unit 1 – OSI Model',
      'type': 'pdf',
      'size': '2.0 MB',
      'viewedAgo': '2 days ago',
    },
    {
      'title': 'Indian Economy – Complete Overview.pdf',
      'subtitle': 'UPSC › Economy › Indian Economy',
      'type': 'pdf',
      'size': '4.8 MB',
      'viewedAgo': '3 days ago',
    },
    {
      'title': 'ML Lecture Notes.pdf',
      'subtitle': 'Machine Learning › Unit 1 – Supervised Learning',
      'type': 'pdf',
      'size': '4.2 MB',
      'viewedAgo': '4 days ago',
    },
    {
      'title': 'Physical Geography Complete Notes.pdf',
      'subtitle': 'UPSC › Geography › Physical Geography',
      'type': 'pdf',
      'size': '4.5 MB',
      'viewedAgo': '5 days ago',
    },
    {
      'title': 'Logic Gates Notes.pdf',
      'subtitle': 'Digital Electronics › Unit 1 – Logic Gates',
      'type': 'pdf',
      'size': '1.6 MB',
      'viewedAgo': '6 days ago',
    },
  ];

  // ─── Bookmarks ─────────────────────────────────────────────────────────────
  static final List<Map<String, dynamic>> bookmarks = [
    {
      'title': 'Indian Constitution – Complete Notes.pdf',
      'subtitle': 'UPSC › Polity',
      'type': 'pdf',
      'size': '5.2 MB',
      'savedAgo': '1 day ago',
    },
    {
      'title': 'Physical Geography Complete Notes.pdf',
      'subtitle': 'UPSC › Geography',
      'type': 'pdf',
      'size': '4.5 MB',
      'savedAgo': '2 days ago',
    },
    {
      'title': 'DS Unit 1 Notes.pdf',
      'subtitle': 'Data Structures › Unit 1',
      'type': 'pdf',
      'size': '2.2 MB',
      'savedAgo': '3 days ago',
    },
    {
      'title': 'ML Lecture Notes.pdf',
      'subtitle': 'Machine Learning › Unit 1',
      'type': 'pdf',
      'size': '4.2 MB',
      'savedAgo': '5 days ago',
    },
    {
      'title': 'Indian Economy – Complete Overview.pdf',
      'subtitle': 'UPSC › Economy',
      'type': 'pdf',
      'size': '4.8 MB',
      'savedAgo': '6 days ago',
    },
    {
      'title': 'CSAT Maths – Practice Sets.pdf',
      'subtitle': 'UPSC › CSAT',
      'type': 'pdf',
      'size': '4.0 MB',
      'savedAgo': '7 days ago',
    },
  ];

  // ─── Admin Stats ───────────────────────────────────────────────────────────
  static const Map<String, dynamic> adminStats = {
    'totalFiles': 48,
    'totalFolders': 24,
    'totalStudents': 312,
    'totalBranches': 5,
    'recentUploads': 7,
  };
}
