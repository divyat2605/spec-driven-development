'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Agent {
  id: string;
  name: string;
}

interface TherapyType {
  id: string;
  name: string;
  duration: number;
}

export default function NewAppointmentPage() {
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [therapyTypes, setTherapyTypes] = useState<TherapyType[]>([]);
  const [agentId, setAgentId] = useState('');
  const [therapyTypeId, setTherapyTypeId] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [duration, setDuration] = useState(60);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLists = async () => {
      try {
        const [agentRes, therapyRes] = await Promise.all([
          fetch('/api/agents'),
          fetch('/api/therapy-types'),
        ]);

        if (agentRes.ok) {
          setAgents(await agentRes.json());
        }

        if (therapyRes.ok) {
          setTherapyTypes(await therapyRes.json());
        }
      } catch (err) {
        console.error('Error loading appointment form data:', err);
      }
    };

    loadLists();
  }, []);

  const handleTherapyChange = (value: string) => {
    setTherapyTypeId(value);
    const selected = therapyTypes.find((type) => type.id === value);
    if (selected) {
      setDuration(selected.duration);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!agentId || !therapyTypeId || !dateTime) {
      setError('Agent, therapy type, and date/time are required.');
      return;
    }

    try {
      const listRes = await fetch('/api/appointments');
      if (listRes.ok) {
        const appointments: { agentId: string; therapyTypeId: string; dateTime: string }[] =
          await listRes.json();
        const targetTime = new Date(dateTime).getTime();
        const duplicate = appointments.some(
          (a) =>
            a.agentId === agentId &&
            a.therapyTypeId === therapyTypeId &&
            new Date(a.dateTime).getTime() === targetTime
        );
        if (duplicate) {
          setError(
            'An appointment already exists for this agent, therapy type, and time.'
          );
          return;
        }
      }

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId,
          therapyTypeId,
          dateTime,
          duration,
          notes,
        }),
      });

      if (response.ok) {
        router.push('/appointments');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create appointment');
      }
    } catch (err) {
      console.error('Error booking appointment:', err);
      setError('Failed to create appointment');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-4">
          <Link href="/appointments" className="text-indigo-600 hover:text-indigo-800">
            ← Back to Appointments
          </Link>
          <Link href="/therapy-types" className="text-indigo-600 hover:text-indigo-800">
            Therapy Types
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Appointment</h1>
          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Agent</span>
                <select
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select agent</option>
                  {agents.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-700">Therapy Type</span>
                <select
                  value={therapyTypeId}
                  onChange={(e) => handleTherapyChange(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select therapy type</option>
                  {therapyTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Date and time</span>
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Duration (minutes)</span>
              <input
                type="number"
                min={15}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Notes</span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
              />
            </label>

            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
