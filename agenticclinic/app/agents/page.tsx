'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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
          setAgents(await response.json());
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
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            AgentClinic
          </Link>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Agents</h1>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Agent</h2>
          <form onSubmit={handleCreateAgent} className="flex gap-4">
            <input
              type="text"
              value={newAgentName}
              onChange={(e) => setNewAgentName(e.target.value)}
              placeholder="Agent name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
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
            {agents.map((agent) => (
              <Link href={`/agents/${agent.id}`} key={agent.id}>
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg cursor-pointer transition">
                  <h3 className="text-xl font-semibold text-gray-900">{agent.name}</h3>
                  <p className="text-sm text-gray-600 mt-2">Status: {agent.status}</p>
                  <p className="text-sm text-gray-600">Ailments: {agent.ailments.length}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
