import { useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function CreateEventForm({ onCreated }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const body = {
        title,
        description: description || undefined,
        date: date ? new Date(date).toISOString() : undefined,
        location: location || undefined,
      };
      const res = await fetch(`${API_BASE}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Failed to create event');
      const data = await res.json();
      onCreated?.(data);
      setTitle('');
      setDate('');
      setLocation('');
      setDescription('');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur rounded-2xl p-5 border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">Create a new event</h3>
      {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 w-full rounded-lg border-gray-300 focus:ring-rose-500 focus:border-rose-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full rounded-lg border-gray-300 focus:ring-rose-500 focus:border-rose-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1 w-full rounded-lg border-gray-300 focus:ring-rose-500 focus:border-rose-500" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 w-full rounded-lg border-gray-300 focus:ring-rose-500 focus:border-rose-500" />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button disabled={loading} className="inline-flex items-center justify-center rounded-lg bg-rose-500 text-white px-4 py-2 font-medium hover:bg-rose-600 transition disabled:opacity-60">
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </div>
    </form>
  );
}
