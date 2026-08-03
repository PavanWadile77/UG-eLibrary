import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, query, where } from 'firebase/firestore';
import { db, isFirebaseDemo } from '../firebase';
import Header from '../components/Header';
import { Users, Trash2, Search, School, Layers, Calendar } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  collegeName: string;
  dteCode: string;
  branch: string;
  year: string;
  createdAt: string;
}

export default function StudentManagement() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Search parameters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [branches, setBranches] = useState<string[]>([]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError('');

      if (isFirebaseDemo) {
        // Load demo students from localStorage
        const stored = localStorage.getItem('demo_students');
        const demoList: Student[] = stored ? JSON.parse(stored) : [
          { id: 'd1', name: 'Rahul Patil', email: 'rahul.patil@gmail.com', photoUrl: '', collegeName: 'College of Engineering, Pune (COEP)', dteCode: '6006', branch: 'Computer Engineering', year: 'Second Year', createdAt: new Date().toISOString() },
          { id: 'd2', name: 'Priya Sharma', email: 'priya.sharma@gmail.com', photoUrl: '', collegeName: 'VJTI Mumbai', dteCode: '3012', branch: 'Information Technology', year: 'Third Year', createdAt: new Date().toISOString() },
          { id: 'd3', name: 'Amit Desai', email: 'amit.desai@gmail.com', photoUrl: '', collegeName: 'PICT Pune', dteCode: '6278', branch: 'Mechanical Engineering', year: 'First Year', createdAt: new Date().toISOString() },
          { id: 'd4', name: 'Sneha Kulkarni', email: 'sneha.k@gmail.com', photoUrl: '', collegeName: 'College of Engineering, Pune (COEP)', dteCode: '6006', branch: 'Artificial Intelligence & Data Science', year: 'Fourth Year', createdAt: new Date().toISOString() },
        ];
        const branchSet = new Set<string>(demoList.map((s) => s.branch));
        setStudents(demoList);
        setFilteredStudents(demoList);
        setBranches(['All', ...Array.from(branchSet)]);
      } else {
        const q = query(collection(db, 'users'), where('role', '==', 'student'));
        const snap = await getDocs(q);
        const list: Student[] = [];
        const branchSet = new Set<string>();

        snap.forEach((doc) => {
          const data = doc.data();
          list.push({ id: doc.id, ...data } as Student);
          if (data.branch) branchSet.add(data.branch);
        });

        setStudents(list);
        setFilteredStudents(list);
        setBranches(['All', ...Array.from(branchSet)]);
      }
    } catch (err: any) {
      console.error(err);
      setError('Failed to fetch student profile registrations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter students whenever query or dropdown filters change
  useEffect(() => {
    let result = students;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.dteCode.includes(q) ||
          s.collegeName.toLowerCase().includes(q)
      );
    }

    if (selectedBranch !== 'All') {
      result = result.filter((s) => s.branch === selectedBranch);
    }

    setFilteredStudents(result);
  }, [searchQuery, selectedBranch, students]);

  const handleDeleteStudent = async (student: Student) => {
    if (!window.confirm(`Delete profile for student ${student.name} permanently?`)) return;
    setLoading(true);

    try {
      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_students');
        const existing: Student[] = stored ? JSON.parse(stored) : [];
        const updated = existing.filter((s) => s.id !== student.id);
        localStorage.setItem('demo_students', JSON.stringify(updated));
        setStudents((prev) => prev.filter((s) => s.id !== student.id));
        setSuccess('Student profile removed from local Demo storage.');
        setLoading(false);
      } else {
        await deleteDoc(doc(db, 'users', student.id));
        setSuccess('Student profile removed.');
        fetchStudents();
      }
    } catch (err: any) {
      console.error(err);
      setError('Failed to delete student: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen">
      <Header title="Student Profiles Registry" />

      {loading && (
        <div className="h-1 bg-blue-100 w-full overflow-hidden">
          <div className="animate-progress h-full bg-blue-600 w-1/3 rounded-full"></div>
        </div>
      )}

      <main className="p-8">
        {error && <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-600">{error}</div>}
        {success && <div className="mb-6 rounded-xl bg-green-50 p-4 text-sm font-semibold text-green-600">{success}</div>}

        {/* Filters Panel */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search className="h-5 w-5" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Search by name, email, DTE code..."
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="w-full md:w-64">
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-sm outline-none focus:border-blue-500"
              >
                {branches.map((b) => (
                  <option key={b} value={b}>{b === 'All' ? 'All Branches' : b}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Student Table view */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">College</th>
                <th className="px-6 py-4">Branch & Year</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400">No registered students found matching filters.</td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80'}
                          alt={student.name}
                          className="h-10 w-10 rounded-full object-cover border border-slate-100"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80';
                          }}
                        />
                        <div>
                          <div className="font-bold text-slate-800">{student.name}</div>
                          <div className="text-xs text-slate-400">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <School className="h-4 w-4 text-slate-400" />
                        <div>
                          <div className="font-semibold text-slate-800 text-xs">{student.collegeName || 'Unknown College'}</div>
                          <div className="text-[11px] text-slate-400">DTE: {student.dteCode}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                          <Layers className="h-3.5 w-3.5 text-slate-400" /> {student.branch}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Calendar className="h-3.5 w-3.5 text-slate-400" /> {student.year}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDeleteStudent(student)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
