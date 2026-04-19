'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Appointment {
  id: string;
  dateTime: string;
  duration: number;
  notes?: string;
  status: string;
  agent: { id: string; name: string };
  therapyType: { id: string; name: string };
}

export default function AppointmentsList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/appointments');
        if (response.ok) {
          const raw = await response.json();
          setAppointments(Array.isArray(raw) ? raw : []);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <Link href="/appointments/new" className="text-indigo-600 hover:text-indigo-800">
            New Appointment
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p className="text-gray-600">No appointments scheduled yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.isArray(appointments) &&
              appointments.map((appointment) => (
                <Link
                  href={`/appointments/${appointment?.id}`}
                  key={appointment?.id}
                  className="block bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold text-gray-900">
                    {appointment?.therapyType?.name} for {appointment?.agent?.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {appointment?.dateTime
                      ? new Date(appointment.dateTime).toLocaleString()
                      : ''}
                  </p>
                  <p className="text-sm text-gray-600">Status: {appointment?.status}</p>
                </Link>
              ))}
          </div>
        )}
      </main>
    </div>
  );
}
