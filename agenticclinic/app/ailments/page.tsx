'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Ailment {
  id: string;
  name: string;
  severity: string;
  agent: { id: string; name: string };
  treatments: { id: string }[];
}

export default function AilmentsList() {
  const [ailments, setAilments] = useState<Ailment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAilments = async () => {
      try {
        const response = await fetch('/api/ailments');
        if (response.ok) {
          const raw = await response.json();
          setAilments(Array.isArray(raw) ? raw : []);
        }
      } catch (error) {
        console.error('Error fetching ailments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAilments();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Ailments</h1>
        <p className="text-gray-600 mb-8">Browse ailments linked to agents.</p>

        {loading ? (
          <p className="text-gray-600">Loading ailments...</p>
        ) : ailments.length === 0 ? (
          <p className="text-gray-600">No ailments recorded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(ailments) &&
              ailments.map((ailment) => (
                <Link href={`/ailments/${ailment?.id}`} key={ailment?.id}>
                  <div className="h-full cursor-pointer rounded-xl border border-gray-100 border-l-4 border-l-teal-500 bg-white p-6 shadow-md transition duration-200 hover:scale-105 hover:shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900">{ailment?.name}</h3>
                    <p className="mt-2 text-sm font-medium text-gray-500">
                      Severity:{' '}
                      <span className="font-semibold text-gray-800">{ailment?.severity}</span>
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                      Agent:{' '}
                      <span className="font-medium text-gray-900">{ailment?.agent?.name}</span>
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-500">
                      Treatments:{' '}
                      <span className="text-gray-900">
                        {Array.isArray(ailment?.treatments) ? ailment.treatments.length : 0}
                      </span>
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </main>
    </div>
  );
}
