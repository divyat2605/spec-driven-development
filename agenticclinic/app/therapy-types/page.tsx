'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface TherapyType {
  id: string;
  name: string;
  description?: string;
  duration: number;
}

export default function TherapyTypesList() {
  const [therapyTypes, setTherapyTypes] = useState<TherapyType[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(60);

  useEffect(() => {
    const fetchTherapyTypes = async () => {
      try {
        const response = await fetch('/api/therapy-types');
        if (response.ok) {
          setTherapyTypes(await response.json());
        }
      } catch (error) {
        console.error('Error fetching therapy types:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTherapyTypes();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const response = await fetch('/api/therapy-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, duration }),
      });

      if (response.ok) {
        const newType = await response.json();
        setTherapyTypes([...therapyTypes, newType]);
        setName('');
        setDescription('');
        setDuration(60);
      }
    } catch (error) {
      console.error('Error creating therapy type:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Therapy Types</h1>
            <p className="text-gray-600 mt-1">Define therapies staff can book for agents.</p>
          </div>
          <Link
            href="/appointments/new"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition duration-150 ease-out hover:scale-[1.02] hover:bg-indigo-700 active:scale-[0.98]"
          >
            Book Appointment
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Therapy Type</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Therapy name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="number"
                min={15}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                placeholder="Duration (minutes)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={3}
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Create Therapy Type
            </button>
          </form>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading therapy types...</p>
        ) : therapyTypes.length === 0 ? (
          <p className="text-gray-600">No therapy types yet. Add one to get started.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {therapyTypes.map((therapyType) => (
              <Link
                href={`/therapy-types/${therapyType.id}`}
                key={therapyType.id}
                className="block bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-gray-900">{therapyType.name}</h3>
                <p className="text-sm text-gray-600 mt-2">Duration: {therapyType.duration} minutes</p>
                {therapyType.description && (
                  <p className="text-sm text-gray-600 mt-2">{therapyType.description}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
