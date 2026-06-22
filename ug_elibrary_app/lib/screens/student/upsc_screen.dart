import 'package:flutter/material.dart';
import '../../core/app_theme.dart';
import '../../data/demo_data.dart';

class UpscScreen extends StatefulWidget {
  const UpscScreen({super.key});

  @override
  State<UpscScreen> createState() => _UpscScreenState();
}

class _UpscScreenState extends State<UpscScreen> {
  int? _selectedCategory;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return PopScope(
      canPop: _selectedCategory == null,
      onPopInvokedWithResult: (didPop, _) {
        if (!didPop) setState(() => _selectedCategory = null);
      },
      child: Scaffold(
        backgroundColor: isDark ? AppColors.darkBg : AppColors.lightBg,
        appBar: AppBar(
          backgroundColor: isDark ? AppColors.darkCard : Colors.white,
          leading: _selectedCategory != null
              ? IconButton(
                  onPressed: () => setState(() => _selectedCategory = null),
                  icon: const Icon(Icons.arrow_back_ios_rounded),
                )
              : null,
          title: Text(
            _selectedCategory != null
                ? DemoData.upscCategories[_selectedCategory!]['name']
                : 'UPSC Preparation',
          ),
          actions: [
            IconButton(
              icon: const Icon(Icons.search_rounded),
              onPressed: () => _showSearch(context, isDark),
            ),
          ],
        ),
        body: _selectedCategory == null
            ? _buildCategoryGrid(isDark)
            : _buildFileList(isDark),
      ),
    );
  }

  Widget _buildCategoryGrid(bool isDark) {
    return CustomScrollView(
      slivers: [
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
            child: Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF7C3AED), Color(0xFF4F46E5)],
                ),
                borderRadius: BorderRadius.circular(18),
              ),
              child: const Row(
                children: [
                  Icon(Icons.military_tech_rounded, color: Colors.white, size: 32),
                  SizedBox(width: 12),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'UPSC Civil Services',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 17,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(
                        '8 Subjects • 35+ Study Materials',
                        style: TextStyle(color: Colors.white70, fontSize: 13),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
        SliverPadding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          sliver: SliverGrid(
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              childAspectRatio: 1.15,
              crossAxisSpacing: 12,
              mainAxisSpacing: 12,
            ),
            delegate: SliverChildBuilderDelegate(
              (ctx, i) {
                final cat = DemoData.upscCategories[i];
                final color = Color(cat['colorHex']);
                final fileCount = (cat['files'] as List).length;
                return GestureDetector(
                  onTap: () => setState(() => _selectedCategory = i),
                  child: Container(
                    decoration: BoxDecoration(
                      color: isDark ? AppColors.darkCard : Colors.white,
                      borderRadius: BorderRadius.circular(18),
                      border: Border.all(
                        color: isDark
                            ? const Color(0xFF334155)
                            : const Color(0xFFE2E8F0),
                      ),
                    ),
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          padding: const EdgeInsets.all(10),
                          decoration: BoxDecoration(
                            color: color.withOpacity(0.12),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            cat['emoji'],
                            style: const TextStyle(fontSize: 24),
                          ),
                        ),
                        const Spacer(),
                        Text(
                          cat['name'],
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 14,
                            color: isDark ? Colors.white : Colors.black87,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          '$fileCount files',
                          style: TextStyle(
                            fontSize: 12,
                            color: isDark
                                ? Colors.grey.shade400
                                : Colors.grey.shade500,
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
              childCount: DemoData.upscCategories.length,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildFileList(bool isDark) {
    final cat = DemoData.upscCategories[_selectedCategory!];
    final files = cat['files'] as List<dynamic>;

    return Column(
      children: [
        // Category info banner
        Container(
          margin: const EdgeInsets.all(16),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Color(cat['colorHex']).withOpacity(0.1),
            borderRadius: BorderRadius.circular(14),
            border: Border.all(
              color: Color(cat['colorHex']).withOpacity(0.2),
            ),
          ),
          child: Row(
            children: [
              Text(cat['emoji'], style: const TextStyle(fontSize: 28)),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      cat['name'],
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                        color: isDark ? Colors.white : Colors.black87,
                      ),
                    ),
                    Text(
                      cat['desc'],
                      style: TextStyle(
                        fontSize: 12,
                        color: isDark ? Colors.grey.shade400 : Colors.grey.shade600,
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: Color(cat['colorHex']),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  '${files.length} files',
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ],
          ),
        ),

        // Files list
        Expanded(
          child: ListView.builder(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
            itemCount: files.length,
            itemBuilder: (ctx, i) {
              final file = files[i];
              return _UpscFileTile(
                file: file,
                accentColor: Color(cat['colorHex']),
                isDark: isDark,
              );
            },
          ),
        ),
      ],
    );
  }

  void _showSearch(BuildContext context, bool isDark) {
    showSearch(
      context: context,
      delegate: _UpscSearchDelegate(isDark: isDark),
    );
  }
}

class _UpscFileTile extends StatefulWidget {
  final Map<String, dynamic> file;
  final Color accentColor;
  final bool isDark;

  const _UpscFileTile({
    required this.file,
    required this.accentColor,
    required this.isDark,
  });

  @override
  State<_UpscFileTile> createState() => _UpscFileTileState();
}

class _UpscFileTileState extends State<_UpscFileTile> {
  bool _bookmarked = false;

  @override
  Widget build(BuildContext context) {
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
            color: widget.accentColor.withOpacity(0.1),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Icon(
            Icons.picture_as_pdf_rounded,
            color: widget.accentColor,
            size: 24,
          ),
        ),
        title: Text(
          widget.file['name'],
          style: TextStyle(
            fontWeight: FontWeight.w600,
            fontSize: 14,
            color: widget.isDark ? Colors.white : Colors.black87,
          ),
        ),
        subtitle: Text(
          '${widget.file['size']} • ${widget.file['pages']} pages',
          style: TextStyle(
            fontSize: 12,
            color: widget.isDark ? Colors.grey.shade400 : Colors.grey.shade500,
          ),
        ),
        trailing: IconButton(
          onPressed: () => setState(() => _bookmarked = !_bookmarked),
          icon: Icon(
            _bookmarked ? Icons.bookmark_rounded : Icons.bookmark_outline_rounded,
            color: _bookmarked ? AppColors.accent : Colors.grey,
            size: 22,
          ),
        ),
        onTap: () => ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Opening ${widget.file['name']}...'),
            behavior: SnackBarBehavior.floating,
            duration: const Duration(seconds: 2),
          ),
        ),
      ),
    );
  }
}

class _UpscSearchDelegate extends SearchDelegate<String> {
  final bool isDark;
  _UpscSearchDelegate({required this.isDark});

  List<Map<String, dynamic>> get _allFiles {
    final result = <Map<String, dynamic>>[];
    for (final cat in DemoData.upscCategories) {
      for (final file in (cat['files'] as List)) {
        result.add({
          ...Map<String, dynamic>.from(file),
          'category': cat['name'],
          'colorHex': cat['colorHex'],
        });
      }
    }
    return result;
  }

  @override
  List<Widget> buildActions(BuildContext context) =>
      [IconButton(icon: const Icon(Icons.clear), onPressed: () => query = '')];

  @override
  Widget buildLeading(BuildContext context) => IconButton(
        icon: const Icon(Icons.arrow_back_ios_rounded),
        onPressed: () => close(context, ''),
      );

  @override
  Widget buildResults(BuildContext context) => _buildResultList();

  @override
  Widget buildSuggestions(BuildContext context) => _buildResultList();

  Widget _buildResultList() {
    final q = query.toLowerCase();
    final filtered = _allFiles
        .where((f) => (f['name'] as String).toLowerCase().contains(q))
        .toList();
    if (filtered.isEmpty) {
      return const Center(child: Text('No results found'));
    }
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: filtered.length,
      itemBuilder: (ctx, i) {
        final file = filtered[i];
        return ListTile(
          leading: Icon(Icons.picture_as_pdf_rounded,
              color: Color(file['colorHex'])),
          title: Text(file['name']),
          subtitle: Text(file['category']),
          onTap: () => close(ctx, file['name']),
        );
      },
    );
  }
}
