import 'package:flutter/material.dart';
import '../../core/app_theme.dart';
import '../../data/demo_data.dart';

/// BTech folder browser — Branch → Year → Subject → Folder → Files
class BtechScreen extends StatefulWidget {
  const BtechScreen({super.key});

  @override
  State<BtechScreen> createState() => _BtechScreenState();
}

class _BtechScreenState extends State<BtechScreen>
    with SingleTickerProviderStateMixin {
  late TabController _branchTab;

  int _selectedBranchIndex = 0;
  int _selectedYearIndex = 0;

  // Navigation stack: null=subjects, else subject index
  int? _subjectIndex;
  // Folder index within subject
  int? _folderIndex;

  @override
  void initState() {
    super.initState();
    _branchTab = TabController(
      length: DemoData.bTechBranches.length,
      vsync: this,
    );
    _branchTab.addListener(() {
      if (!_branchTab.indexIsChanging) {
        setState(() {
          _selectedBranchIndex = _branchTab.index;
          _selectedYearIndex = 0;
          _subjectIndex = null;
          _folderIndex = null;
        });
      }
    });
  }

  @override
  void dispose() {
    _branchTab.dispose();
    super.dispose();
  }

  Map<String, dynamic> get _currentBranch =>
      DemoData.bTechBranches[_selectedBranchIndex];

  List<dynamic> get _years => _currentBranch['years'];

  Map<String, dynamic> get _currentYear =>
      _years[_selectedYearIndex];

  List<dynamic> get _subjects => _currentYear['subjects'];

  void _back() {
    setState(() {
      if (_folderIndex != null) {
        _folderIndex = null;
      } else if (_subjectIndex != null) {
        _subjectIndex = null;
      }
    });
  }

  bool get _canGoBack => _subjectIndex != null;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final branch = _currentBranch;

    return PopScope(
      canPop: !_canGoBack,
      onPopInvokedWithResult: (didPop, _) {
        if (!didPop && _canGoBack) _back();
      },
      child: Scaffold(
        backgroundColor: isDark ? AppColors.darkBg : AppColors.lightBg,
        appBar: AppBar(
          backgroundColor: isDark ? AppColors.darkCard : Colors.white,
          leading: _canGoBack
              ? IconButton(
                  onPressed: _back,
                  icon: const Icon(Icons.arrow_back_ios_rounded),
                )
              : null,
          title: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('BTech / B.E'),
              if (_subjectIndex != null)
                Text(
                  _folderIndex != null
                      ? _subjects[_subjectIndex!]['folders'][_folderIndex!]['name']
                      : _subjects[_subjectIndex!]['name'],
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w400,
                    color: Colors.grey,
                  ),
                ),
            ],
          ),
          bottom: TabBar(
            controller: _branchTab,
            isScrollable: true,
            tabAlignment: TabAlignment.start,
            labelColor: AppColors.primary,
            unselectedLabelColor: Colors.grey,
            indicatorColor: AppColors.primary,
            labelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
            tabs: DemoData.bTechBranches
                .map((b) => Tab(text: '${b['emoji']} ${b['branch']}'))
                .toList(),
          ),
        ),
        body: Column(
          children: [
            // Year chip selector (only show when browsing subjects)
            if (_subjectIndex == null) ...[
              Container(
                color: isDark ? AppColors.darkCard : Colors.white,
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                child: SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    children: List.generate(_years.length, (i) {
                      final y = _years[i];
                      final selected = _selectedYearIndex == i;
                      return Padding(
                        padding: const EdgeInsets.only(right: 8),
                        child: ChoiceChip(
                          label: Text(y['year']),
                          selected: selected,
                          onSelected: (_) => setState(() {
                            _selectedYearIndex = i;
                            _subjectIndex = null;
                            _folderIndex = null;
                          }),
                          selectedColor: AppColors.primary,
                          labelStyle: TextStyle(
                            color: selected ? Colors.white : null,
                            fontWeight: FontWeight.w600,
                            fontSize: 13,
                          ),
                          backgroundColor: isDark
                              ? const Color(0xFF334155)
                              : const Color(0xFFEFF6FF),
                        ),
                      );
                    }),
                  ),
                ),
              ),
              const Divider(height: 1),
            ],

            // Content area
            Expanded(
              child: _buildContent(isDark, branch),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildContent(bool isDark, Map<String, dynamic> branch) {
    // Level 3: Files within a folder
    if (_folderIndex != null && _subjectIndex != null) {
      final files = _subjects[_subjectIndex!]['folders'][_folderIndex!]['files']
          as List<dynamic>;
      return _FileList(files: files, isDark: isDark);
    }

    // Level 2: Folders within a subject
    if (_subjectIndex != null) {
      final folders = _subjects[_subjectIndex!]['folders'] as List<dynamic>;
      return ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: folders.length,
        itemBuilder: (ctx, i) {
          final folder = folders[i];
          final fileCount = (folder['files'] as List).length;
          return _FolderTile(
            name: folder['name'],
            fileCount: fileCount,
            isDark: isDark,
            onTap: () => setState(() => _folderIndex = i),
          );
        },
      );
    }

    // Level 1: Subjects list
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: _subjects.length,
      itemBuilder: (ctx, i) {
        final subject = _subjects[i];
        final folderCount = (subject['folders'] as List).length;
        return _SubjectTile(
          name: subject['name'],
          code: subject['code'],
          folderCount: folderCount,
          branchColor: Color(branch['colorHex']),
          isDark: isDark,
          onTap: () => setState(() {
            _subjectIndex = i;
            _folderIndex = null;
          }),
        );
      },
    );
  }
}

// ─── Subject Tile ───────────────────────────────────────────────────────────
class _SubjectTile extends StatelessWidget {
  final String name;
  final String code;
  final int folderCount;
  final Color branchColor;
  final bool isDark;
  final VoidCallback onTap;

  const _SubjectTile({
    required this.name,
    required this.code,
    required this.folderCount,
    required this.branchColor,
    required this.isDark,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      child: ListTile(
        onTap: onTap,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(14),
          side: BorderSide(
            color: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0),
          ),
        ),
        tileColor: isDark ? AppColors.darkCard : Colors.white,
        leading: Container(
          width: 46,
          height: 46,
          decoration: BoxDecoration(
            color: branchColor.withOpacity(0.12),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Center(
            child: Icon(Icons.menu_book_rounded, color: branchColor, size: 24),
          ),
        ),
        title: Text(
          name,
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 14,
            color: isDark ? Colors.white : Colors.black87,
          ),
        ),
        subtitle: Text(
          '$code • $folderCount Units',
          style: TextStyle(
            fontSize: 12,
            color: isDark ? Colors.grey.shade400 : Colors.grey.shade500,
          ),
        ),
        trailing: const Icon(Icons.chevron_right_rounded),
      ),
    );
  }
}

// ─── Folder Tile ────────────────────────────────────────────────────────────
class _FolderTile extends StatelessWidget {
  final String name;
  final int fileCount;
  final bool isDark;
  final VoidCallback onTap;

  const _FolderTile({
    required this.name,
    required this.fileCount,
    required this.isDark,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      child: ListTile(
        onTap: onTap,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(14),
          side: BorderSide(
            color: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0),
          ),
        ),
        tileColor: isDark ? AppColors.darkCard : Colors.white,
        leading: Container(
          width: 46,
          height: 46,
          decoration: BoxDecoration(
            color: const Color(0xFFF59E0B).withOpacity(0.12),
            borderRadius: BorderRadius.circular(12),
          ),
          child: const Center(
            child: Icon(Icons.folder_rounded, color: Color(0xFFF59E0B), size: 26),
          ),
        ),
        title: Text(
          name,
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 14,
            color: isDark ? Colors.white : Colors.black87,
          ),
        ),
        subtitle: Text(
          '$fileCount ${fileCount == 1 ? 'file' : 'files'}',
          style: TextStyle(
            fontSize: 12,
            color: isDark ? Colors.grey.shade400 : Colors.grey.shade500,
          ),
        ),
        trailing: const Icon(Icons.chevron_right_rounded),
      ),
    );
  }
}

// ─── File List ──────────────────────────────────────────────────────────────
class _FileList extends StatefulWidget {
  final List<dynamic> files;
  final bool isDark;

  const _FileList({required this.files, required this.isDark});

  @override
  State<_FileList> createState() => _FileListState();
}

class _FileListState extends State<_FileList> {
  final Set<int> _downloading = {};
  final Set<int> _downloaded = {};

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: widget.files.length,
      itemBuilder: (ctx, i) {
        final file = widget.files[i];
        final isVideo = file['type'] == 'video';
        final isDownloaded = _downloaded.contains(i);
        final isDownloading = _downloading.contains(i);

        return Container(
          margin: const EdgeInsets.only(bottom: 10),
          decoration: BoxDecoration(
            color: widget.isDark ? AppColors.darkCard : Colors.white,
            borderRadius: BorderRadius.circular(14),
            border: Border.all(
              color: widget.isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0),
            ),
          ),
          child: ListTile(
            leading: Container(
              width: 46,
              height: 46,
              decoration: BoxDecoration(
                color: isVideo
                    ? Colors.red.withOpacity(0.1)
                    : AppColors.primary.withOpacity(0.08),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(
                isVideo ? Icons.video_file_rounded : Icons.picture_as_pdf_rounded,
                color: isVideo ? Colors.red : AppColors.primary,
                size: 24,
              ),
            ),
            title: Text(
              file['name'],
              style: TextStyle(
                fontWeight: FontWeight.w600,
                fontSize: 14,
                color: widget.isDark ? Colors.white : Colors.black87,
              ),
            ),
            subtitle: Text(
              '${file['size']}${file['pages'] > 0 ? ' • ${file['pages']} pages' : ''}',
              style: TextStyle(
                fontSize: 12,
                color: widget.isDark ? Colors.grey.shade400 : Colors.grey.shade500,
              ),
            ),
            trailing: isDownloaded
                ? const Icon(Icons.check_circle_rounded,
                    color: AppColors.success, size: 22)
                : isDownloading
                    ? const SizedBox(
                        width: 22,
                        height: 22,
                        child: CircularProgressIndicator(strokeWidth: 2.5),
                      )
                    : IconButton(
                        onPressed: () async {
                          setState(() => _downloading.add(i));
                          await Future.delayed(const Duration(milliseconds: 1200));
                          if (mounted) {
                            setState(() {
                              _downloading.remove(i);
                              _downloaded.add(i);
                            });
                          }
                        },
                        icon: const Icon(Icons.download_rounded),
                        color: AppColors.secondary,
                      ),
            onTap: () => _showFileViewer(context, file),
          ),
        );
      },
    );
  }

  void _showFileViewer(BuildContext context, Map<String, dynamic> file) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => _FileViewerSheet(file: file),
    );
  }
}

class _FileViewerSheet extends StatelessWidget {
  final Map<String, dynamic> file;
  const _FileViewerSheet({required this.file});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final isVideo = file['type'] == 'video';
    return Container(
      height: MediaQuery.of(context).size.height * 0.6,
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : Colors.white,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: Column(
        children: [
          const SizedBox(height: 8),
          Container(
            width: 40,
            height: 4,
            decoration: BoxDecoration(
              color: Colors.grey.shade300,
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          const SizedBox(height: 20),
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: isVideo
                  ? Colors.red.withOpacity(0.1)
                  : AppColors.primary.withOpacity(0.08),
              shape: BoxShape.circle,
            ),
            child: Icon(
              isVideo ? Icons.play_circle_rounded : Icons.picture_as_pdf_rounded,
              color: isVideo ? Colors.red : AppColors.primary,
              size: 48,
            ),
          ),
          const SizedBox(height: 16),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24),
            child: Text(
              file['name'],
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: isDark ? Colors.white : Colors.black87,
              ),
              textAlign: TextAlign.center,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            '${file['size']}${file['pages'] > 0 ? ' • ${file['pages']} pages' : ''}',
            style: TextStyle(color: Colors.grey.shade500),
          ),
          const Spacer(),
          Padding(
            padding: const EdgeInsets.all(24),
            child: Row(
              children: [
                Expanded(
                  child: OutlinedButton.icon(
                    onPressed: () => Navigator.pop(context),
                    icon: const Icon(Icons.bookmark_add_outlined),
                    label: const Text('Bookmark'),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: FilledButton.icon(
                    onPressed: () => Navigator.pop(context),
                    icon: const Icon(Icons.open_in_new_rounded),
                    label: const Text('Open'),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
