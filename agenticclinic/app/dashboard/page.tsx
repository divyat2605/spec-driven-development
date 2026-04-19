'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';

interface DashboardPayload {
  totalAgents: number;
  totalAilments: number;
  totalTherapyTypes: number;
  appointments: {
    scheduled: number;
    completed: number;
    cancelled: number;
  };
  upcomingAppointments: {
    id: string;
    dateTime: string;
    status: string;
    agent: { id: string; name: string };
    therapyType: { id: string; name: string };
  }[];
  recentAgents: {
    id: string;
    name: string;
    status: string;
    createdAt: string;
  }[];
}

const statCardBase =
  'bg-white p-6 rounded-lg shadow border border-gray-100 border-l-4 pl-5 transition-shadow duration-200 hover:shadow-lg';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if (response.ok) {
          const raw = await response.json();
          setData({
            ...raw,
            upcomingAppointments: Array.isArray(raw?.upcomingAppointments)
              ? raw.upcomingAppointments
              : [],
            recentAgents: Array.isArray(raw?.recentAgents) ? raw.recentAgents : [],
            appointments: raw?.appointments ?? {
              scheduled: 0,
              completed: 0,
              cancelled: 0,
            },
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-gray-600">Loading dashboard...</p>
        </main>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-red-600">Could not load dashboard.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div className={`${statCardBase} border-l-indigo-500`}>
              <p className="text-sm font-medium text-gray-600">
                <span className="mr-1.5" aria-hidden>
                  👤
                </span>
                Agents
              </p>
              <p className="text-4xl font-bold text-indigo-600 mt-2">{data?.totalAgents}</p>
            </div>
            <div className={`${statCardBase} border-l-blue-500`}>
              <p className="text-sm font-medium text-gray-600">
                <span className="mr-1.5" aria-hidden>
                  🤒
                </span>
                Ailments
              </p>
              <p className="text-4xl font-bold text-blue-600 mt-2">{data?.totalAilments}</p>
            </div>
            <div className={`${statCardBase} border-l-green-500`}>
              <p className="text-sm font-medium text-gray-600">
                <span className="mr-1.5" aria-hidden>
                  💊
                </span>
                Therapy types
              </p>
              <p className="text-4xl font-bold text-green-600 mt-2">{data?.totalTherapyTypes}</p>
            </div>
            <div className={`${statCardBase} border-l-purple-500`}>
              <p className="text-sm font-medium text-gray-600">
                <span className="mr-1.5" aria-hidden>
                  📅
                </span>
                Scheduled
              </p>
              <p className="text-4xl font-bold text-amber-600 mt-2">
                {data.appointments?.scheduled}
              </p>
            </div>
            <div className={`${statCardBase} border-l-indigo-500`}>
              <p className="text-sm font-medium text-gray-600">
                <span className="mr-1.5" aria-hidden>
                  📅
                </span>
                Completed
              </p>
              <p className="text-4xl font-bold text-green-600 mt-2">
                {data.appointments?.completed}
              </p>
            </div>
            <div className={`${statCardBase} border-l-blue-500`}>
              <p className="text-sm font-medium text-gray-600">
                <span className="mr-1.5" aria-hidden>
                  📅
                </span>
                Cancelled
              </p>
              <p className="text-4xl font-bold text-red-600 mt-2">
                {data.appointments?.cancelled}
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming appointments</h2>
            {!Array.isArray(data.upcomingAppointments) || data.upcomingAppointments.length === 0 ? (
              <p className="text-gray-600 bg-white p-6 rounded-lg shadow border border-gray-100">
                No upcoming scheduled appointments.
              </p>
            ) : (
              <ul className="space-y-3">
                {Array.isArray(data.upcomingAppointments) &&
                  data.upcomingAppointments.map((a) => (
                    <li key={a?.id}>
                      <Link
                        href={`/appointments/${a?.id}`}
                        className="block bg-white p-4 rounded-lg shadow border border-gray-100 border-l-4 border-l-blue-500 pl-5 hover:shadow-md hover:scale-[1.02] transition duration-200"
                      >
                        <div className="flex flex-wrap items-center gap-2 justify-between">
                          <p className="font-semibold text-gray-900">
                            {a?.therapyType?.name} — {a?.agent?.name}
                          </p>
                          <StatusBadge status={a?.status ?? ''} variant="appointment" />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {a?.dateTime ? new Date(a.dateTime).toLocaleString() : ''}
                        </p>
                      </Link>
                    </li>
                  ))}
              </ul>
            )}
            <p className="mt-4">
              <Link
                href="/appointments"
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition hover:underline"
              >
                View all appointments →
              </Link>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent agents</h2>
            {!Array.isArray(data.recentAgents) || data.recentAgents.length === 0 ? (
              <p className="text-gray-600 bg-white p-6 rounded-lg shadow border border-gray-100">
                No agents yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {Array.isArray(data.recentAgents) &&
                  data.recentAgents.map((agent) => (
                    <li key={agent?.id}>
                      <Link
                        href={`/agents/${agent?.id}`}
                        className="block bg-white p-4 rounded-lg shadow border border-gray-100 border-l-4 border-l-indigo-500 pl-5 hover:shadow-md hover:scale-[1.02] transition duration-200"
                      >
                        <div className="flex flex-wrap items-center gap-2 justify-between">
                          <p className="font-semibold text-gray-900">{agent?.name}</p>
                          <StatusBadge status={agent?.status ?? ''} variant="agent" />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Added{' '}
                          {agent?.createdAt
                            ? new Date(agent.createdAt).toLocaleDateString()
                            : ''}
                        </p>
                      </Link>
                    </li>
                  ))}
              </ul>
            )}
            <p className="mt-4">
              <Link
                href="/agents"
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition hover:underline"
              >
                View all agents →
              </Link>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
