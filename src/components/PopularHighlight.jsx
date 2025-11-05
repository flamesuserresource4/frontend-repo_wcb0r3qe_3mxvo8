import { useEffect, useState } from 'react';
import { Crown, Flame } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function PopularHighlight() {
  const [most, setMost] = useState(null);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${API_BASE}/events/most-popular`);
        const data = await res.json();
        if (!data || data.message) {
          setMost(null);
        } else {
          setMost(data);
        }
      } catch {
        setMost(null);
      }
    };
    run();
  }, []);

  if (!most) return null;

  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-amber-800">
            <Crown className="h-5 w-5" /> Most popular right now
          </div>
          <h3 className="mt-1 text-xl font-semibold text-amber-900">{most.title}</h3>
          {most.description && <p className="text-amber-800/90">{most.description}</p>}
        </div>
        <div className="inline-flex items-center gap-1 bg-white border border-amber-200 rounded-full px-3 py-1 text-amber-800">
          <Flame className="h-4 w-4" /> {most.registrations_count ?? 0}
        </div>
      </div>
    </div>
  );
}
