'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

interface TherapyType {
  id: string;
  name: string;
  description?: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
}

export default function TherapyTypeDetail() {
  const params = useParams();
  const router = useRouter();
  const therapyTypeId = params.id as string;
  const [therapyType, setTherapyType] = useState<TherapyType | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(60);

  useEffect(() => {
    const fetchTherapyType = async () => {
      try {
        const response = await fetch(`/api/therapy-types/${therapyTypeId}`);
        if (response.ok) {
          const data = await response.json();
          setTherapyType(data);
          setName(data?.name ?? '');
          setDescription(data?.description || '');
          setDuration(typeof data?.duration === 'number' ? data.duration : 60);
        }
      } catch (error) {
        console.error('Error fetching therapy type:', error);
      } finally {
        setLoading(false);
      }
    };

    if (therapyTypeId) {
      fetchTherapyType();
    }
  }, [therapyTypeId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!therapyType) return;

    try {
      const response = await fetch(`/api/therapy-types/${therapyTypeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, duration }),
      });

      if (response.ok) {
        setTherapyType(await response.json());
      }
    } catch (error) {
      console.error('Error updating therapy type:', error);
    }
  };

  const handleDelete = async () => {
    if (!therapyType || !confirm('Delete this therapy type?')) return;

    try {
      const response = await fetch(`/api/therapy-types/${therapyTypeId}`, { method: 'DELETE' });
      if (response.ok) {
        router.push('/therapy-types');
      }
    } catch (error) {
      console.error('Error deleting therapy type:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <p className="text-center py-8">Loading therapy type...</p>
      </div>
    );
  }

  if (!therapyType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <p className="text-center py-8 text-red-600">Therapy type not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/therapy-types" className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">
          ← Back to Therapy Types
        </Link>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{therapyType?.name}</h1>
          <p className="text-sm text-gray-600 mb-2">Duration: {therapyType?.duration} minutes</p>
          {therapyType?.description && (
            <p className="text-gray-700 mb-4">{therapyType.description}</p>
          )}
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Delete Therapy Type
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Update Therapy Type</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="number"
              min={15}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
