import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, query, where } from 'firebase/firestore';
import { ref as storageRef, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage, auth, isFirebaseDemo } from '../firebase';
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
  type: string;
  url: string;
  size: number;
  folderId: string | null;
  dteCode: string;
  branch: string;
  year: string;
  subject: string;
  category: string;
  uploadedBy: string;
  downloads: number;
  views: number;
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
  
  const [selectedCategory, setSelectedCategory] = useState('Current Affairs');

  const [pathStack, setPathStack] = useState<FolderData[]>([]);
  const [folders, setFolders] = useState<FolderData[]>([]);
  const [files, setFiles] = useState<FileData[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
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
        const currentUser = auth.currentUser;
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const fileId = 'file_local_' + Math.random().toString(36).substring(2, 11);
      const parent = pathStack.length > 0 ? pathStack[pathStack.length - 1] : null;

      const ext = file.name.split('.').pop() || 'pdf';
      let fileType = 'pdf';
      const extLower = ext.toLowerCase();
      if (['jpg', 'png', 'jpeg'].includes(extLower)) {
        fileType = 'image';
      } else if (extLower === 'mp4') {
        fileType = 'video';
      } else if (extLower === 'mp3') {
        fileType = 'audio';
      } else {
        fileType = extLower;
      }

      // Simulated URLs for testing fallback
      let mockUrl = 'https://pdfobject.com/pdf/sample.pdf';
      if (fileType === 'video') {
        mockUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
      } else if (fileType === 'audio') {
        mockUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
      }

      if (isFirebaseDemo) {
        // Simulate upload progress
        setUploadProgress(10);
        await new Promise((res) => setTimeout(res, 200));
        setUploadProgress(45);
        await new Promise((res) => setTimeout(res, 200));
        setUploadProgress(90);
        await new Promise((res) => setTimeout(res, 200));
        setUploadProgress(100);

        const filePayload: FileData = {
          id: fileId,
          name: file.name,
          type: fileType,
          url: mockUrl,
          size: file.size,
          folderId: parent ? parent.id : null,
          dteCode: module === 'btech' ? selectedDte : '',
          branch: module === 'btech' ? selectedBranch : '',
          year: module === 'btech' ? selectedYear : '',
          subject: module === 'btech' ? selectedSubject : '',
          category: module === 'upsc' ? selectedCategory : '',
          uploadedBy: 'demo_admin',
          downloads: 0,
          views: 0,
          createdAt: new Date().toISOString()
        };

        const stored = localStorage.getItem('demo_files');
        const list: FileData[] = stored ? JSON.parse(stored) : [];
        list.push(filePayload);
        localStorage.setItem('demo_files', JSON.stringify(list));
        setSuccess('File uploaded successfully to Demo DB!');
        setUploadProgress(null);
        loadDirectory();
      } else {
        // Firebase storage upload
        const storagePath = `uploads/${fileId}_${file.name}`;
        const uploadTask = uploadBytesResumable(storageRef(storage, storagePath), file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            setUploadProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
          },
          (err) => {
            console.error(err);
            setError('File upload to storage failed.');
            setUploadProgress(null);
            setLoading(false);
          },
          async () => {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error('Session expired.');

            await setDoc(doc(db, 'files', fileId), {
              fileId: fileId,
              name: file.name,
              type: fileType,
              url: downloadUrl,
              size: file.size,
              folderId: parent ? parent.id : null,
              dteCode: module === 'btech' ? selectedDte : '',
              branch: module === 'btech' ? selectedBranch : '',
              year: module === 'btech' ? selectedYear : '',
              subject: module === 'btech' ? selectedSubject : '',
              category: module === 'upsc' ? selectedCategory : '',
              uploadedBy: currentUser.uid,
              downloads: 0,
              views: 0,
              createdAt: new Date().toISOString()
            });

            setSuccess('File uploaded successfully!');
            setUploadProgress(null);
            loadDirectory();
          }
        );
      }
    } catch (err: any) {
      console.error(err);
      setError('File upload failed.');
      setUploadProgress(null);
    } finally {
      if (isFirebaseDemo) setLoading(false);
    }
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
        const path = `uploads/${file.id}_${file.name}`;
        await deleteObject(storageRef(storage, path));
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
            try {
              await deleteObject(storageRef(storage, `uploads/${f.id}_${f.data().name}`));
            } catch (e) {}
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
    <div className="flex-1 bg-slate-50 min-h-screen">
      <Header title="Content Explorer & Folder Manager" />

      {loading && (
        <div className="h-1 bg-blue-100 w-full overflow-hidden">
          <div className="animate-progress h-full bg-blue-600 w-1/3 rounded-full"></div>
        </div>
      )}

      <main className="p-8">
        {error && <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-600">{error}</div>}
        {success && <div className="mb-6 rounded-xl bg-green-50 p-4 text-sm font-semibold text-green-600">{success}</div>}

        <div className="mb-6 flex gap-4 border-b border-slate-200 pb-4">
          <button
            onClick={() => { setModule('btech'); setPathStack([]); }}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              module === 'btech' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Engineering Syllabus BTech/B.E
          </button>
          <button
            onClick={() => { setModule('upsc'); setPathStack([]); }}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              module === 'upsc' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            UPSC Competitive Exam
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Syllabus Filters */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Syllabus Filters</h3>

            {module === 'btech' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">College</label>
                  <select
                    value={selectedDte}
                    onChange={(e) => { setSelectedDte(e.target.value); setPathStack([]); }}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm outline-none focus:border-blue-500"
                  >
                    {colleges.map((c) => (
                      <option key={c.id} value={c.dteCode}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Branch</label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => { setSelectedBranch(e.target.value); setPathStack([]); }}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm outline-none focus:border-blue-500"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Academic Year</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => { setSelectedYear(e.target.value); setPathStack([]); }}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm outline-none focus:border-blue-500"
                  >
                    {yearsList.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Syllabus Subject</label>
                  <input
                    type="text"
                    value={selectedSubject}
                    onChange={(e) => { setSelectedSubject(e.target.value); setPathStack([]); }}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm outline-none focus:border-blue-500"
                    placeholder="e.g. Mathematics-I"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => { setSelectedCategory(e.target.value); setPathStack([]); }}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm outline-none focus:border-blue-500"
                >
                  {upscCategories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Directory Explorer Grid */}
          <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-1.5 text-sm flex-wrap">
                <button
                  onClick={() => setPathStack([])}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  {module === 'btech' ? selectedSubject : selectedCategory}
                </button>
                {pathStack.map((folder, index) => (
                  <React.Fragment key={folder.id}>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                    <button
                      onClick={() => setPathStack(pathStack.slice(0, index + 1))}
                      className={`font-semibold hover:underline ${
                        index === pathStack.length - 1 ? 'text-slate-800' : 'text-blue-600'
                      }`}
                    >
                      {folder.name}
                    </button>
                  </React.Fragment>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowFolderModal(true)}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  <FolderPlus className="h-4 w-4" /> Create Folder
                </button>

                <label className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 cursor-pointer">
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

            {uploadProgress !== null && (
              <div className="mb-4 rounded-xl bg-blue-50 border border-blue-100 p-4">
                <div className="flex justify-between text-xs font-semibold text-blue-700 mb-1.5">
                  <span>Uploading study material...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-blue-600 transition-all" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              </div>
            )}

            {/* Folders grid view */}
            {folders.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Folders</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {folders.map((folder) => (
                    <div
                      key={folder.id}
                      className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-4 hover:border-blue-200 hover:bg-blue-50/20 transition-all cursor-pointer"
                    >
                      <div
                        onClick={() => setPathStack([...pathStack, folder])}
                        className="flex items-center gap-3 flex-1 overflow-hidden"
                      >
                        <Folder className="h-6 w-6 text-amber-400 fill-amber-100 flex-shrink-0" />
                        <span className="text-sm font-semibold text-slate-800 truncate">{folder.name}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteFolder(folder)}
                        className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Files list view */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Resources/Files</h4>
              {files.length === 0 ? (
                folders.length === 0 && (
                  <div className="py-16 text-center text-slate-400 text-sm">
                    This directory is empty. Create a folder or upload study notes to start.
                  </div>
                )
              ) : (
                <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl bg-slate-50/20 overflow-hidden">
                  {files.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-all">
                      <div className="flex items-center gap-3 overflow-hidden">
                        {getFileIcon(file.type)}
                        <div className="overflow-hidden">
                          <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-slate-800 hover:underline hover:text-blue-600 truncate block">
                            {file.name}
                          </a>
                          <span className="text-xs text-slate-400">
                            {((file.size || 0) / (1024 * 1024)).toFixed(2)} MB • {file.views} views • {file.downloads} downloads
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteFile(file)}
                        className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50"
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
      </main>

      {/* Create Folder Modal */}
      {showFolderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Create New Folder</h3>
            <form onSubmit={handleCreateFolder} className="space-y-4">
              <input
                type="text"
                required
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Folder name (e.g. Unit 1)"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowFolderModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700 disabled:bg-blue-300"
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
