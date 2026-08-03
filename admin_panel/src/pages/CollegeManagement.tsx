import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, writeBatch, query, limit, startAfter, orderBy, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db, isFirebaseDemo } from '../firebase';
import Header from '../components/Header';
import { Plus, Trash2, Database, School, Layers, Upload, Download, Loader2 } from 'lucide-react';
import { maharashtraColleges } from '../data/maharashtra_dte_colleges';

export interface College {
  id?: string;
  dteCode: string;
  name: string;
  district?: string;
  university?: string;
  courseTypes?: string;
  status?: string;
  branches?: string;
}

interface Branch {
  id: string;
  name: string;
}

export default function CollegeManagement() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 15;

  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form entries
  const [collegeName, setCollegeName] = useState('');
  const [dteCode, setDteCode] = useState('');
  const [district, setDistrict] = useState('');
  const [university, setUniversity] = useState('');
  const [courseTypes, setCourseTypes] = useState('');
  const [status, setStatus] = useState('Active');
  const [collegeBranches, setCollegeBranches] = useState('');
  
  const [branchName, setBranchName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [exams, setExams] = useState<{id: string, name: string}[]>([]);
  const [examName, setExamName] = useState('');
  
  // Temporary Admin Tool States
  const [adminStats, setAdminStats] = useState({ total: 0, has5545: false, lastImport: 'Checking...' });
  const [checkingStats, setCheckingStats] = useState(false);

  const fetchAdminStats = async () => {
    if (isFirebaseDemo) return;
    setCheckingStats(true);
    try {
      // Get total count
      const snap = await getDocs(collection(db, 'colleges'));
      
      let has5545 = false;
      let lastImport = 'Never';
      
      snap.forEach(d => {
         if (d.id === '5545') {
            has5545 = true;
            if (d.data().createdAt) lastImport = new Date(d.data().createdAt).toLocaleString();
         }
      });
      
      setAdminStats({ total: snap.size, has5545, lastImport });
    } catch (e) {
      console.error(e);
      setAdminStats({ total: 0, has5545: false, lastImport: 'Error' });
    } finally {
      setCheckingStats(false);
    }
  };

  const defaultExams = ['UPSC', 'MPSC', 'SSC', 'Banking', 'Railway', 'Defence'];

  const fetchCollegesFirstPage = async () => {
    try {
      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_colleges');
        const list: College[] = stored ? JSON.parse(stored) : [];
        setColleges(list.slice(0, pageSize));
        setHasMore(list.length > pageSize);
      } else {
        const q = query(collection(db, 'colleges'), orderBy('dteCode'), limit(pageSize));
        const snap = await getDocs(q);
        const list: College[] = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as College));
        setColleges(list);
        if (snap.docs.length > 0) {
          setLastVisible(snap.docs[snap.docs.length - 1]);
        }
        setHasMore(snap.docs.length === pageSize);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch colleges.');
    }
  };

  const fetchMoreColleges = async () => {
    if (!hasMore || loadingMore || isFirebaseDemo) return;
    setLoadingMore(true);
    try {
      const q = query(
        collection(db, 'colleges'), 
        orderBy('dteCode'), 
        startAfter(lastVisible),
        limit(pageSize)
      );
      const snap = await getDocs(q);
      const list: College[] = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as College));
      setColleges(prev => [...prev, ...list]);
      if (snap.docs.length > 0) {
        setLastVisible(snap.docs[snap.docs.length - 1]);
      }
      setHasMore(snap.docs.length === pageSize);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  };

  const fetchOtherData = async () => {
    try {
      setLoading(true);
      if (isFirebaseDemo) {
        const brsStored = localStorage.getItem('demo_branches');
        const exmsStored = localStorage.getItem('demo_exams');
        setBranches(brsStored ? JSON.parse(brsStored) : []);
        setExams(exmsStored ? JSON.parse(exmsStored) : []);
      } else {
        const branchesSnap = await getDocs(collection(db, 'branches'));
        setBranches(branchesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Branch)));
        const examsSnap = await getDocs(collection(db, 'exams'));
        setExams(examsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as any)));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollegesFirstPage();
    fetchOtherData();
  }, []);

  const handleAddCollege = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collegeName || !dteCode) return;
    setLoading(true);

    const payload: College = {
      dteCode,
      name: collegeName,
      district,
      university,
      courseTypes,
      status,
      branches: collegeBranches
    };

    try {
      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_colleges');
        const list: College[] = stored ? JSON.parse(stored) : [];
        const filtered = list.filter((c) => c.dteCode !== dteCode);
        filtered.push({ id: dteCode, ...payload });
        localStorage.setItem('demo_colleges', JSON.stringify(filtered));
        setSuccess('College registered successfully!');
      } else {
        await setDoc(doc(db, 'colleges', dteCode), { ...payload, createdAt: new Date().toISOString() });
        setSuccess('College registered successfully!');
      }
      setCollegeName(''); setDteCode(''); setDistrict(''); setUniversity(''); setCourseTypes(''); setCollegeBranches('');
      fetchCollegesFirstPage();
    } catch (err: any) {
      setError('Failed to register college.');
    } finally {
      setLoading(false);
    }
  };

  // Bulk CSV Import
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const text = await file.text();
      const lines = text.split('\n').filter(l => l.trim().length > 0);
      if (lines.length < 2) throw new Error('File must contain a header row and at least one data row.');

      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      const dteIdx = headers.findIndex(h => h.includes('dte'));
      const nameIdx = headers.findIndex(h => h.includes('name'));
      const distIdx = headers.findIndex(h => h.includes('district'));
      const uniIdx = headers.findIndex(h => h.includes('university'));
      const courseIdx = headers.findIndex(h => h.includes('course'));
      const branchIdx = headers.findIndex(h => h.includes('branch'));
      const statusIdx = headers.findIndex(h => h.includes('status'));

      if (dteIdx === -1 || nameIdx === -1) {
        throw new Error('CSV must contain "DTE Code" and "College Name" columns.');
      }

      if (isFirebaseDemo) {
        const list: College[] = [];
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',').map(c => c.trim());
          if (cols[dteIdx]) {
            list.push({
              id: cols[dteIdx],
              dteCode: cols[dteIdx],
              name: cols[nameIdx] || '',
              district: distIdx > -1 ? cols[distIdx] : '',
              university: uniIdx > -1 ? cols[uniIdx] : '',
              courseTypes: courseIdx > -1 ? cols[courseIdx] : '',
              branches: branchIdx > -1 ? cols[branchIdx] : '',
              status: statusIdx > -1 ? cols[statusIdx] : 'Active'
            });
          }
        }
        localStorage.setItem('demo_colleges', JSON.stringify(list));
        setSuccess(`Successfully imported ${list.length} colleges!`);
      } else {
        let currentBatch = writeBatch(db);
        let count = 0;
        let totalCount = 0;

        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',').map(c => c.trim());
          const dte = cols[dteIdx];
          if (!dte) continue;

          const ref = doc(db, 'colleges', dte);
          currentBatch.set(ref, {
            dteCode: dte,
            name: cols[nameIdx] || '',
            district: distIdx > -1 ? cols[distIdx] : '',
            university: uniIdx > -1 ? cols[uniIdx] : '',
            courseTypes: courseIdx > -1 ? cols[courseIdx] : '',
            branches: branchIdx > -1 ? cols[branchIdx] : '',
            status: statusIdx > -1 ? cols[statusIdx] : 'Active',
            updatedAt: new Date().toISOString()
          });

          count++;
          totalCount++;

          // Firestore batch limit is 500
          if (count === 400) {
            await currentBatch.commit();
            currentBatch = writeBatch(db);
            count = 0;
          }
        }
        
        if (count > 0) {
          await currentBatch.commit();
        }
        setSuccess(`Successfully bulk imported ${totalCount} colleges!`);
      }
      fetchCollegesFirstPage();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to parse CSV file.');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
      setLoading(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      let allCols: College[] = [];
      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_colleges');
        allCols = stored ? JSON.parse(stored) : [];
      } else {
        const snap = await getDocs(collection(db, 'colleges'));
        allCols = snap.docs.map(d => d.data() as College);
      }
      
      const csvContent = "data:text/csv;charset=utf-8," 
        + "DTE Code,College Name,District,University,Course Type,Branches,Status\n"
        + allCols.map(c => `${c.dteCode},"${c.name}",${c.district||''},${c.university||''},${c.courseTypes||''},"${c.branches||''}",${c.status||'Active'}`).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "colleges_export.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError('Export failed.');
    }
  };

  const handleAddBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!branchName) return;
    setLoading(true);

    try {
      const branchId = branchName.toLowerCase().replace(/\s+/g, '-');
      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_branches');
        const list: Branch[] = stored ? JSON.parse(stored) : [];
        const filtered = list.filter((b) => b.id !== branchId);
        filtered.push({ id: branchId, name: branchName });
        localStorage.setItem('demo_branches', JSON.stringify(filtered));
      } else {
        await setDoc(doc(db, 'branches', branchId), { name: branchName, createdAt: new Date().toISOString() });
      }
      setSuccess('Branch configured successfully!');
      setBranchName('');
      fetchOtherData();
    } catch (err: any) {
      setError('Failed to configure branch.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCollege = async (id: string) => {
    if (!window.confirm('Delete this college registration?')) return;
    setLoading(true);
    try {
      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_colleges');
        const list: College[] = stored ? JSON.parse(stored) : [];
        const filtered = list.filter((c) => c.id !== id);
        localStorage.setItem('demo_colleges', JSON.stringify(filtered));
      } else {
        await deleteDoc(doc(db, 'colleges', id));
      }
      setSuccess('College removed.');
      fetchCollegesFirstPage();
    } catch (err) {
      setError('Delete action failed.');
    } finally {
      setLoading(false);
    }
  };

  // Additional handlers for branch/exam deletes ommited for brevity but simple
  const handleDeleteBranch = async (id: string) => {
    if (!window.confirm('Delete this department configuration?')) return;
    setLoading(true);
    try {
      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_branches');
        const list: Branch[] = stored ? JSON.parse(stored) : [];
        localStorage.setItem('demo_branches', JSON.stringify(list.filter(b => b.id !== id)));
      } else {
        await deleteDoc(doc(db, 'branches', id));
      }
      setSuccess('Branch removed.');
      fetchOtherData();
    } catch (err) { setError('Delete failed.'); setLoading(false); }
  };

  const handleAddExam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!examName) return;
    setLoading(true);
    try {
      const examId = examName.toLowerCase().replace(/\s+/g, '-');
      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_exams');
        const list = stored ? JSON.parse(stored) : [];
        list.push({ id: examId, name: examName });
        localStorage.setItem('demo_exams', JSON.stringify(list));
      } else {
        await setDoc(doc(db, 'exams', examId), { name: examName });
      }
      setSuccess('Exam category added!');
      setExamName(''); fetchOtherData();
    } catch (err) { setError('Failed to add exam.'); setLoading(false); }
  };

  const handleDeleteExam = async (id: string) => {
    if (!window.confirm('Delete this exam category?')) return;
    setLoading(true);
    try {
      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_exams');
        const list = stored ? JSON.parse(stored) : [];
        localStorage.setItem('demo_exams', JSON.stringify(list.filter((e: any) => e.id !== id)));
      } else {
        await deleteDoc(doc(db, 'exams', id));
      }
      setSuccess('Exam removed.');
      fetchOtherData();
    } catch (err) { setError('Delete failed.'); setLoading(false); }
  };

  return (
    <div className="flex-1 bg-[#F8FAFC] dark:bg-slate-900 min-h-screen relative font-sans selection:bg-blue-100 transition-colors">
      <Header title="Colleges & Syllabus Settings" />

      {loading && (
        <div className="h-1 bg-blue-100 dark:bg-blue-900/30 w-full overflow-hidden absolute top-16 left-0 z-10">
          <div className="animate-progress h-full bg-blue-600 dark:bg-blue-500 w-1/3 rounded-full"></div>
        </div>
      )}

      <main className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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

        {!isFirebaseDemo && (
          <div className="rounded-[24px] border border-amber-200 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-900/10 p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_8px_30px_rgba(245,158,11,0.06)]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-extrabold text-amber-900 dark:text-amber-500 text-[18px] flex items-center gap-3 tracking-tight">
                <Database className="h-5 w-5" /> Temporary Verification Tool (Production Firestore)
              </h3>
              <button 
                onClick={fetchAdminStats}
                disabled={checkingStats}
                className="px-5 py-2.5 bg-amber-600 text-white rounded-full text-[14px] font-extrabold shadow-md shadow-amber-500/20 hover:bg-amber-700 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
              >
                {checkingStats ? 'Scanning...' : 'Scan Database'}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
               <div className="bg-white dark:bg-slate-800 p-5 rounded-[20px] border border-amber-100 dark:border-amber-900/30 shadow-sm transition-transform hover:-translate-y-1">
                 <p className="text-[13px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Firestore Records</p>
                 <p className="text-3xl font-black text-slate-800 dark:text-white mt-2 tracking-tight">{adminStats.total}</p>
               </div>
               <div className="bg-white dark:bg-slate-800 p-5 rounded-[20px] border border-amber-100 dark:border-amber-900/30 shadow-sm transition-transform hover:-translate-y-1">
                 <p className="text-[13px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">DTE 5545 Exists?</p>
                 <p className={`text-3xl font-black mt-2 tracking-tight ${adminStats.has5545 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                   {adminStats.has5545 ? 'YES' : 'NO'}
                 </p>
               </div>
               <div className="bg-white dark:bg-slate-800 p-5 rounded-[20px] border border-amber-100 dark:border-amber-900/30 shadow-sm transition-transform hover:-translate-y-1">
                 <p className="text-[13px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">5545 Import Date</p>
                 <p className="text-[15px] font-bold text-slate-800 dark:text-slate-200 mt-2">{adminStats.lastImport}</p>
               </div>
            </div>
            {adminStats.total === 0 && !checkingStats && (
               <p className="text-[14px] text-red-600 dark:text-red-400 mt-5 font-bold flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                 Warning: Production database is empty. Please click "Seed Production Dataset" below.
               </p>
            )}
          </div>
        )}

        <div className="rounded-[24px] border border-blue-200 dark:border-blue-800/50 bg-blue-50/50 dark:bg-blue-900/10 p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_8px_30px_rgba(37,99,235,0.06)]">
          <div className="max-w-2xl">
            <h3 className="font-extrabold text-blue-900 dark:text-blue-400 text-[20px] flex items-center gap-3 tracking-tight">
              <Database className="h-6 w-6" /> Master College Directory
            </h3>
            <p className="text-[14px] font-medium text-blue-700/80 dark:text-blue-300 mt-2 leading-relaxed">
              Bulk import or export official Maharashtra DTE colleges. The data structure maps to dropdowns for Students and Teachers.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 rounded-full bg-white dark:bg-slate-800 border-[1.5px] border-blue-200 dark:border-blue-700/50 px-5 py-3 text-[14px] font-extrabold text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all hover:-translate-y-0.5"
            >
              <Download className="h-4 w-4" /> Export CSV
            </button>
            <label className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-[14px] font-extrabold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 disabled:bg-blue-300 transition-all cursor-pointer hover:-translate-y-0.5">
              <Upload className="h-4 w-4" /> Bulk Import
              <input type="file" accept=".csv" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
            </label>
            <button
              onClick={async () => {
                if (!window.confirm('Seed database with 350+ production Maharashtra colleges?')) return;
                setLoading(true);
                try {
                  if (isFirebaseDemo) {
                    localStorage.setItem('demo_colleges', JSON.stringify(maharashtraColleges));
                  } else {
                    let currentBatch = writeBatch(db);
                    let count = 0;
                    for (const col of maharashtraColleges) {
                      currentBatch.set(doc(db, 'colleges', col.dteCode), { ...col, createdAt: new Date().toISOString() });
                      count++;
                      if (count === 400) {
                        await currentBatch.commit();
                        currentBatch = writeBatch(db);
                        count = 0;
                      }
                    }
                    if (count > 0) await currentBatch.commit();
                  }
                  setSuccess(`Successfully seeded ${maharashtraColleges.length} colleges into database!`);
                  fetchCollegesFirstPage();
                } catch (err) {
                  setError('Failed to seed colleges.');
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-[14px] font-extrabold text-white shadow-lg shadow-purple-500/25 hover:bg-purple-700 disabled:bg-purple-300 transition-all hover:-translate-y-0.5 disabled:translate-y-0"
            >
              <Database className="h-4 w-4" /> Seed Dataset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Colleges Section */}
          <div className="space-y-8">
            <div className="rounded-[24px] border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
              <h3 className="text-[18px] font-extrabold text-slate-800 dark:text-white mb-6 flex items-center gap-3 tracking-tight">
                <School className="h-6 w-6 text-blue-600 dark:text-blue-400" /> Add Single College
              </h3>
              <form onSubmit={handleAddCollege} className="grid grid-cols-2 gap-5">
                <div className="col-span-2">
                  <input
                    type="text" required value={collegeName} onChange={(e) => setCollegeName(e.target.value)}
                    className="w-full rounded-[16px] border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white px-5 py-3.5 text-[14px] font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
                    placeholder="College Name"
                  />
                </div>
                <div>
                  <input
                    type="text" required value={dteCode} onChange={(e) => setDteCode(e.target.value)}
                    className="w-full rounded-[16px] border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white px-5 py-3.5 text-[14px] font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
                    placeholder="DTE Code"
                  />
                </div>
                <div>
                  <input
                    type="text" value={district} onChange={(e) => setDistrict(e.target.value)}
                    className="w-full rounded-[16px] border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white px-5 py-3.5 text-[14px] font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
                    placeholder="District"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="text" value={university} onChange={(e) => setUniversity(e.target.value)}
                    className="w-full rounded-[16px] border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white px-5 py-3.5 text-[14px] font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
                    placeholder="University"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="text" value={collegeBranches} onChange={(e) => setCollegeBranches(e.target.value)}
                    className="w-full rounded-[16px] border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white px-5 py-3.5 text-[14px] font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
                    placeholder="Available Branches (comma separated)"
                  />
                </div>
                <button
                  type="submit" disabled={loading}
                  className="col-span-2 flex justify-center items-center gap-2 rounded-full bg-slate-900 dark:bg-slate-100 py-3.5 text-[14px] font-extrabold text-white dark:text-slate-900 shadow-md shadow-slate-900/20 hover:bg-slate-800 dark:hover:bg-white hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 transition-all"
                >
                  <Plus className="h-4 w-4" /> Save Registration
                </button>
              </form>
            </div>

            <div className="rounded-[24px] border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col transition-all">
              <div className="px-8 py-5 border-b border-slate-100 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 flex justify-between items-center">
                <h4 className="font-extrabold text-[16px] text-slate-800 dark:text-white tracking-tight">Master Directory</h4>
              </div>
              <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                <table className="w-full border-collapse text-left text-[14px]">
                  <thead className="sticky top-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md shadow-sm z-10 border-b border-slate-100 dark:border-slate-700">
                    <tr className="text-[12px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      <th className="px-6 py-4">Code</th>
                      <th className="px-6 py-4">College Name & Info</th>
                      <th className="px-6 py-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                    {colleges.length === 0 ? (
                      <tr><td colSpan={3} className="px-6 py-10 text-center font-medium text-slate-400">No colleges configured.</td></tr>
                    ) : (
                      colleges.map((col) => (
                        <tr key={col.id || col.dteCode} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                          <td className="px-6 py-4 font-black text-blue-600 dark:text-blue-400">{col.dteCode}</td>
                          <td className="px-6 py-4">
                            <div className="font-extrabold text-slate-800 dark:text-slate-200">{col.name}</div>
                            <div className="text-[13px] font-medium text-slate-500 dark:text-slate-400 mt-1">{col.district} • {col.university}</div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handleDeleteCollege(col.id || col.dteCode)}
                              className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 p-2.5 rounded-[12px] transition-all"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {hasMore && (
                <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex justify-center">
                  <button 
                    onClick={fetchMoreColleges} 
                    disabled={loadingMore}
                    className="text-[13px] font-extrabold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-2 transition-colors px-4 py-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  >
                    {loadingMore ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    Load More Colleges
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Branches Section */}
          <div className="space-y-8">
            <div className="rounded-[24px] border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
              <h3 className="text-[18px] font-extrabold text-slate-800 dark:text-white mb-6 flex items-center gap-3 tracking-tight">
                <Layers className="h-6 w-6 text-indigo-600 dark:text-indigo-400" /> Configure Global Branch
              </h3>
              <form onSubmit={handleAddBranch} className="flex gap-3">
                <input
                  type="text" required value={branchName} onChange={(e) => setBranchName(e.target.value)}
                  className="flex-1 rounded-[16px] border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white px-5 py-3.5 text-[14px] font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
                  placeholder="e.g. Computer Science Engineering"
                />
                <button
                  type="submit" disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-full bg-slate-900 dark:bg-slate-100 px-6 py-3.5 text-[14px] font-extrabold text-white dark:text-slate-900 shadow-md shadow-slate-900/20 hover:bg-slate-800 dark:hover:bg-white hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 transition-all shrink-0"
                >
                  <Plus className="h-4 w-4" /> Add
                </button>
              </form>
            </div>

            <div className="rounded-[24px] border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden transition-all">
              <div className="px-8 py-5 border-b border-slate-100 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80">
                <h4 className="font-extrabold text-[16px] text-slate-800 dark:text-white tracking-tight">Global Branches ({branches.length})</h4>
              </div>
              <ul className="divide-y divide-slate-50 dark:divide-slate-700/50 max-h-56 overflow-y-auto custom-scrollbar">
                {branches.length === 0 ? (
                  <li className="px-6 py-10 text-center font-medium text-slate-400 text-[14px]">No branches configured.</li>
                ) : (
                  branches.map((b) => (
                    <li key={b.id} className="flex items-center justify-between px-8 py-4 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                      <span className="font-extrabold text-[15px] text-slate-700 dark:text-slate-200">{b.name}</span>
                      <button
                        onClick={() => handleDeleteBranch(b.id)}
                        className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 p-2.5 rounded-[12px] transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
            
            {/* Exams Section */}
            <div className="rounded-[24px] border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
              <h3 className="text-[18px] font-extrabold text-slate-800 dark:text-white mb-6 flex items-center gap-3 tracking-tight">
                <Layers className="h-6 w-6 text-orange-600 dark:text-orange-400" /> Competitive Exam Categories
              </h3>
              <form onSubmit={handleAddExam} className="flex gap-3">
                <input
                  type="text" required value={examName} onChange={(e) => setExamName(e.target.value)}
                  className="flex-1 rounded-[16px] border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white px-5 py-3.5 text-[14px] font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
                  placeholder="e.g. UPSC, MPSC"
                />
                <button
                  type="submit" disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-full bg-slate-900 dark:bg-slate-100 px-6 py-3.5 text-[14px] font-extrabold text-white dark:text-slate-900 shadow-md shadow-slate-900/20 hover:bg-slate-800 dark:hover:bg-white hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 transition-all shrink-0"
                >
                  <Plus className="h-4 w-4" /> Add
                </button>
              </form>
            </div>

            <div className="rounded-[24px] border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden transition-all">
              <div className="px-8 py-5 border-b border-slate-100 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80">
                <h4 className="font-extrabold text-[16px] text-slate-800 dark:text-white tracking-tight">Exam Categories ({exams.length})</h4>
              </div>
              <ul className="divide-y divide-slate-50 dark:divide-slate-700/50 max-h-56 overflow-y-auto custom-scrollbar">
                {exams.length === 0 ? (
                  <li className="px-6 py-10 text-center font-medium text-slate-400 text-[14px]">No exams configured.</li>
                ) : (
                  exams.map((b) => (
                    <li key={b.id} className="flex items-center justify-between px-8 py-4 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                      <span className="font-extrabold text-[15px] text-slate-700 dark:text-slate-200">{b.name}</span>
                      <button
                        onClick={() => handleDeleteExam(b.id)}
                        className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 p-2.5 rounded-[12px] transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #475569;
        }
      `}</style>
    </div>
  );
}
