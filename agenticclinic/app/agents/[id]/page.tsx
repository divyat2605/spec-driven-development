'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

interface Ailment {
  id: string;
  name: string;
  severity: string;
}

interface AppointmentSummary {
  id: string;
  dateTime: string;
  duration: number;
  status: string;
  therapyType: { id: string; name: string };
}

interface Agent {
  id: string;
  name: string;
  status: string;
  ailments: Ailment[];
  appointments: AppointmentSummary[];
  createdAt: string;
  updatedAt: string;
}

export default function AgentDetail() {
  const params = useParams();
  const router = useRouter();
  const agentId = params.id as string;
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [newAilmentName, setNewAilmentName] = useState('');

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await fetch(`/api/agents/${agentId}`);
        if (response.ok) {
          setAgent(await response.json());
        }
      } catch (error) {
        console.error('Error fetching agent:', error);
      } finally {
        setLoading(false);
      }
    };

    if (agentId) {
      fetchAgent();
    }
  }, [agentId]);

  const handleAddAilment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAilmentName.trim() || !agent) return;

    try {
      const response = await fetch('/api/ailments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newAilmentName,
          agentId: agent.id,
          severity: 'moderate',
        }),
      });

      if (response.ok) {
        const newAilment = await response.json();
        const prev = Array.isArray(agent.ailments) ? agent.ailments : [];
        setAgent({ ...agent, ailments: [...prev, newAilment] });
        setNewAilmentName('');
      }
    } catch (error) {
      console.error('Error adding ailment:', error);
    }
  };

  const handleDeleteAgent = async () => {
    if (!agent || !confirm('Are you sure you want to delete this agent?')) return;

    try {
      const response = await fetch(`/api/agents/${agentId}`, { method: 'DELETE' });
      if (response.ok) {
        router.push('/agents');
      }
    } catch (error) {
      console.error('Error deleting agent:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <p className="text-center py-8">Loading agent...</p>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <p className="text-center py-8 text-red-600">Agent not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/agents" className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">
          ← Back to Agents
        </Link>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{agent?.name}</h1>
          <p className="text-lg text-gray-600 mb-2">Status: {agent?.status}</p>
          <p className="text-sm text-gray-500">
            Created:{' '}
            {agent?.createdAt ? new Date(agent.createdAt).toLocaleDateString() : ''}
          </p>
          <button
            onClick={handleDeleteAgent}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Delete Agent
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Add Ailment</h2>
          <form onSubmit={handleAddAilment} className="flex gap-4">
            <input
              type="text"
              value={newAilmentName}
              onChange={(e) => setNewAilmentName(e.target.value)}
              placeholder="Ailment name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Appointments</h2>
          {!Array.isArray(agent?.appointments) || agent.appointments.length === 0 ? (
            <p className="text-gray-600">No appointments scheduled for this agent.</p>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Upcoming</h3>
                {Array.isArray(agent.appointments) &&
                  agent.appointments
                    .filter((appointment) =>
                      appointment?.dateTime
                        ? new Date(appointment.dateTime) >= new Date()
                        : false
                    )
                    .sort(
                      (a, b) =>
                        new Date(a?.dateTime ?? 0).getTime() - new Date(b?.dateTime ?? 0).getTime()
                    )
                    .map((appointment) => (
                      <Link href={`/appointments/${appointment?.id}`} key={appointment?.id}>
                        <div className="bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-lg cursor-pointer transition">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {appointment?.therapyType?.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {appointment?.dateTime
                              ? new Date(appointment.dateTime).toLocaleString()
                              : ''}
                          </p>
                          <p className="text-sm text-gray-600">Status: {appointment?.status}</p>
                        </div>
                      </Link>
                    ))}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Past</h3>
                {Array.isArray(agent.appointments) &&
                  agent.appointments
                    .filter((appointment) =>
                      appointment?.dateTime ? new Date(appointment.dateTime) < new Date() : false
                    )
                    .sort(
                      (a, b) =>
                        new Date(b?.dateTime ?? 0).getTime() - new Date(a?.dateTime ?? 0).getTime()
                    )
                    .map((appointment) => (
                      <Link href={`/appointments/${appointment?.id}`} key={appointment?.id}>
                        <div className="bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-lg cursor-pointer transition">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {appointment?.therapyType?.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {appointment?.dateTime
                              ? new Date(appointment.dateTime).toLocaleString()
                              : ''}
                          </p>
                          <p className="text-sm text-gray-600">Status: {appointment?.status}</p>
                        </div>
                      </Link>
                    ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Ailments</h2>
          {!Array.isArray(agent?.ailments) || agent.ailments.length === 0 ? (
            <p className="text-gray-600">No ailments recorded for this agent.</p>
          ) : (
            <div className="space-y-4">
              {Array.isArray(agent.ailments) &&
                agent.ailments.map((ailment) => (
                  <Link href={`/ailments/${ailment?.id}`} key={ailment?.id}>
                    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg cursor-pointer transition">
                      <h3 className="text-lg font-semibold text-gray-900">{ailment?.name}</h3>
                      <p className="text-sm text-gray-600">Severity: {ailment?.severity}</p>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
