import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const now = new Date();

    const [
      totalAgents,
      totalAilments,
      totalTherapyTypes,
      scheduledCount,
      completedCount,
      cancelledCount,
      upcomingAppointments,
      recentAgents,
    ] = await Promise.all([
      prisma.agent.count(),
      prisma.ailment.count(),
      prisma.therapyType.count(),
      prisma.appointment.count({ where: { status: 'scheduled' } }),
      prisma.appointment.count({ where: { status: 'completed' } }),
      prisma.appointment.count({ where: { status: 'cancelled' } }),
      prisma.appointment.findMany({
        where: {
          status: 'scheduled',
          dateTime: { gt: now },
        },
        include: { agent: true, therapyType: true },
        orderBy: { dateTime: 'asc' },
        take: 5,
      }),
      prisma.agent.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ]);

    return NextResponse.json({
      totalAgents,
      totalAilments,
      totalTherapyTypes,
      appointments: {
        scheduled: scheduledCount,
        completed: completedCount,
        cancelled: cancelledCount,
      },
      upcomingAppointments,
      recentAgents,
    });
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard' }, { status: 500 });
  }
}
