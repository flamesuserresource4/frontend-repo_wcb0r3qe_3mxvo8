import { User, Settings } from 'lucide-react';

export default function RoleSwitcher({ role, onChange }) {
  return (
    <div className="inline-flex rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <button
        className={`px-4 py-2 flex items-center gap-2 transition ${role === 'participant' ? 'bg-rose-500 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
        onClick={() => onChange('participant')}
        aria-pressed={role === 'participant'}
      >
        <User className="h-4 w-4" /> Participant
      </button>
      <button
        className={`px-4 py-2 flex items-center gap-2 transition ${role === 'committee' ? 'bg-rose-500 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
        onClick={() => onChange('committee')}
        aria-pressed={role === 'committee'}
      >
        <Settings className="h-4 w-4" /> Committee
      </button>
    </div>
  );
}
