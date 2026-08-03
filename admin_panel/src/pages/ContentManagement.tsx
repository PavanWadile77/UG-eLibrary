import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db, auth, isFirebaseDemo } from '../firebase';
import Header from '../components/Header';
import { Folder, FolderPlus, FileText, Upload, Trash2, ChevronRight, Loader2, Film, Volume2, Archive, Image } from 'lucide-react';

interface College {
  id: string;
  dteCode: string;
  name: string;
}

interface Branch {
  id: string;
  name: string;
}

interface FolderData {
  id: string;
  name: string;
  parentId: string | null;
  dteCode: string;
  branch: string;
  year: string;
  subject: string;
  category: string;
  createdBy: string;
  createdAt: string;
}

interface FileData {
  id: string;
  name: string;
  title?: string;
  type: string;
  url: string;
  fileUrl?: string;
  size: number;
  folderId: string | null;
  dteCode: string;
  targetCollegeDte?: string;
  branch: string;
  targetBranch?: string;
  year: string;
  semester?: string;
  subject: string;
  category: string;
  uploadedBy: string;
  downloads: number;
  views: number;
  status?: string;
  createdAt: string;
}

export default function ContentManagement() {
  const [module, setModule] = useState<'btech' | 'upsc'>('btech');
  
  const [colleges, setColleges] = useState<College[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  
  const [selectedDte, setSelectedDte] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedYear, setSelectedYear] = useState('First Year');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics-I');
  const [subjectsList, setSubjectsList] = useState<string[]>([]);
  
  const [selectedCategory, setSelectedCategory] = useState('Current Affairs');

  const [pathStack, setPathStack] = useState<FolderData[]>([]);
  const [folders, setFolders] = useState<FolderData[]>([]);
  const [files, setFiles] = useState<FileData[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [showFolderModal, setShowFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const upscCategories = [
    'Current Affairs',
    'History',
    'Geography',
    'Polity',
    'Economy',
    'Environment',
    'Science & Technology',
    'Ethics',
    'CSAT',
    'Mock Tests',
    'Previous Year Papers'
  ];

  const yearsList = ['First Year', 'Second Year', 'Third Year', 'Final Year'];

  // Load Colleges & Branches
  useEffect(() => {
    async function loadSelectors() {
      try {
        if (isFirebaseDemo) {
          const colsStored = localStorage.getItem('demo_colleges');
          const colList: College[] = colsStored ? JSON.parse(colsStored) : [
            { id: '6006', name: 'College of Engineering, Pune (COEP)', dteCode: '6006' },
            { id: '3012', name: 'Veermata Jijabai Technological Institute (VJTI), Mumbai', dteCode: '3012' }
          ];
          setColleges(colList);
          if (colList.length > 0) setSelectedDte(colList[0].dteCode);

          const brsStored = localStorage.getItem('demo_branches');
          const branchList: Branch[] = brsStored ? JSON.parse(brsStored) : [
            { id: 'cse', name: 'Computer Engineering' },
            { id: 'it', name: 'Information Technology' }
          ];
          setBranches(branchList);
          if (branchList.length > 0) setSelectedBranch(branchList[0].name);
        } else {
          const collegesSnap = await getDocs(collection(db, 'colleges'));
          const colList: College[] = collegesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as College));
          setColleges(colList);
          if (colList.length > 0) setSelectedDte(colList[0].dteCode);

          const branchesSnap = await getDocs(collection(db, 'branches'));
          const branchList: Branch[] = branchesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Branch));
          setBranches(branchList);
          if (branchList.length > 0) setSelectedBranch(branchList[0].name);
        }
      } catch (err) {
        console.error("Failed to load selectors: ", err);
      }
    }
    loadSelectors();
  }, []);

  useEffect(() => {
    if (!selectedBranch || !selectedDte) return;
    if (isFirebaseDemo) {
      const stored = localStorage.getItem('demo_subjects');
      const list = stored ? JSON.parse(stored) : [];
      const filtered = list.filter((s: any) => s.branch === selectedBranch && s.collegeDte === selectedDte);
      const uniqueNames = Array.from(new Set(filtered.map((s: any) => s.name))) as string[];
      setSubjectsList(uniqueNames);
      if (uniqueNames.length > 0 && !uniqueNames.includes(selectedSubject)) setSelectedSubject(uniqueNames[0]);
    } else {
      const q = query(collection(db, 'subjects'), where('branch', '==', selectedBranch), where('collegeDte', '==', selectedDte));
      getDocs(q).then(snap => {
        const uniqueNames = Array.from(new Set(snap.docs.map(doc => doc.data().name))) as string[];
        setSubjectsList(uniqueNames);
        if (uniqueNames.length > 0 && !uniqueNames.includes(selectedSubject)) setSelectedSubject(uniqueNames[0]);
      });
    }
  }, [selectedBranch, selectedDte]);

  const loadDirectory = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const currentParent = pathStack.length > 0 ? pathStack[pathStack.length - 1] : null;
      const currentParentId = currentParent ? currentParent.id : null;

      if (isFirebaseDemo) {
        // Load folders from localStorage
        const storedFolders = localStorage.getItem('demo_folders');
        const allFolders: FolderData[] = storedFolders ? JSON.parse(storedFolders) : [
          {
            id: 'f1',
            name: 'Unit 1 - Data Structures',
            parentId: null,
            dteCode: '6006',
            branch: 'Computer Engineering',
            year: 'Second Year',
            subject: 'Mathematics-I',
            category: '',
            createdBy: 'demo_admin',
            createdAt: new Date().toISOString()
          }
        ];

        const filteredFolders = allFolders.filter((f) => {
          if (currentParentId) {
            return f.parentId === currentParentId;
          } else {
            if (module === 'btech') {
              return f.dteCode === selectedDte && f.branch === selectedBranch && f.year === selectedYear && f.subject === selectedSubject && f.parentId === null;
            } else {
              return f.category === selectedCategory && f.parentId === null;
            }
          }
        });
        setFolders(filteredFolders);

        // Load files from localStorage
        const storedFiles = localStorage.getItem('demo_files');
        const allFiles: FileData[] = storedFiles ? JSON.parse(storedFiles) : [
          {
            id: 'file1',
            name: 'Syllabus Structure.pdf',
            type: 'pdf',
            url: 'https://pdfobject.com/pdf/sample.pdf',
            size: 1048576,
            folderId: null,
            dteCode: '6006',
            branch: 'Computer Engineering',
            year: 'Second Year',
            subject: 'Mathematics-I',
            category: '',
            uploadedBy: 'demo_admin',
            downloads: 12,
            views: 45,
            createdAt: new Date().toISOString()
          }
        ];

        const filteredFiles = allFiles.filter((f) => {
          if (currentParentId) {
            return f.folderId === currentParentId;
          } else {
            if (module === 'btech') {
              return f.dteCode === selectedDte && f.branch === selectedBranch && f.year === selectedYear && f.subject === selectedSubject && f.folderId === null;
            } else {
              return f.category === selectedCategory && f.folderId === null;
            }
          }
        });
        setFiles(filteredFiles);
      } else {
        // Load from Firebase
        const currentParentId = currentParent ? currentParent.id : null;
        let folderQ;
        let fileQ;

        if (currentParentId) {
          folderQ = query(collection(db, 'folders'), where('parentId', '==', currentParentId));
          fileQ = query(collection(db, 'files'), where('folderId', '==', currentParentId));
        } else {
          if (module === 'btech') {
            folderQ = query(
              collection(db, 'folders'),
              where('dteCode', '==', selectedDte),
              where('branch', '==', selectedBranch),
              where('year', '==', selectedYear),
              where('parentId', '==', null)
            );
            fileQ = query(
              collection(db, 'files'),
              where('dteCode', '==', selectedDte),
              where('branch', '==', selectedBranch),
              where('year', '==', selectedYear),
              where('subject', '==', selectedSubject),
              where('folderId', '==', null)
            );
          } else {
            folderQ = query(
              collection(db, 'folders'),
              where('category', '==', selectedCategory),
              where('parentId', '==', null)
            );
            fileQ = query(
              collection(db, 'files'),
              where('category', '==', selectedCategory),
              where('folderId', '==', null)
            );
          }
        }

        const foldersSnap = await getDocs(folderQ);
        const foldersList: FolderData[] = [];
        foldersSnap.forEach((doc) => {
          const data = doc.data();
          const matchesSubject = module === 'btech' ? data.subject === selectedSubject : data.category === selectedCategory;
          if (currentParentId || matchesSubject) {
            foldersList.push({ id: doc.id, ...data } as FolderData);
          }
        });
        setFolders(foldersList);

        const filesSnap = await getDocs(fileQ);
        const filesList: FileData[] = filesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as FileData));
        setFiles(filesList);
      }
    } catch (err: any) {
      console.error(err);
      setError('Failed to load folder directory structure.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDirectory();
  }, [module, selectedDte, selectedBranch, selectedYear, selectedSubject, selectedCategory, pathStack]);

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    setLoading(true);

    try {
      const parent = pathStack.length > 0 ? pathStack[pathStack.length - 1] : null;
      const folderId = 'folder_local_' + Math.random().toString(36).substring(2, 11);

      const folderPayload: FolderData = {
        id: folderId,
        name: newFolderName.trim(),
        parentId: parent ? parent.id : null,
        dteCode: module === 'btech' ? selectedDte : '',
        branch: module === 'btech' ? selectedBranch : '',
        year: module === 'btech' ? selectedYear : '',
        subject: module === 'btech' ? selectedSubject : '',
        category: module === 'upsc' ? selectedCategory : '',
        createdBy: 'demo_admin',
        createdAt: new Date().toISOString()
      };

      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_folders');
        const list: FolderData[] = stored ? JSON.parse(stored) : [];
        list.push(folderPayload);
        localStorage.setItem('demo_folders', JSON.stringify(list));
        setSuccess('Folder created successfully in Demo DB.');
      } else {
        const currentUser = auth?.currentUser;
        if (!currentUser) throw new Error('Session expired.');
        await setDoc(doc(db, 'folders', folderId), {
          ...folderPayload,
          folderId,
          createdBy: currentUser.uid
        });
        setSuccess('Folder created successfully.');
      }

      setNewFolderName('');
      setShowFolderModal(false);
      loadDirectory();
    } catch (err: any) {
      console.error(err);
      setError('Failed to create folder.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async () => {
    // Left empty or fallback code since we don't upload files in Admin panel anymore.
    // In explorer view, admin could theoretically add external links too, but for now we just show an alert.
    alert("Direct file upload is disabled. Use Teacher Upload form to submit Google Drive links.");
  };

  const handleDeleteFile = async (file: FileData) => {
    if (!window.confirm(`Delete ${file.name} permanently?`)) return;
    setLoading(true);

    try {
      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_files');
        const list: FileData[] = stored ? JSON.parse(stored) : [];
        const filtered = list.filter((f) => f.id !== file.id);
        localStorage.setItem('demo_files', JSON.stringify(filtered));
        setSuccess('File removed from Demo DB.');
      } else {
        await deleteDoc(doc(db, 'files', file.id));
        setSuccess('File removed.');
      }
      loadDirectory();
    } catch (err: any) {
      console.error(err);
      setError('File delete action failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFolder = async (folder: FolderData) => {
    if (!window.confirm(`Delete ${folder.name} and all its contents recursively?`)) return;
    setLoading(true);

    try {
      if (isFirebaseDemo) {
        const storedFolders = localStorage.getItem('demo_folders');
        let allFolders: FolderData[] = storedFolders ? JSON.parse(storedFolders) : [];
        
        const storedFiles = localStorage.getItem('demo_files');
        let allFiles: FileData[] = storedFiles ? JSON.parse(storedFiles) : [];

        const cleanFolderLocal = (id: string) => {
          allFolders = allFolders.filter((f) => f.id !== id && f.parentId !== id);
          allFiles = allFiles.filter((f) => f.folderId !== id);
        };

        cleanFolderLocal(folder.id);
        localStorage.setItem('demo_folders', JSON.stringify(allFolders));
        localStorage.setItem('demo_files', JSON.stringify(allFiles));
        setSuccess('Folder structure deleted recursively from Demo DB.');
      } else {
        const cleanFolder = async (id: string) => {
          const subs = await getDocs(query(collection(db, 'folders'), where('parentId', '==', id)));
          for (const s of subs.docs) {
            await cleanFolder(s.id);
          }
          await deleteDoc(doc(db, 'folders', id));

          const filesSnap = await getDocs(query(collection(db, 'files'), where('folderId', '==', id)));
          for (const f of filesSnap.docs) {
            await deleteDoc(doc(db, 'files', f.id));
          }
        };
        await cleanFolder(folder.id);
        setSuccess('Folder structure deleted recursively.');
      }
      loadDirectory();
    } catch (err: any) {
      console.error(err);
      setError('Folder delete failed.');
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'video': return <Film className="h-5 w-5 text-indigo-500" />;
      case 'audio': return <Volume2 className="h-5 w-5 text-cyan-500" />;
      case 'image': return <Image className="h-5 w-5 text-emerald-500" />;
      case 'zip': return <Archive className="h-5 w-5 text-amber-500" />;
      default: return <FileText className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="flex-1 bg-[#F8FAFC] dark:bg-slate-900 min-h-screen relative font-sans selection:bg-blue-100 transition-colors">
      <Header title="Content Explorer & Folder Manager" />

      {loading && (
        <div className="h-1 bg-blue-100 dark:bg-blue-900/30 w-full overflow-hidden absolute top-16 left-0 z-10">
          <div className="animate-progress h-full bg-blue-600 dark:bg-blue-500 w-1/3 rounded-full"></div>
        </div>
      )}

      <main className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {error && (
          <div className="rounded-[16px] bg-red-50 dark:bg-red-900/20 p-4 text-[14px] font-bold text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800/50 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-red-500"></span> {error}
          </div>
        )}
        {success && (
          <div className="rounded-[16px] bg-emerald-50 dark:bg-emerald-900/20 p-4 text-[14px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> {success}
          </div>
        )}

        <div className="rounded-[24px] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h3 className="text-[18px] font-extrabold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              <Folder className="h-5 w-5 text-blue-600 dark:text-blue-400 fill-blue-100 dark:fill-blue-900/40" /> Content Browser
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {/* Syllabus Filters */}
            <div className="rounded-[20px] border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 p-6 shadow-sm h-fit">
              <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-5">Syllabus Filters</h3>

              {module === 'btech' ? (
                <div className="space-y-5">
                  <div>
                    <label className="block text-[13px] font-bold text-slate-600 dark:text-slate-300 mb-2">College</label>
                    <div className="relative">
                      <select
                        value={selectedDte}
                        onChange={(e) => { setSelectedDte(e.target.value); setPathStack([]); }}
                        className="w-full appearance-none rounded-[14px] border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white px-4 py-3 pr-10 text-[14px] font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer shadow-sm hover:border-blue-300 dark:hover:border-blue-600"
                      >
                        {colleges.map((c) => (
                          <option key={c.id} value={c.dteCode}>{c.name}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-slate-600 dark:text-slate-300 mb-2">Branch</label>
                    <div className="relative">
                      <select
                        value={selectedBranch}
                        onChange={(e) => { setSelectedBranch(e.target.value); setPathStack([]); }}
                        className="w-full appearance-none rounded-[14px] border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white px-4 py-3 pr-10 text-[14px] font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer shadow-sm hover:border-blue-300 dark:hover:border-blue-600"
                      >
                        {branches.map((b) => (
                          <option key={b.id} value={b.name}>{b.name}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-slate-600 dark:text-slate-300 mb-2">Academic Year</label>
                    <div className="relative">
                      <select
                        value={selectedYear}
                        onChange={(e) => { setSelectedYear(e.target.value); setPathStack([]); }}
                        className="w-full appearance-none rounded-[14px] border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white px-4 py-3 pr-10 text-[14px] font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer shadow-sm hover:border-blue-300 dark:hover:border-blue-600"
                      >
                        {yearsList.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-slate-600 dark:text-slate-300 mb-2">Syllabus Subject</label>
                    <div className="relative">
                      <select
                        value={selectedSubject}
                        onChange={(e) => { setSelectedSubject(e.target.value); setPathStack([]); }}
                        className="w-full appearance-none rounded-[14px] border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white px-4 py-3 pr-10 text-[14px] font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer shadow-sm hover:border-blue-300 dark:hover:border-blue-600"
                      >
                        {subjectsList.length === 0 && <option value="">No subjects available</option>}
                        {subjectsList.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-[13px] font-bold text-slate-600 dark:text-slate-300 mb-2">Category</label>
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => { setSelectedCategory(e.target.value); setPathStack([]); }}
                      className="w-full appearance-none rounded-[14px] border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white px-4 py-3 pr-10 text-[14px] font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer shadow-sm hover:border-blue-300 dark:hover:border-blue-600"
                    >
                      {upscCategories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                      <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Directory Explorer Grid */}
            <div className="lg:col-span-3 rounded-[20px] border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-5 mb-5">
                <div className="flex items-center gap-2 text-[14px] flex-wrap">
                  <button
                    onClick={() => setPathStack([])}
                    className="font-extrabold text-blue-600 dark:text-blue-400 hover:underline transition-all"
                  >
                    {module === 'btech' ? selectedSubject : selectedCategory}
                  </button>
                  {pathStack.map((folder, index) => (
                    <React.Fragment key={folder.id}>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                      <button
                        onClick={() => setPathStack(pathStack.slice(0, index + 1))}
                        className={`font-extrabold hover:underline transition-all ${
                          index === pathStack.length - 1 ? 'text-slate-800 dark:text-slate-200' : 'text-blue-600 dark:text-blue-400'
                        }`}
                      >
                        {folder.name}
                      </button>
                    </React.Fragment>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowFolderModal(true)}
                    className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-2.5 text-[13px] font-extrabold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:-translate-y-0.5"
                  >
                    <FolderPlus className="h-4 w-4" /> Create Folder
                  </button>

                  <label className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-[13px] font-extrabold text-white shadow-md shadow-blue-500/25 hover:bg-blue-700 transition-all cursor-pointer hover:-translate-y-0.5">
                    <Upload className="h-4 w-4" /> Upload Material
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept=".pdf,.docx,.ppt,.pptx,.jpg,.png,.mp4,.mp3,.zip"
                    />
                  </label>
                </div>
              </div>

              {/* Folders grid view */}
              {folders.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 pl-1">Folders</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {folders.map((folder) => (
                      <div
                        key={folder.id}
                        className="group flex items-center justify-between rounded-[16px] border border-slate-200/60 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 p-4 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/30 dark:hover:bg-blue-900/20 shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1"
                      >
                        <div
                          onClick={() => setPathStack([...pathStack, folder])}
                          className="flex items-center gap-3 flex-1 overflow-hidden"
                        >
                          <Folder className="h-7 w-7 text-amber-400 fill-amber-100/50 dark:fill-amber-900/30 flex-shrink-0 drop-shadow-sm group-hover:scale-110 transition-transform" />
                          <span className="text-[14px] font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">{folder.name}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteFolder(folder)}
                          className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 opacity-0 group-hover:opacity-100 transition-all z-10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Files list view */}
              <div className="flex-1">
                <h4 className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 pl-1">Resources & Files</h4>
                {files.length === 0 ? (
                  folders.length === 0 && (
                    <div className="py-20 text-center font-medium text-slate-400 dark:text-slate-500 text-[14px] border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[20px] bg-slate-50/50 dark:bg-slate-800/30 flex flex-col items-center justify-center">
                      <Folder className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-3" />
                      <p>This directory is empty.</p>
                      <p className="text-[13px] mt-1">Create a folder or upload study materials to get started.</p>
                    </div>
                  )
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-slate-700 border border-slate-100 dark:border-slate-700 rounded-[20px] bg-white dark:bg-slate-800 overflow-hidden shadow-sm">
                    {files.map((file) => (
                      <div key={file.id} className="group flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        <div className="flex items-center gap-4 overflow-hidden">
                          <div className="p-2.5 bg-slate-100 dark:bg-slate-700 rounded-[12px] group-hover:scale-110 group-hover:bg-white dark:group-hover:bg-slate-600 shadow-sm transition-all">
                             {getFileIcon(file.type)}
                          </div>
                          <div className="overflow-hidden">
                            <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-[14px] font-extrabold text-slate-800 dark:text-slate-200 hover:underline hover:text-blue-600 dark:hover:text-blue-400 truncate block transition-colors">
                              {file.name}
                            </a>
                            <div className="text-[12px] font-bold text-slate-400 dark:text-slate-500 mt-1 flex items-center gap-2">
                              <span>{((file.size || 0) / (1024 * 1024)).toFixed(2)} MB</span>
                              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                              <span>{file.views} views</span>
                              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                              <span>{file.downloads} downloads</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteFile(file)}
                          className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 p-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Create Folder Modal */}
      {showFolderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-[24px] bg-white dark:bg-slate-800 p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] animate-in zoom-in-95 duration-200 border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-[16px] text-blue-600 dark:text-blue-400">
                 <FolderPlus className="h-6 w-6" />
              </div>
              <h3 className="text-[20px] font-extrabold text-slate-900 dark:text-white tracking-tight">Create New Folder</h3>
            </div>
            
            <form onSubmit={handleCreateFolder} className="space-y-6">
              <div>
                <label className="block text-[13px] font-bold text-slate-600 dark:text-slate-300 mb-2">Folder Name</label>
                <input
                  type="text"
                  required
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="w-full rounded-[16px] border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white px-5 py-3.5 text-[14px] font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400 shadow-sm"
                  placeholder="e.g. Unit 1 - Introduction"
                  autoFocus
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowFolderModal(false)}
                  className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 text-[14px] font-extrabold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-blue-600 px-6 py-3 text-[14px] font-extrabold text-white shadow-md shadow-blue-500/25 hover:bg-blue-700 hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 transition-all"
                >
                  Create Folder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
