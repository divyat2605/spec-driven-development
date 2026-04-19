'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Appointment {
  id: string;
  dateTime: string;
  duration: number;
  notes?: string;
  status: string;
  agent: { id: string; name: string };
  therapyType: { id: string; name: string };
}

export default function AppointmentDetail() {
  const params = useParams();
  const appointmentId = params.id as string;
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await fetch(`/api/appointments/${appointmentId}`);
        if (response.ok) {
          setAppointment(await response.json());
        }
      } catch (error) {
        console.error('Error fetching appointment:', error);
      } finally {
        setLoading(false);
      }
    };

    if (appointmentId) {
      fetchAppointment();
    }
  }, [appointmentId]);

  const updateStatus = async (status: string) => {
    if (!appointment) return;

    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setAppointment(await response.json());
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <p className="text-center py-8">Loading appointment...</p>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <p className="text-center py-8 text-red-600">Appointment not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/appointments" className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">
          ← Back to Appointments
        </Link>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Appointment Details</h1>
          <p className="text-lg text-gray-600 mb-2">Agent: {appointment.agent?.name}</p>
          <p className="text-lg text-gray-600 mb-2">Therapy: {appointment.therapyType?.name}</p>
          <p className="text-lg text-gray-600 mb-2">
            Date:{' '}
            {appointment.dateTime
              ? new Date(appointment.dateTime).toLocaleString()
              : ''}
          </p>
          <p className="text-lg text-gray-600 mb-2">Duration: {appointment.duration} minutes</p>
          <p className="text-lg text-gray-600 mb-2">Status: {appointment.status}</p>
          {appointment.notes && <p className="text-gray-700 mb-4">Notes: {appointment.notes}</p>}
        </div>

        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <button
            onClick={() => updateStatus('completed')}
            disabled={appointment.status === 'completed'}
            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            Mark Completed
          </button>
          <button
            onClick={() => updateStatus('cancelled')}
            disabled={appointment.status === 'cancelled'}
            className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            Cancel Appointment
          </button>
        </div>
      </main>
    </div>
  );
}
