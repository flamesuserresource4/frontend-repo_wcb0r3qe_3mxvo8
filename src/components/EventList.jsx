import { useEffect, useState } from 'react';
import { Calendar, MapPin, Users, Flame, Crown } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function EventList({ role }) {
  const [events, setEvents] = useState([]);
  const [most, setMost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const [evRes, mpRes] = await Promise.all([
        fetch(`${API_BASE}/events`),
        fetch(`${API_BASE}/events/most-popular`),
      ]);
      const evData = await evRes.json();
      const mpData = await mpRes.json();
      setEvents(Array.isArray(evData) ? evData : []);
      setMost(mpData && !mpData.message ? mpData : null);
    } catch (e) {
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const register = async (id) => {
    try {
      const name = 'Guest';
      const email = `guest+${Math.floor(Math.random()*100000)}@example.com`;
      const res = await fetch(`${API_BASE}/events/${id}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, role: 'participant' })
      });
      if (!res.ok) throw new Error('Failed');
      await fetchEvents();
    } catch (e) {
      alert('Could not register right now.');
    }
  };

  if (loading) return <div className="text-gray-600">Loading events…</div>;
  if (error) return <div className="text-rose-600">{error}</div>;

  return (
    <div className="flex flex-col gap-6">
      {most && (
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
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((ev) => (
          <div key={ev.id} className="group rounded-2xl border border-gray-200 bg-white/80 backdrop-blur p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{ev.title}</h3>
              <span className="inline-flex items-center gap-1 text-sm text-rose-600 bg-rose-50 px-2 py-1 rounded-full border border-rose-100">
                <Flame className="h-4 w-4" /> {ev.registrations_count ?? 0}
              </span>
            </div>
            {ev.description && <p className="mt-1 text-gray-600">{ev.description}</p>}
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-600">
              {ev.date && (
                <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(ev.date).toLocaleString()}</span>
              )}
              {ev.location && (
                <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {ev.location}</span>
              )}
              <span className="inline-flex items-center gap-1"><Users className="h-4 w-4" /> {ev.registrations_count ?? 0} registered</span>
            </div>
            <div className="mt-4 flex justify-end">
              {role === 'participant' && (
                <button onClick={() => register(ev.id)} className="rounded-lg bg-rose-500 text-white px-4 py-2 font-medium hover:bg-rose-600 transition">
                  Register
                </button>
              )}
              {role === 'committee' && (
                <div className="text-sm text-gray-500">Committee view</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
