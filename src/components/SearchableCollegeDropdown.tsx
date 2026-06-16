import React, { useState, useEffect, useRef } from 'react';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { db, isFirebaseDemo } from '../firebase';
import { Search, Loader2, ChevronDown } from 'lucide-react';
import { maharashtraColleges } from '../data/maharashtra_dte_colleges';

export interface College {
  id?: string;
  dteCode: string;
  name: string;
  district?: string;
  university?: string;
  courseTypes?: string;
  status?: string;
  branches?: string; // Comma or pipe separated branch names
}

interface SearchableCollegeDropdownProps {
  value: string; // The dteCode of the selected college
  onChange: (college: College | null) => void;
  error?: string;
}

export default function SearchableCollegeDropdown({ value, onChange, error }: SearchableCollegeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [debugSource, setDebugSource] = useState<string>('');
  const [totalColleges, setTotalColleges] = useState<number>(0);
  const [displayLimit, setDisplayLimit] = useState<number>(50);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLUListElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 10) {
      if (results.length === displayLimit) {
        setDisplayLimit(prev => prev + 50);
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setDisplayLimit(50);
  };

  useEffect(() => {
    // Load selected college details on mount if value exists but selectedCollege doesn't
    const loadSelected = async () => {
      if (value && !selectedCollege?.name) {
        if (isFirebaseDemo) {
          const stored = localStorage.getItem('demo_colleges');
          const cols: College[] = stored ? JSON.parse(stored) : [];
          const found = cols.find(c => c.dteCode === value);
          if (found) setSelectedCollege(found);
        } else {
          try {
            const q = query(collection(db, 'colleges'), where('dteCode', '==', value), limit(1));
            const snap = await getDocs(q);
            if (!snap.empty) {
              setSelectedCollege(snap.docs[0].data() as College);
              return;
            }
          } catch (err) {
            console.error('Failed to load selected college from Firestore, trying fallback', err);
          }
          
          const found = maharashtraColleges.find(c => String(c.dteCode) === String(value));
          if (found) setSelectedCollege(found);
        }
      }
    };
    loadSelected();
  }, [value]);

  useEffect(() => {
    // Click outside handler
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        let list: College[] = [];
        let source = '';
        let total = 0;
        const lowerTerm = searchTerm.toLowerCase();

        // 1. Try Firestore (only if not in demo mode)
        if (!isFirebaseDemo) {
          try {
            let q;
            if (!searchTerm) {
              q = query(collection(db, 'colleges'), limit(displayLimit));
            } else if (!isNaN(Number(searchTerm))) {
              q = query(
                collection(db, 'colleges'), 
                where('dteCode', '>=', searchTerm),
                where('dteCode', '<=', searchTerm + '\uf8ff'),
                limit(displayLimit)
              );
            } else {
              const capitalizedSearch = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1);
              q = query(
                collection(db, 'colleges'), 
                where('name', '>=', capitalizedSearch),
                where('name', '<=', capitalizedSearch + '\uf8ff'),
                limit(displayLimit)
              );
            }
            const snap = await getDocs(q);
            snap.forEach(doc => list.push(doc.data() as College));
            if (list.length > 0) {
              source = 'Firestore';
              total = list.length; // We don't know the full size easily
            }
          } catch (firebaseErr) {
            console.error("Firestore query failed, trying fallback:", firebaseErr);
          }
        }

        // 2. Fallback to localStorage if Firestore failed/empty or in demo mode
        if (list.length === 0) {
          const stored = localStorage.getItem('demo_colleges');
          const cols: College[] = stored ? JSON.parse(stored) : [];
          if (cols.length > 0) {
            source = 'Local Storage (demo_colleges)';
            total = cols.length;
            list = cols.filter(c => 
              c.name.toLowerCase().includes(lowerTerm) || 
              String(c.dteCode).includes(searchTerm)
            ).slice(0, displayLimit);
          }
        }

        // 3. Fallback to maharashtraColleges master dataset
        if (list.length === 0) {
          source = 'Master Dataset (maharashtraColleges)';
          total = maharashtraColleges.length;
          list = maharashtraColleges.filter(c => {
            if (!c) return false;
            const nMatch = c.name ? c.name.toLowerCase().includes(lowerTerm) : false;
            const dMatch = c.dteCode ? String(c.dteCode).includes(searchTerm) : false;
            return nMatch || dMatch;
          }).slice(0, displayLimit);
        }

        setResults(list);
        setDebugSource(source);
        setTotalColleges(total);

      } catch (err) {
        console.error("Critical error in fetchResults:", err);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, isOpen, displayLimit]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div 
        className={`w-full flex items-center justify-between rounded-xl border ${error ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'} px-4 py-3 text-sm shadow-sm cursor-pointer hover:border-blue-400 transition-colors`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedCollege ? 'text-slate-800 font-medium truncate' : 'text-slate-400'}>
          {selectedCollege ? `${selectedCollege.name} (${selectedCollege.dteCode})` : 'Search or select a college...'}
        </span>
        <ChevronDown className="h-4 w-4 text-slate-400 ml-2 flex-shrink-0" />
      </div>
      
      {error && <p className="text-xs text-red-500 mt-1 font-medium">{error}</p>}

      {/* Temporary Debug Info */}
      <div className="mt-2 text-xs text-slate-500 bg-slate-100 p-2 rounded-lg border border-slate-200">
        <strong className="text-slate-700">Debug Info:</strong><br />
        <span className="font-semibold">Source:</span> {debugSource || 'Pending...'}<br />
        <span className="font-semibold">Total DB Size:</span> {totalColleges}<br />
        <span className="font-semibold">Search Results:</span> {results.length}
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden">
          <div className="p-2 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              autoFocus
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              placeholder="Type DTE Code or College Name..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {loading && <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />}
          </div>
          
          <ul className="max-h-60 overflow-y-auto py-1" onScroll={handleScroll}>
            {results.length === 0 && !loading ? (
              <li className="px-4 py-3 text-sm text-slate-500 text-center">No colleges found.</li>
            ) : (
              results.map((col) => (
                <li 
                  key={col.dteCode}
                  className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer text-sm border-b border-slate-50 last:border-0"
                  onClick={() => {
                    setSelectedCollege(col);
                    onChange(col);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                >
                  <div className="font-semibold text-slate-800">{col.name}</div>
                  <div className="text-xs text-slate-500 flex gap-2 mt-0.5">
                    <span className="font-medium text-blue-600 bg-blue-100/50 px-1.5 py-0.5 rounded">DTE: {col.dteCode}</span>
                    {col.district && <span>{col.district}</span>}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
