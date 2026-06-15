import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db, isFirebaseDemo } from '../firebase';
import Header from '../components/Header';
import { Plus, Trash2, Database, School, Layers } from 'lucide-react';

interface College {
  id: string;
  dteCode: string;
  name: string;
}

interface Branch {
  id: string;
  name: string;
}

export default function CollegeManagement() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form entries
  const [collegeName, setCollegeName] = useState('');
  const [dteCode, setDteCode] = useState('');
  const [branchName, setBranchName] = useState('');

  const defaultColleges = [
    { name: 'College of Engineering, Pune (COEP)', dteCode: '6006' },
    { name: 'Veermata Jijabai Technological Institute (VJTI), Mumbai', dteCode: '3012' },
    { name: 'Pune Institute of Computer Technology, Pune', dteCode: '6278' },
    { name: 'Shri Sant Gajanan Maharaj College of Engineering, Shegaon', dteCode: '3199' },
  ];

  const defaultBranches = [
    'Computer Engineering', 'Information Technology', 'AI & DS', 'AI & ML',
    'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering',
    'Electronics Engineering', 'Electronics & Telecommunication', 'Chemical Engineering',
    'Instrumentation', 'Automobile Engineering', 'Pharmacy', 'MBA', 'MCA',
    'Diploma Branches', 'BSc', 'BCom', 'BA', 'MTech', 'Polytechnic Programs', 'Other Courses'
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      
      if (isFirebaseDemo) {
        // Fetch from local storage
        const colsStored = localStorage.getItem('demo_colleges');
        const brsStored = localStorage.getItem('demo_branches');

        const colList: College[] = colsStored ? JSON.parse(colsStored) : [];
        const branchList: Branch[] = brsStored ? JSON.parse(brsStored) : [];

        setColleges(colList);
        setBranches(branchList);
      } else {
        const collegesSnap = await getDocs(collection(db, 'colleges'));
        const colList: College[] = [];
        collegesSnap.forEach((doc) => {
          colList.push({ id: doc.id, ...doc.data() } as College);
        });
        setColleges(colList);

        const branchesSnap = await getDocs(collection(db, 'branches'));
        const branchList: Branch[] = [];
        branchesSnap.forEach((doc) => {
          branchList.push({ id: doc.id, ...doc.data() } as Branch);
        });
        setBranches(branchList);
      }
    } catch (err: any) {
      console.error(err);
      setError('Failed to fetch syllabus options database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddCollege = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collegeName || !dteCode) return;
    setLoading(true);

    try {
      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_colleges');
        const list: College[] = stored ? JSON.parse(stored) : [];
        
        // Prevent duplicate dteCode
        const filtered = list.filter((c) => c.dteCode !== dteCode);
        filtered.push({ id: dteCode, name: collegeName, dteCode });
        localStorage.setItem('demo_colleges', JSON.stringify(filtered));
        setSuccess('College registered successfully in Demo DB!');
      } else {
        await setDoc(doc(db, 'colleges', dteCode), {
          name: collegeName,
          dteCode: dteCode,
          createdAt: new Date().toISOString()
        });
        setSuccess('College registered successfully!');
      }
      setCollegeName('');
      setDteCode('');
      fetchData();
    } catch (err: any) {
      console.error(err);
      setError('Failed to register college.');
      setLoading(false);
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
        setSuccess('Branch configured successfully in Demo DB!');
      } else {
        await setDoc(doc(db, 'branches', branchId), {
          name: branchName,
          createdAt: new Date().toISOString()
        });
        setSuccess('Branch configured successfully!');
      }
      setBranchName('');
      fetchData();
    } catch (err: any) {
      console.error(err);
      setError('Failed to configure branch.');
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
        setSuccess('College removed from Demo DB.');
      } else {
        await deleteDoc(doc(db, 'colleges', id));
        setSuccess('College removed.');
      }
      fetchData();
    } catch (err) {
      console.error(err);
      setError('Delete action failed.');
      setLoading(false);
    }
  };

  const handleDeleteBranch = async (id: string) => {
    if (!window.confirm('Delete this department configuration?')) return;
    setLoading(true);
    try {
      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_branches');
        const list: Branch[] = stored ? JSON.parse(stored) : [];
        const filtered = list.filter((b) => b.id !== id);
        localStorage.setItem('demo_branches', JSON.stringify(filtered));
        setSuccess('Branch removed from Demo DB.');
      } else {
        await deleteDoc(doc(db, 'branches', id));
        setSuccess('Branch removed.');
      }
      fetchData();
    } catch (err) {
      console.error(err);
      setError('Delete action failed.');
      setLoading(false);
    }
  };

  const seedDatabase = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      if (isFirebaseDemo) {
        const colList: College[] = defaultColleges.map((c) => ({ id: c.dteCode, ...c }));
        const branchList: Branch[] = defaultBranches.map((b) => ({ id: b.toLowerCase().replace(/[^a-z0-9]+/g, '-'), name: b }));
        
        localStorage.setItem('demo_colleges', JSON.stringify(colList));
        localStorage.setItem('demo_branches', JSON.stringify(branchList));
        setSuccess('Baseline colleges and DTE parameters seeded in Demo DB!');
      } else {
        // Seed Colleges
        for (const col of defaultColleges) {
          await setDoc(doc(db, 'colleges', col.dteCode), {
            name: col.name,
            dteCode: col.dteCode,
            createdAt: new Date().toISOString()
          });
        }

        // Seed Branches
        for (const branch of defaultBranches) {
          const branchId = branch.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          await setDoc(doc(db, 'branches', branchId), {
            name: branch,
            createdAt: new Date().toISOString()
          });
        }

        // Seed Years
        const defaultYears = ['First Year', 'Second Year', 'Third Year', 'Final Year'];
        for (const year of defaultYears) {
          const yearId = year.toLowerCase().replace(/\s+/g, '-');
          await setDoc(doc(db, 'years', yearId), {
            name: year,
            createdAt: new Date().toISOString()
          });
        }
        setSuccess('Baseline colleges, DTE parameters, and years dataset successfully seeded!');
      }
      fetchData();
    } catch (err: any) {
      console.error(err);
      setError('Database seeding failed: ' + err.message);
      setLoading(false);
    }
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

        {/* Database seed banner */}
        <div className="mb-8 rounded-2xl border border-blue-200 bg-blue-50/50 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-blue-900 text-lg flex items-center gap-2">
              <Database className="h-5 w-5" /> Seed Default Syllabus Parameters
            </h3>
            <p className="text-sm text-blue-700 mt-1">
              Click to seed {isFirebaseDemo ? 'Local Storage' : 'Firestore'} with initial Maharashtra DTE codes, departments, and course semesters.
            </p>
          </div>
          <button
            onClick={seedDatabase}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
          >
            <Database className="h-4 w-4" /> Seed Database
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Colleges Section */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <School className="h-5 w-5 text-blue-600" /> Register College & DTE Code
              </h3>
              <form onSubmit={handleAddCollege} className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <input
                    type="text"
                    required
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="College Name"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    required
                    value={dteCode}
                    onChange={(e) => setDteCode(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="DTE Code"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="col-span-3 flex justify-center items-center gap-1 rounded-xl bg-slate-900 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:bg-slate-400 transition-colors"
                >
                  <Plus className="h-4 w-4" /> Add College
                </button>
              </form>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h4 className="font-bold text-slate-800">Colleges Configured ({colleges.length})</h4>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-100/50 text-xs font-semibold text-slate-500 uppercase">
                      <th className="px-6 py-3">Code</th>
                      <th className="px-6 py-3">College Name</th>
                      <th className="px-6 py-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {colleges.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-8 text-center text-slate-400">No colleges configured.</td>
                      </tr>
                    ) : (
                      colleges.map((col) => (
                        <tr key={col.id}>
                          <td className="px-6 py-4 font-bold text-slate-800">{col.dteCode}</td>
                          <td className="px-6 py-4 text-slate-600">{col.name}</td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handleDeleteCollege(col.id)}
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
            </div>
          </div>

          {/* Branches Section */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Layers className="h-5 w-5 text-indigo-600" /> Configure Department/Branch
              </h3>
              <form onSubmit={handleAddBranch} className="flex gap-2">
                <input
                  type="text"
                  required
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g. Computer Science Engineering"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-1 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:bg-slate-400 transition-colors"
                >
                  <Plus className="h-4 w-4" /> Add
                </button>
              </form>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h4 className="font-bold text-slate-800">Branches Configured ({branches.length})</h4>
              </div>
              <ul className="divide-y divide-slate-200 max-h-96 overflow-y-auto">
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
          </div>
        </div>
      </main>
    </div>
  );
}
