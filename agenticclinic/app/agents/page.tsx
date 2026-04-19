'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';

interface Agent {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  ailments: { id: string; name: string }[];
}

export default function AgentsList() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAgentName, setNewAgentName] = useState('');

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('/api/agents');
        if (response.ok) {
          const raw = await response.json();
          setAgents(Array.isArray(raw) ? raw : []);
        }
      } catch (error) {
        console.error('Error fetching agents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const handleCreateAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgentName.trim()) return;

    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newAgentName, status: 'active' }),
      });

      if (response.ok) {
        const newAgent = await response.json();
        setAgents([...agents, newAgent]);
        setNewAgentName('');
      }
    } catch (error) {
      console.error('Error creating agent:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Agents</h1>
        <p className="text-gray-600 mb-8">Create and manage clinic agents.</p>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Agent</h2>
          <form onSubmit={handleCreateAgent} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={newAgentName}
              onChange={(e) => setNewAgentName(e.target.value)}
              placeholder="Agent name"
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-indigo-600 px-6 py-2.5 font-medium text-white transition duration-150 ease-out hover:scale-[1.02] hover:bg-indigo-700 active:scale-[0.98]"
            >
              Create
            </button>
          </form>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading agents...</p>
        ) : agents.length === 0 ? (
          <p className="text-gray-600">No agents found. Create one to get started!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(agents) &&
              agents.map((agent) => (
                <Link href={`/agents/${agent?.id}`} key={agent?.id}>
                  <div className="h-full cursor-pointer rounded-xl border border-gray-100 border-l-4 border-l-indigo-500 bg-white p-6 shadow-md transition duration-200 hover:scale-105 hover:shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900">{agent?.name}</h3>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <StatusBadge status={agent?.status ?? ''} variant="agent" />
                    </div>
                    <p className="mt-3 text-sm font-medium text-gray-500">
                      Ailments:{' '}
                      <span className="text-gray-900">
                        {Array.isArray(agent?.ailments) ? agent.ailments.length : 0}
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
