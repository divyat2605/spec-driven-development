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
          setAilments(await response.json());
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
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            AgentClinic
          </Link>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Ailments</h1>

        {loading ? (
          <p className="text-gray-600">Loading ailments...</p>
        ) : ailments.length === 0 ? (
          <p className="text-gray-600">No ailments recorded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ailments.map((ailment) => (
              <Link href={`/ailments/${ailment.id}`} key={ailment.id}>
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg cursor-pointer transition">
                  <h3 className="text-xl font-semibold text-gray-900">{ailment.name}</h3>
                  <p className="text-sm text-gray-600 mt-2">Severity: {ailment.severity}</p>
                  <p className="text-sm text-gray-600">Agent: {ailment.agent.name}</p>
                  <p className="text-sm text-gray-600">Treatments: {ailment.treatments.length}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
