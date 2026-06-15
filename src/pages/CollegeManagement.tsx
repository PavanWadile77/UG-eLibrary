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
    <div className="flex-1 bg-slate-50 min-h-screen">
      <Header title="Colleges & Syllabus Settings" />

      {loading && (
        <div className="h-1 bg-blue-100 w-full overflow-hidden">
          <div className="animate-progress h-full bg-blue-600 w-1/3 rounded-full"></div>
        </div>
      )}

      <main className="p-8">
        {error && <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-600">{error}</div>}
        {success && <div className="mb-6 rounded-xl bg-green-50 p-4 text-sm font-semibold text-green-600">{success}</div>}

        {!isFirebaseDemo && (
          <div className="mb-8 rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-yellow-900 text-lg flex items-center gap-2">
                Temporary Verification Tool (Production Firestore)
              </h3>
              <button 
                onClick={fetchAdminStats}
                disabled={checkingStats}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-bold shadow hover:bg-yellow-700"
              >
                {checkingStats ? 'Scanning...' : 'Scan Database'}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
               <div className="bg-white p-4 rounded-xl border border-yellow-200 shadow-sm">
                 <p className="text-xs font-bold text-slate-500 uppercase">Total Firestore Records</p>
                 <p className="text-2xl font-black text-slate-800">{adminStats.total}</p>
               </div>
               <div className="bg-white p-4 rounded-xl border border-yellow-200 shadow-sm">
                 <p className="text-xs font-bold text-slate-500 uppercase">DTE 5545 Exists?</p>
                 <p className={`text-2xl font-black ${adminStats.has5545 ? 'text-green-600' : 'text-red-600'}`}>
                   {adminStats.has5545 ? 'YES' : 'NO'}
                 </p>
               </div>
               <div className="bg-white p-4 rounded-xl border border-yellow-200 shadow-sm">
                 <p className="text-xs font-bold text-slate-500 uppercase">5545 Import Date</p>
                 <p className="text-sm font-bold text-slate-800 mt-2">{adminStats.lastImport}</p>
               </div>
            </div>
            {adminStats.total === 0 && !checkingStats && (
               <p className="text-sm text-red-600 mt-4 font-bold">
                 Warning: Production database is empty. Please click "Seed Production Dataset" below.
               </p>
            )}
          </div>
        )}

        <div className="mb-8 rounded-2xl border border-blue-200 bg-blue-50/50 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="font-bold text-blue-900 text-lg flex items-center gap-2">
              <Database className="h-5 w-5" /> Master College Directory
            </h3>
            <p className="text-sm text-blue-700 mt-1">
              Bulk import or export official Maharashtra DTE colleges. The data structure maps to dropdowns for Students and Teachers.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 rounded-xl bg-white border border-blue-200 px-4 py-2.5 text-sm font-bold text-blue-700 hover:bg-blue-100 transition-colors"
            >
              <Download className="h-4 w-4" /> Export CSV
            </button>
            <label className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 disabled:bg-blue-300 transition-colors cursor-pointer">
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
              className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-purple-500/20 hover:bg-purple-700 disabled:bg-purple-300 transition-colors"
            >
              <Database className="h-4 w-4" /> Seed Production Dataset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Colleges Section */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <School className="h-5 w-5 text-blue-600" /> Add Single College
              </h3>
              <form onSubmit={handleAddCollege} className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <input
                    type="text" required value={collegeName} onChange={(e) => setCollegeName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="College Name"
                  />
                </div>
                <div>
                  <input
                    type="text" required value={dteCode} onChange={(e) => setDteCode(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="DTE Code"
                  />
                </div>
                <div>
                  <input
                    type="text" value={district} onChange={(e) => setDistrict(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="District"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="text" value={university} onChange={(e) => setUniversity(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="University"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="text" value={collegeBranches} onChange={(e) => setCollegeBranches(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Available Branches (comma separated)"
                  />
                </div>
                <button
                  type="submit" disabled={loading}
                  className="col-span-2 flex justify-center items-center gap-1 rounded-xl bg-slate-900 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:bg-slate-400 transition-colors"
                >
                  <Plus className="h-4 w-4" /> Save Registration
                </button>
              </form>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h4 className="font-bold text-slate-800">Master Directory Directory</h4>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="sticky top-0 bg-slate-100/90 backdrop-blur-sm shadow-sm">
                    <tr className="text-xs font-semibold text-slate-500 uppercase">
                      <th className="px-4 py-3">Code</th>
                      <th className="px-4 py-3">College Name & Info</th>
                      <th className="px-4 py-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {colleges.length === 0 ? (
                      <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-400">No colleges configured.</td></tr>
                    ) : (
                      colleges.map((col) => (
                        <tr key={col.id || col.dteCode} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-bold text-blue-600">{col.dteCode}</td>
                          <td className="px-4 py-3">
                            <div className="font-semibold text-slate-800">{col.name}</div>
                            <div className="text-xs text-slate-500 mt-1">{col.district} • {col.university}</div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => handleDeleteCollege(col.id || col.dteCode)}
                              className="text-red-500 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
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
                <div className="p-3 border-t border-slate-100 bg-slate-50 flex justify-center">
                  <button 
                    onClick={fetchMoreColleges} 
                    disabled={loadingMore}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-2"
                  >
                    {loadingMore ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
                    Load More Colleges
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Branches Section */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Layers className="h-5 w-5 text-indigo-600" /> Configure Global Branch
              </h3>
              <form onSubmit={handleAddBranch} className="flex gap-2">
                <input
                  type="text" required value={branchName} onChange={(e) => setBranchName(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g. Computer Science Engineering"
                />
                <button
                  type="submit" disabled={loading}
                  className="flex items-center gap-1 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:bg-slate-400 transition-colors"
                >
                  <Plus className="h-4 w-4" /> Add
                </button>
              </form>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h4 className="font-bold text-slate-800">Global Branches ({branches.length})</h4>
              </div>
              <ul className="divide-y divide-slate-200 max-h-48 overflow-y-auto">
                {branches.length === 0 ? (
                  <li className="px-6 py-8 text-center text-slate-400 text-sm">No branches configured.</li>
                ) : (
                  branches.map((b) => (
                    <li key={b.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/25">
                      <span className="font-medium text-slate-700">{b.name}</span>
                      <button
                        onClick={() => handleDeleteBranch(b.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
            
            {/* Exams Section */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mt-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Layers className="h-5 w-5 text-orange-600" /> Competitive Exam Categories
              </h3>
              <form onSubmit={handleAddExam} className="flex gap-2">
                <input
                  type="text" required value={examName} onChange={(e) => setExamName(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g. UPSC, MPSC"
                />
                <button
                  type="submit" disabled={loading}
                  className="flex items-center gap-1 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:bg-slate-400 transition-colors"
                >
                  <Plus className="h-4 w-4" /> Add
                </button>
              </form>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h4 className="font-bold text-slate-800">Exam Categories ({exams.length})</h4>
              </div>
              <ul className="divide-y divide-slate-200 max-h-48 overflow-y-auto">
                {exams.length === 0 ? (
                  <li className="px-6 py-8 text-center text-slate-400 text-sm">No exams configured.</li>
                ) : (
                  exams.map((b) => (
                    <li key={b.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/25">
                      <span className="font-medium text-slate-700">{b.name}</span>
                      <button
                        onClick={() => handleDeleteExam(b.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
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
    </div>
  );
}
