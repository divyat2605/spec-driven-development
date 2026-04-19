'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

interface Ailment {
  id: string;
  name: string;
  severity: string;
  description?: string;
  agent: { id: string; name: string };
  treatments: { id: string }[];
  createdAt: string;
  updatedAt: string;
}

export default function AilmentDetail() {
  const params = useParams();
  const router = useRouter();
  const ailmentId = params.id as string;
  const [ailment, setAilment] = useState<Ailment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAilment = async () => {
      try {
        const response = await fetch(`/api/ailments/${ailmentId}`);
        if (response.ok) {
          setAilment(await response.json());
        }
      } catch (error) {
        console.error('Error fetching ailment:', error);
      } finally {
        setLoading(false);
      }
    };

    if (ailmentId) {
      fetchAilment();
    }
  }, [ailmentId]);

  const handleDeleteAilment = async () => {
    if (!ailment || !confirm('Are you sure you want to delete this ailment?')) return;

    try {
      const response = await fetch(`/api/ailments/${ailmentId}`, { method: 'DELETE' });
      if (response.ok) {
        router.push(`/agents/${ailment.agent.id}`);
      }
    } catch (error) {
      console.error('Error deleting ailment:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <p className="text-center py-8">Loading ailment...</p>
      </div>
    );
  }

  if (!ailment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <p className="text-center py-8 text-red-600">Ailment not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/ailments" className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">
          ← Back to Ailments
        </Link>

        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{ailment.name}</h1>
          <p className="text-lg text-gray-600 mb-2">Severity: {ailment.severity}</p>
          <p className="text-lg text-gray-600 mb-2">
            Agent:{' '}
            <Link href={`/agents/${ailment.agent.id}`} className="text-indigo-600 hover:text-indigo-800">
              {ailment.agent.name}
            </Link>
          </p>
          {ailment.description && (
            <p className="text-gray-700 mb-4">{ailment.description}</p>
          )}
          <p className="text-sm text-gray-500 mb-4">
            Created: {new Date(ailment.createdAt).toLocaleDateString()}
          </p>
          <button
            onClick={handleDeleteAilment}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Delete Ailment
          </button>
        </div>
      </main>
    </div>
  );
}
